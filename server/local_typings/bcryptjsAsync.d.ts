/**
 * Created by Ron on 22/10/2015.
 */
/* tslint:disable */
import * as Promise from 'bluebird';
export interface bcryptjsAsync {

    /**
     * @param rounds  The cost of processing the data. Default 10.
     */
    genSaltSync(rounds?: number): string;

    /**
     * @param rounds    The cost of processing the data. Default 10.
     * @param callback  A callback to be fire once the sald has been generated. Uses eio making it asynchronous.
     */
    genSalt(callback: (err: Error, salt: string) => void): void;
    genSalt(rounds: number, callback: (err: Error, salt: string) => void): void;
    genSaltAsync(rounds?: number): Promise<string>;

    /**
     * @param data  The data to be encrypted.
     * @param salt  The salt to be used in encryption.
     */
    hashSync(data: any, salt: string): string;
    /**
     * @param data    The data to be encrypted.
     * @param rounds  A salt will be generated using the rounds specified.
     */
    hashSync(data: any, rounds: number): string;

    /**
     * @param data      The data to be encrypted.
     * @param salt      The salt to be used in encryption.
     * @param callback  A callback to be fired once the data has been encrypted. Uses eio making it asynchronous.
     */
    hash(data: any, salt: string, callback: (err: Error, encrypted: string) => void): void;
    hashAsync(data: any, salt: string): Promise<string>;
    /**
     * @param data      The data to be encrypted.
     * @param rounds    A salt will be generated using the rounds specified.
     * @param callback  A callback to be fired once the data has been encrypted. Uses eio making it asynchronous.
     */
    hash(data: any, rounds: number, callback: (err: Error, encrypted: string) => void): void;
    hashAsync(data: any, rounds: number): Promise<string>;
    /**
     * @param data      The data to be encrypted.
     * @param encrypted The data to be compared against.
     */
    compareSync(data: any, encrypted: string): boolean;

    /**
     * @param data      The data to be encrypted.
     * @param encrypted The data to be compared against.
     * @param callback  A callback to be fire once the data has been compared. Uses eio making it asynchronous.
     */
    compare(data: any, encrypted: string, callback: (err: Error, same: boolean) => void, progressCallback?: (percent: number) => void): void;
    compareAsync(data: any, encrypted: string): Promise<boolean>;

    /**
     * Return the number of rounds used to encrypt a given hash
     *
     * @param encrypted Hash from which the number of rounds used should be extracted.
     */
    getRounds(encrypted: string): number;
}
/* tslint:enable */