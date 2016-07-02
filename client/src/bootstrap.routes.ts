import {provideRouter} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {OverviewComponent} from './main/overview.component';
import {MainComponent} from './main/main.component';
/**
 * Created by Ron on 02/07/2016.
 */
export const CLIENT_ROUTER_PROVIDERS = [
    provideRouter([
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        {
            path: 'main', component: MainComponent, children: [
            {path: '', redirectTo: '/main/overview', pathMatch: 'full'},
            {path: 'overview', component: OverviewComponent},
        ]},
        {path: 'login', component: LoginComponent},
        {path: 'signup', component: SignupComponent},
    ])
];