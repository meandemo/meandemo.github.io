System.register(['angular2/core', 'angular2/common', '../slider/slider_service', '../../common/util', './runner'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, slider_service_1, util_1, runner_1;
    var SvgSliderDynCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (slider_service_1_1) {
                slider_service_1 = slider_service_1_1;
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
            // Slider with Dynamic number of runners
            //
            ///////////////////////////////////////////////////////////////////////////////
            SvgSliderDynCmp = (function () {
                function SvgSliderDynCmp(slider_service_) {
                    var _this = this;
                    this.slider_service_ = slider_service_;
                    this.minChange = new core_1.EventEmitter();
                    this.maxChange = new core_1.EventEmitter();
                    this.lengthChange = new core_1.EventEmitter();
                    //@Input('values') values_: any;
                    this.emit_values_ = new core_1.EventEmitter(false);
                    this.runners_ = [];
                    this.is_vertical_ = false;
                    this.is_special_ = false;
                    this.hide_rail_ = false;
                    this.hide_runners_ = false;
                    this.button_is_down_ = false;
                    this.tick_marks_ = [0, 20, 40, 60, 80, 100];
                    this.nb_ticks_ = 6;
                    this.min_ = 0;
                    this.max_ = 100;
                    this.nb_runners_ = 3;
                    this.rl_ = 700;
                    this.min_rl_ = 10;
                    this.max_rl_ = 4096;
                    var initial_values = util_1.Util.create_values(this.nb_runners_, this.min_, this.max_);
                    initial_values.forEach(function (val, i) {
                        var runner = new runner_1.Runner(val, _this.min_, _this.max_, _this.rl_);
                        _this.runners_.push(runner);
                    });
                    // console.log("[TRACE] constructor value = ", this.value_);
                    // console.log("[TRACE] pos   = ", this.pos_);
                    // console.log("[TRACE] trans = ", this.trans_pos_);
                    slider_service_.subscribe({
                        next: function (data) {
                            if (data.add) {
                                // console.log('[TRACE] Receive add slider request');
                                var runner = new runner_1.Runner(0, _this.min_, _this.max_, _this.rl_);
                                _this.runners_.push(runner);
                                runner.update_value(data.val);
                                _this.emit_full();
                            }
                            else if (data.del) {
                                // console.log('[TRACE] Receive remove slider request:', data.runner);
                                var idx;
                                idx = _this.runners_.findIndex(function (runner) {
                                    return (runner === data.runner);
                                });
                                _this.runners_.splice(idx, 1);
                                _this.emit_full();
                            }
                            else {
                                // console.log('[TRACE] Receive update slider request:', data.idx, ' with value ', data.val);
                                data.runner.update_value(data.val);
                            }
                        }
                    });
                }
                // given value between min and max
                // converted into a pixel position between 0 and rail length
                SvgSliderDynCmp.prototype.get_pos = function (v) {
                    var pos = (this.rl_ * (v - this.min_)) / (this.max_ - this.min_);
                    return util_1.Util.clip3(pos, 0, this.rl_);
                };
                SvgSliderDynCmp.prototype.emit_full = function () {
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
                        // console.log('[TRACE] Dyn emit* ', datas);
                        this[str].emit(datas);
                    }
                };
                SvgSliderDynCmp.prototype.ngOnChanges = function (changes) {
                    if (this.button_is_down_) {
                        return;
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
                SvgSliderDynCmp.prototype.ngOnInit = function () {
                    /*
                    if ('length' in this) {
                      this.rl_ = Util.clip3(Number(this.length), this.min_rl_, this.max_rl_);
                      this.runners_.forEach((runner: Runner, i: number, runners: Runner[]) => {
                        runner.update_rail_length(this.rl_);
                      });
                    }
                    this.emit_full();
                    */
                };
                SvgSliderDynCmp.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    if ('min' in this) {
                        this.min_ = Number(this.min);
                    }
                    if ('max' in this) {
                        this.max_ = Number(this.max);
                    }
                    if ('special' in this) {
                        // console.log("[TRACE] RGB ngAfterViewInit() special is true");
                        this.is_special_ = true;
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
                    this.rl_ = util_1.Util.clip3(this.rl_, this.min_rl_, this.max_rl_);
                    var initial_values = util_1.Util.create_values(this.nb_runners_, this.min_, this.max_);
                    this.runners_.forEach(function (runner, i, runners) {
                        runner.update_rail_length(_this.rl_);
                        runner.update_min(_this.min_);
                        runner.update_max(_this.max_);
                        runner.update_value(initial_values[i]);
                    });
                    this.emit_full();
                    this.tick_marks_ = util_1.Util.create_ticks(this.nb_ticks_, this.min_, this.max_);
                };
                SvgSliderDynCmp.prototype.onMouseclick = function (elm, evt, drunner) {
                    var idx = this.runners_.findIndex(function (runner) {
                        return (runner === drunner);
                    });
                    this.runners_.splice(idx, 1);
                    this.emit_full();
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
                    this.active_runners_ = [];
                    if (!on_button) {
                        // special case when the mouse down occur on the slide zone
                        // and not on the slider button:
                        // we add a slider here
                        var runner = new runner_1.Runner(0, this.min_, this.max_, this.rl_);
                        var delta = elm.getBoundingClientRect().left;
                        runner.set_delta(delta);
                        runner.update_position(evt.clientX - delta);
                        this.runners_.push(runner);
                        this.emit_full();
                        this.active_runners_.push(runner);
                    }
                    else {
                        this.active_runners_.push(this.runners_[idx]);
                        this.runners_[idx].init_mouse_down_evt(evt.clientX);
                    }
                };
                //
                // this function can only be called when button_is_down_ is true
                // as we have used a special div with *ngIf
                // <div *ngIf="button_is_down_"  (window:mousemove)="onMousemove($event)" ..
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                SvgSliderDynCmp.prototype.onMousemove = function (evt) {
                    this.active_runners_.forEach(function (runner, i, runners) {
                        runner.update_mouse_move_position(evt.clientX);
                    });
                    this.emit_full();
                };
                //
                // the release of the mouse button
                // removes the div with the (window:mousemove) events
                //
                SvgSliderDynCmp.prototype.onMouseup = function (evt) {
                    this.button_is_down_ = false;
                };
                SvgSliderDynCmp.cnt_ = 0;
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderDynCmp.prototype, "min", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "minChange", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SvgSliderDynCmp.prototype, "max", void 0);
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
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderDynCmp.prototype, "vertical", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderDynCmp.prototype, "special", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderDynCmp.prototype, "hiderail", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SvgSliderDynCmp.prototype, "hiderunners", void 0);
                __decorate([
                    core_1.Output('values'), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SvgSliderDynCmp.prototype, "emit_values_", void 0);
                SvgSliderDynCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-svg-slider-dyn',
                        template: "\n    <div id=\"slider\" style=\"margin:0px\">\n\n      <!-- special div which disables mousemove and mouseup event -->\n      <div *ngIf=\"button_is_down_\" style=\"position:relative\"\n           (window:mousemove)=\"onMousemove($event)\"\n           (window:mouseup)=\"onMouseup($event)\" >\n      </div>\n\n      <svg [attr.height]=\"is_special_  ? 80 : 120\" preserveAspectRatio=\"xMinYMin meet\"\n             xmlns=\"http://www.w3.org/2000/svg\"\n             [attr.viewBox]=\"(is_special_ ? -40 : -60) + ' -40 ' + (rl_ + 80) + ' ' + (is_special_ ? 80: 120)\" version=\"1.1\" >\n\n        <!-- reference (0,0), no fill, no stroke -->\n\n        <rect #railref  x=\"0\" y=\"0\" width=\"1\" height=\"1\" style=\"fill:none;stroke:none\"  />\n\n        <!-- rail group -->\n\n        <g *ngIf=\"!hide_rail_\" >\n          <g id=\"rail\" (mousedown)=\"onMousedown(railref, $event, false)\">\n            <path *ngIf=\"is_special_\"  [attr.d]=\"'M 0,-5 v 6  h' + (rl_) + ' v -6 z'\" style=\"fill:white\" />\n            <path *ngIf=\"!is_special_\" [attr.d]=\"'M 0,-5 v 10 h' + (rl_) + ' v -10 z'\" style=\"stroke-width:2px;stroke:black;fill:violet\" />\n          </g>\n\n          <!-- tick marks -->\n          <g *ngIf=\"!is_special_\" *ngFor=\"#_val of tick_marks_\">\n            <path [attr.d]=\"'M' + get_pos(_val) + ',5 v 30'\" style=\"stroke-width:2px;stroke:black\" />\n            <text [attr.x]=\"get_pos(_val)\" y=50 text-anchor=\"middle\" font-size=\"20\">{{_val}}</text>\n          </g>\n        </g>\n\n        <!-- runners group -->\n        <g *ngIf=\"!hide_runners_\">\n          <g *ngFor=\"#_runner of runners_; #_idx = index\"\n              [id]=\"_runner.get_id()\"\n              [attr.transform]=\"'translate(' + _runner.get_pos() + ', 0)'\">\n            <g class=\"runner\"\n              (mousedown)=\"onMousedown(railref, $event, true, _idx)\" >\n              <path *ngIf=\"!is_special_\" id=\"panel\" d=\"M 0 0 L 10 -10 L 30 -10 L 30 -35 L -30 -35 L -30 -10 L -10 -10 z\"\n                    style=\"color:black;fill:black\" />\n              <text *ngIf=\"!is_special_\" id=\"text\" x=\"0\" y=\"-17\" text-anchor=\"middle\"\n                  font-family=\"Verdana\" font-size=\"10\" fill=\"white\">{{_runner.get_id()}}\n              </text>\n              <path *ngIf=\"is_special_\" id=\"panel\" d=\"M 0 0 L 10  10 L 20  10 L 20  35 L -20  35 L -20  10 L -10  10 z\"\n                    style=\"color:black;fill:black;stroke:white;stroke-width:1px\" />\n\n              <g *ngIf=\"is_special_\" (click)=\"onMouseclick(railref, $event, _runner)\">\n                <rect x=\"10\" y=\"25\" width=\"9\" height=\"9\" style=\"fill:white\"  />\n                <path d=\"M 12 27 L 18 33\"\n                    style=\"stroke:black;stroke-width:1px\" />\n                <path d=\"M 18 27 L 12 33\"\n                    style=\"stroke:black;stroke-width:1px\" />\n              </g>\n            </g>\n          </g>\n        </g>\n      </svg>\n    </div>\n  ",
                        styles: ["\n  "],
                        directives: [common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [slider_service_1.SliderService])
                ], SvgSliderDynCmp);
                return SvgSliderDynCmp;
            })();
            exports_1("SvgSliderDynCmp", SvgSliderDynCmp);
        }
    }
});
