"use strict";
var Express = require('express');
var httpStatus_1 = require('../httpStatus');
var connect_1 = require('../database/connect');
var errors_1 = require('../database/errors');
var config_1 = require('../config');
var jwt = require('jsonwebtoken');
var bcryptSync = require('bcryptjs');
var _ = require('lodash');
var Promise = require('bluebird');
var rp = require('request-promise');
var tables_1 = require('../database/tables');
var bcrypt = Promise.promisifyAll(bcryptSync);
var r = connect_1.getConnection();
exports.authRoutes = Express.Router()
    .post('/login', login)
    .post('/signup', signup)
    .post('/google', google);
function encrypt(password) {
    return bcrypt.genSaltAsync(config_1.config.SALT_ROUNDS)
        .then(function (salt) { return bcrypt.hashAsync(password, salt); });
}
function sendToken(response, tokenInfo) {
    /* tslint:disable:variable-name */
    var access_token = jwt.sign(tokenInfo, config_1.config.TOKEN_SECRET, { expiresIn: '5h' });
    response.send({ access_token: access_token });
    /* tslint:enable:variable-name */
}
function handleExceptions(response) {
    return function (error) {
        var log = error.stack ? console.log : console.trace;
        if (error instanceof Error) {
            log("Error: " + error.name + " Message: " + error.message);
        }
        log("Unknown error: " + JSON.stringify(error));
        response.sendStatus(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR);
    };
}
function signup(request, response) {
    var signupData = request.body;
    encrypt(signupData.password)
        .then(function (encryptedPassword) {
        return r.branch(tables_1.userTbl().getAll(signupData.email, { index: 'email' }).isEmpty(), tables_1.userTbl().insert({
            email: signupData.email,
            displayName: signupData.email,
            password: encryptedPassword
        }), new errors_1.DBConflictError())
            .run();
    })
        .then(errors_1.throwIfWriteError(true))
        .then(function (writeResult) {
        sendToken(response, {
            userId: writeResult.generated_keys[0],
            displayName: signupData.email,
        });
    })
        .catch(handleExceptions(response));
}
exports.signup = signup;
function login(request, response) {
    var login = request.body;
    var tokenInfo;
    tables_1.userTbl().getAll(login.email, { index: 'email' }).pluck('userId', 'displayName', 'password').run()
        .then(function (tokenInfos) {
        if (tokenInfos.length === 0 || tokenInfos[0].password === undefined) {
            return false;
        }
        var singleTokenInfo = tokenInfos[0];
        tokenInfo = _.omit(singleTokenInfo, 'password');
        return bcrypt.compareAsync(login.password, singleTokenInfo.password);
    })
        .then(function (equal) {
        if (equal) {
            sendToken(response, tokenInfo);
        }
        else {
            response.sendStatus(httpStatus_1.httpStatus.UNAUTHORIZED);
        }
    })
        .catch(handleExceptions(response));
}
exports.login = login;
function google(req, res) {
    var accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token'; //'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config_1.config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    var profile;
    // Step 1. Exchange authorization code for access token.
    rp.post(accessTokenUrl, { json: true, form: params })
        .then(function (tokens) {
        var accessToken = tokens.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };
        // Step 2. Retrieve profile information about the current user.
        return rp.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        });
    })
        .then(function (_profile) {
        profile = _profile;
        if (profile.error) {
            throw profile.error;
        }
        // Step 3a. Link user account.
        if (req.user) {
            var companyUpdater = function (row) {
                return {
                    google: profile.sub,
                    picture: row('picture').default(profile.picture.replace('sz=50', 'sz=200')),
                    displayName: row('displayName').default(profile.name),
                };
            };
            return r.branch(tables_1.userTbl().getAll(profile.sub, { index: 'google' }).isEmpty(), tables_1.userTbl().get(req.user.companyId).update(companyUpdater), new errors_1.DBNotFoundError()).run();
        }
        else {
            // Step 3b. Create a new user account or 3c. return an existing one.
            return r.branch(tables_1.userTbl().getAll(profile.sub, { index: 'google' }).isEmpty(), tables_1.userTbl().insert({
                displayName: profile.name,
                email: profile.email,
                google: profile.sub,
                picture: profile.picture.replace('sz=50', 'sz=200')
            }), //3b. Create a new user account
            tables_1.userTbl().getAll(profile.sub, { index: 'google' }) //3c. return an existing user account.
            ).run();
        }
    })
        .then(errors_1.throwIfWriteError(false, true))
        .then(function (writeResults) {
        var tokenInfo = {};
        if (errors_1.isWriteResult(writeResults)) {
            if (req.user) {
                tokenInfo = req.user;
            }
            else {
                tokenInfo.userId = writeResults.generated_keys[0];
                tokenInfo.displayName = profile.name;
            }
        }
        else {
            tokenInfo.userId = writeResults.userId;
            tokenInfo.displayName = writeResults.displayName;
        }
        sendToken(res, tokenInfo);
    })
        .catch(handleExceptions(res));
}
exports.google = google;
//# sourceMappingURL=auth.js.map