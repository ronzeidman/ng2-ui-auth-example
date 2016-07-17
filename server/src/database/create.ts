/**
 * Created by ronze on 2/10/2016.
 */
import {ConnectionOptions} from 'rethinkdbdash';
import {TableCreateOptions, RRunnable, MappingFunction, IndexOptions, RStream} from 'rethinkdb';
import {config} from '../config';
import {connect} from './connect';
export function create(connectionOptions: ConnectionOptions = config.rethinkdb) {
    const r = connect(connectionOptions);
    const db = r.db(connectionOptions.db);

    function ifExistRemove(message: string, func: RRunnable<any>) {
        return (exists: boolean) => {
            if (exists) {
                return func.run()
                    .then(() => console.log(`${message} removed`));
            }
            console.log(`${message} doesn't exist`);
        };
    }

    function ifNotExistCreate(message: string, func: RRunnable<any>) {
        return (exists: boolean) => {
            if (!exists) {
                return func.run()
                    .then(() => console.log(`${message} created`));
            }
            console.log(`${message} already exists`);
        };
    }

    function addTable(tableName: string, options: TableCreateOptions = {}) {
        return () => db.tableList().contains(tableName).run()
            .then(ifNotExistCreate(`Table '${tableName}'`, db.tableCreate(tableName, options)))
            .then(() => tableName)
            .catch(err => {
                console.log(err.message);
                return tableName;
            });
    }

    function addIndex(indexName: string, indexingFunction?: MappingFunction<any>|RStream<any>|Array<RStream<any>>, options?: IndexOptions) {
        return (tableName: string) => db.table(tableName).indexList().contains(indexName).run()
            .then(ifNotExistCreate(
                `Index '${indexName}'`,
                !indexingFunction ?
                    db.table(tableName).indexCreate(indexName) :
                    !options ?
                        db.table(tableName).indexCreate(indexName, indexingFunction) :
                        db.table(tableName).indexCreate(indexName, indexingFunction, options)))
            .then(() => tableName);
    }


    return r.dbList().contains(connectionOptions.db).run()
        .then(ifExistRemove(`Database '${connectionOptions.db}'`, r.dbDrop(connectionOptions.db)))
        .then(() => r.dbList().contains(connectionOptions.db).run())
        .then(ifNotExistCreate(`Database '${connectionOptions.db}'`, r.dbCreate(connectionOptions.db)))
        .then(addTable('user', {primaryKey: 'userId'}))
        .then(addIndex('email'))
        .then(addIndex('google'))
        .then(addIndex('twitter'))
}