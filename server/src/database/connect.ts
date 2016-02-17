import * as rethinkdbdash from 'rethinkdbdash';
import {ConnectionOptions} from 'rethinkdbdash';
import {config} from '../config';
import {R} from 'rethinkdb';
/**
 * Created by ronze on 2/10/2016.
 */
let r: R;
export function connect(connectionOptions: ConnectionOptions = config.rethinkdb) {
    return r = rethinkdbdash(connectionOptions);
}
export function getConnection(connectionOptions: ConnectionOptions = config.rethinkdb) {
    if (r) {
        return r;
    }
    return connect(connectionOptions);
}

