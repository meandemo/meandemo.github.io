System.register(['angular2/core'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1;
    var DynSliderService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DynSliderService = (function (_super) {
                __extends(DynSliderService, _super);
                function DynSliderService() {
                    _super.call(this);
                    this.idx_ = 1;
                    this.instance_count_ = 0;
                }
                return DynSliderService;
            })(core_1.EventEmitter);
            exports_1("DynSliderService", DynSliderService);
        }
    }
});
