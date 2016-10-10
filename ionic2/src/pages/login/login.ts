import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {NavController, LoadingController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthenticationService} from '../../services/authentication/authentication-service';
import {Signup} from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  ionViewDidLoad() {
    this.username = this.fb.control('', Validators.compose([Validators.required]));
    this.password = this.fb.control('', Validators.compose([Validators.required]));

    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password
    });
  }

  login(value) {
    this.logingIn(this.authService.login(value));
  }

  authenticate(provider: string) {
    this.logingIn(this.authService.authenticate(provider));
  }


  signup() {
    this.nav.push(Signup);
  }

  private logingIn(observable) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    observable.subscribe(() => this.nav.setRoot(TabsPage), err => console.log(err))
  }

  constructor(private nav: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private fb: FormBuilder) { }

}
