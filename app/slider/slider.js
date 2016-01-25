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
    var SvgSliderCmp;
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
            // Slider components are here
            //
            ///////////////////////////////////////////////////////////////////////////////
            // SVG Slider
            SvgSliderCmp = (function () {
                function SvgSliderCmp() {
                    this.minChange = new core_1.EventEmitter();
                    this.maxChange = new core_1.EventEmitter();
                    this.lengthChange = new core_1.EventEmitter();
                    this.emit_value_ = new core_1.EventEmitter();
                    this.button_is_down_ = false;
                    this.label_offset_ = 0;
                    this.runner_style_is_circle_ = true;
                    this.runner_style_is_label_ = false;
                    this.min_ = 0;
                    this.max_ = 100;
                    this.value_ = 50;
                    this.rail_length_ = 180;
                    this.min_rail_length_ = 10;
                    this.max_rail_length_ = 4096;
                }
                SvgSliderCmp.prototype.clip3 = function (v, min, max) {
                    v = Number.isNaN(v) ? 0 : v;
                    if (v < min) {
                        return min;
                    }
                    if (v > max) {
                        return max;
                    }
                    return v;
                };
                SvgSliderCmp.prototype.value2pos = function (v) {
                    var pos = (this.rail_length_ * (v - this.min_)) / (this.max_ - this.min_);
                    return this.clip3(pos, 0, this.rail_length_);
                };
                SvgSliderCmp.prototype.pos2value = function (p) {
                    var v = this.min_ + (p * (this.max_ - this.min_) / this.rail_length_);
                    return this.clip3(v, this.min_, this.max_);
                };
                SvgSliderCmp.prototype.emit = function () {
                    if ('emit_value_' in this) {
                        this.emit_value_.emit(this.rounded_value_);
                    }
                };
                SvgSliderCmp.prototype.ngOnInit = function () {
                    // not much is done here
                };
                SvgSliderCmp.prototype.values_changed = function (v) {
                    this.value_ = this.clip3(v, this.min_, this.max_);
                    this.rounded_value_ = Math.round(v * 10) / 10;
                    this.pos_ = this.value2pos(v);
                    this.trans_pos_ = "translate(" + this.pos_ + "," + this.label_offset_ + ")";
                };
                SvgSliderCmp.prototype.position_changed = function (pos) {
                    this.pos_ = this.clip3(pos, 0, this.rail_length_);
                    this.trans_pos_ = "translate(" + this.pos_ + "," + this.label_offset_ + ")";
                    this.value_ = this.pos2value(this.pos_);
                    this.rounded_value_ = Math.round(this.value_ * 10) / 10;
                    this.emit();
                };
                //
                // detecting changes and emit value
                // value, min, max, shape type
                // when the button is down, the changes
                // to the runner position are emitted with mousemove
                SvgSliderCmp.prototype.ngOnChanges = function (changes) {
                    if (this.button_is_down_) {
                        return;
                    }
                    if (changes['value']) {
                        var v = Number(changes['value'].currentValue);
                        if ((Number.isNaN(v)) || (v < this.min_) || (v > this.max_)) {
                            // submitted value is invalid, emit the current value
                            this.emit();
                        }
                        else {
                            // it's a valid value => update runner position
                            // but no need to emit the value in this case
                            // as it is a valid external change.
                            this.values_changed(v);
                        }
                    }
                    else if (changes['min']) {
                        var v = Number(changes['min'].currentValue);
                        if ((Number.isNaN(v)) || (v > this.value_)) {
                            // invalid change
                            if ('minChange' in this) {
                                this.minChange.emit(this.min_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.min_ = v;
                            this.values_changed(this.value_);
                        }
                    }
                    else if (changes['max']) {
                        var v = Number(changes['max'].currentValue);
                        if ((Number.isNaN(v)) || (v < this.value_)) {
                            // invalid change
                            if ('maxChange' in this) {
                                this.maxChange.emit(this.max_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.max_ = v;
                            this.values_changed(this.value_);
                        }
                    }
                    else if (changes['shape']) {
                        if (changes['shape'].currentValue === 'label') {
                            this.runner_style_is_circle_ = false;
                            this.runner_style_is_label_ = true;
                            this.label_offset_ = -10;
                        }
                        else {
                            this.runner_style_is_circle_ = true;
                            this.runner_style_is_label_ = false;
                            this.label_offset_ = 0;
                        }
                        this.trans_pos_ = "translate(" + this.pos_ + "," + this.label_offset_ + ")";
                    }
                    else if (changes['length']) {
                        var v = Number(changes['length'].currentValue);
                        if ((Number.isNaN(v)) || (v < this.min_rail_length_)
                            || (v > this.max_rail_length_)) {
                            // invalid change
                            if ('lengthChange' in this) {
                                this.lengthChange.emit(this.rail_length_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.rail_length_ = v;
                            this.values_changed(this.value_);
                        }
                    }
                };
                SvgSliderCmp.prototype.ngAfterViewInit = function () {
                    if ('shape' in this) {
                        if (this.shape === 'label') {
                            this.runner_style_is_circle_ = false;
                            this.runner_style_is_label_ = true;
                            this.label_offset_ = -10;
                        }
                        else {
                            this.runner_style_is_circle_ = true;
                            this.runner_style_is_label_ = false;
                            this.label_offset_ = 0;
                        }
                    }
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
                        this.rail_length_ = 250;
                    }
                    this.rail_length_ = this.clip3(this.rail_length_, this.min_rail_length_, this.max_rail_length_);
                    var v = (this.min_ + this.max_) / 2;
                    if ('value' in this) {
                        v = Number(this.value);
                    }
                    this.values_changed(v);
                    this.emit();
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
                SvgSliderCmp.prototype.onMousedown = function (elm, evt, on_button) {
                    evt.preventDefault();
                    this.button_is_down_ = true;
                    this.delta_ = evt.clientX - this.pos_;
                    if (!on_button) {
                        // special case when the mouse down occur on the slide zone
                        // and not on the slider button
                        this.delta_ = elm.getBoundingClientRect().left;
                        var pos = evt.clientX - this.delta_;
                        this.position_changed(pos);
                    }
                };
                //
                // this function can only be called when button_is_down_ is true
                // as we have used a special div with *ngIf
                // <div *ngIf="button_is_down_"  (window:mousemove)="onMousemove($event)" ..
                //
                SvgSliderCmp.prototype.onMousemove = function (evt) {
                    var pos = evt.clientX - this.delta_;
                    this.position_changed(pos);
                };
                //
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                //
                SvgSliderCmp.prototype.onMouseup = function (evt) {
                    this.button_is_down_ = false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderCmp.prototype, "min", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderCmp.prototype, "minChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderCmp.prototype, "max", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderCmp.prototype, "maxChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderCmp.prototype, "length", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderCmp.prototype, "lengthChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderCmp.prototype, "shape", void 0);
                __decorate([
                    core_1.Input('value'), 
                    __metadata('design:type', Object)
                ], SvgSliderCmp.prototype, "value", void 0);
                __decorate([
                    core_1.Output('valueChange'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderCmp.prototype, "emit_value_", void 0);
                SvgSliderCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-svg-slider',
                        template: "\n    <div tabindex=\"1\"  id=\"slider\" style=\"margin:5px\">\n\n      <!-- special div which disables mousemove and mouseup event -->\n\n      <div *ngIf=\"button_is_down_\" style=\"position:relative\"\n           (window:mousemove)=\"onMousemove($event)\"\n           (window:mouseup)=\"onMouseup($event)\" >\n      </div>\n      <svg  height=\"90\" preserveAspectRatio=\"xMinYMin meet\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-60 -50 350 90\" version=\"1.1\" >\n\n        <!-- reference (0,0), no fill, no stroke -->\n\n        <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n        <!-- rail group -->\n\n        <g  id=\"rail-group\" (mousedown)=\"onMousedown(railref, $event, false)\">\n          <rect class=\"rail\" id=\"s0\" x=\"0\" y=\"-10\" [attr.width]=\"pos_\" height=\"20\" />\n          <rect class=\"rail\" id=\"s1\" [attr.x]=\"pos_\" y=\"-10\" [attr.width]=\"rail_length_ - pos_\" height=\"20\" />\n          <rect class=\"rail\" id=\"full\" x=\"0\" y=\"-10\" [attr.width]=\"rail_length_\" height=\"20\" />\n        </g>\n\n        <!-- runner group -->\n\n        <g  id=\"runner-group\" [attr.transform]=\"trans_pos_\"\n                        (mousedown)=\"onMousedown(railref, $event, true)\" >\n\n          <g *ngIf=\"runner_style_is_circle_\" >\n            <circle class=\"runner\" id=\"circle\" cx=\"0\" cy=\"0\" r=\"20\" />\n          </g>\n\n          <g  *ngIf=\"runner_style_is_label_\" id=\"label\">\n            <path class=\"runner\" id=\"panel\" d=\"M 0 0 L 10 -10 L 30 -10 L 30 -35 L -30 -35 L -30 -10 L -10 -10 z\"\n                style=\"color:black;fill:black\" />\n            <text text-anchor=\"middle\" class=\"runner\" id=\"text\" x=\"0\" y=\"-17\"\n                  font-family=\"Verdana\" font-size=\"15\" fill=\"white\">{{ value_ | number:'1.1-1' }}</text>\n          </g>\n        </g>\n      </svg>\n    </div>\n  ",
                        styleUrls: ['./app/slider/slider.css'],
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SvgSliderCmp);
                return SvgSliderCmp;
            })();
            exports_1("SvgSliderCmp", SvgSliderCmp);
        }
    }
});
