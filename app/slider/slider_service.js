System.register(['angular2/core'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var core_1;
    var SliderService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SliderService = (function (_super) {
                __extends(SliderService, _super);
                function SliderService() {
                    // The 'false' argument passed to the super function 
                    // allows a synchronous event emitter.
                    _super.call(this, false);
                    this.idx_ = 1;
                    this.instance_count_ = 0;
                }
                return SliderService;
            })(core_1.EventEmitter);
            exports_1("SliderService", SliderService);
        }
    }
});
