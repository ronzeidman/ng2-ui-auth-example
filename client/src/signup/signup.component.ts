import {Auth} from 'ng2-ui-auth';
import {NgMessages} from '../formComponents/ngMessages';
import {EmailValidator, PasswordMatchValidator} from '../formComponents/customValidators';
import {AfterContentInit, OnInit, Component, ElementRef, Renderer} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Validators, FormControl, FormBuilder, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

/**
 * Created by Ron on 18/12/2015.
 */
export interface ISignup {
    email: string;
    password: string;
}
@Component({
    selector: 'app-signup',
    templateUrl: './src/signup/signup.component.html',
    directives: [NgMessages, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidator, PasswordMatchValidator],
})
export class SignupComponent implements AfterContentInit, OnInit {
    form: FormGroup;
    signup() {
        const authInfo = {email: this.form.value.email, password: this.form.value.passwordGroup.password};
        this.auth.signup(authInfo)
            .subscribe(() => {
                this.auth.login(authInfo)
                    .subscribe(() => {
                        if (this.auth.isAuthenticated()) {
                            this.router.navigate(['/main']);
                        }
                    });
            });
    }
    ngAfterContentInit(): any {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
    }
    ngOnInit() {
        this.form = this.fb.group({
            email: new FormControl('', Validators.compose([Validators.required, EmailValidator.validate])),
            passwordGroup: new FormGroup(
                {
                    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])),
                    confirmPassword: new FormControl('')
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