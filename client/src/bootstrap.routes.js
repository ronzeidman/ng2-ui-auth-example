System.register(['@angular/router', './login/login.component', './signup/signup.component', './main/overview.component', './main/main.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, login_component_1, signup_component_1, overview_component_1, main_component_1;
    var CLIENT_ROUTER_PROVIDERS;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (overview_component_1_1) {
                overview_component_1 = overview_component_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            }],
        execute: function() {
            /**
             * Created by Ron on 02/07/2016.
             */
            exports_1("CLIENT_ROUTER_PROVIDERS", CLIENT_ROUTER_PROVIDERS = [
                router_1.provideRouter([
                    { path: '', redirectTo: '/login', pathMatch: 'full' },
                    {
                        path: 'main', component: main_component_1.MainComponent, children: [
                            { path: '', redirectTo: '/main/overview', pathMatch: 'full' },
                            { path: 'overview', component: overview_component_1.OverviewComponent },
                        ] },
                    { path: 'login', component: login_component_1.LoginComponent },
                    { path: 'signup', component: signup_component_1.SignupComponent },
                ])
            ]);
        }
    }
});
//# sourceMappingURL=bootstrap.routes.js.map