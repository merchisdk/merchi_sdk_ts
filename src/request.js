var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
// eslint-disable-next-line no-unused-vars
import { getErrorFromCode } from './constants/errors';
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(err) {
        var _this = this;
        var message = JSON.stringify(err);
        /* istanbul ignore next */
        _this = _super.call(this, message) || this;
        _this.statusCode = err.statusCode;
        _this.errorCode = getErrorFromCode(err.errorCode);
        _this.errorMessage = err.message ?
            err.message : 'No error message';
        _this.name = 'ApiError';
        _this.original = err;
        return _this;
    }
    return ApiError;
}(Error));
export { ApiError };
export var version = 'v6';
export function backendFetch(resource, options) {
    var e_1, _a;
    var defaultBackendUri = 'https://api.merchi.co/';
    // backend uri as defined on env
    var envBackendUri = process && process.env && process.env.MERCHI_BACKEND_URI;
    // backend uri as defined on the window element takes priority
    var clientBackendUri = window
        && window !== undefined
        && window.merchiBackendUri;
    var server = clientBackendUri || envBackendUri || defaultBackendUri;
    var url = new URL(server + version + resource);
    if (options && options.query) {
        try {
            for (var _b = __values(options.query), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                url.searchParams.append(entry[0], entry[1]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return fetch(url.toString(), options);
}
export function apiFetch(resource, options, expectEmptyResponse) {
    return backendFetch(resource, options).then(function (response) {
        if (response.status < 200 || response.status > 299) {
            return response.json().then(function (json) {
                var err = new ApiError(json);
                return Promise.reject(err);
            });
        }
        else {
            return expectEmptyResponse ? '' : response.json();
        }
    });
}
/* istanbul ignore next */
export function apiFetchWithProgress(resource, options, progressCallback) {
    return backendFetch(resource, options).then(function (response) {
        if (!response.body) {
            var err = new ApiError('empty response');
            return Promise.reject(err);
        }
        var reader = response.body.getReader();
        var bodyText = '';
        var errorText = '';
        var haveError = false;
        var expected = '{"loadingBar": "' + '.'.repeat(100) + '"}';
        function readChunk() {
            return reader.read().then(function (_a) {
                var done = _a.done, value = _a.value;
                if (done) {
                    if (response.status < 200 || response.status > 299) {
                        var err = new ApiError('Unknown error');
                        return Promise.reject(err);
                    }
                    else if (haveError) {
                        try {
                            var jsonText = JSON.parse(errorText);
                            return Promise.reject(new ApiError(jsonText));
                        }
                        catch (e) {
                            return Promise.reject(new ApiError(errorText));
                        }
                    }
                    else {
                        return bodyText;
                    }
                }
                else {
                    var chunk = new TextDecoder().decode(value);
                    if (haveError) {
                        errorText += chunk;
                    }
                    else {
                        for (var i = 0; i < chunk.length; ++i) {
                            var char = chunk[i];
                            var expectedChar = expected[bodyText.length];
                            if (expectedChar == char && !haveError) {
                                bodyText += char;
                            }
                            else {
                                haveError = true;
                                errorText += char;
                            }
                        }
                    }
                    if (!haveError && progressCallback) {
                        var progress = Math.min(Math.max(0, bodyText.length - 16), 100);
                        progressCallback(progress);
                    }
                    return readChunk();
                }
            });
        }
        return readChunk();
    });
}
