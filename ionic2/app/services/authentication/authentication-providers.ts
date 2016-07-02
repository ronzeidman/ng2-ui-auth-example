import {AuthenticationApi} from './authentication-api';
import {AuthenticationService} from './authentication-service';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {CONFIG} from '../../config';

export const AUTHENTICATION_HTTP_PROVIDER = [
  NG2_UI_AUTH_PROVIDERS({
    defaultHeaders: { 'Content-Type': 'application/json' },
    providers: {
      google: { clientId: CONFIG.GOOGLE_CLIENT_ID },
      facebook: { clientId: CONFIG.FACEBOOK_KEY }
    },
    tokenName: 'accessToken',
    tokenPrefix: '',
    baseUrl: CONFIG.API_ENDPOINT,
  }),
  AuthenticationApi,
  AuthenticationService,
];
