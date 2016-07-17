import * as Express from 'express';
import {Request, Response} from 'express';
import {httpStatus} from '../httpStatus';
import {getConnection} from '../database/connect';
import {
    DBConflictError,
    throwIfWriteError,
    DBNotFoundError,
    isWriteResult
} from '../database/errors';
import {WriteResult} from 'rethinkdb';
import {config} from '../config';
import {bcryptjsAsync} from '../../local_typings/bcryptjsAsync';
import * as jwt from 'jsonwebtoken';
import * as bcryptSync from 'bcryptjs';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as rp from 'request-promise';
import * as qs from 'querystring';
import {userTbl, IUser} from '../database/tables';
import {RStream} from "rethinkdb";
const bcrypt = <bcryptjsAsync>Promise.promisifyAll(bcryptSync);
const r = getConnection();
/**
 * Created by ronze on 2/7/2016.
 */

export interface ITokenInfo {
    userId: string;
    displayName: string;
}

export interface ISignup {
    email: string;
    password: string;
}

export const authRoutes = Express.Router()
    .post('/login', login)
    .post('/signup', signup)
    .post('/google', google)
    .post('/twitter', twitter);

function encrypt(password: string): Promise<string> {
    return bcrypt.genSaltAsync(config.SALT_ROUNDS)
        .then((salt) => bcrypt.hashAsync(password, salt));
}

function sendToken(response: Response, tokenInfo: ITokenInfo) {
    /* tslint:disable:variable-name */
    const access_token = jwt.sign(
        tokenInfo,
        config.TOKEN_SECRET,
        {expiresIn: '5h'}
    );
    response.send({access_token});
    /* tslint:enable:variable-name */
}

function handleExceptions(response: Response) {
    return (error: any) => {
        const log = error.stack ? console.log : console.trace;
        if (error instanceof Error) {
            log(`Error: ${error.name} Message: ${error.message}`);
        }
        log(`Unknown error: ${JSON.stringify(error)}`);
        response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export function signup(request: Request, response: Response) {
    let signupData: ISignup = request.body;
    encrypt(signupData.password)
        .then((encryptedPassword) => {
            return r.branch(
                userTbl().getAll(signupData.email, {index: 'email'}).isEmpty(),
                userTbl().insert({
                    email: signupData.email,
                    displayName: signupData.email,
                    password: encryptedPassword
                }),
                new DBConflictError()
                )
                .run();
        })
        .then(throwIfWriteError(true))
        .then((writeResult: WriteResult<any>) => {
            sendToken(response, {
                userId: writeResult.generated_keys[0],
                displayName: signupData.email,
            });
        })
        .catch(handleExceptions(response));
}

export function login(request: Request, response: Response) {
    let login: ISignup = request.body;
    let tokenInfo: ITokenInfo;
    userTbl().getAll(login.email, {index: 'email'}).pluck('userId', 'displayName', 'password').run()
        .then((tokenInfos: IUser[]) => {
            if (tokenInfos.length === 0 || tokenInfos[0].password === undefined) {
                return false;
            }
            const singleTokenInfo = tokenInfos[0];
            tokenInfo = _.omit<ITokenInfo, any>(singleTokenInfo, 'password');
            return bcrypt.compareAsync(login.password, singleTokenInfo.password);
        })
        .then((equal) => {
            if (equal) {
                sendToken(response, tokenInfo);
            } else {
                response.sendStatus(httpStatus.UNAUTHORIZED);
            }
        })
        .catch(handleExceptions(response));
}
interface IGoogleProfile {
    kind: "plus#personOpenIdConnect";
    gender: string;
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    profile: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
    hd: string;
    error?: Error;
}
export function google(req: Request, res: Response) {
    const accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token'; //'https://accounts.google.com/o/oauth2/token';
    const peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    let profile: IGoogleProfile;
    // Step 1. Exchange authorization code for access token.
    rp.post(accessTokenUrl, {json: true, form: params})
        .then((tokens: { access_token: string }) => {
            let accessToken = tokens.access_token;
            let headers = {Authorization: 'Bearer ' + accessToken};

            // Step 2. Retrieve profile information about the current user.
            return rp.get({
                url: peopleApiUrl,
                headers: headers,
                json: true
            });
        })
        .then((_profile: IGoogleProfile) => {
            profile = _profile;
            if (profile.error) {
                throw profile.error;
            }
            // Step 3a. Link user account.
            if (req.user) {
                const userUpdater = (row: RStream<IUser>) => {
                    return {
                        google: profile.sub,
                        picture: row('picture').default(profile.picture.replace('sz=50', 'sz=200')),
                        displayName: row('displayName').default(profile.name),
                    }
                };
                return r.branch(
                    userTbl().getAll(profile.sub, {index: 'google'}).isEmpty(),
                    userTbl().get(req.user.usreId).update(userUpdater, {returnChanges: true}),
                    new DBNotFoundError()
                ).run();
            } else {
                // Step 3b. Create a new user account or 3c. return an existing one.
                return r.branch(
                    userTbl().getAll(profile.sub, {index: 'google'}).isEmpty(),
                    userTbl().insert({
                        displayName: profile.name,
                        email: profile.email,
                        google: profile.sub,
                        picture: profile.picture.replace('sz=50', 'sz=200')
                    }, {returnChanges: true}), //3b. Create a new user account
                    userTbl().getAll(profile.sub, {index: 'google'}) //3c. return an existing user account.
                ).run();
            }
        })
        .then(throwIfWriteError(false, true))
        .then(handleAuthenticationComplete(req, res))
        .catch(handleExceptions(res));
}

interface ITwitterProfile {
    id: string;
    name: string;
    profile_image_url: string;
}
export function twitter(req: Request, res: Response) { // 3 legged auth example
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

    // Part 1 of 2: Initial request from Satellizer.
    if (!req.body.oauth_token || !req.body.oauth_verifier) {
        const requestTokenOauth = {
            consumer_key: config.TWITTER_API_KEY,
            consumer_secret: config.TWITTER_SECRET,
            callback: req.body.redirectUri
        };

        // Step 1. Obtain request token for the authorization popup.
        rp.post({ url: requestTokenUrl, oauth: requestTokenOauth, json: true })
            .then((body: string) => {
                // Step 2. Send OAuth token back to open the authorization screen.
                res.send({ oauth_token: qs.parse(body).oauth_token });
            })
            .catch(handleExceptions(res));
    } else {
        // Part 2 of 2: Second request after Authorize app is clicked.
        const accessTokenOauth = {
            consumer_key: config.TWITTER_API_KEY,
            consumer_secret: config.TWITTER_SECRET,
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        };
        let oauth_token_secret: string;

        // Step 3. Exchange oauth token and oauth verifier for access token.
        rp.post({ url: accessTokenUrl, oauth: accessTokenOauth })
            .then((body: string) => {
                const parsed: {
                    oauth_token: string,
                    oauth_token_secret: string,
                    screen_name: string,
                    user_id: string
                } = qs.parse(body);

                const profileOauth = {
                    consumer_key: config.TWITTER_API_KEY,
                    consumer_secret: config.TWITTER_SECRET,
                    oauth_token: parsed.oauth_token
                };

                oauth_token_secret = parsed.oauth_token_secret;
                // Step 4. Retrieve profile information about the current user.
                return rp.get({
                    url: profileUrl + parsed.screen_name,
                    oauth: profileOauth,
                    json: true
                });
            })
            .then((profile: ITwitterProfile) => {
                // Step 5a. Link user accounts.
                if (req.user) {
                    const userUpdater = (row: RStream<IUser>) => {
                        return {
                            twitter: profile.id,
                            picture: row('picture').default(profile.profile_image_url.replace('_normal', '')),
                            displayName: row('displayName').default(profile.name),
                        }
                    };
                    return r.branch(
                        userTbl().getAll(profile.id, {index: 'twitter'}).isEmpty(),
                        userTbl().get(req.user.userId).update(userUpdater, {returnChanges: true}),
                        new DBNotFoundError()
                    ).run();
                } else {
                    // Step 5b. Create a new user account or 5c. return an existing one.
                    return r.branch(
                        userTbl().getAll(profile.id, {index: 'twitter'}).isEmpty(),
                        userTbl().insert({
                            displayName: profile.name,
                            twitter: profile.id,
                            picture: profile.profile_image_url.replace('_normal', '')
                        }, {returnChanges: true}), //5b. Create a new user account
                        userTbl().getAll(profile.id, {index: 'twitter'}) //5c. return an existing user account.
                    ).run();
                }
            })
            .then(throwIfWriteError(false, true))
            .then(handleAuthenticationComplete(req, res))
            .catch(handleExceptions(res));
        }
}

function handleAuthenticationComplete(req: Request, res: Response) {
    return (writeResultsOrUsers: WriteResult<any>|IUser[]) => {
        let tokenInfo: ITokenInfo = <any>{};
        if (isWriteResult(writeResultsOrUsers)) {
            const writeResults: WriteResult<any> = writeResultsOrUsers;
            if (req.user) { //Link user account
                tokenInfo = req.user;
            } else { //Create a new user account
                tokenInfo.userId = writeResults.generated_keys[0];
                tokenInfo.displayName = writeResults.changes[0].new_val.displayName;
            }
        } else { //return an existing user account.
            const users: IUser[] = writeResultsOrUsers;
            tokenInfo.userId = users[0].userId;
            tokenInfo.displayName = users[0].displayName;
        }
        sendToken(res, tokenInfo);
    }
}
