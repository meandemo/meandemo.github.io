System.register(['angular2/core', 'angular2/common', '../lipsum/lipsum', '../slider/slider'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, lipsum_1, slider_1;
    var NumericalSlider, SliderDemoSimpleCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lipsum_1_1) {
                lipsum_1 = lipsum_1_1;
            },
            function (slider_1_1) {
                slider_1 = slider_1_1;
            }],
        execute: function() {
            NumericalSlider = (function () {
                function NumericalSlider(fb, min, max, value) {
                    this.min_ = 0;
                    this.max_ = 100;
                    this.value_ = 50;
                    this.runner_shape_ = 'circle';
                    this.length_ = 180;
                    this.prev_min_ = 0;
                    this.prev_max_ = 100;
                    this.prev_value_ = 50;
                    this.ctrl_ = null;
                    this.min_ = min;
                    this.max_ = max;
                    this.value_ = value;
                    this.runner_shape_ = 'circle';
                    this.prev_min_ = this.min_;
                    this.prev_max_ = this.max_;
                    this.prev_value_ = this.value_;
                    this.fb_ = fb;
                }
                NumericalSlider.prototype.add_control = function () {
                    var _this = this;
                    this.ctrl_ = this.fb_.group({
                        min: ['', function (c) { _this.check_min_value(c); }],
                        max: ['', function (c) { _this.check_max_value(c); }],
                        value: ['', function (c) { _this.check_current_value(c); }]
                    });
                    return this.ctrl_;
                };
                // min value can't be greater than current value
                NumericalSlider.prototype.check_min_value = function (c) {
                    var v = Number(c.value);
                    if (c.value === "" || Number.isNaN(v) || v > this.value_) {
                        this.min_ = this.prev_min_;
                    }
                    else {
                        this.prev_min_ = this.min_;
                        this.min_ = v;
                    }
                };
                // max value can't be lower than current value
                NumericalSlider.prototype.check_max_value = function (c) {
                    var v = Number(c.value);
                    if (c.value === "" || Number.isNaN(v) || v < this.value_) {
                        this.max_ = this.prev_max_;
                    }
                    else {
                        this.prev_max_ = this.max_;
                        this.max_ = v;
                    }
                };
                //
                // current value must be between min and max
                //
                NumericalSlider.prototype.check_current_value = function (c) {
                    var v = Number(c.value);
                    //console.log('DEBUG: current value is ', v);
                    if (c.value === "" || Number.isNaN(v) || (v < this.min_) || (v > this.max_)) {
                        this.value_ = this.prev_value_;
                    }
                    else {
                        this.prev_value_ = this.value_;
                        this.value_ = v;
                    }
                };
                return NumericalSlider;
            })();
            SliderDemoSimpleCmp = (function () {
                function SliderDemoSimpleCmp(fb_) {
                    this.fb_ = fb_;
                    this.id_ = '000';
                    this.std_slider_ = new NumericalSlider(fb_, 0, 100, 25);
                    this.svg_slider_ = new NumericalSlider(fb_, 0, 100, 35);
                    this.std_ctrl_ = this.std_slider_.add_control();
                }
                SliderDemoSimpleCmp.prototype.ngAfterViewInit = function () {
                    // rfu 
                };
                SliderDemoSimpleCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-demo-simple',
                        templateUrl: 'app/sliderdemo/sliderdemo_simple.html',
                        directives: [lipsum_1.LipsumCmp, slider_1.SvgSliderCmp, common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], SliderDemoSimpleCmp);
                return SliderDemoSimpleCmp;
            })();
            exports_1("SliderDemoSimpleCmp", SliderDemoSimpleCmp);
        }
    }
});
