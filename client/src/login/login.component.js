System.register(['ng2-ui-auth', '../formComponents/ngMessages', '../formComponents/customValidators', '@angular/router', '@angular/core', '@angular/forms'], function(exports_1, context_1) {
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
    var ng2_ui_auth_1, ngMessages_1, customValidators_1, router_1, core_1, forms_1;
    var LoginComponent;
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
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            /**
             * Created by Ron on 18/12/2015.
             */
            LoginComponent = (function () {
                function LoginComponent(auth, router, element, renderer, fb) {
                    this.auth = auth;
                    this.router = router;
                    this.element = element;
                    this.renderer = renderer;
                    this.fb = fb;
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this.auth.login(this.form.value)
                        .subscribe(function () { return _this.goToMain(); });
                };
                LoginComponent.prototype.authenticate = function (provider) {
                    var _this = this;
                    this.auth.authenticate(provider)
                        .subscribe(function () { return _this.goToMain(); });
                };
                LoginComponent.prototype.goToMain = function () {
                    this.router.navigate(['/main']);
                };
                LoginComponent.prototype.ngAfterContentInit = function () {
                    this.renderer.setElementClass(this.element.nativeElement, 'app', true);
                    if (this.auth.isAuthenticated()) {
                        this.goToMain();
                    }
                };
                LoginComponent.prototype.ngOnInit = function () {
                    this.form = this.fb.group({
                        email: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, customValidators_1.EmailValidator.validate])),
                        password: new forms_1.FormControl('', forms_1.Validators.required)
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'app-login',
                        templateUrl: './src/login/login.component.html',
                        directives: [ngMessages_1.NgMessages, router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, customValidators_1.EmailValidator],
                    }), 
                    __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, router_1.Router, core_1.ElementRef, core_1.Renderer, forms_1.FormBuilder])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map