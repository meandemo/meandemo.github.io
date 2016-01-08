System.register(['angular2/platform/browser', 'angular2/router', 'angular2/core', './main', './sliderdemo/sliderdemo_service'], function(exports_1) {
    var browser_1, router_1, core_1, main_1, sliderdemo_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (sliderdemo_service_1_1) {
                sliderdemo_service_1 = sliderdemo_service_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(main_1.MainCmp, [router_1.ROUTER_PROVIDERS, sliderdemo_service_1.SliderDemoService])
                .catch(function (err) {
                console.error(err);
            });
        }
    }
});
