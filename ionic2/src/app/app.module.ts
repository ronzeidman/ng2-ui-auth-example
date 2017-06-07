import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CustomConfig, Ng2UiAuthModule } from 'ng2-ui-auth';
import { CONFIG } from '../config';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';

import { JsonHttpGateway } from '../services/json-http-service';
import { AuthenticationService } from '../services/authentication/authentication-service';
import { AuthenticationApi } from '../services/authentication/authentication-api';

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {
      google: { clientId: CONFIG.GOOGLE_CLIENT_ID },
      facebook: { clientId: CONFIG.FACEBOOK_KEY }
    };
    tokenName = 'accessToken';
    tokenPrefix = '';
    baseUrl = CONFIG.API_ENDPOINT;
}

@NgModule({
  declarations: [
    MyApp,
    Signup,
    Login,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ng2UiAuthModule.forRoot(MyAuthConfig),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Signup,
    Login,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    JsonHttpGateway,
    AuthenticationApi,
    AuthenticationService
  ]
})
export class AppModule {}
