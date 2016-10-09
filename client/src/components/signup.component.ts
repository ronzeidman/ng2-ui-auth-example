import {Router} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {Component, OnInit} from '@angular/core';
import {ErrorHandleService} from '../services/error-handle.service';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {FormHelperService} from '../services/form-helper.service';
/**
 * Created by Ron on 03/10/2016.
 */

@Component({
    selector: 'my-signup',
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService,
                private router: Router,
                private eh: ErrorHandleService,
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
                    {'pass-confirm': true}
            )
        })
    }

    signup(signupData: any) {
        this.auth.signup({
            username: signupData['username'],
            password: signupData['password-group']['password']
        })
            .subscribe({
                next: (response) => this.auth.setToken(response.json().access_token),
                error: (err: any) => this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('main')
            });
    }
}