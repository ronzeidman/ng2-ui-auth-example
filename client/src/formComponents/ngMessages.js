System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var NgMessages;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by Ron on 19/12/2015.
             */
            NgMessages = (function () {
                function NgMessages() {
                    this.error = '';
                }
                NgMessages.prototype.ngOnChanges = function (changes) {
                    if (changes.errors.currentValue) {
                        for (var _i = 0, _a = Object.keys(changes.errors.currentValue); _i < _a.length; _i++) {
                            var errorProp = _a[_i];
                            if (changes.errors.currentValue[errorProp]) {
                                this.error = errorProp;
                                break;
                            }
                        }
                    }
                    else {
                        this.error = null;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NgMessages.prototype, "errors", void 0);
                NgMessages = __decorate([
                    core_1.Component({
                        selector: 'ng-messages',
                        template: '<p *ngIf="error" [ngSwitch]="error" class="text-danger help-block">' +
                            '<template ngSwitchCase="required">Required</template>' +
                            '<template ngSwitchCase="email">Invalid email address</template>' +
                            '<template ngSwitchCase="minlength">Too short</template>' +
                            '<template ngSwitchCase="maxlength">Too long</template>' +
                            '<template ngSwitchCase="passwordMatch">Passwords don&apos;t match</template>' +
                            '<template ngSwitchDefault>Validation error</template>' +
                            '</p>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], NgMessages);
                return NgMessages;
            }());
            exports_1("NgMessages", NgMessages);
        }
    }
});
//# sourceMappingURL=ngMessages.js.map