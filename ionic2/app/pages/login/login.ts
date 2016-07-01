import {Component} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';
import {ControlGroup, Control, Validators} from '@angular/common';
import {TabsPage} from '../tabs/tabs';
import {AuthenticationService} from '../../services/authentication/authentication-service';
import {SignupPage} from '../signup/signup';

@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [],
})
export class LoginPage {
  private loginForm: ControlGroup;
  private email: Control;
  private password: Control;

  ionViewLoaded() {
    this.email = new Control('', Validators.compose([Validators.required]));
    this.password = new Control('', Validators.compose([Validators.required]));
    this.loginForm = new ControlGroup({
      email: this.email,
      password: this.password
    });
  }

  login(value) {
    this.logingIn(this.authService.login(value));
  }

  authenticate(provider: string) {
    this.authService.authenticate(provider).subscribe(
      res => this.nav.setRoot(TabsPage)
      );
  }


  signup() {
    this.nav.push(SignupPage);
  }

  private logingIn(observable) {
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    observable.subscribe(() =>
        loading.dismiss().then(() =>
          this.nav.setRoot(TabsPage)
        )
    );
  }

  constructor(private nav: NavController,
    private authService: AuthenticationService) { }
}
