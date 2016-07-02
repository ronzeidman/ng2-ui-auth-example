import {Auth} from 'ng2-ui-auth';
import {NgMessages} from '../formComponents/ngMessages';
import {EmailValidator} from '../formComponents/customValidators';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Component, Renderer, AfterContentInit, OnInit, ElementRef} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

/**
 * Created by Ron on 18/12/2015.
 */

@Component({
    selector: 'app-login',
    templateUrl: './src/login/login.component.html',
    directives: [NgMessages, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, EmailValidator],
})
export class LoginComponent implements AfterContentInit, OnInit {
    form: FormGroup;

    login() {
        this.auth.login(this.form.value)
            .subscribe(() => this.goToMain());
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(() => this.goToMain());
    }

    goToMain() {
        this.router.navigate(['/main']);
    }

    ngAfterContentInit() {
        this.renderer.setElementClass(this.element.nativeElement, 'app', true);
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: new FormControl('', Validators.compose([Validators.required, EmailValidator.validate])),
            password: new FormControl('', Validators.required)
        });
    }

    constructor(private auth: Auth,
                private router: Router,
                private element: ElementRef,
                private renderer: Renderer,
                private fb: FormBuilder) {
    }
}