System.register(['es6-shim', 'zone.js/build/lib/browser/zone.js', 'reflect-metadata', './top', 'angular2/bootstrap'], function(exports_1) {
    "use strict";
    var top_1, bootstrap_1;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (top_1_1) {
                top_1 = top_1_1;
            },
            function (bootstrap_1_1) {
                bootstrap_1 = bootstrap_1_1;
            }],
        execute: function() {
            /**
             * Created by ronze on 2/16/2016.
             */
            bootstrap_1.bootstrap(top_1.Top);
        }
    }
});
//# sourceMappingURL=bootstrap.js.map