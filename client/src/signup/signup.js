System.register(['angular2/core', 'angular2/common', 'angular2/router', 'ng2-ui-auth', '../formComponents/ngMessages', '../formComponents/customValidators'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, ng2_ui_auth_1, ngMessages_1, customValidators_1, customValidators_2;
    var Signup;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (ngMessages_1_1) {
                ngMessages_1 = ngMessages_1_1;
            },
            function (customValidators_1_1) {
                customValidators_1 = customValidators_1_1;
                customValidators_2 = customValidators_1_1;
            }],
        execute: function() {
            Signup = (function () {
                function Signup(auth, router, element, renderer, fb) {
                    this.auth = auth;
                    this.router = router;
                    this.element = element;
                    this.renderer = renderer;
                    this.fb = fb;
                    this.user = {};
                }
                Signup.prototype.signup = function () {
                    var _this = this;
                    this.auth.signup({ email: this.user.email, password: this.user.password })
                        .subscribe(function () {
                        _this.auth.login({ email: _this.user.email, password: _this.user.password })
                            .subscribe(function () {
                            if (_this.auth.isAuthenticated()) {
                                _this.router.navigate(['Main']);
                            }
                        });
                    });
                };
                Signup.prototype.ngAfterContentInit = function () {
                    this.renderer.setElementClass(this.element.nativeElement, 'app', true);
                };
                Signup.prototype.ngOnInit = function () {
                    this.form = this.fb.group({
                        displayName: new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.maxLength(32)])),
                        email: new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, customValidators_1.EmailValidator.validate])),
                        passwordGroup: new common_1.ControlGroup({
                            password: new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(6), common_1.Validators.maxLength(32)])),
                            confirmPassword: new common_1.Control('')
                        }, null, customValidators_2.PasswordMatchValidator.validate)
                    });
                };
                Signup = __decorate([
                    core_1.Component({
                        selector: 'app-signup',
                        templateUrl: './src/signup/signup.html',
                        directives: [ngMessages_1.NgMessages, router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, customValidators_1.EmailValidator, customValidators_2.PasswordMatchValidator],
                    }), 
                    __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, router_1.Router, core_1.ElementRef, core_1.Renderer, common_1.FormBuilder])
                ], Signup);
                return Signup;
            }());
            exports_1("Signup", Signup);
        }
    }
});
//# sourceMappingURL=signup.js.map