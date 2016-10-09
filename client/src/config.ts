import {CustomConfig} from 'ng2-ui-auth';
/**
 * Created by Ron on 03/10/2016.
 */
export const GOOGLE_CLIENT_ID = '<replace me>';

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
}