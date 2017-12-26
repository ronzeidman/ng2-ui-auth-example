/**
 * Created by Ron on 02/10/2016.
 */

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

export interface IFacebookProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    link: string;
    name: string;
    picture: {
        data: {
            is_silhouette: boolean;
            url: string;
        }
    };
}

export interface ITwitterProfile{
    id: string;
    email: string;
    name: string;
    profile_image_url: string;
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
    facebook?: string;
    twitter?: string;
    hash?: string;
}