import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2UiAuthModule} from 'ng2-ui-auth';
import {HttpModule} from '@angular/http';
import {MyAuthConfig} from './config';
import {routing, CLIENT_ROUTER_PROVIDERS} from './client.routes';
import {ClientComponent} from './client.component';
import {MainComponent} from './components/main.component';
import {LoginComponent} from './components/login.component';
import {SignupComponent} from './components/signup.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr';
import {ErrorHandleService} from './services/error-handle.service';
import {FormHelperService} from './services/form-helper.service';
/**
 * Created by Ron on 03/10/2016.
 */

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        Ng2UiAuthModule.getWithConfig(MyAuthConfig),
        ToastModule
    ],
    providers: [
        ErrorHandleService,
        FormHelperService,
        CLIENT_ROUTER_PROVIDERS
    ],
    declarations: [
        ClientComponent,
        MainComponent,
        LoginComponent,
        SignupComponent
    ],
    bootstrap: [
        ClientComponent
    ]
})
export class ClientModule {
}
