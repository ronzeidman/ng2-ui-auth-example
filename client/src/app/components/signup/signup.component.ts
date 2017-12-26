import { Router } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormHelperService } from "../../services/form-helper.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public fh: FormHelperService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'password-group': new FormGroup(
        {
          'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'confirm-password': new FormControl('')
        },
        (c: FormGroup) =>
          c.value['password'] === c.value['confirm-password'] ?
            null :
            { 'pass-confirm': true }
      )
    });
  }

  signup(signupData: any) {
    this.auth.signup({
      username: signupData['username'],
      password: signupData['password-group']['password']
    })
      .subscribe({
        next: (response) => this.auth.setToken(response.access_token),
        error: (err: any) => alert(err.message),
        complete: () => this.router.navigateByUrl('main')
      });
  }

}
