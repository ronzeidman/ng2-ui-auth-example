"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var compression = require('compression');
var cors = require('cors');
var errorhandler = require('errorhandler');
var expressJwt = require('express-jwt');
var httpStatus_1 = require('./httpStatus');
var auth_1 = require('./routes/auth');
var db = require('./database/create');
var config_1 = require('./config');
/**
 * Created by ronze on 2/3/2016.
 */
exports.app = express();
exports.server = http.createServer(exports.app);
db.create();
var CLIENT_DIR = path.join(__dirname, '..', '..', 'client');
/**
 * Configuration
 */
// all environments
exports.app.set('port', process.env.PORT || 3000);
exports.app.use(cors());
exports.app.use(compression());
exports.app.use(morgan('dev'));
exports.app.use(bodyParser.json({ type: 'text/plain' }));
exports.app.use(bodyParser.json());
// development only
if ('development' === exports.app.get('env')) {
    exports.app.use(errorhandler());
    /* tslint:disable */
    require('longjohn');
}
/**
 * Routes
 */
exports.app.use(express.static(CLIENT_DIR));
exports.app.use('/auth', auth_1.authRoutes);
exports.app.get('/api/helloWorld', expressJwt({ secret: config_1.config.TOKEN_SECRET }), function (req, res) {
    res.send("~~~ Hello " + req.user.displayName + " ~~~");
});
exports.app.get('*', function (req, res) {
    res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});
/**
 * Start Server
 */
exports.server.listen(exports.app.get('port'), function () {
    console.log('Express server listening on port ' + exports.app.get('port'));
});
/*
 * Send back a 500 error
 */
exports.app.use(function (err, req, res, next) {
    if (err.code) {
        switch (err.code) {
            case 'credentials_required':
                res.sendStatus(httpStatus_1.httpStatus.UNAUTHORIZED);
                return;
            default:
                break;
        }
    }
    console.log(err.stack);
    res.sendStatus(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR);
});
//# sourceMappingURL=server.js.map