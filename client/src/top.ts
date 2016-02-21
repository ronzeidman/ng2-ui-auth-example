/**
 * Created by ronze on 2/17/2016.
 */
import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS} from 'angular2/router';
import {Login} from './login/login';
import {Signup} from './signup/signup';
import {Main} from './main/main';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {HTTP_PROVIDERS} from 'angular2/http';
/**
 * Created by ronze on 2/16/2016.
 */
const GOOGLE_CLIENT_ID = 'my_client_id.apps.googleusercontent.com';

@Component({
    selector: 'app-top',
    providers: [
        ROUTER_PROVIDERS,
        provide(ROUTER_PRIMARY_COMPONENT, {useFactory: () => Top}),
        HTTP_PROVIDERS,
        NG2_UI_AUTH_PROVIDERS({providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
    ],
    template: '<router-outlet></router-outlet>',
    directives: [Login, ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/main/...', name: 'Main', component: Main  },
    { path: '/login', name: 'Login', component: Login, useAsDefault: true },
    { path: '/signup', name: 'Signup', component: Signup },
])
export class Top {}