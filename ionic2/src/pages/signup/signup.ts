import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {

  // TODO: Implement this page, Very similar to the login page, just use AuthenticationService.signup
  // TODO: You can also use the 'authenticate' method for fb/google logins.
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

  toLoginPage() {
    this.navCtrl.push(Login)
  }

}
