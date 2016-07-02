System.register(['ng2-ui-auth', '../formComponents/ngMessages', '../formComponents/customValidators', '@angular/core', '@angular/router', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ng2_ui_auth_1, ngMessages_1, customValidators_1, core_1, router_1, forms_1;
    var SignupComponent;
    return {
        setters:[
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (ngMessages_1_1) {
                ngMessages_1 = ngMessages_1_1;
            },
            function (customValidators_1_1) {
                customValidators_1 = customValidators_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(auth, router, element, renderer, fb) {
                    this.auth = auth;
                    this.router = router;
                    this.element = element;
                    this.renderer = renderer;
                    this.fb = fb;
                }
                SignupComponent.prototype.signup = function () {
                    var _this = this;
                    var authInfo = { email: this.form.value.email, password: this.form.value.passwordGroup.password };
                    this.auth.signup(authInfo)
                        .subscribe(function () {
                        _this.auth.login(authInfo)
                            .subscribe(function () {
                            if (_this.auth.isAuthenticated()) {
                                _this.router.navigate(['/main']);
                            }
                        });
                    });
                };
                SignupComponent.prototype.ngAfterContentInit = function () {
                    this.renderer.setElementClass(this.element.nativeElement, 'app', true);
                };
                SignupComponent.prototype.ngOnInit = function () {
                    this.form = this.fb.group({
                        email: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, customValidators_1.EmailValidator.validate])),
                        passwordGroup: new forms_1.FormGroup({
                            password: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(32)])),
                            confirmPassword: new forms_1.FormControl('')
                        }, null, customValidators_1.PasswordMatchValidator.validate)
                    });
                };
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'app-signup',
                        templateUrl: './src/signup/signup.component.html',
                        directives: [ngMessages_1.NgMessages, router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, customValidators_1.EmailValidator, customValidators_1.PasswordMatchValidator],
                    }), 
                    __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, router_1.Router, core_1.ElementRef, core_1.Renderer, forms_1.FormBuilder])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.component.js.map