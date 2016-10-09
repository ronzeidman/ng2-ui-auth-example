import {IDBUser} from './interfaces';
/**
 * Created by Ron on 02/10/2016.
 */
const users = new Map<string, IDBUser>();
const googleToUsername = new Map<string, string>();

export const dbSaveUser = async (user: IDBUser) => {
    if (users.has(user.username)) {
        throw new Error('Username already exists');
    }
    users.set(user.username, Object.assign({}, user));
    if (user.google) {
        googleToUsername.set(user.google, user.username);
    }
    return Object.assign({}, user);
};

export const dbGetUser = async (username: string) => {
    const user = users.get(username);
    if (!user) {
        return null;
    }
    return Object.assign({}, user);
};

//todo see https://github.com/Microsoft/TypeScript/issues/11233
export const dbUpdateUser = async (username: string, userUpdate: any /* subset IDBUser */) => {
    const user = await dbGetUser(username);
    if (!user) {
        throw new Error('User was not found');
    }
    Object.assign(user, userUpdate);
    users.set(user.username, user);
    if (user.google) {
        googleToUsername.set(user.google, user.username);
    }
    return user;
};


export const dbGetUserByGoogle = async (google: string) => {
    const username = googleToUsername.get(google);
    if (!username) {
        throw new Error("User doesn't exists");
    }
    const user = users.get(username);
    if (!user) {
        throw new Error("User doesn't exists");
    }
    return Object.assign({}, user);
};

export const dbGoogleIdExists = async (google: string) => {
    return googleToUsername.has(google);
};