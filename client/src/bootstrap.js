System.register(['zone.js/dist/zone.js', 'reflect-metadata', './top.component', '@angular/platform-browser-dynamic', './bootstrap.routes', '@angular/http', 'ng2-ui-auth', '@angular/forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var top_component_1, platform_browser_dynamic_1, bootstrap_routes_1, http_1, ng2_ui_auth_1, forms_1;
    var GOOGLE_CLIENT_ID;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (top_component_1_1) {
                top_component_1 = top_component_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (bootstrap_routes_1_1) {
                bootstrap_routes_1 = bootstrap_routes_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_ui_auth_1_1) {
                ng2_ui_auth_1 = ng2_ui_auth_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            /**
             * Created by ronze on 2/16/2016.
             */
            GOOGLE_CLIENT_ID = 'CHANGE_ME';
            platform_browser_dynamic_1.bootstrap(top_component_1.TopComponent, [
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms(),
                bootstrap_routes_1.CLIENT_ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                ng2_ui_auth_1.NG2_UI_AUTH_PROVIDERS({ providers: {
                        google: { clientId: GOOGLE_CLIENT_ID },
                        twitter: {
                            authorizationEndpoint: 'https://api.twitter.com/oauth/authorize' //you don't need to override if you don't want 3 legged authentication
                        }
                    } }),
            ]);
        }
    }
});
//# sourceMappingURL=bootstrap.js.map