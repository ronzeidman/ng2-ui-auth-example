System.register(['angular2/core', 'angular2/router', './login/login', './signup/signup', './main/main', 'ng2-ui-auth', 'angular2/http'], function(exports_1) {
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
    var core_1, router_1, login_1, signup_1, main_1, ng2_ui_auth_1, http_1;
    var GOOGLE_CLIENT_ID, Top;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (signup_1_1) {
                signup_1 = signup_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /**
             * Created by ronze on 2/16/2016.
             */
            GOOGLE_CLIENT_ID = 'my_client_id.apps.googleusercontent.com';
            Top = (function () {
                function Top() {
                }
                Top = __decorate([
                    core_1.Component({
                        selector: 'app-top',
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useFactory: function () { return Top; } }),
                            http_1.HTTP_PROVIDERS,
                            ng2_ui_auth_1.NG2_UI_AUTH_PROVIDERS({ providers: { google: { clientId: GOOGLE_CLIENT_ID } } }),
                        ],
                        template: '<router-outlet></router-outlet>',
                        directives: [login_1.Login, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/main/...', name: 'Main', component: main_1.Main },
                        { path: '/login', name: 'Login', component: login_1.Login, useAsDefault: true },
                        { path: '/signup', name: 'Signup', component: signup_1.Signup },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], Top);
                return Top;
            }());
            exports_1("Top", Top);
        }
    }
});
//# sourceMappingURL=top.js.map