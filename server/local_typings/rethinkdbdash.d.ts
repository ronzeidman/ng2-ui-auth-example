/* tslint:disable */
declare module "rethinkdb" {
    import * as Promise from 'bluebird';
    interface RRunnable<T> {
        run(cb: (err: Error, result: T|T[]) => void, options?: RunOptions): void;
        run(options?: RunOptions): Promise<T|T[]>;
    }
}
declare module "rethinkdbdash" {
    import {RunOptions, R} from 'rethinkdb';
    module rethinkdbdash {
        interface ConnectionOptions {
            db?: string; //default 'test'
            discovery?: boolean;
            pool?: boolean;
            cursor?: boolean;
            buffer?: number; //default 50
            max?: number; //default 1000
            timeout?: number; //in seconds, default 20
            timeoutError?: number; //default 1000
            timeoutGb?: number; //60601000
            maxExponent?: number; //default 6
            silent?: boolean; //default false
            servers?: {
                host?: string;
                port?: number;
            }[];
            host?: string;
            port?: number;
            optionalRun?: boolean;
            ssl?: boolean; //use net & tls to pipe the connection
            authKey?: string;
        }
    }
    function rethinkdbdash(options: rethinkdbdash.ConnectionOptions): R;

    export = rethinkdbdash;
}
/* tslint:enable */