System.register(['angular2/core', 'angular2/common', 'angular2/router', '../lipsum/lipsum', '../slider/slider_rgb', '../sliderdemo/sliderdemo_service', '../../common/util'], function(exports_1) {
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
    var core_1, common_1, router_1, lipsum_1, slider_rgb_1, sliderdemo_service_1, util_1;
    var SliderDemoRgbCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (lipsum_1_1) {
                lipsum_1 = lipsum_1_1;
            },
            function (slider_rgb_1_1) {
                slider_rgb_1 = slider_rgb_1_1;
            },
            function (sliderdemo_service_1_1) {
                sliderdemo_service_1 = sliderdemo_service_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            // Slider Demo RGB
            SliderDemoRgbCmp = (function () {
                function SliderDemoRgbCmp(fb_, location_, slider_demo_service_) {
                    var _this = this;
                    this.fb_ = fb_;
                    this.location_ = location_;
                    this.slider_demo_service_ = slider_demo_service_;
                    this.values_ = { 'red': 55, 'green': 105, 'blue': 155 };
                    this.length_ = 500;
                    // Note: I could not find a way to capture the 3 fields
                    // with /^#([\da-f]{2}){3}$/i  => so I unrolled the 3 captures
                    //
                    this.re_long_hex_ = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
                    this.re_short_hex_ = /^#([\da-f])([\da-f])([\da-f])$/i;
                    this.form_ctrl_ = null;
                    this.hex_str_ = util_1.Util.rgb2str(this.values_.red, this.values_.green, this.values_.blue);
                    this.cell_hex_str_ = this.hex_str_;
                    this.color_name_ = util_1.HexColor2Name.translate(this.hex_str_);
                    this.form_ctrl_ = this.fb_.group({
                        hex_string: ['', function (c) { return _this.hex_string_validator(c); }]
                    });
                    //console.log('DEBUG: hex_str = ', this.hex_str_);
                }
                Object.defineProperty(SliderDemoRgbCmp.prototype, "values_red", {
                    get: function () {
                        //console.log("TRACE: get red value", this.values_.red);
                        return this.values_.red;
                    },
                    set: function (r) {
                        //console.log("TRACE: set red value", this.values_.red);
                        this.values_.red = r;
                        this.hex_str_ = util_1.Util.rgb2str(this.values_.red, this.values_.green, this.values_.blue);
                        this.cell_hex_str_ = this.hex_str_;
                        this.color_name_ = util_1.HexColor2Name.translate(this.hex_str_);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SliderDemoRgbCmp.prototype, "values_green", {
                    get: function () {
                        //console.log("TRACE: get green value", this.values_.green);
                        return this.values_.green;
                    },
                    set: function (r) {
                        //console.log("TRACE: set green value", this.values_.green);
                        this.values_.green = r;
                        this.hex_str_ = util_1.Util.rgb2str(this.values_.red, this.values_.green, this.values_.blue);
                        this.cell_hex_str_ = this.hex_str_;
                        this.color_name_ = util_1.HexColor2Name.translate(this.hex_str_);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SliderDemoRgbCmp.prototype, "values_blue", {
                    get: function () {
                        //console.log("TRACE: get blue value", this.values_.blue);
                        return this.values_.blue;
                    },
                    set: function (r) {
                        //console.log("TRACE: set blue value", this.values_.blue);
                        this.values_.blue = r;
                        this.hex_str_ = util_1.Util.rgb2str(this.values_.red, this.values_.green, this.values_.blue);
                        this.cell_hex_str_ = this.hex_str_;
                        this.color_name_ = util_1.HexColor2Name.translate(this.hex_str_);
                    },
                    enumerable: true,
                    configurable: true
                });
                SliderDemoRgbCmp.prototype.routerOnActivate = function (next, prev) {
                    //console.log('Activate:   navigating from ', prev);
                    //console.log('            navigating to ', next);
                    //console.log('            router state', this.location_);
                    //console.log('            router url() ', this.location_.normalize());
                    if (prev === null) {
                        //console.log('[DEBUG] Navigating to ', next);
                        //console.log('[DEBUG] Location is ', this.location_);
                        //console.log('[DEBUG] Hum! navigation to ', window.location.pathname, ' without navigate() or routerLink');
                        // need to notify the side navigation panel that we are on page 1
                        this.slider_demo_service_.emit(2);
                    }
                };
                SliderDemoRgbCmp.prototype.routerOnDeactivate = function (next, prev) {
                    //console.log('Deactivate: navigating from ', prev);
                    //console.log('            navigating to ', next);
                };
                SliderDemoRgbCmp.prototype.ngAfterViewInit = function () {
                    // rfu
                };
                //
                //
                //
                SliderDemoRgbCmp.prototype.hex_string_validator = function (c) {
                    c['ongoing'] = false;
                    c['msg'] = null;
                    //console.log('============ DEBUG hex_string_validator ', c);
                    //console.log('DEBUG string has been modified by user ', this.form_ctrl_);
                    //console.log('DEBUG control ', this.form_ctrl_['hex_string']);
                    var s = c.value;
                    //console.log('DEBUG control string ', s);
                    if (s === null || s === '') {
                        c['msg'] = 'hex color string can not be empty';
                        return { 'empty': true };
                    }
                    //
                    var res = s.match(this.re_long_hex_);
                    if (res) {
                        this.values_.red = parseInt(res[1], 16);
                        this.values_.green = parseInt(res[2], 16);
                        this.values_.blue = parseInt(res[3], 16);
                        //console.log("NEW     = ", s);
                        //console.log("CURRENT = ", this.hex_str_);
                        //this.hex_str_ = s;
                        this.cell_hex_str_ = s;
                        this.color_name_ = util_1.HexColor2Name.translate(s);
                        return null;
                    }
                    res = s.match(this.re_short_hex_);
                    if (res) {
                        this.values_.red = 17 * parseInt(res[1], 16);
                        this.values_.green = 17 * parseInt(res[2], 16);
                        this.values_.blue = 17 * parseInt(res[3], 16);
                        //console.log("NEW*    = ", s);
                        //console.log("CURRENT*= ", this.hex_str_);
                        //this.hex_str_ = s;
                        this.cell_hex_str_ = s;
                        return null;
                    }
                    // invalid hex string detection
                    // the user can continue to key in values
                    // without impact on the  RGB input fields and RGB sliders.
                    //
                    if (s.length > 7) {
                        c['msg'] = 'hex color string must have at 4 or 7 characters';
                        return { 'length': true };
                    }
                    if (!s.match(/^#/)) {
                        //console.log('Error: Hex color must start with a #');
                        c['msg'] = 'hex color string must start with a #';
                        return { 'error': true };
                    }
                    if (!s.match(/^#$|^#([\da-f])+$/i)) {
                        c['msg'] = 'hex color string must have hexadecimal digits after the #';
                        return { 'error': true };
                    }
                    // when we reach here, the input field has a partially valid hex color
                    // ie. #12
                    return { 'ongoing': true };
                };
                SliderDemoRgbCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-demo-rgb',
                        templateUrl: 'app/sliderdemo/sliderdemo_rgb.html',
                        directives: [lipsum_1.LipsumCmp, slider_rgb_1.SvgSliderRgbCmp]
                    }),
                    __param(2, core_1.Inject(core_1.forwardRef(function () { return sliderdemo_service_1.SliderDemoService; }))), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Location, sliderdemo_service_1.SliderDemoService])
                ], SliderDemoRgbCmp);
                return SliderDemoRgbCmp;
            })();
            exports_1("SliderDemoRgbCmp", SliderDemoRgbCmp);
        }
    }
});
