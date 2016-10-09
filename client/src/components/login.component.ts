import {Router} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {ILoginData} from '../interfaces';
import {Component, OnInit} from '@angular/core';
import {ErrorHandleService} from '../services/error-handle.service';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {FormHelperService} from '../services/form-helper.service';
/**
 * Created by Ron on 03/10/2016.
 */

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private auth: AuthService,
                private router: Router,
                private eh: ErrorHandleService,
                private fb: FormBuilder,
                public fh: FormHelperService) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    login(loginData: ILoginData) {
        this.auth.login(loginData)
            .subscribe({
                error: (err: any) => this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('main')
            });
    }

    loginWithGoogle() {
        this.auth.authenticate('google')
            .subscribe({
                error: (err: any) => this.eh.handleError(err),
                complete: () => this.router.navigateByUrl('main')
            });
    }
}