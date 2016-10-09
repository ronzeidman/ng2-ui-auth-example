import {RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth.guard';
import {MainComponent} from './components/main.component';
import {LoginComponent} from './components/login.component';
import {SignupComponent} from './components/signup.component';
/**
 * Created by Ron on 03/10/2016.
 */
export const CLIENT_ROUTER_PROVIDERS = [
    AuthGuard
];
export const routing = RouterModule.forRoot([
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    }
]);