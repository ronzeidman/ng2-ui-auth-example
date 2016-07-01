import {Component} from '@angular/core';
import {ControlGroup, Control, Validators} from '@angular/common';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthenticationService} from '../../services/authentication/authentication-service';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  directives: [],
})
export class SignupPage {
  private email: Control;
  private signupForm: ControlGroup;
  private password: Control;
  private firstName: Control;
  private lastName: Control;

  ionViewLoaded() {
    this.email = new Control('', Validators.compose([Validators.required]));
    this.password = new Control('', Validators.required);
    this.firstName = new Control('', Validators.required);
    this.lastName = new Control('', Validators.required);

    this.signupForm = new ControlGroup({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }


  signup(value) {
    this.authService.signup(this.signupForm.value).subscribe(
      res => {
        this.nav.setRoot(TabsPage);
      }
    );
  }

  termsOfUse(event) {
    console.log("Open terms page");
  }

  constructor(private nav: NavController,
              private authService: AuthenticationService) {  }
}
