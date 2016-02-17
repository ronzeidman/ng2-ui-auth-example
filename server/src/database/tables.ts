import {getConnection} from './connect';
export interface IUser {
    userId?: string;
    password?: string;
    google?: string;
    email: string;
    displayName?: string;
    picture?: string;
}
/**
 * Created by ronze on 2/10/2016.
 */
export function userTbl() {
    return getConnection().table<IUser>('user');
}