import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2UiAuthModule } from 'ng2-ui-auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormHelperService } from './services/form-helper.service';
import { JsonInterceptorService } from './services/json-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2UiAuthModule.forRoot({
      providers: {
        google: {
          clientId: 'REPLACE ME',
        }
      }
    })
  ],
  providers: [JsonInterceptorService, FormHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
