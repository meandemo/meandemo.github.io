System.register(['angular2/core', 'angular2/common', '../slider/slider_dyn_service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, slider_dyn_service_1;
    var Runner, SvgSliderDynCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (slider_dyn_service_1_1) {
                slider_dyn_service_1 = slider_dyn_service_1_1;
            }],
        execute: function() {
            ///////////////////////////////////////////////////////////////////////////////
            //
            // Slider with Dynamic number of runners
            // 
            ///////////////////////////////////////////////////////////////////////////////
            Runner = (function () {
                function Runner(val, min, max, rl) {
                    this.val_ = 0; // exact value 
                    this.rounded_val_ = 0; // rounded to 1/100th precision 
                    this.delta_ = 0; // to track offset while mouseMove;
                    this.base_ = 0; // id. k.push(0);
                    this.pos_ = 0; // pixel offset on the rail
                    this.trans_pos_ = ''; // the transform string for svg 'translate(${pos_})' 
                    this.rl_ = 0; // rail length in pixel
                    this.id_ = 0; // unique identifier
                    this.min_ = 0; // default min
                    this.max_ = 100; // default max
                    this.id_ = Runner.cnt_++;
                    // val: initial value;
                    // rl: initial rail length
                    //
                    this.val_ = val;
                    this.rl_ = rl;
                    this.min_ = min;
                    this.max_ = max;
                    this.pos_ = this.value2pos(val);
                    this.trans_pos_ = "translate(" + this.pos_ + ", 0)";
                }
                Runner.prototype.clip3 = function (v, min, max) {
                    v = Number.isNaN(v) ? 0 : v;
                    if (v < min) {
                        return min;
                    }
                    if (v > max) {
                        return max;
                    }
                    return v;
                };
                Runner.prototype.value2pos = function (v) {
                    var pos = (this.rl_ * (v - this.min_)) / (this.max_ - this.min_);
                    return this.clip3(pos, 0, this.rl_);
                };
                Runner.prototype.pos2value = function (p) {
                    var v = this.min_ + (p * (this.max_ - this.min_) / this.rl_);
                    return this.clip3(v, this.min_, this.max_);
                };
                Runner.cnt_ = 0; // instance counter          
                return Runner;
            })();
            SvgSliderDynCmp = (function () {
                function SvgSliderDynCmp(dyn_slider_service_) {
                    var _this = this;
                    this.dyn_slider_service_ = dyn_slider_service_;
                    //@Input() min: any;
                    this.minChange = new core_1.EventEmitter();
                    //@Input() max: any;
                    this.maxChange = new core_1.EventEmitter();
                    this.lengthChange = new core_1.EventEmitter();
                    //@Input('values') values: any;
                    this.emit_values = new core_1.EventEmitter();
                    this.change_notifier_ = 'dummy';
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
                    this.tick_marks_ = [0, 50, 100, 150, 200, 255];
                    this.min_ = 0;
                    this.max_ = 255;
                    this.nb_runners_ = 3;
                    this.rail_length_ = 700;
                    this.min_rail_length_ = 10;
                    this.max_rail_length_ = 4096;
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
                    //console.log("[TRACE] constructor value = ", this.value_);
                    //console.log("[TRACE] pos   = ", this.pos_);
                    //console.log("[TRACE] trans = ", this.trans_pos_);
                    dyn_slider_service_.subscribe({
                        next: function (data) {
                            if (data.add) {
                                //console.log('[TRACE] Receive add slider request');
                                var m = _this.rounded_value_.length;
                                _this.rounded_value_.push(0);
                                _this.pos_.push(0);
                                _this.delta_.push(0);
                                _this.base_.push(0);
                                _this.trans_pos_.push('');
                                _this.runners_.push("runner" + m);
                                _this.value_.push(0);
                                //this.values_changed(0);
                                _this.emit_full();
                            }
                            else if (data.del) {
                                //console.log('[TRACE] Receive remove slider request:', data.idx);
                                _this.rounded_value_.splice(data.idx, 1);
                                _this.pos_.splice(data.idx, 1);
                                _this.delta_.splice(data.idx, 1);
                                _this.base_.splice(data.idx, 1);
                                _this.trans_pos_.splice(data.idx, 1);
                                _this.runners_.splice(data.idx, 1);
                                _this.value_.splice(data.idx, 1);
                                _this.emit_full();
                            }
                            else {
                                //console.log('[TRACE] Receive update slider request:', data.idx, ' with value ', data.val);
                                _this.values_changed(data.val, data.idx);
                            }
                            //console.log('[TRACE] notify value = ', this.value_);
                        }
                    });
                }
                SvgSliderDynCmp.prototype.clip3 = function (v, min, max) {
                    v = Number.isNaN(v) ? 0 : v;
                    if (v < min) {
                        return min;
                    }
                    if (v > max) {
                        return max;
                    }
                    return v;
                };
                SvgSliderDynCmp.prototype.value2pos = function (v) {
                    var pos = (this.rail_length_ * (v - this.min_)) / (this.max_ - this.min_);
                    return this.clip3(pos, 0, this.rail_length_);
                };
                SvgSliderDynCmp.prototype.pos2value = function (p) {
                    var v = this.min_ + (p * (this.max_ - this.min_) / this.rail_length_);
                    return this.clip3(v, this.min_, this.max_);
                };
                SvgSliderDynCmp.prototype.emit = function (idx) {
                    var str = "emit_values";
                    if (str in this) {
                        //console.log('[TRACE] emit  ',`${this.rounded_value_[idx]}`);
                        this[str].emit(this.rounded_value_);
                    }
                };
                SvgSliderDynCmp.prototype.emit_full = function () {
                    var str = "emit_values";
                    if (str in this) {
                        //console.log('[TRACE] emit* ',`${this.rounded_value_}`);
                        this[str].emit(this.rounded_value_);
                    }
                };
                SvgSliderDynCmp.prototype.ngOnInit = function () {
                    if ('length' in this) {
                        this.rail_length_ = Number(this.length);
                    }
                    else {
                        this.rail_length_ = 700;
                    }
                    this.rail_length_ = this.clip3(this.rail_length_, this.min_rail_length_, this.max_rail_length_);
                    for (var i = 0; i < this.nb_runners_; ++i) {
                        this.values_changed(this.value_[i], i);
                    }
                    //console.log("[TRACE] after view init value = ", this.value_);
                    this.emit_full();
                };
                SvgSliderDynCmp.prototype.values_changed = function (v, idx) {
                    //console.log('[TRACE] value change[', idx, '] = ', v);
                    this.value_[idx] = this.clip3(v, this.min_, this.max_);
                    this.rounded_value_[idx] = Math.round(v * 10) / 10;
                    this.pos_[idx] = this.value2pos(v);
                    this.trans_pos_[idx] = "translate(" + this.pos_[idx] + "," + this.label_offset_ + ")";
                };
                SvgSliderDynCmp.prototype.position_changed = function (pos, idx) {
                    //console.log('[TRACE] pos change[', idx, '] = ', pos);
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
                SvgSliderDynCmp.prototype.ngOnChanges = function (changes) {
                };
                SvgSliderDynCmp.prototype.ngAfterViewInit = function () {
                    this.label_offset_ = 0;
                    if ('length' in this) {
                        this.rail_length_ = Number(this.length);
                    }
                    else {
                        this.rail_length_ = 700;
                    }
                    this.rail_length_ = this.clip3(this.rail_length_, this.min_rail_length_, this.max_rail_length_);
                    for (var i = 0; i < this.nb_runners_; ++i) {
                        this.values_changed(this.value_[i], i);
                    }
                    this.emit_full();
                    //console.log("[TRACE] after view init value = ", this.value_);
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
                SvgSliderDynCmp.prototype.onMousedown = function (elm, evt, on_button, idx) {
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
                SvgSliderDynCmp.prototype.onMousemove = function (evt) {
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
                SvgSliderDynCmp.prototype.onMouseup = function (evt) {
                    this.button_is_down_ = false;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "minChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "maxChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderDynCmp.prototype, "length", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "lengthChange", void 0);
                __decorate([
                    core_1.Output('values'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "emit_values", void 0);
                SvgSliderDynCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-svg-slider-dyn',
                        template: "\n    <div  id=\"slider\" style=\"margin:5px\">\n\n      <!-- special div which disables mousemove and mouseup event -->\n      <div *ngIf=\"button_is_down_\" style=\"position:relative\"\n           (window:mousemove)=\"onMousemove($event)\"\n           (window:mouseup)=\"onMouseup($event)\" >\n      </div>\n\n      <svg  height=\"100\" preserveAspectRatio=\"xMinYMin meet\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-60 -40 800 100\" version=\"1.1\" >\n\n        <!-- reference (0,0), no fill, no stroke -->\n\n        <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n        <!-- rail group -->\n\n        <g id=\"ruler\">\n          <path [attr.d]=\"'M 0,0 h' + (rail_length_)\" style=\"stroke-width:2px;stroke:black\" />\n          <g *ngFor=\"#_val of tick_marks_\">\n            <path [attr.d]=\"'M' + (_val * rail_length_ / 255) + ',0 v 30'\" style=\"stroke-width:2px;stroke:black\" />\n            <text [attr.x]=\"_val * rail_length_ /255\" y=50 text-anchor=\"middle\" font-size=\"20\">{{_val}}</text>\n          </g>\n        </g>\n\n        <!-- runner group -->\n        <!--\n          <rect id=\"default-rail\" x=\"0\" y=\"-3\" [attr.width]=\"rail_length_\" height=\"7\" style=\"fill:white;stroke-width:2px;stroke:black\" />\n          <path [attr.d]=\"'M0,0 L ' + rail_length_ + ',0' \" style=\"stroke-width:2px;stroke:black\" />\n            <path [attr.d]=\"'M 0,' + (_val * rail_length_ / 255) + 'v 30'\" style=\"fill:grey;stroke:black\">\n            <circle cx=\"0\" cy=\"0\" [r]=\"10 + _idx * 5\" />\n        -->\n\n        <g *ngFor=\"#_name of runners_; #_idx = index\" [attr.class]=\"change_notifier_\"\n            [id]=\"_name\" \n            [attr.transform]=\"trans_pos_[_idx]\"\n            (mousedown)=\"onMousedown(railref, $event, true, _idx)\" >\n          \n          <path id=\"panel\" d=\"M 0 0 L 10 -10 L 30 -10 L 30 -35 L -30 -35 L -30 -10 L -10 -10 z\"\n          style=\"color:black;fill:black\" />\n          <text id=\"text\" x=\"0\" y=\"-17\" text-anchor=\"middle\"\n                font-family=\"Verdana\" font-size=\"10\" fill=\"white\">Runner {{_idx}}\n          </text>\n\n        </g>\n\n      </svg>\n    </div>\n  ",
                        styles: ["\n  "],
                        directives: [common_1.FORM_DIRECTIVES, common_1.NgFor]
                    }), 
                    __metadata('design:paramtypes', [slider_dyn_service_1.DynSliderService])
                ], SvgSliderDynCmp);
                return SvgSliderDynCmp;
            })();
            exports_1("SvgSliderDynCmp", SvgSliderDynCmp);
        }
    }
});
