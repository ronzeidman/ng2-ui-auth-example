"use strict";
/**
 * Created by ronze on 2/3/2016.
 */
exports.httpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    REQUEST_TOO_LONG: 413,
    REQUEST_URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    INSUFFICIENT_SPACE_ON_RESOURCE: 419,
    METHOD_FAILURE: 420,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    INSUFFICIENT_STORAGE: 507,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    statusCodes: {},
    getStatusText: function (statusCode) {
        if (exports.httpStatus.statusCodes.hasOwnProperty(statusCode)) {
            return exports.httpStatus.statusCodes[statusCode];
        }
        else {
            throw new Error('Status code does not exist: ' + statusCode);
        }
    },
};
exports.httpStatus.statusCodes[exports.httpStatus.ACCEPTED] = 'Accepted';
exports.httpStatus.statusCodes[exports.httpStatus.BAD_GATEWAY] = 'Bad Gateway';
exports.httpStatus.statusCodes[exports.httpStatus.BAD_REQUEST] = 'Bad Request';
exports.httpStatus.statusCodes[exports.httpStatus.CONFLICT] = 'Conflict';
exports.httpStatus.statusCodes[exports.httpStatus.CONTINUE] = 'Continue';
exports.httpStatus.statusCodes[exports.httpStatus.CREATED] = 'Created';
exports.httpStatus.statusCodes[exports.httpStatus.EXPECTATION_FAILED] = 'Expectation Failed';
exports.httpStatus.statusCodes[exports.httpStatus.FAILED_DEPENDENCY] = 'Failed Dependency';
exports.httpStatus.statusCodes[exports.httpStatus.FORBIDDEN] = 'Forbidden';
exports.httpStatus.statusCodes[exports.httpStatus.GATEWAY_TIMEOUT] = 'Gateway Timeout';
exports.httpStatus.statusCodes[exports.httpStatus.GONE] = 'Gone';
exports.httpStatus.statusCodes[exports.httpStatus.HTTP_VERSION_NOT_SUPPORTED] = 'HTTP Version Not Supported';
exports.httpStatus.statusCodes[exports.httpStatus.INSUFFICIENT_SPACE_ON_RESOURCE] = 'Insufficient Space on Resource';
exports.httpStatus.statusCodes[exports.httpStatus.INSUFFICIENT_STORAGE] = 'Insufficient Storage';
exports.httpStatus.statusCodes[exports.httpStatus.INTERNAL_SERVER_ERROR] = 'Server Error';
exports.httpStatus.statusCodes[exports.httpStatus.LENGTH_REQUIRED] = 'Length Required';
exports.httpStatus.statusCodes[exports.httpStatus.LOCKED] = 'Locked';
exports.httpStatus.statusCodes[exports.httpStatus.METHOD_FAILURE] = 'Method Failure';
exports.httpStatus.statusCodes[exports.httpStatus.METHOD_NOT_ALLOWED] = 'Method Not Allowed';
exports.httpStatus.statusCodes[exports.httpStatus.MOVED_PERMANENTLY] = 'Moved Permanently';
exports.httpStatus.statusCodes[exports.httpStatus.MOVED_TEMPORARILY] = 'Moved Temporarily';
exports.httpStatus.statusCodes[exports.httpStatus.MULTI_STATUS] = 'Multi-Status';
exports.httpStatus.statusCodes[exports.httpStatus.MULTIPLE_CHOICES] = 'Multiple Choices';
exports.httpStatus.statusCodes[exports.httpStatus.NETWORK_AUTHENTICATION_REQUIRED] = 'Network Authentication Required';
exports.httpStatus.statusCodes[exports.httpStatus.NO_CONTENT] = 'No Content';
exports.httpStatus.statusCodes[exports.httpStatus.NON_AUTHORITATIVE_INFORMATION] = 'Non Authoritative Information';
exports.httpStatus.statusCodes[exports.httpStatus.NOT_ACCEPTABLE] = 'Not Acceptable';
exports.httpStatus.statusCodes[exports.httpStatus.NOT_FOUND] = 'Not Found';
exports.httpStatus.statusCodes[exports.httpStatus.NOT_IMPLEMENTED] = 'Not Implemented';
exports.httpStatus.statusCodes[exports.httpStatus.NOT_MODIFIED] = 'Not Modified';
exports.httpStatus.statusCodes[exports.httpStatus.OK] = 'OK';
exports.httpStatus.statusCodes[exports.httpStatus.PARTIAL_CONTENT] = 'Partial Content';
exports.httpStatus.statusCodes[exports.httpStatus.PAYMENT_REQUIRED] = 'Payment Required';
exports.httpStatus.statusCodes[exports.httpStatus.PRECONDITION_FAILED] = 'Precondition Failed';
exports.httpStatus.statusCodes[exports.httpStatus.PRECONDITION_REQUIRED] = 'Precondition Required';
exports.httpStatus.statusCodes[exports.httpStatus.PROCESSING] = 'Processing';
exports.httpStatus.statusCodes[exports.httpStatus.PROXY_AUTHENTICATION_REQUIRED] = 'Proxy Authentication Required';
exports.httpStatus.statusCodes[exports.httpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE] = 'Request Header Fields Too Large';
exports.httpStatus.statusCodes[exports.httpStatus.REQUEST_TIMEOUT] = 'Request Timeout';
exports.httpStatus.statusCodes[exports.httpStatus.REQUEST_TOO_LONG] = 'Request Entity Too Large';
exports.httpStatus.statusCodes[exports.httpStatus.REQUEST_URI_TOO_LONG] = 'Request-URI Too Long';
exports.httpStatus.statusCodes[exports.httpStatus.REQUESTED_RANGE_NOT_SATISFIABLE] = 'Requested Range Not Satisfiable';
exports.httpStatus.statusCodes[exports.httpStatus.RESET_CONTENT] = 'Reset Content';
exports.httpStatus.statusCodes[exports.httpStatus.SEE_OTHER] = 'See Other';
exports.httpStatus.statusCodes[exports.httpStatus.SERVICE_UNAVAILABLE] = 'Service Unavailable';
exports.httpStatus.statusCodes[exports.httpStatus.SWITCHING_PROTOCOLS] = 'Switching Protocols';
exports.httpStatus.statusCodes[exports.httpStatus.TEMPORARY_REDIRECT] = 'Temporary Redirect';
exports.httpStatus.statusCodes[exports.httpStatus.TOO_MANY_REQUESTS] = 'Too Many Requests';
exports.httpStatus.statusCodes[exports.httpStatus.UNAUTHORIZED] = 'Unauthorized';
exports.httpStatus.statusCodes[exports.httpStatus.UNPROCESSABLE_ENTITY] = 'Unprocessable Entity';
exports.httpStatus.statusCodes[exports.httpStatus.UNSUPPORTED_MEDIA_TYPE] = 'Unsupported Media Type';
exports.httpStatus.statusCodes[exports.httpStatus.USE_PROXY] = 'Use Proxy';
//# sourceMappingURL=httpStatus.js.map