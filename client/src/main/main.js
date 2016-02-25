System.register(['angular2/core', 'angular2/router', 'ng2-ui-auth', 'angular2/http'], function(exports_1) {
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
    var core_1, router_1, ng2_ui_auth_1, http_1;
    var Overview, Main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /**
             * Created by ronze on 2/17/2016.
             */
            Overview = (function () {
                function Overview(auth, router, jwtHttp, http) {
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
                Overview.prototype.signout = function () {
                    var _this = this;
                    this.auth.logout().subscribe(function () {
                        _this.router.navigate(['/Login']);
                    });
                };
                Overview = __decorate([
                    core_1.Component({
                        selector: 'app-overview',
                        template: '<p>{{helloWorld | async}}</p><p>{{helloWorldError}}</p><button type="button" (click)="signout()">signout</button> ',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, router_1.Router, ng2_ui_auth_1.JwtHttp, http_1.Http])
                ], Overview);
                return Overview;
            }());
            Main = (function () {
                function Main() {
                }
                Main = __decorate([
                    core_1.Component({
                        selector: 'app-main',
                        template: '<router-outlet></router-outlet>',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: 'overview', name: 'Overview', component: Overview, useAsDefault: true },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], Main);
                return Main;
            }());
            exports_1("Main", Main);
        }
    }
});
//# sourceMappingURL=main.js.map