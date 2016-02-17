import {Component, ElementRef, Renderer, AfterContentInit, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Auth} from 'ng2-ui-auth';
import {NgMessages} from '../formComponents/ngMessages';
import {EmailValidator} from '../formComponents/customValidators';
import {PasswordMatchValidator} from '../formComponents/customValidators';

/**
 * Created by Ron on 18/12/2015.
 */
export interface ISignup {
    email: string;
    password: string;
}
@Component({
    selector: 'app-signup',
    templateUrl: './src/signup/signup.html',
    directives: [NgMessages, ROUTER_DIRECTIVES, FORM_DIRECTIVES, EmailValidator, PasswordMatchValidator],
})
export class Signup implements AfterContentInit, OnInit {
    user: any = {};
    form: ControlGroup;
    signup() {
        this.auth.signup({email: this.user.email, password: this.user.password})
            .subscribe(() => {
                this.auth.login({email: this.user.email, password: this.user.password})
                    .subscribe(() => {
                        if (this.auth.isAuthenticated()) {
                            this.router.navigate(['Main']);
                        }
                    });
            });
    }
    ngAfterContentInit(): any {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
    }
    ngOnInit() {
        this.form = this.fb.group({
            displayName: new Control('', Validators.compose([Validators.required, Validators.maxLength(32)])),
            email: new Control('', Validators.compose([Validators.required, EmailValidator.validate])),
            passwordGroup: new ControlGroup(
                {
                    password: new Control('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])),
                    confirmPassword: new Control('')
                },
                null,
                PasswordMatchValidator.validate
            )
        });
    }
    constructor(private auth: Auth,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {

    }
}