System.register(['../../common/util'], function(exports_1) {
    var util_1;
    var Runner;
    return {
        setters:[
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            ///////////////////////////////////////////////////////////////////////////////
            //
            // Common Runner Class
            //
            ///////////////////////////////////////////////////////////////////////////////
            Runner = (function () {
                function Runner(val, min, max, rl) {
                    this.val_ = 0; // exact value
                    this.delta_ = 0; // to track offset while mouseMove;
                    this.base_ = 0; // id. k.push(0);
                    this.pos_ = 0; // pixel offset on the rail
                    this.rl_ = 0; // rail length in pixel
                    this.min_ = 0; // default min
                    this.max_ = 100; // default max
                    this.is_inverted_ = false; // inverted pos - value
                    this.id_ = 'R' + util_1.Util.to_04X(Runner.cnt_);
                    Runner.cnt_ = util_1.Util.CRC16(Runner.cnt_);
                    //To${Runner.cnt_}`;
                    // val: initial value;
                    // rl: initial rail length
                    //
                    this.val_ = val;
                    this.rl_ = rl;
                    this.min_ = min;
                    this.max_ = max;
                    this.pos_ = this.value2pos(val);
                }
                // when the direction is changed
                // we update the position, not the value
                //
                Runner.prototype.set_direction = function (is_inverted) {
                    if (is_inverted !== this.is_inverted_) {
                        this.is_inverted_ = is_inverted;
                        this.pos_ = this.rl_ - this.pos_;
                    }
                };
                Runner.prototype.get_id = function () {
                    return this.id_;
                };
                Runner.prototype.get_pos = function () {
                    return this.pos_;
                };
                Runner.prototype.get_value = function (need_rounded) {
                    if (need_rounded) {
                        return Math.round(this.val_ * 10) / 10;
                    }
                    else {
                        return this.val_;
                    }
                };
                Runner.prototype.value2pos = function (v) {
                    var pos = (this.rl_ * (v - this.min_)) / (this.max_ - this.min_);
                    if (this.is_inverted_) {
                        pos = this.rl_ - pos;
                    }
                    return util_1.Util.clip3(pos, 0, this.rl_);
                };
                Runner.prototype.pos2value = function (p) {
                    var v = this.min_ + (p * (this.max_ - this.min_) / this.rl_);
                    if (this.is_inverted_) {
                        v = this.max_ - v;
                    }
                    return util_1.Util.clip3(v, this.min_, this.max_);
                };
                //
                // update the class when the value has changed
                //
                Runner.prototype.update_value = function (v) {
                    //console.log('[TRACE] update_valuie = ', v);
                    this.val_ = util_1.Util.clip3(v, this.min_, this.max_);
                    this.pos_ = this.value2pos(this.val_);
                };
                // update the class when the position has changed
                // special case of a new runner created at a given
                // position in pixel offset on rail
                //
                Runner.prototype.update_position = function (pos) {
                    //console.log('[TRACE] update_position = ', pos);
                    this.pos_ = util_1.Util.clip3(pos, 0, this.rl_);
                    this.val_ = this.pos2value(this.pos_);
                };
                //
                // update the class when the rail length has changed
                // value does not change, only the position on the rail
                //
                Runner.prototype.update_rail_length = function (rl) {
                    //console.log('[TRACE] set_value = ', v);
                    this.rl_ = rl;
                    this.pos_ = this.value2pos(this.val_);
                };
                //
                // update the class when the min value change
                // value does not change, only the position on the rail
                // changes
                //
                Runner.prototype.update_min = function (min) {
                    //console.log('[TRACE] min = ', v);
                    this.min_ = min;
                    this.pos_ = this.value2pos(this.val_);
                };
                //
                // update the class when the min value change
                // value does not change, only the position on the rail
                // changes
                //
                Runner.prototype.update_max = function (max) {
                    //console.log('[TRACE] min = ', v);
                    this.max_ = max;
                    this.pos_ = this.value2pos(this.val_);
                };
                //
                // to manage the mouse down & mouse move event
                //
                Runner.prototype.init_mouse_down_evt = function (offset) {
                    this.delta_ = offset - this.pos_;
                };
                Runner.prototype.set_delta = function (delta) {
                    this.delta_ = delta;
                };
                Runner.prototype.update_mouse_move_position = function (offset) {
                    var pos = offset - this.delta_;
                    this.pos_ = util_1.Util.clip3(pos, 0, this.rl_);
                    this.val_ = this.pos2value(this.pos_);
                };
                Runner.cnt_ = 0x1234; // instance counter
                return Runner;
            })();
            exports_1("Runner", Runner);
        }
    }
});
