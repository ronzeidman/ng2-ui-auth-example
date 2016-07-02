System.register(['@angular/router', '@angular/core', 'ng2-ui-auth', '@angular/http'], function(exports_1, context_1) {
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
    var router_1, core_1, ng2_ui_auth_1, http_1;
    var OverviewComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /**
             * Created by Ron on 02/07/2016.
             */
            OverviewComponent = (function () {
                function OverviewComponent(auth, router, jwtHttp, http) {
                    var _this = this;
                    this.auth = auth;
                    this.router = router;
                    this.jwtHttp = jwtHttp;
                    this.http = http;
                    this.helloWorldError = 'sdf';
                    this.helloWorld = jwtHttp.get('/api/helloWorld').map(function (response) { return response.text(); });
                    http.get('/api/helloWorld')
                        .subscribe(function (response) {
                        _this.helloWorldError = response.text();
                    }, function (response) {
                        _this.helloWorldError = response.text();
                    });
                }
                OverviewComponent.prototype.signout = function () {
                    var _this = this;
                    this.auth.logout().subscribe(function () {
                        _this.router.navigate(['/login']);
                    });
                };
                OverviewComponent = __decorate([
                    core_1.Component({
                        selector: 'app-overview',
                        template: '<p>{{helloWorld | async}}</p><p>{{helloWorldError}}</p><button type="button" (click)="signout()">signout</button> ',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, router_1.Router, ng2_ui_auth_1.JwtHttp, http_1.Http])
                ], OverviewComponent);
                return OverviewComponent;
            }());
            exports_1("OverviewComponent", OverviewComponent);
        }
    }
});
//# sourceMappingURL=overview.component.js.map