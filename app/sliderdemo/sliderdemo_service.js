System.register(['angular2/core', '../sliderdemo/sliderdemo_simple', '../sliderdemo/sliderdemo_rgb', '../sliderdemo/sliderdemo_dyn', '../sliderdemo/sliderdemo_gradient', '../sliderdemo/sliderdemo_rfu'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1, sliderdemo_simple_1, sliderdemo_rgb_1, sliderdemo_dyn_1, sliderdemo_gradient_1, sliderdemo_rfu_1;
    var views_, SliderDemoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sliderdemo_simple_1_1) {
                sliderdemo_simple_1 = sliderdemo_simple_1_1;
            },
            function (sliderdemo_rgb_1_1) {
                sliderdemo_rgb_1 = sliderdemo_rgb_1_1;
            },
            function (sliderdemo_dyn_1_1) {
                sliderdemo_dyn_1 = sliderdemo_dyn_1_1;
            },
            function (sliderdemo_gradient_1_1) {
                sliderdemo_gradient_1 = sliderdemo_gradient_1_1;
            },
            function (sliderdemo_rfu_1_1) {
                sliderdemo_rfu_1 = sliderdemo_rfu_1_1;
            }],
        execute: function() {
            views_ = [
                {
                    component: sliderdemo_simple_1.SliderDemoSimpleCmp,
                    name: 'SliderDemoSimpleCmp',
                    pathName: 'simpleslider',
                    linkName: 'Simple Sliders',
                    linkIndex: 1
                },
                {
                    component: sliderdemo_rgb_1.SliderDemoRgbCmp,
                    name: 'SliderDemoRgbCmp',
                    pathName: 'rgbslider',
                    linkName: 'Rgb Sliders',
                    linkIndex: 2
                },
                {
                    component: sliderdemo_dyn_1.SliderDemoDynCmp,
                    name: 'SliderDemoDynCmp',
                    pathName: 'dynslider',
                    linkName: 'Dynamic Sliders',
                    linkIndex: 3
                },
                {
                    component: sliderdemo_gradient_1.SliderDemoGradientCmp,
                    name: 'SliderDemoGradientCmp',
                    pathName: 'gradientlider',
                    linkName: 'Gradient with Sliders',
                    linkIndex: 4
                },
                {
                    component: sliderdemo_rfu_1.Slider001Cmp,
                    name: 'Slider001Cmp',
                    pathName: 'multisliders',
                    linkName: 'RFU Multiple Sliders',
                    linkIndex: 5
                },
                {
                    component: sliderdemo_rfu_1.Slider002Cmp,
                    name: 'Slider002Cmp',
                    pathName: 'verticalslider',
                    linkName: 'RFU Vertical Sliders',
                    linkIndex: 6
                },
                {
                    component: sliderdemo_rfu_1.Slider003Cmp,
                    name: 'Slider003Cmp',
                    pathName: 'linkedslider',
                    linkName: 'RFU Linked Sliders',
                    linkIndex: 7
                }
            ];
            SliderDemoService = (function (_super) {
                __extends(SliderDemoService, _super);
                function SliderDemoService() {
                    _super.apply(this, arguments);
                }
                SliderDemoService.get_static_routes = function (prefix) {
                    var res = [];
                    views_.forEach(function (elm) {
                        res.push({ path: (prefix + elm.pathName), component: elm.component, name: elm.name });
                    });
                    return res;
                };
                // get_link() return is an array like this
                // ['Slider000']
                // which is used by the service client
                // to navigate to a selected route: i.e:
                // this.router_.navigate(this.dashboard_.get_link(idx));
                SliderDemoService.prototype.get_link = function (idx) {
                    return [views_[idx].name];
                };
                // get_router_config() returns an array of RouteDefinition
                // {path: 'verticalslider', component: VerticalSliderCmp, name: 'VerticalSliderCmp'}
                // which is used by the client to initialize the routes: i.e
                // constructor(private slider_service_: SliderService,
                //             private router_: Router) {
                //   router_.config(dashboard_.get_router_config());
                //   ...
                // }
                // prefix is either '' or 'parent/'
                SliderDemoService.prototype.get_routes = function (prefix) {
                    var res = [];
                    views_.forEach(function (elm) {
                        res.push({ path: (prefix + elm.pathName), component: elm.component, name: elm.name });
                    });
                    return res;
                };
                // get_link_config() returns an array to be used in <a> directives:
                // <a [routerLink]="_elm.linkRef">{{elm.linkName}}</a>
                //
                SliderDemoService.prototype.get_link_config = function () {
                    var res = [];
                    views_.forEach(function (elm) {
                        res.push({ linkRef: [elm.name], idx: elm.linkIndex, linkName: elm.linkIndex + "   " + elm.linkName });
                    });
                    return res;
                };
                SliderDemoService.prototype.total_views = function () {
                    return views_.length;
                };
                return SliderDemoService;
            })(core_1.EventEmitter);
            exports_1("SliderDemoService", SliderDemoService);
        }
    }
});
