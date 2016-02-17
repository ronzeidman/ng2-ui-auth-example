"use strict";
var connect_1 = require('./connect');
/**
 * Created by ronze on 2/10/2016.
 */
function userTbl() {
    return connect_1.getConnection().table('user');
}
exports.userTbl = userTbl;
//# sourceMappingURL=tables.js.map