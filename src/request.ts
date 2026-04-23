// eslint-disable-next-line no-unused-vars
import { ErrorType, getErrorFromCode } from './constants/errors.js';

export interface RequestOptions extends RequestInit {
  query?: string[][];
}

export interface ApiErrorDetails {
  /**
   * The json_name of the missing / disallowed related entity type
   * (e.g. 'file', 'product', 'domain').
   */
  relation?: string;
  /**
   * The json_name of the parent entity the relation was being
   * attached to (e.g. 'variation', 'job').
   */
  parentType?: string;
  /**
   * The id the client supplied for the missing / disallowed entity.
   * May be a numeric id as a number, or a string id depending on
   * the model.
   */
  id?: number | string;
  /**
   * The form-data index the client sent the entity under (i.e. the
   * ``N`` in ``parent-N-id``).
   */
  index?: number;
  /**
   * The fields the client sent for the missing entity, with noisy
   * keys (signed URLs, their expiries) stripped and long string
   * values truncated. Useful when debugging uploads where the
   * client knows the uploadId but the server has no matching row.
   */
  provided?: { [key: string]: any };
  // Backend may add new keys over time; keep the type permissive.
  [key: string]: any;
}

export class ApiError extends Error {
  public statusCode?: number;
  public errorCode?: ErrorType;
  public errorMessage: string;
  /**
   * Structured context the API may include alongside the error
   * message (e.g. the missing entity id and payload echo). Present
   * only when the backend chooses to populate it - most error
   * responses still carry just ``statusCode``, ``errorCode`` and
   * ``message``.
   */
  public details?: ApiErrorDetails;
  public original: any;
  public constructor(err: any) {
    const message = JSON.stringify(err);
    /* istanbul ignore next */
    super(message);
    this.statusCode = err.statusCode;
    this.errorCode = getErrorFromCode(err.errorCode);
    this.errorMessage = err.message ?
      err.message : 'No error message';
    this.details = err.details;
    this.name = 'ApiError';
    this.original = err;
  }
}

export const version = 'v6';

interface UriComponents {
  baseUrl: string;
  version: string;
}

function ensureVersionInUri(baseUrl: string): UriComponents {
  // Ensure baseUrl ends with a slash
  let uri = baseUrl;
  if (!uri.endsWith('/')) {
    uri += '/';
  }

  // Check if the URI already includes a version
  const versionPattern = new RegExp('/v\\d+/?$');
  const match = uri.match(versionPattern);
  
  if (match) {
    // Extract the version and remove it from the URI
    const foundVersion = match[0].replace(/\//g, '');
    const strippedUri = uri.replace(versionPattern, '/');
    return {
      baseUrl: strippedUri,
      version: foundVersion
    };
  }

  return {
    baseUrl: uri,
    version: version
  };
}

export function backendFetch(baseUrl: string, resource: string, options?: RequestOptions) {
  const { baseUrl: cleanBaseUrl, version: apiVersion } = ensureVersionInUri(baseUrl);
  // Remove leading slash from resource if it exists to prevent double slashes
  const cleanResource = resource.startsWith('/') ? resource.slice(1) : resource;
  const url = new URL(cleanBaseUrl + apiVersion + '/' + cleanResource);
  if (options && options.query) {
    for (const entry of options.query) {
      url.searchParams.append(entry[0], entry[1]);
    }
  }
  return fetch(url.toString(), options);
}

export function apiFetch(
  baseUrl: string,
  resource: string,
  options?: RequestOptions,
  expectEmptyResponse?: boolean
) {
  return backendFetch(baseUrl, resource, options as RequestInit | undefined).then(
    function (response) {
      if (response.status < 200 || response.status > 299) {
        return response.json().then(function (json) {
          const err = new ApiError(json);
          return Promise.reject(err);
        });
      } else {
        return expectEmptyResponse ? '' : response.json();
      }
    }
  );
}

/* istanbul ignore next */
export function apiFetchWithProgress(
  baseUrl: string,
  resource: string,
  options?: RequestOptions,
  progressCallback?: (progress: number) => void
) {
  return backendFetch(baseUrl, resource, options as RequestInit | undefined).then(
    function (response) {
      if (!response.body) {
        const err = new ApiError('empty response');
        return Promise.reject(err);
      }
      const reader = response.body.getReader();
      let bodyText = '';
      let errorText = '';
      let haveError = false;
      const expected = '{"loadingBar": "' + '.'.repeat(100) + '"}';
      function readChunk(): any {
        return reader.read().then(({done, value}) => {
          if (done) {
            if (response.status < 200 || response.status > 299) {
              const err = new ApiError('Unknown error');
              return Promise.reject(err);
            } else if(haveError) {
              try {
                const jsonText = JSON.parse(errorText);
                return Promise.reject(new ApiError(jsonText));
              } catch (e) {
                return Promise.reject(new ApiError(errorText));
              }
            } else {
              return bodyText;
            }
          } else {
            const chunk = new TextDecoder().decode(value);
            if (haveError) {
              errorText += chunk;
            } else {
              for (let i = 0; i < chunk.length; ++i) {
                const char = chunk[i];
                const expectedChar = expected[bodyText.length];
                if (expectedChar == char && !haveError) {
                  bodyText += char;
                } else {
                  haveError = true;
                  errorText += char;
                }
              }
            }
            if (!haveError && progressCallback) {
              const progress = Math.min(Math.max(0, bodyText.length - 16), 100);
              progressCallback(progress);
            }
            return readChunk();
          }
        });
      }
      return readChunk();
    }
  );
}
