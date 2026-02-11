// eslint-disable-next-line no-unused-vars
import { ErrorType, getErrorFromCode } from './constants/errors.js';

export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  /**
   * Extra query params appended to the request URL.
   */
  query?: string[][];
  /**
   * Request headers. When sending JSON bodies, `Content-Type: application/json`
   * will be applied if not already present.
   */
  headers?: HeadersInit;
  /**
   * Body must be either:
   * - `FormData` (for multipart/form-data requests), or
   * - a JSON-serialisable object/array (will be JSON-stringified automatically)
   */
  body?: FormData | Record<string, unknown> | unknown[];
}

export class ApiError extends Error {
  public statusCode?: number;
  public errorCode?: ErrorType;
  public errorMessage: string;
  public original: any;
  public constructor(err: any) {
    const message = JSON.stringify(err);
    /* istanbul ignore next */
    super(message);
    this.statusCode = err.statusCode;
    this.errorCode = getErrorFromCode(err.errorCode);
    this.errorMessage = err.message ?
      err.message : 'No error message';
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

function isFormData(value: any): value is FormData {
  // FormData exists in browsers/jsdom; guard for environments without it.
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function toHeaders(headers: HeadersInit | undefined): Headers {
  return new Headers(headers || undefined);
}

function stripContentType(headers: Headers) {
  // Prevent incorrect boundary handling when using FormData.
  headers.delete('content-type');
}

function normaliseBodyAndHeaders(options?: RequestOptions): RequestInit | undefined {
  if (!options) return undefined;

  const headers = toHeaders(options.headers);
  const body = (options as any).body;

  // Body omitted.
  if (body === undefined || body === null) {
    return { ...options, headers } as RequestInit;
  }

  // Multipart/form-data.
  if (isFormData(body)) {
    stripContentType(headers);
    return { ...options, headers, body } as RequestInit;
  }

  // JSON: caller must pass a JSON-serialisable object/array.
  if (typeof body !== 'object') {
    throw new Error(
      'RequestOptions.body must be a JSON object/array or a FormData instance.'
    );
  }

  if (!headers.has('content-type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('accept')) {
    headers.set('Accept', 'application/json');
  }

  return { ...options, headers, body: JSON.stringify(body) } as RequestInit;
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
  const requestInit = normaliseBodyAndHeaders(options);
  return fetch(url.toString(), requestInit);
}

export function apiFetch(
  baseUrl: string,
  resource: string,
  options?: RequestOptions,
  expectEmptyResponse?: boolean
) {
  return backendFetch(baseUrl, resource, options).then(
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
  return backendFetch(baseUrl, resource, options).then(
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
