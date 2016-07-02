import 'zone.js/dist/zone.js';
import 'reflect-metadata';
import {TopComponent} from './top.component';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {CLIENT_ROUTER_PROVIDERS} from './bootstrap.routes';
import {HTTP_PROVIDERS} from '@angular/http';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
/**
 * Created by ronze on 2/16/2016.
 */
const GOOGLE_CLIENT_ID = 'CHANGE_ME';

bootstrap(TopComponent, [
    disableDeprecatedForms(),
    provideForms(),
    CLIENT_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    NG2_UI_AUTH_PROVIDERS({providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
]);