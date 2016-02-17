import {WriteResult} from 'rethinkdb';
/**
 * Created by ronze on 2/11/2016.
 */
export const dbUnknownError = 'Unknown error';
export const dbConflictError = 'Conflict';
export const dbUnauthorizedError = 'Unauthorized';
export const dbNotFoundError = 'Not found';
export const dbNothingGeneratedError = 'Not generated';
export const dbNotSupportedError = 'Not supported';

export class DBError implements WriteResult<any> {
    public inserted: number = 0;
    public skipped: number = 0;
    public replaced: number = 0;
    public unchanged: number = 0;
    public errors: number = 1;
    public deleted: number = 0;
    /* tslint:disable */
    public first_error: string = dbUnknownError;
    /* tslint:enable */
    constructor(message: string) {
        this.first_error = message;
    }
}

export class DBConflictError extends DBError {
    constructor() {
        super(dbConflictError);
    }
}

export class DBNothingGeneratedError extends DBError {
    constructor() {
        super(dbNothingGeneratedError);
    }
}

export class DBNotFoundError extends DBError {
    constructor() {
        super(dbNotFoundError);
    }
}

export function isWriteResult(result: any): result is WriteResult<any> {
    return typeof result.inserted === 'number' &&
        typeof result.skipped === 'number' &&
        typeof result.replaced === 'number' &&
        typeof result.unchanged === 'number' &&
        typeof result.errors === 'number' &&
        typeof result.deleted === 'number';
}

export function throwIfWriteError(shouldGenerateKey: boolean = false, acceptOthers: boolean = false) {
    return (writeResult: WriteResult<any>) => {
        if (!isWriteResult(writeResult) && !acceptOthers) {
            throw writeResult; //expect to have a write result
        }
        if (writeResult.errors > 0 || writeResult.first_error !== undefined) {
            throw writeResult;
        }
        if (shouldGenerateKey &&
            (
                typeof writeResult.generated_keys !== 'object' ||
                typeof writeResult.generated_keys.length !== 'number' ||
                writeResult.generated_keys.length <= 0)
            ) {
            throw new DBNothingGeneratedError();
        }
        return writeResult;
    };
}
