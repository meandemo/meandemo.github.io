System.register(['angular2/platform/browser', 'angular2/router', 'angular2/common', 'angular2/core', 'angular2/http', './http', './main', './sliderdemo/sliderdemo_service', './slider/slider_dyn_service'], function(exports_1) {
    var browser_1, router_1, common_1, core_1, http_1, http_2, main_1, sliderdemo_service_1, slider_dyn_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (sliderdemo_service_1_1) {
                sliderdemo_service_1 = sliderdemo_service_1_1;
            },
            function (slider_dyn_service_1_1) {
                slider_dyn_service_1 = slider_dyn_service_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(main_1.MainCmp, [router_1.ROUTER_PROVIDERS, common_1.FormBuilder,
                http_1.HTTP_PROVIDERS,
                core_1.provide(http_2.CustomHttp, {
                    useFactory: function (http) {
                        return new http_2.CustomHttp(http);
                    },
                    deps: [http_1.Http] }),
                //                    NavBarService, MainRouteService,
                sliderdemo_service_1.SliderDemoService, slider_dyn_service_1.DynSliderService])
                .catch(function (err) {
                console.error(err);
            });
        }
    }
});
