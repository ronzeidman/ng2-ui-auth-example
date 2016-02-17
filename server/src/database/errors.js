"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by ronze on 2/11/2016.
 */
exports.dbUnknownError = 'Unknown error';
exports.dbConflictError = 'Conflict';
exports.dbUnauthorizedError = 'Unauthorized';
exports.dbNotFoundError = 'Not found';
exports.dbNothingGeneratedError = 'Not generated';
exports.dbNotSupportedError = 'Not supported';
var DBError = (function () {
    /* tslint:enable */
    function DBError(message) {
        this.inserted = 0;
        this.skipped = 0;
        this.replaced = 0;
        this.unchanged = 0;
        this.errors = 1;
        this.deleted = 0;
        /* tslint:disable */
        this.first_error = exports.dbUnknownError;
        this.first_error = message;
    }
    return DBError;
}());
exports.DBError = DBError;
var DBConflictError = (function (_super) {
    __extends(DBConflictError, _super);
    function DBConflictError() {
        _super.call(this, exports.dbConflictError);
    }
    return DBConflictError;
}(DBError));
exports.DBConflictError = DBConflictError;
var DBNothingGeneratedError = (function (_super) {
    __extends(DBNothingGeneratedError, _super);
    function DBNothingGeneratedError() {
        _super.call(this, exports.dbNothingGeneratedError);
    }
    return DBNothingGeneratedError;
}(DBError));
exports.DBNothingGeneratedError = DBNothingGeneratedError;
var DBNotFoundError = (function (_super) {
    __extends(DBNotFoundError, _super);
    function DBNotFoundError() {
        _super.call(this, exports.dbNotFoundError);
    }
    return DBNotFoundError;
}(DBError));
exports.DBNotFoundError = DBNotFoundError;
function isWriteResult(result) {
    return typeof result.inserted === 'number' &&
        typeof result.skipped === 'number' &&
        typeof result.replaced === 'number' &&
        typeof result.unchanged === 'number' &&
        typeof result.errors === 'number' &&
        typeof result.deleted === 'number';
}
exports.isWriteResult = isWriteResult;
function throwIfWriteError(shouldGenerateKey, acceptOthers) {
    if (shouldGenerateKey === void 0) { shouldGenerateKey = false; }
    if (acceptOthers === void 0) { acceptOthers = false; }
    return function (writeResult) {
        if (!isWriteResult(writeResult) && !acceptOthers) {
            throw writeResult; //expect to have a write result
        }
        if (writeResult.errors > 0 || writeResult.first_error !== undefined) {
            throw writeResult;
        }
        if (shouldGenerateKey &&
            (typeof writeResult.generated_keys !== 'object' ||
                typeof writeResult.generated_keys.length !== 'number' ||
                writeResult.generated_keys.length <= 0)) {
            throw new DBNothingGeneratedError();
        }
        return writeResult;
    };
}
exports.throwIfWriteError = throwIfWriteError;
//# sourceMappingURL=errors.js.map