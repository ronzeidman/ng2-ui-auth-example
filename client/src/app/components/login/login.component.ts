import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';

import { FormHelperService } from '../../services/form-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public fh: FormHelperService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login(loginData: { username: string, password: string }) {
    this.auth.login(loginData)
      .subscribe({
        error: (err: any) => alert(err.message),
        complete: () => this.router.navigateByUrl('main')
      });
  }

  loginWithGoogle() {
    this.auth.authenticate('google')
      .subscribe({
        error: (err: any) => alert(err.message),
        complete: () => this.router.navigateByUrl('main')
      });
  }
}
