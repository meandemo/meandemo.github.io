//
// header-start
//////////////////////////////////////////////////////////////////////////////////
//
// \file      src/app/main.ts
//
// \brief     This file belongs to the ng2 tutorial project
//
// \author    Bernard
//
// \copyright Copyright ng2goodies 2015
//            Distributed under the MIT License
//            See http://opensource.org/licenses/MIT
//
//////////////////////////////////////////////////////////////////////////////////
// header-log
//
// $Author$
// $Date$
// $Revision$
//
//////////////////////////////////////////////////////////////////////////////////
// header-end
//
System.register(['angular2/core', 'angular2/router', './stickydivdemo/stickydivdemo', './sliderdemo/sliderdemo_simple', 'angular2/src/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, stickydivdemo_1, sliderdemo_simple_1, lang_1;
    var HomeCmp, MainCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (stickydivdemo_1_1) {
                stickydivdemo_1 = stickydivdemo_1_1;
            },
            function (sliderdemo_simple_1_1) {
                sliderdemo_simple_1 = sliderdemo_simple_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            HomeCmp = (function () {
                function HomeCmp() {
                    this.mode_str_ = 'production mode';
                    this.is_in_prod_mode_ = true;
                    this.ng2version_ = '2.0.0-beta.0';
                    if (lang_1.assertionsEnabled()) {
                        this.mode_str_ = 'development mode';
                        this.is_in_prod_mode_ = false;
                    }
                }
                HomeCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-home',
                        template: "\n    <div class=\"w3-theme-l3\">\n      <div class=\"w3-container w3-padding\">\n        <h1>Angular2 Demo and Tutorial</h1>\n      </div>\n    </div>\n    <div class=\"w3-text-theme\">\n      <div class=\"w3-container w3-padding\">\n        Two great demos are available:<br>\n        <a [routerLink]=\"['StickyDivDemoCmp']\" >Sticky Div</a><br>\n        <a [routerLink]=\"['SliderDemoSimpleCmp']\" >SVG Based Slider</a><br>\n        <br>\n        <br>\n      </div>\n      <div class=\"w3-container w3-tiny\">\n        Using angular2 version {{ng2version_}} in {{mode_str_}}<br>\n        Page last updated 08-Jan-2016<br>\n        Log log all bugs <a href=\"https://github.com/meandemo/ng2-demo/issues\">here</a><br>\n        (c) <a href=\"http://www.ng2goodies.com\">ng2goodies</a><br>\n      </div>\n    </div>\n   ",
                        directives: [router_1.RouterLink, stickydivdemo_1.StickyDivDemoCmp, sliderdemo_simple_1.SliderDemoSimpleCmp]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeCmp);
                return HomeCmp;
            })();
            MainCmp = (function () {
                function MainCmp() {
                }
                MainCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-main',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.RouterOutlet]
                    }),
                    router_1.RouteConfig([
                        { path: '', component: HomeCmp, name: 'HomeCmp' },
                        { path: 'stickydiv', component: stickydivdemo_1.StickyDivDemoCmp, name: 'StickyDivDemoCmp' },
                        { path: 'svgslider', component: sliderdemo_simple_1.SliderDemoSimpleCmp, name: 'SliderDemoSimpleCmp' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MainCmp);
                return MainCmp;
            })();
            exports_1("MainCmp", MainCmp);
        }
    }
});
