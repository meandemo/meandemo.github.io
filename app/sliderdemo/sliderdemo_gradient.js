System.register(['angular2/core', 'angular2/router', '../lipsum/lipsum', '../slider/slider_rgb', '../slider/slider_dyn', '../sliderdemo/sliderdemo_service', '../slider/slider_dyn_service', '../../common/util', '../animation/animations'], function(exports_1) {
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
    var core_1, router_1, lipsum_1, slider_rgb_1, slider_dyn_1, sliderdemo_service_1, slider_dyn_service_1, util_1, animations_1;
    var SliderDemoGradientCmp;
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
            function (slider_rgb_1_1) {
                slider_rgb_1 = slider_rgb_1_1;
            },
            function (slider_dyn_1_1) {
                slider_dyn_1 = slider_dyn_1_1;
            },
            function (sliderdemo_service_1_1) {
                sliderdemo_service_1 = sliderdemo_service_1_1;
            },
            function (slider_dyn_service_1_1) {
                slider_dyn_service_1 = slider_dyn_service_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (animations_1_1) {
                animations_1 = animations_1_1;
            }],
        execute: function() {
            SliderDemoGradientCmp = (function () {
                //  this.ctx_.beginPath();
                //  this.ctx_.moveTo(xs[0], 255 - yrs[0]);
                //  this.ctx_.lineTo(xs[1], 255 - yrs[1]);
                //  this.ctx_.stroke();
                //
                //  console.log('[DEBUG] X values = ', xs);
                //  console.log('[DEBUG] R values = ', yrs);
                //  }
                function SliderDemoGradientCmp(location_, dyn_slider_service_, slider_demo_service_) {
                    this.location_ = location_;
                    this.dyn_slider_service_ = dyn_slider_service_;
                    this.slider_demo_service_ = slider_demo_service_;
                    this.nb_points_ = 10;
                    this.initial_points_ = 3;
                    this.indexes_ = [];
                    this.rgbs_ = [];
                    this.xs_ = []; // = [10, 20, 30, 40];
                    this.ids_ = []; //= [null, null, null, null];
                    this.are_enabled_ = []; // = [false, false, false, false];
                    this.dx_ = 40;
                    this.dy_ = 40 + this.vrail_length_;
                    this.cfg_ = {
                        hide_colored_lines: false,
                        hide_vertical_bars: false,
                        hide_vertical_runners: false,
                        hide_horizontal_bar: false,
                        hide_horizontal_runners: false
                    };
                    this.r2i_table_ = new Map();
                    //this.indexes_ = Array.from({length: this.nb_points_}, ((v, k) => k));
                    //console.log('[DEBUG] Indexes = ', this.indexes_);
                    for (var i = 0; i < this.nb_points_; i++) {
                        this.indexes_.push(i);
                        this.xs_.push(0);
                        this.ids_.push(null);
                        this.are_enabled_.push(false);
                        var rgb = [0, 0, 0];
                        this.rgbs_.push(rgb);
                    }
                }
                SliderDemoGradientCmp.prototype.onCheckboxChange = function (name, evt) {
                    if (name === 'hide_colored_lines') {
                        this.cfg_.hide_colored_lines = !this.cfg_.hide_colored_lines;
                        this.update_curves();
                    }
                };
                SliderDemoGradientCmp.prototype.ngOnChanges = function (evt) {
                    console.log("TRACE: ngOnChanges()... ", evt);
                };
                SliderDemoGradientCmp.prototype.ngAfterViewInit = function () {
                };
                //  console.log('CANVAS width  = ', wt);
                //  console.log('CANVAS height = ', ht);
                //  this.ctx_.scale(1, 1);
                //  this.ctx_.fillStyle = '#FF0000';
                //  this.ctx_.strokeStyle = '#FF0000';
                SliderDemoGradientCmp.prototype.ngOnInit = function () {
                    // console.log('[TRACE] OnInit()');  // the canvas enclosure
                    var elm = document.getElementById('canvas-enclosure');
                    this.canvas_ = document.getElementById('canvas');
                    this.canvas_.width = elm.clientWidth;
                    this.canvas_.height = elm.clientHeight;
                    this.ctx_ = this.canvas_.getContext("2d");
                    this.ctx_.globalAlpha = 1;
                    this.ctx_.lineWidth = 2;
                    this.hrail_length_ = this.canvas_.width - 80;
                    this.vrail_length_ = this.canvas_.height - 120;
                    this.dx_ = 40;
                    this.dy_ = 40 + this.vrail_length_;
                };
                //  this.canvas_ = document.getElementById('canvas');
                //  this.ctx_ = this.canvas_.getContext("2d");
                SliderDemoGradientCmp.prototype.routerOnActivate = function (next, prev) {
                    //console.log('Activate:   navigating from ', prev);
                    //console.log('            navigating to ', next);
                    //console.log('            router state', this.location_);
                    //console.log('            router url() ', this.location_.normalize());
                    if (prev === null) {
                        //console.log('[DEBUG] Navigating to ', next);
                        //console.log('[DEBUG] Location is ', this.location_);
                        //console.log('[DEBUG] Hum! navigation to ', window.location.pathname, ' without navigate() or routerLink');
                        // need to notify the side navigation panel that we are on page 1
                        this.slider_demo_service_.emit(4);
                    }
                };
                SliderDemoGradientCmp.prototype.routerOnDeactivate = function (next, prev) {
                    //console.log('Deactivate: navigating from ', prev);
                    //console.log('            navigating to ', next);
                };
                SliderDemoGradientCmp.prototype.click_delete_runner = function (runner) {
                    //console.log('[TRACE] Requesting delete of runner ', runner);
                    var evt_data = { 'del': true, 'runner': runner };
                    this.dyn_slider_service_.next(evt_data);
                };
                SliderDemoGradientCmp.prototype.click_add_runner = function () {
                    //console.log('[TRACE] Requesting addition of a runner');
                    var evt_data = { 'add': true };
                    this.dyn_slider_service_.next(evt_data);
                };
                SliderDemoGradientCmp.prototype.runner_pos_change = function (runner, evt) {
                    var val = evt.target.valueAsNumber;
                    //console.log('[TRACE] Runner[', runner, '] has changed to', val);
                    var evt_data = { 'runner': runner, 'val': val };
                    this.dyn_slider_service_.next(evt_data);
                };
                SliderDemoGradientCmp.prototype.rgb_value_changes = function (idx, x, rgb_datas) {
                    //console.log('[TRACE] RGB[', idx, '] x = ', x, ' has changed to',
                    //            rgb_datas[0].value, rgb_datas[1].value, rgb_datas[2].value);
                    this.rgbs_[idx][0] = rgb_datas[0].value;
                    this.rgbs_[idx][1] = rgb_datas[1].value;
                    this.rgbs_[idx][2] = rgb_datas[2].value;
                    this.update_curves();
                };
                //
                // the rdatas are always sent in the same order
                // some elements may be removed, some may be added
                // We maintain a mapping between the vertical sliders RGB[0], RGB[1], ..... RGB[N-1]
                // and the horizontal slider Hxxx
                //
                //                R[0] R[1] R[2] R[3]
                //     Hxxx     [ H41F H9E3 H123  -   ]
                // All runners in the rdatas array must be assigned to
                // and RGB[x], this assignement must always be the same
                // Phase #1
                // Is it possible that some RGB[x] as associated with a ID not in the rdatas.
                // we mark this [x] as available
                // Phase #1
                // We iterate through the rdatas, with a hash table
                // If an ID is not is the hash table
                // We iterate through the RGB[x] to find the first free index
                // a associate the new name with it.
                // add current  [ H41F H9E3 H123 H24A ]
                //
                // del current  [ R41F R9E3 R123 R24A ]
                //
                SliderDemoGradientCmp.prototype.hrunner_changes = function (rdatas) {
                    var _this = this;
                    // Phase #0
                    // Initialize a mapping 'ID' -> idx f
                    var rmaps = new Map();
                    rdatas.forEach(function (rdata, i) {
                        rmaps.set(rdata.id, rdata.value);
                    });
                    var has_changed = false;
                    // Phase #1
                    // if an ID is not in rmaps, then it must be removed from the list of ID
                    //
                    this.ids_.forEach(function (id, i) {
                        if (id && rmaps.get(id) === undefined) {
                            _this.ids_[i] = null;
                            has_changed = true;
                        }
                    });
                    // Phase #2
                    // iterate through rdatas again, and check the global mapping
                    // some elements of rdatas may not be in the mapping
                    // (newly created elemnent)
                    rdatas.forEach(function (rdata) {
                        var id = rdata.id;
                        var idx = _this.r2i_table_.get(id);
                        if (idx === undefined) {
                            // this ID is not the global table
                            idx = _this.ids_.findIndex(function (lid) {
                                return lid === null;
                            });
                            if (idx !== -1) {
                                has_changed = true;
                                _this.r2i_table_.set(id, idx);
                                _this.ids_[idx] = id;
                            }
                        }
                    });
                    //
                    // IDS is now complete
                    // we can populate xs_ and are_enable_
                    //
                    this.ids_.forEach(function (id, i) {
                        if (id) {
                            _this.are_enabled_[i] = true;
                            _this.xs_[i] = rmaps.get(id);
                        }
                        else {
                            _this.are_enabled_[i] = false;
                        }
                        _this.update_curves();
                    });
                };
                //
                // xs_[i] is a vector of x coordinates
                // rgbs_[i] is a vector of 3 values [r, g, b]
                // step1: we need to sort the xs_[i] in increasing order
                // step2: prepare the x, yr, yg, yb array
                SliderDemoGradientCmp.prototype.update_curves = function () {
                    //console.log('[TRACE] update_curves()');
                    var _this = this;
                    // step 1: sort
                    var sindexes = Array.from({ length: this.nb_points_ }, (function (v, k) { return k; }));
                    sindexes.sort(function (a, b) {
                        // note: return -1  -> a is sorted lower than b
                        // note: return  0  -> a and b are not changed
                        // note: return  1  -> b is sorted lower than a
                        if (_this.are_enabled_[a] && _this.are_enabled_[b]) {
                            return _this.xs_[a] - _this.xs_[b];
                        }
                        else if (!_this.are_enabled_[a] && !_this.are_enabled_[b]) {
                            return 0;
                        }
                        else if (!_this.are_enabled_[a]) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    // step 2: prepare the x, y array
                    // - avoid duplicate on x coordinates
                    // - if length is 0 -> add default
                    // - if first is not at 0, duplicate first
                    // - if last is not at max, duplicate last
                    var xs = [];
                    var yrs = [];
                    var ygs = [];
                    var ybs = [];
                    var x_prev = NaN;
                    sindexes.forEach(function (idx) {
                        if (_this.are_enabled_[idx]) {
                            var x = _this.xs_[idx];
                            if (x !== x_prev) {
                                x_prev = x;
                                xs.push(x);
                                yrs.push(_this.rgbs_[idx][0]);
                                ygs.push(_this.rgbs_[idx][1]);
                                ybs.push(_this.rgbs_[idx][2]);
                            }
                        }
                    });
                    if (xs.length === 0) {
                        var xmid = this.hrail_length_ / 2;
                        var ymid = this.vrail_length_ / 2;
                        xs.push(xmid);
                        yrs.push(ymid);
                        ygs.push(ymid);
                        ybs.push(ymid);
                    }
                    if (xs[0] !== 0) {
                        xs.unshift(0);
                        yrs.unshift(yrs[0]);
                        ygs.unshift(ygs[0]);
                        ybs.unshift(ybs[0]);
                    }
                    var li = xs.length - 1;
                    if (xs[li] !== this.hrail_length_) {
                        xs.push(this.hrail_length_);
                        yrs.push(yrs[li]);
                        ygs.push(ygs[li]);
                        ybs.push(ybs[li]);
                    }
                    this.draw_canvas(xs, [yrs, ygs, ybs]);
                };
                //  let wt = this.canvas_.clientWidth;
                //  let ht = this.canvas_.clientHeight;
                //  console.log('CANVAS width  = ', wt);
                //  console.log('CANVAS height = ', ht);
                //  console.log('CANVAS width  = ', this.canvas_.getBoundingClientRect().width);
                //  console.log('CANVAS height = ', this.canvas_.getBoundingClientRect().height);
                //  this.ctx_.scale(100/315, 100/315);
                SliderDemoGradientCmp.prototype.draw_canvas = function (xs, yys) {
                    //  console.log('CANVAS width  = ', this.canvas_.getBoundingClientRect().width);
                    //  console.log('CANVAS height = ', this.canvas_.getBoundingClientRect().height);
                    var ctx = this.ctx_;
                    ctx.save();
                    ctx.moveTo(0, 0);
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, this.canvas_.width, this.canvas_.height);
                    var colors = ['red', 'green', 'blue'];
                    /*
                    ctx.fillStyle = '#FF0000';
                    ctx.strokeStyle = '#FF0000';
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(100, 100);
                    ctx.stroke();
                    */
                    ctx.save();
                    ctx.translate(40, 40 + this.vrail_length_);
                    ctx.scale(1, -1);
                    // draw background
                    var x0;
                    var ys0;
                    var x1 = xs[0];
                    var ys1 = yys.map(function (yy) { return yy[0]; });
                    var as = [0, 0, 0];
                    var bs = [0, 0, 0];
                    var cs = [0, 0, 0];
                    var i = 0;
                    for (var x = 0; x < this.hrail_length_; x++) {
                        if (x >= x1) {
                            i++;
                            x0 = x1;
                            ys0 = ys1;
                            x1 = xs[i];
                            ys1 = yys.map(function (yy) { return yy[i]; });
                            for (var c = 0; c < 3; c++) {
                                as[c] = (ys1[c] - ys0[c]) / (x1 - x0);
                                bs[c] = ys0[c] - as[c] * x0;
                            }
                        }
                        // RGB: 3 linear interpolations
                        for (var c = 0; c < 3; c++) {
                            var y = x * as[c] + bs[c];
                            cs[c] = 255 * (y / this.vrail_length_);
                        }
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, this.vrail_length_);
                        ctx.strokeStyle = util_1.Util.rgb2str(cs[0], cs[1], cs[2]);
                        ctx.stroke();
                    }
                    // draw RGB lines
                    if (!this.cfg_.hide_colored_lines) {
                        for (var c = 0; c < 3; c++) {
                            var ys = yys[c];
                            ctx.beginPath();
                            ctx.moveTo(xs[0], ys[0]);
                            for (var j = 1; j < xs.length; j++) {
                                ctx.lineTo(xs[j], ys[j]);
                            }
                            ctx.strokeStyle = colors[c];
                            ctx.stroke();
                        }
                    }
                    ctx.restore();
                    ctx.restore();
                };
                SliderDemoGradientCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-demo-gradient',
                        templateUrl: 'app/sliderdemo/sliderdemo_gradient.html',
                        styles: ["\n\n    div#container {\n      width: 100%;\n      height: 500px;\n      position: relative;\n      background: none;\n    }\n    div#container-control {\n      font-size: 12px;\n      width: 100%;\n      background: black;\n      color: white;\n    }\n    div#animate-control {\n      font-size: 12px;\n      width: 100%;\n      height: 20px;\n      background: black;\n      color: white;\n    }\n\n    div#canvas-enclosure {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      z-index: 5;\n      background: none;\n    }\n\n    canvas#canvas {\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      z-index: 6;\n      background: none;\n    }\n\n    div#hslider {\n      width: 100%;\n      height: 80px;\n      position: absolute;\n      bottom: 0px;\n      left: 0px;\n      z-index: 30;\n      background: none;\n    }\n\n    div#vslider {\n      margin: 0px;\n      width: 80px;\n      height: 100%;\n      background: none;\n      position: absolute;\n      top: 0px;\n      left: 250px;\n      background: none;\n      z-index: 20;\n    }\n}\n  "],
                        //styleUrls: ['css/sliderdemo_gradient.css'],
                        directives: [animations_1.AnimateHeightDrctv, lipsum_1.LipsumCmp, slider_rgb_1.SvgSliderRgbCmp, slider_dyn_1.SvgSliderDynCmp]
                    }),
                    __param(2, core_1.Inject(core_1.forwardRef(function () { return sliderdemo_service_1.SliderDemoService; }))), 
                    __metadata('design:paramtypes', [router_1.Location, slider_dyn_service_1.DynSliderService, sliderdemo_service_1.SliderDemoService])
                ], SliderDemoGradientCmp);
                return SliderDemoGradientCmp;
            })();
            exports_1("SliderDemoGradientCmp", SliderDemoGradientCmp);
        }
    }
});
