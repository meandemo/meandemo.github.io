System.register(['angular2/core', 'angular2/router', '../lipsum/lipsum', '../slider/slider_dyn', '../sliderdemo/sliderdemo_service', '../slider/slider_dyn_service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, lipsum_1, slider_dyn_1, sliderdemo_service_1, slider_dyn_service_1;
    var SliderDemoDynCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (lipsum_1_1) {
                lipsum_1 = lipsum_1_1;
            },
            function (slider_dyn_1_1) {
                slider_dyn_1 = slider_dyn_1_1;
            },
            function (sliderdemo_service_1_1) {
                sliderdemo_service_1 = sliderdemo_service_1_1;
            },
            function (slider_dyn_service_1_1) {
                slider_dyn_service_1 = slider_dyn_service_1_1;
            }],
        execute: function() {
            // Dynamic Slider Demo 
            SliderDemoDynCmp = (function () {
                function SliderDemoDynCmp(location_, dyn_slider_service_, slider_demo_service_) {
                    //this.form_ctrl_ = this.fb_.group({
                    //  hex_string: [ '', (c: Control): {[key: string]: any} => { return this.hex_string_validator(c); } ]
                    //});
                    this.location_ = location_;
                    this.dyn_slider_service_ = dyn_slider_service_;
                    this.slider_demo_service_ = slider_demo_service_;
                    this.length_ = 600;
                    //console.log('DEBUG: hex_str = ', this.hex_str_);
                }
                SliderDemoDynCmp.prototype.routerOnActivate = function (next, prev) {
                    //console.log('Activate:   navigating from ', prev);
                    //console.log('            navigating to ', next);
                    //console.log('            router state', this.location_);
                    //console.log('            router url() ', this.location_.normalize());
                    if (prev === null) {
                        //console.log('[DEBUG] Navigating to ', next);
                        //console.log('[DEBUG] Location is ', this.location_);
                        //console.log('[DEBUG] Hum! navigation to ', window.location.pathname, ' without navigate() or routerLink');
                        // need to notify the side navigation panel that we are on page 1
                        this.slider_demo_service_.emit(3);
                    }
                };
                SliderDemoDynCmp.prototype.click_delete_runner = function (runner) {
                    //console.log('[TRACE] Requesting delete of runner ', runner);
                    var evt_data = { 'del': true, 'runner': runner };
                    this.dyn_slider_service_.emit(evt_data);
                };
                SliderDemoDynCmp.prototype.click_add_runner = function () {
                    //console.log('[TRACE] Requesting addition of a runner');
                    var evt_data = { 'add': true };
                    this.dyn_slider_service_.emit(evt_data);
                };
                SliderDemoDynCmp.prototype.runner_pos_change = function (runner, evt) {
                    var val = evt.target.valueAsNumber;
                    //console.log('[TRACE] Runner[', runner, '] has changed to', val);
                    var evt_data = { 'runner': runner, 'val': val };
                    this.dyn_slider_service_.emit(evt_data);
                };
                SliderDemoDynCmp.prototype.routerOnDeactivate = function (next, prev) {
                    //console.log('Deactivate: navigating from ', prev);
                    //console.log('            navigating to ', next);
                };
                SliderDemoDynCmp.prototype.ngAfterViewInit = function () {
                    // rfu
                };
                SliderDemoDynCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-demo-dyn',
                        templateUrl: 'app/sliderdemo/sliderdemo_dyn.html',
                        //events: ['colorChange'],
                        directives: [lipsum_1.LipsumCmp, slider_dyn_1.SvgSliderDynCmp]
                    }),
                    __param(2, core_1.Inject(core_1.forwardRef(function () { return sliderdemo_service_1.SliderDemoService; }))), 
                    __metadata('design:paramtypes', [router_1.Location, slider_dyn_service_1.DynSliderService, sliderdemo_service_1.SliderDemoService])
                ], SliderDemoDynCmp);
                return SliderDemoDynCmp;
            })();
            exports_1("SliderDemoDynCmp", SliderDemoDynCmp);
        }
    }
});
