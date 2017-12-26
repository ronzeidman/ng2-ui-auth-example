import { hashSync } from 'bcrypt';
import { IDBUser } from './interfaces';
import { config } from './config';
/**
 * Created by Ron on 02/10/2016.
 */
let users: IDBUser[] = [{
    username: 'test',
    hash: hashSync('testtest', config.auth.SALT_ROUNDS)
}];

export const dbSaveUser = async (user: IDBUser) => {
    if (users.some(existing => existing.username === user.username)) {
        throw new Error('Username already exists');
    }
    users = [...users, { ...user }];
    return { ...user };
};

export const dbGetUser = async (username: string) => {
    const user = users.find(user => user.username === username);
    return user ? { ...user } : null;
};

export const dbUpdateUser = async (username: string, userUpdate: Partial<IDBUser>) => {
    const existingUser = await dbGetUser(username);
    if (!existingUser) {
        throw new Error('User was not found');
    }
    const user = { ...existingUser, ...userUpdate };
    users = [...users.filter(user => user.username !== username), user];
    return { ...user };
};


export const dbGetUserByField = async (field: keyof IDBUser, value: any) => {
    const user = users.find(existing => existing[field] === value);
    if (!user) {
        throw new Error("User doesn't exists");
    }
    return { ...user };
};

export const dbUserExists = async (field: keyof IDBUser, value: any) => {
    const index = users.findIndex(existing => existing[field] === value);
    return index !== -1;
};