System.register(['angular2/core', 'angular2/common', '../../common/util', './runner'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, util_1, runner_1;
    var SvgSliderRgbCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (runner_1_1) {
                runner_1 = runner_1_1;
            }],
        execute: function() {
            ///////////////////////////////////////////////////////////////////////////////
            //
            // Slider RGB Selection: Three Runner Slider
            //
            ///////////////////////////////////////////////////////////////////////////////
            SvgSliderRgbCmp = (function () {
                function SvgSliderRgbCmp() {
                    var _this = this;
                    this.minChange = new core_1.EventEmitter();
                    this.maxChange = new core_1.EventEmitter();
                    this.lengthChange = new core_1.EventEmitter();
                    this.emit_value0_ = new core_1.EventEmitter();
                    this.emit_value1_ = new core_1.EventEmitter();
                    this.emit_value2_ = new core_1.EventEmitter();
                    this.emit_values_ = new core_1.EventEmitter();
                    this.runners_ = [];
                    this.is_vertical_ = false;
                    this.is_special_ = false;
                    this.hide_rail_ = false;
                    this.hide_runners_ = false;
                    this.button_is_down_ = false;
                    this.tick_marks_ = [0, 50, 100, 150, 200, 255];
                    this.nb_ticks_ = 6;
                    SvgSliderRgbCmp.cnt_++;
                    // console.log("SLIDER RGB Constructor: ", SvgSliderRgbCmp.cnt_);
                    this.id_number_ = SvgSliderRgbCmp.cnt_;
                    var colors = ['red', 'green', 'blue'];
                    this.min_ = 0;
                    this.max_ = 255;
                    this.nb_runners_ = 3;
                    this.rl_ = 700;
                    this.min_rl_ = 10;
                    this.max_rl_ = 4096;
                    this.r2name_ = new Map();
                    var initial_values = util_1.Util.create_values(this.nb_runners_, this.min_, this.max_);
                    // console.log("[DEBUG] initial values = ", initial_values);
                    initial_values.forEach(function (val, i) {
                        var runner = new runner_1.Runner(val, _this.min_, _this.max_, _this.rl_);
                        _this.runners_.push(runner);
                        _this.r2name_.set(runner, [colors[i], i]);
                    });
                }
                SvgSliderRgbCmp.prototype.get_pos = function (v) {
                    var pos = (this.rl_ * (v - this.min_)) / (this.max_ - this.min_);
                    if (this.is_vertical_) {
                        pos = this.rl_ - pos;
                    }
                    return util_1.Util.clip3(pos, 0, this.rl_);
                };
                SvgSliderRgbCmp.prototype.get_values = function () {
                    var res = [];
                    this.runners_.forEach(function (runner, i) {
                        res.push(runner.get_value(true));
                    });
                    return res;
                };
                SvgSliderRgbCmp.prototype.set_values = function (vals) {
                    var _this = this;
                    this.runners_.forEach(function (runner, i) {
                        // console.log('[TRACE] Rgb set values* ID = ', this.id_number_, " value = "   , vals[i]);
                        runner.update_value(vals[i]);
                        _this.emit_runner_value(runner);
                    });
                    this.emit_full();
                };
                SvgSliderRgbCmp.prototype.emit_full = function () {
                    var str = "emit_values_";
                    if (str in this) {
                        var datas = [];
                        this.runners_.forEach(function (runner, i, runners) {
                            var data = {};
                            data['runner'] = runner;
                            data['id'] = runner.get_id();
                            data['value'] = runner.get_value(true);
                            datas.push(data);
                        });
                        // console.log('[TRACE] Rgb emit* ', datas);
                        this[str].emit(datas);
                    }
                };
                SvgSliderRgbCmp.prototype.get_color = function (runner) {
                    // console.log("[TRACE] get_color: ", (this.r2name_.get(runner))[0]);
                    return (this.r2name_.get(runner))[0];
                };
                SvgSliderRgbCmp.prototype.emit_runner_value = function (runner) {
                    if (this.is_special_) {
                        return;
                    }
                    var idx = (this.r2name_.get(runner))[1];
                    var str = "emit_value" + idx + "_";
                    if (str in this) {
                        var v = this.runners_[idx].get_value(true);
                        this[str].emit(v);
                    }
                };
                //
                // detecting changes and emit value
                // value, min, max
                // when the button is down, the changes
                // to the runner position are emitted with mousemove
                SvgSliderRgbCmp.prototype.get_min_of_values = function () {
                    var min = this.max_;
                    this.runners_.forEach(function (runner, i, runners) {
                        min = Math.min(min, runner.get_value());
                    });
                    return min;
                };
                SvgSliderRgbCmp.prototype.get_max_of_values = function () {
                    var max = this.min_;
                    this.runners_.forEach(function (runner, i, runners) {
                        max = Math.max(max, runner.get_value());
                    });
                    return max;
                };
                SvgSliderRgbCmp.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    if (this.button_is_down_) {
                        return;
                    }
                    this.runners_.forEach(function (runner, i, runners) {
                        var str = "value" + i;
                        if (changes[str]) {
                            var v = Number(changes[str].currentValue);
                            if ((Number.isNaN(v)) || (v < _this.min_) || (v > _this.max_)) {
                                // submitted value is invalid, emit the current value
                                _this.emit_runner_value(runner);
                            }
                            else {
                                // it's a valid value => update runner position
                                // but no need to emit the value in this case
                                // as it is a valid external change.
                                runner.update_value(v);
                            }
                        }
                    });
                    if (changes['min']) {
                        var v = Number(changes['min'].currentValue);
                        if (Number.isNaN(v) || (v > this.get_min_of_values())) {
                            // invalid change
                            if ('minChange' in this) {
                                this.minChange.emit(this.min_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.min_ = v;
                            this.runners_.forEach(function (runner, i, runners) {
                                runner.update_min(v);
                            });
                        }
                    }
                    if (changes['max']) {
                        var v = Number(changes['max'].currentValue);
                        if (Number.isNaN(v) || (v < this.get_max_of_values())) {
                            // invalid change
                            if ('maxChange' in this) {
                                this.maxChange.emit(this.max_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.max_ = v;
                            this.runners_.forEach(function (runner, i, runners) {
                                runner.update_max(v);
                            });
                        }
                    }
                    if (changes['length']) {
                        var v = Number(changes['length'].currentValue);
                        if (Number.isNaN(v) || (v < this.get_max_of_values())) {
                            // invalid change
                            if ('lengthChange' in this) {
                                this.maxChange.emit(this.max_);
                            }
                        }
                        else {
                            // valid change, update runner position
                            this.rl_ = v;
                            this.runners_.forEach(function (runner, i, runners) {
                                runner.update_rail_length(_this.rl_);
                            });
                        }
                    }
                    if (changes['hiderail']) {
                        var v = changes['hiderail'].currentValue;
                        this.hide_rail_ = (v === true);
                    }
                    if (changes['hiderunners']) {
                        var v = changes['hiderunners'].currentValue;
                        this.hide_runners_ = (v === true);
                    }
                };
                SvgSliderRgbCmp.prototype.ngOnInit = function () {
                    // console.log("[TRACE] ngOnInit() ");
                };
                /*
                  // console.log("[TRACE] ngOnInit() ");
                  if ('vertical' in this) {
                    this.is_vertical_ = true;
                  }
              
              
                  if ('min' in this) {
                    this.min_ = Number(this.min);
                  }
              
                  if ('max' in this) {
                    this.max_ = Number(this.max);
                  }
              
                  if (this.max_ === this.min_) {
                    this.max_ = this.min_ + 1;
                  } else if (this.max_ < this.min_) {
                    const tmp = this.max_;
                    this.max_ = this.min_;
                    this.min_ = tmp;
                  }
              
                  if ('length' in this) {
                    this.rl_ = Number(this.length);
                  } else {
                    this.rl_ = 700;
                  }
                  this.rl_ = Util.clip3(this.rl_, this.min_rl_, this.max_rl_);
                  this.runners_.forEach((runner: Runner, i: number, runners: Runner[]) => {
                    runner.set_direction(this.is_vertical_);
                    runner.update_rail_length(this.rl_);
                    this.emit_runner_value(runner);
                  });
                }
                */
                SvgSliderRgbCmp.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    // console.log("[TRACE] ngAfterViewInit() ");
                    if ('vertical' in this) {
                        this.is_vertical_ = true;
                    }
                    if ('special' in this) {
                        // console.log("[TRACE] RGB ngAfterViewInit() special is true");
                        this.is_special_ = true;
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
                        this.rl_ = Number(this.length);
                    }
                    else {
                        this.rl_ = 700;
                    }
                    this.rl_ = util_1.Util.clip3(this.rl_, this.min_rl_, this.max_rl_);
                    this.runners_.forEach(function (runner, i, runners) {
                        runner.set_direction(_this.is_vertical_);
                        runner.update_rail_length(_this.rl_);
                        runner.update_min(_this.min_);
                        runner.update_max(_this.max_);
                        _this.emit_runner_value(runner);
                    });
                    this.emit_full();
                    this.tick_marks_ = util_1.Util.create_ticks(this.nb_ticks_, this.min_, this.max_);
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
                    var _this = this;
                    evt.preventDefault();
                    this.button_is_down_ = true;
                    this.active_runners_ = [];
                    var evt_pos = this.is_vertical_ ? evt.clientY : evt.clientX;
                    if (!on_button) {
                        // special case when the mouse down occur on the slide zone
                        // and not on the slider button:
                        // all the sliders are selected and moved to that position
                        var delta = this.is_vertical_ ? elm.getBoundingClientRect().top :
                            elm.getBoundingClientRect().left;
                        this.runners_.forEach(function (runner, i, runners) {
                            runner.set_delta(delta);
                            runner.update_position(evt_pos - delta);
                            _this.active_runners_.push(runner);
                            _this.emit_runner_value(runner);
                        });
                        this.emit_full();
                    }
                    else {
                        this.active_runners_.push(this.runners_[idx]);
                        this.runners_[idx].init_mouse_down_evt(evt_pos);
                    }
                };
                //
                // this function can only be called when button_is_down_ is true
                // as we have used a special div with *ngIf
                // <div *ngIf="button_is_down_"  (window:mousemove)="onMousemove($event)" ..
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                SvgSliderRgbCmp.prototype.onMousemove = function (evt) {
                    var _this = this;
                    var evt_pos = this.is_vertical_ ? evt.clientY : evt.clientX;
                    this.active_runners_.forEach(function (runner, i, runners) {
                        runner.update_mouse_move_position(evt_pos);
                        _this.emit_runner_value(runner);
                    });
                    this.emit_full();
                };
                //
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                //
                SvgSliderRgbCmp.prototype.onMouseup = function (evt) {
                    this.button_is_down_ = false;
                };
                SvgSliderRgbCmp.cnt_ = 0;
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
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderRgbCmp.prototype, "vertical", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderRgbCmp.prototype, "special", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderRgbCmp.prototype, "hiderail", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderRgbCmp.prototype, "hiderunners", void 0);
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
                __decorate([
                    core_1.Output('values'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderRgbCmp.prototype, "emit_values_", void 0);
                SvgSliderRgbCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-svg-slider-rgb',
                        template: "\n    <div  id=\"slider\" style=\"margin:0px\">\n\n      <!-- special div which disables mousemove and mouseup event -->\n      <div *ngIf=\"button_is_down_\" style=\"position:relative\"\n           (window:mousemove)=\"onMousemove($event)\"\n           (window:mouseup)=\"onMouseup($event)\" >\n      </div>\n\n      <!--              -->\n      <!-- Horizontal   -->\n      <!--              -->\n\n      <div *ngIf=!is_vertical_>\n        <svg height=\"120\" preserveAspectRatio=\"xMinYMin meet\"\n             xmlns=\"http://www.w3.org/2000/svg\" [attr.viewBox]=\"'-60 -40 ' + (rl_ + 100) + ' 120'\" version=\"1.1\" >\n\n          <!-- reference (0,0), no fill, no stroke -->\n\n          <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n          <g id=\"rail\" (mousedown)=\"onMousedown(railref, $event, false)\">\n            <path [attr.d]=\"'M 0,-5 v 10 h' + (rl_) + ' v -10 z'\"\n                  style=\"stroke-width:2px;stroke:black;fill:violet\" />\n          </g>\n\n          <g *ngFor=\"#_val of tick_marks_\">\n            <path [attr.d]=\"'M' + get_pos(_val) + ',5 v 30'\" style=\"stroke-width:2px;stroke:black\" />\n            <text [attr.x]=\"get_pos(_val)\" y=50 text-anchor=\"middle\" font-size=\"20\">{{_val}}</text>\n          </g>\n\n          <g *ngFor=\"#_runner of runners_; #_idx = index\"\n              [id]=\"get_color(_runner)\" class=\"rgb-runner\"\n              [attr.transform]=\"'translate(' + _runner.get_pos() + ', 0)'\"\n              (mousedown)=\"onMousedown(railref, $event, true, _idx)\" >\n\n            <g id=\"circle\" [attr.transform]=\" 'rotate(' + (-110 + (_idx * 40)) + ')' \" >\n              <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n              <g transform=\"rotate(120)\">\n                <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n                <g transform=\"rotate(120)\">\n                  <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n                </g>\n              </g>\n            </g>\n            -->\n          </g>\n\n        </svg>\n      </div>\n\n      <!--              -->\n      <!-- Vertical     -->\n      <!--              -->\n\n      <div *ngIf=is_vertical_>\n        <!--\n        <svg width=\"120\" preserveAspectRatio=\"xMinYMin meet\"\n             xmlns=\"http://www.w3.org/2000/svg\" [attr.viewBox]=\"'-40 -60 120 ' + (rl_ + 100)\" version=\"1.1\" >\n        -->\n        <svg  [attr.width]=\"is_special_ ? 80 : 120\" preserveAspectRatio=\"xMinYMin meet\"\n             xmlns=\"http://www.w3.org/2000/svg\" [attr.viewBox]=\"'-40 -40 ' + (is_special_ ? 80 : 120) + ' ' + (rl_ + 80)\" version=\"1.1\" >\n\n          <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n          <g *ngIf=\"!hide_rail_\" class=\"rgb-rail\" id=\"rail\" (mousedown)=\"onMousedown(railref, $event, false)\">\n            <path *ngIf=\"!is_special_\"  [attr.d]=\"'M -5,0 h 10 v' + (rl_) + ' h -10 z'\"\n                style=\"stroke-width:2px;stroke:black;fill:violet\" />\n            <path *ngIf=\"is_special_\" [attr.d]=\"'M -0,0 v' + (rl_)\" />\n          </g>\n\n          <g *ngIf=\"!hide_runners_\">\n            <g *ngIf=\"!is_special_\" *ngFor=\"#_val of tick_marks_\">\n              <path [attr.d]=\"'M 5,' + get_pos(_val) + ' h 30'\" style=\"stroke-width:2px;stroke:black\" />\n              <text [attr.y]=\"get_pos(_val)\" x=35 baseline-shift=\"-30%\" font-size=\"20\">{{_val}}</text>\n            </g>\n            <g *ngFor=\"#_runner of runners_; #_idx = index\"\n                [id]=\"get_color(_runner)\" class=\"rgb-runner\"\n                [attr.transform]=\"'translate(0, ' + _runner.get_pos() + ')'\"\n                (mousedown)=\"onMousedown(railref, $event, true, _idx)\" >\n\n              <g id=\"circle\" [attr.transform]=\"'rotate(' + (-110 + (_idx * 40)) + ')' \" >\n                <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n                <g transform=\"rotate(120)\">\n                  <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n                  <g transform=\"rotate(120)\">\n                    <path id=\"pie\" d=\"M 0 0 h 20 A 20,20 0 0,1 14.321 12.855 Z\" />\n                  </g>\n                </g>\n              </g>\n            </g>\n          </g>\n        </svg>\n      </div>\n    </div>\n  ",
                        styles: ["\n    g.rgb-runner#red {\n      opacity: 1.0;\n      stroke: black;\n      stroke-width: 1px;\n      fill: red;\n    }\n\n    g.rgb-runner#green {\n      opacity: 1.0;\n      stroke: black;\n      stroke-width: 1px;\n      fill: green;\n    }\n\n    g.rgb-runner#blue {\n      opacity: 1.0;\n      stroke: black;\n      stroke-width: 1px;\n      fill: blue;\n    }\n\n    g.rgb-runner :hover {\n      stroke-width: 2px;\n    }\n\n    g.rgb-rail {\n      stroke-width: 1px;\n      stroke: white;\n    }\n\n    g.rgb-rail :hover {\n      stroke-width: 3px;\n    }\n\n  "],
                        directives: [common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SvgSliderRgbCmp);
                return SvgSliderRgbCmp;
            })();
            exports_1("SvgSliderRgbCmp", SvgSliderRgbCmp);
        }
    }
});
