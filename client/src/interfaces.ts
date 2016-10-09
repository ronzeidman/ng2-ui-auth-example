/**
 * Created by Ron on 02/10/2016.
 */
//copied from server-side, should be in a new shared module and imported by both
export interface IGoogleProfile {
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


export interface ILoginData {
    username: string;
    password: string;
}
export interface ISignupData extends ILoginData {
}

export interface ITokenUser {
    username: string;
    displayName?: string;
    picture?: string;
}


export interface IDBUser extends ITokenUser {
    google?: string;
    hash?: string;
}