"use strict";
var rethinkdbdash = require('rethinkdbdash');
var config_1 = require('../config');
/**
 * Created by ronze on 2/10/2016.
 */
var r;
function connect(connectionOptions) {
    if (connectionOptions === void 0) { connectionOptions = config_1.config.rethinkdb; }
    return r = rethinkdbdash(connectionOptions);
}
exports.connect = connect;
function getConnection(connectionOptions) {
    if (connectionOptions === void 0) { connectionOptions = config_1.config.rethinkdb; }
    if (r) {
        return r;
    }
    return connect(connectionOptions);
}
exports.getConnection = getConnection;
//# sourceMappingURL=connect.js.map