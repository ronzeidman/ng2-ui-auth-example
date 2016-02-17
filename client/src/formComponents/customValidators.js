System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var EmailValidator, PasswordMatchValidator, D_VALIDATORS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by Ron on 19/12/2015.
             */
            EmailValidator = (function () {
                function EmailValidator() {
                }
                EmailValidator.validate = function (control) {
                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if (control.value === '' || re.test(control.value)) {
                        return null;
                    }
                    return { email: true };
                };
                EmailValidator.prototype.validate = function (control) {
                    return EmailValidator.validate(control);
                };
                EmailValidator = __decorate([
                    core_1.Directive({
                        selector: '[dEmail]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], EmailValidator);
                return EmailValidator;
            }());
            exports_1("EmailValidator", EmailValidator);
            PasswordMatchValidator = (function () {
                function PasswordMatchValidator() {
                }
                PasswordMatchValidator.validate = function (control) {
                    var firstValue;
                    if (Object.keys(control.controls).every(function (key) {
                        if (firstValue === undefined) {
                            firstValue = control.controls[key].value;
                        }
                        return control.controls[key].value === firstValue;
                    })) {
                        return null;
                    }
                    return { passwordMatch: true };
                };
                PasswordMatchValidator = __decorate([
                    core_1.Directive({
                        selector: '[dPasswordMatch]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], PasswordMatchValidator);
                return PasswordMatchValidator;
            }());
            exports_1("PasswordMatchValidator", PasswordMatchValidator);
            exports_1("D_VALIDATORS", D_VALIDATORS = [EmailValidator]);
        }
    }
});
//# sourceMappingURL=customValidators.js.map