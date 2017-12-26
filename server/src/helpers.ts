import { Request, Response } from 'express';
import * as joi from 'joi';
import { ValidationError, ValidationOptions } from 'joi';
import * as jwt from 'jsonwebtoken';
import { VerifyOptions } from 'jsonwebtoken';

import { config } from './config';
import { IDBUser, ITokenUser } from './interfaces';

/**
 * Created by Ron on 03/10/2016.
 */

export const toTokenUser = (user: IDBUser) => {
    const tokenUser: ITokenUser = Object.assign({}, user);
    delete (<any>tokenUser).hash;
    return tokenUser;
};

/* express */
export type RequestWithUser = Request & { user: IDBUser };

/* jsonwebtoken */
export const sendTokenAsync = (response: Response, tokenInfo: ITokenUser) => {
    return new Promise((resolve, reject) => {
        jwt.sign(tokenInfo, config.auth.TOKEN_SECRET, { expiresIn: '15m' }, (err, access_token) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(response.send({ access_token }));
        });
    });
};

export const verifyTokenAsync = (token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions) => {
    return new Promise<any>((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, options || {}, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        })
    });
};

/* joi */
export const validateAsync = <T>(value: T, schema: Object, options?: ValidationOptions) => {
    return new Promise<T>((resolve, reject) => {
        joi.validate(value, schema, options || {}, (err, validated) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(validated);
        });
    });
};


export const isValidationError = (err: Error): err is ValidationError => err.name === 'ValidationError';
export const loginValidationSchema = {
    username: joi.string().max(20).min(3).required(),
    password: joi.string().max(50).min(6).required()
};
