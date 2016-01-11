System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var SvgSliderRgbCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ///////////////////////////////////////////////////////////////////////////////
            //
            // Slider RGB Selection: Three Runner Slider
            //
            ///////////////////////////////////////////////////////////////////////////////
            SvgSliderRgbCmp = (function () {
                function SvgSliderRgbCmp() {
                    this.minChange = new core_1.EventEmitter();
                    this.maxChange = new core_1.EventEmitter();
                    this.lengthChange = new core_1.EventEmitter();
                    this.emit_value0_ = new core_1.EventEmitter();
                    this.emit_value1_ = new core_1.EventEmitter();
                    this.emit_value2_ = new core_1.EventEmitter();
                    this.active_runner_ = [];
                    this.value_ = [];
                    this.rounded_value_ = [];
                    this.pos_ = [];
                    this.delta_ = [];
                    this.base_ = [];
                    this.button_is_down_ = false;
                    this.trans_pos_ = [];
                    this.label_offset_ = 0;
                    this.runners_ = [];
                    this.runner_style_is_circle_ = true;
                    this.runner_style_is_label_ = false;
                    this.tick_marks_ = [0, 50, 100, 150, 200, 255];
                    this.min_ = 0;
                    this.max_ = 255;
                    this.nb_runners_ = 3;
                    for (var i = 0; i < this.nb_runners_; ++i) {
                        this.value_.push(0);
                        this.rounded_value_.push(0);
                        this.pos_.push(0);
                        this.delta_.push(0);
                        this.base_.push(0);
                        this.trans_pos_.push('');
                        this.runners_.push("runner" + i);
                        this.values_changed(50 + (50 * i), i);
                    }
                    this.rail_length_ = 700;
                    this.min_rail_length_ = 10;
                    this.max_rail_length_ = 4096;
                }
                SvgSliderRgbCmp.prototype.clip3 = function (v, min, max) {
                    v = Number.isNaN(v) ? 0 : v;
                    if (v < min) {
                        return min;
                    }
                    if (v > max) {
                        return max;
                    }
                    return v;
                };
                SvgSliderRgbCmp.prototype.value2pos = function (v) {
                    var pos = (this.rail_length_ * (v - this.min_)) / (this.max_ - this.min_);
                    return this.clip3(pos, 0, this.rail_length_);
                };
                SvgSliderRgbCmp.prototype.pos2value = function (p) {
                    var v = this.min_ + (p * (this.max_ - this.min_) / this.rail_length_);
                    return this.clip3(v, this.min_, this.max_);
                };
                SvgSliderRgbCmp.prototype.emit = function (idx) {
                    var str = "emit_value" + idx + "_";
                    if (str in this) {
                        this[str].emit(this.rounded_value_[idx]);
                    }
                };
                SvgSliderRgbCmp.prototype.ngOnInit = function () {
                    if ('min' in this) {
                        this.min_ = Number(this.min);
                    }
                    if ('max' in this) {
                        this.max_ = Number(this.max);
                    }
                    if (this.max_ === this.min_) {
                        this.max_ = this.min_ + 1;
                    }
                    else if (this.max_ < this.min_) {
                        var tmp = this.max_;
                        this.max_ = this.min_;
                        this.min_ = tmp;
                    }
                    if ('length' in this) {
                        this.rail_length_ = Number(this.length);
                    }
                    else {
                        this.rail_length_ = 700;
                    }
                    this.rail_length_ = this.clip3(this.rail_length_, this.min_rail_length_, this.max_rail_length_);
                };
                SvgSliderRgbCmp.prototype.values_changed = function (v, idx) {
                    this.value_[idx] = this.clip3(v, this.min_, this.max_);
                    this.rounded_value_[idx] = Math.round(v * 10) / 10;
                    this.pos_[idx] = this.value2pos(v);
                    this.trans_pos_[idx] = "translate(" + this.pos_[idx] + "," + this.label_offset_ + ")";
                };
                SvgSliderRgbCmp.prototype.position_changed = function (pos, idx) {
                    this.pos_[idx] = this.clip3(pos, 0, this.rail_length_);
                    this.trans_pos_[idx] = "translate(" + this.pos_[idx] + "," + this.label_offset_ + ")";
                    this.value_[idx] = this.pos2value(this.pos_[idx]);
                    this.rounded_value_[idx] = Math.round(this.value_[idx] * 10) / 10;
                    this.emit(idx);
                };
                //
                // detecting changes and emit value
                // value, min, max
                // when the button is down, the changes
                // to the runner position are emitted with mousemove
                SvgSliderRgbCmp.prototype.ngOnChanges = function (changes) {
                    if (this.button_is_down_) {
                        return;
                    }
                    for (var i = 0; i < this.nb_runners_; ++i) {
                        var str = "value" + i;
                        if (changes[str]) {
                            var v = Number(changes[str].currentValue);
                            if ((Number.isNaN(v)) || (v < this.min_) || (v > this.max_)) {
                                // submitted value is invalid, emit the current value
                                this.emit(i);
                            }
                            else {
                                // it's a valid value => update runner position
                                // but no need to emit the value in this case
                                // as it is a valid external change.
                                this.values_changed(v, i);
                            }
                        }
                    }
                    if (changes['min']) {
                        var v = Number(changes['min'].currentValue);
                        if ((Number.isNaN(v)) || (v > Math.min.apply(Math, this.value_))) {
                            // invalid change
                            if ('minChange' in this) {
                                this.minChange.emit(this.min_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.min_ = v;
                            for (var i = 0; i < this.nb_runners_; ++i) {
                                this.values_changed(this.value_[i], i);
                            }
                        }
                    }
                    if (changes['max']) {
                        var v = Number(changes['max'].currentValue);
                        if ((Number.isNaN(v)) || (v < Math.max.apply(Math, this.value_))) {
                            // invalid change
                            if ('maxChange' in this) {
                                this.maxChange.emit(this.max_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.max_ = v;
                            for (var i = 0; i < this.nb_runners_; ++i) {
                                this.values_changed(this.value_[i], i);
                            }
                        }
                    }
                };
                SvgSliderRgbCmp.prototype.ngAfterViewInit = function () {
                    this.runner_style_is_circle_ = true;
                    this.runner_style_is_label_ = false;
                    this.label_offset_ = 0;
                    if ('min' in this) {
                        this.min_ = Number(this.min);
                    }
                    if ('max' in this) {
                        this.max_ = Number(this.max);
                    }
                    if (this.max_ === this.min_) {
                        this.max_ = this.min_ + 1;
                    }
                    else if (this.max_ < this.min_) {
                        var tmp = this.max_;
                        this.max_ = this.min_;
                        this.min_ = tmp;
                    }
                    if ('length' in this) {
                        this.rail_length_ = Number(this.length);
                    }
                    else {
                        this.rail_length_ = 700;
                    }
                    this.rail_length_ = this.clip3(this.rail_length_, this.min_rail_length_, this.max_rail_length_);
                    for (var i = 0; i < this.nb_runners_; ++i) {
                        var v = (this.min_ + this.max_) / 2;
                        var str = "value" + i;
                        if (str in this) {
                            v = Number(this[str]);
                        }
                        this.values_changed(v, i);
                        this.emit(i);
                    }
                };
                //
                // Details on the position calculation
                //
                //                    initial               final          !onbutton       
                //  [3]---------------------------------------------------------> (= evt.clientX)
                //
                //  |--------->@              (= base_  given by elm.getBoundingClientRect().left)
                //             @       +=======+            +=======+
                //             +-------|       |------------|       |---------------------+
                //             +-------|   o   |------------|   o   |-----------o---------+
                //             +-------|     x |------------|     x |---------------------+
                //                     +=======+            +=======+
                //             |---------->     (= pos)
                //                        <->   (= offset)
                //  [1]--------------------->   (= evt.clientX)
                //  [2]-----------------------------------------> (= evt.clientX)
                //
                //  On initial mouse down, we can compute delta as we have:
                //  evt.clientX[1] = base + pos + offset   
                //
                //  On mouse move/up, we can compute npos_ given by
                //  evt.clientX[2] = base + npos + offset   
                //  => npos = evt.clientX[2] - (evt.clientX[1] - pos)
                // 
                //  Special case when rail is clicked [3], we assume a virtual [1], so we have: 
                //  evt.clientX[3] = base + npos  
                //  evt.clientX[1] = base + pos 
                //  => npos = evt.clientX[3] - (evt.clientX[1]  - pos)
                // Note the preventDefault to ensure that the future mouse events
                // are not propagated to other elements
                SvgSliderRgbCmp.prototype.onMousedown = function (elm, evt, on_button, idx) {
                    evt.preventDefault();
                    this.button_is_down_ = true;
                    this.active_runner_ = [];
                    if (!on_button) {
                        // special case when the mouse down occur on the slide zone
                        // and not on the slider button
                        for (var i = 0; i < this.nb_runners_; ++i) {
                            this.delta_[i] = elm.getBoundingClientRect().left;
                            var pos = evt.clientX - this.delta_[i];
                            this.position_changed(pos, i);
                            this.active_runner_.push(i);
                        }
                    }
                    else {
                        this.active_runner_.push(idx);
                        this.delta_[idx] = evt.clientX - this.pos_[idx];
                    }
                };
                //
                // this function can only be called when button_is_down_ is true
                // as we have used a special div with *ngIf
                // <div *ngIf="button_is_down_"  (window:mousemove)="onMousemove($event)" ..
                //
                SvgSliderRgbCmp.prototype.onMousemove = function (evt) {
                    var _this = this;
                    this.active_runner_.forEach(function (val, idx, arr) {
                        var pos = evt.clientX - _this.delta_[val];
                        _this.position_changed(pos, val);
                    });
                };
                //
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                //
                SvgSliderRgbCmp.prototype.onMouseup = function (evt) {
                    this.button_is_down_ = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "min", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "minChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "max", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "maxChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "length", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "lengthChange", void 0);
                __decorate([
                    core_1.Input('red'), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "value0", void 0);
                __decorate([
                    core_1.Output('redChange'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "emit_value0_", void 0);
                __decorate([
                    core_1.Input('green'), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "value1", void 0);
                __decorate([
                    core_1.Output('greenChange'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "emit_value1_", void 0);
                __decorate([
                    core_1.Input('blue'), 
                    __metadata('design:type', Object)
                ], SvgSliderRgbCmp.prototype, "value2", void 0);
                __decorate([
                    core_1.Output('blueChange'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "emit_value2_", void 0);
                SvgSliderRgbCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-svg-slider-rgb',
                        template: "\n    <div  id=\"slider\" style=\"margin:5px\">\n\n      <!-- special div which disables mousemove and mouseup event -->\n      <div *ngIf=\"button_is_down_\" style=\"position:relative\"\n           (window:mousemove)=\"onMousemove($event)\"\n           (window:mouseup)=\"onMouseup($event)\" >\n      </div>\n\n      <svg  height=\"100\" preserveAspectRatio=\"xMinYMin meet\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-60 -40 800 100\" version=\"1.1\" >\n\n        <!-- reference (0,0), no fill, no stroke -->\n\n        <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n        <!-- rail group -->\n\n        <g id=\"ruler\" (mousedown)=\"onMousedown(railref, $event, false)\">\n          <path [attr.d]=\"'M 0,0 h' + (rail_length_)\" style=\"stroke-width:2px;stroke:black\" />\n          <g *ngFor=\"#_val of tick_marks_\">\n            <path [attr.d]=\"'M' + (_val * rail_length_ / 255) + ',0 v 30'\" style=\"stroke-width:2px;stroke:black\" />\n            <text [attr.x]=\"_val * rail_length_ /255\" y=50 text-anchor=\"middle\" font-size=\"20\">{{_val}}</text>\n          </g>\n        </g>\n\n        <!-- runner group -->\n        <!--\n          <rect id=\"default-rail\" x=\"0\" y=\"-3\" [attr.width]=\"rail_length_\" height=\"7\" style=\"fill:white;stroke-width:2px;stroke:black\" />\n          <path [attr.d]=\"'M0,0 L ' + rail_length_ + ',0' \" style=\"stroke-width:2px;stroke:black\" />\n            <path [attr.d]=\"'M 0,' + (_val * rail_length_ / 255) + 'v 30'\" style=\"fill:grey;stroke:black\">\n            <circle cx=\"0\" cy=\"0\" [r]=\"10 + _idx * 5\" />\n        -->\n\n        <g *ngFor=\"#_name of runners_; #_idx = index\"\n            [id]=\"_name\" \n            [attr.transform]=\"trans_pos_[_idx]\"\n            (mousedown)=\"onMousedown(railref, $event, true, _idx)\" >\n          \n          <g id=\"circle\" [attr.transform]=\" 'rotate(' + (-110 + (_idx * 40)) + ')' \" >\n            <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n            <g transform=\"rotate(120)\">\n              <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n              <g transform=\"rotate(120)\">\n                <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n              </g>\n            </g>\n          </g>\n        </g>\n\n      </svg>\n    </div>\n  ",
                        styles: ["\n  "],
                        directives: [common_1.FORM_DIRECTIVES, common_1.NgFor]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SvgSliderRgbCmp);
                return SvgSliderRgbCmp;
            })();
            exports_1("SvgSliderRgbCmp", SvgSliderRgbCmp);
        }
    }
});
