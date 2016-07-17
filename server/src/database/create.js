"use strict";
var config_1 = require('../config');
var connect_1 = require('./connect');
function create(connectionOptions) {
    if (connectionOptions === void 0) { connectionOptions = config_1.config.rethinkdb; }
    var r = connect_1.connect(connectionOptions);
    var db = r.db(connectionOptions.db);
    function ifExistRemove(message, func) {
        return function (exists) {
            if (exists) {
                return func.run()
                    .then(function () { return console.log(message + " removed"); });
            }
            console.log(message + " doesn't exist");
        };
    }
    function ifNotExistCreate(message, func) {
        return function (exists) {
            if (!exists) {
                return func.run()
                    .then(function () { return console.log(message + " created"); });
            }
            console.log(message + " already exists");
        };
    }
    function addTable(tableName, options) {
        if (options === void 0) { options = {}; }
        return function () { return db.tableList().contains(tableName).run()
            .then(ifNotExistCreate("Table '" + tableName + "'", db.tableCreate(tableName, options)))
            .then(function () { return tableName; })
            .catch(function (err) {
            console.log(err.message);
            return tableName;
        }); };
    }
    function addIndex(indexName, indexingFunction, options) {
        return function (tableName) { return db.table(tableName).indexList().contains(indexName).run()
            .then(ifNotExistCreate("Index '" + indexName + "'", !indexingFunction ?
            db.table(tableName).indexCreate(indexName) :
            !options ?
                db.table(tableName).indexCreate(indexName, indexingFunction) :
                db.table(tableName).indexCreate(indexName, indexingFunction, options)))
            .then(function () { return tableName; }); };
    }
    return r.dbList().contains(connectionOptions.db).run()
        .then(ifExistRemove("Database '" + connectionOptions.db + "'", r.dbDrop(connectionOptions.db)))
        .then(function () { return r.dbList().contains(connectionOptions.db).run(); })
        .then(ifNotExistCreate("Database '" + connectionOptions.db + "'", r.dbCreate(connectionOptions.db)))
        .then(addTable('user', { primaryKey: 'userId' }))
        .then(addIndex('email'))
        .then(addIndex('google'))
        .then(addIndex('twitter'));
}
exports.create = create;
//# sourceMappingURL=create.js.map