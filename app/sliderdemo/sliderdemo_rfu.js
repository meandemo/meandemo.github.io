System.register(['angular2/core', '../lipsum/lipsum'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, lipsum_1;
    var Slider001Cmp, Slider002Cmp, Slider003Cmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lipsum_1_1) {
                lipsum_1 = lipsum_1_1;
            }],
        execute: function() {
            // Slider: 001
            Slider001Cmp = (function () {
                function Slider001Cmp() {
                    this.id_ = '002';
                }
                Slider001Cmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-001',
                        template: "\n    <p>This is slider {{id_}}\n    </p>\n    <form>\n      <input type=\"range\" name=\"points0\" min=\"0\" max=\"100\" style=\"width: 50px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points1\" min=\"0\" max=\"100\" style=\"width: 50px;\">\n    </form>\n  ",
                        directives: [lipsum_1.LipsumCmp]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Slider001Cmp);
                return Slider001Cmp;
            })();
            exports_1("Slider001Cmp", Slider001Cmp);
            // Slider: 002
            Slider002Cmp = (function () {
                function Slider002Cmp() {
                    this.id_ = '002';
                }
                Slider002Cmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-002',
                        template: "\n    <p>This is slider {{id_}}\n    </p>\n    <form>\n      <input type=\"range\" name=\"points0\" min=\"0\" max=\"100\" style=\"width: 50px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points1\" min=\"0\" max=\"100\" style=\"width: 50px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points2\" min=\"0\" max=\"100\" style=\"width: 50px;\">\n    </form>\n    <gg-lipsum></gg-lipsum>\n  ",
                        directives: [lipsum_1.LipsumCmp]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Slider002Cmp);
                return Slider002Cmp;
            })();
            exports_1("Slider002Cmp", Slider002Cmp);
            // Slider: 003
            Slider003Cmp = (function () {
                function Slider003Cmp() {
                    this.id_ = '003';
                }
                Slider003Cmp = __decorate([
                    core_1.Component({
                        selector: 'gg-slider-003',
                        template: "\n    <p>This is slider {{id_}}\n    </p>\n    <form>\n      <input type=\"range\" name=\"points0\" min=\"0\" max=\"100\" style=\"width: 75px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points1\" min=\"0\" max=\"100\" style=\"width: 75px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points2\" min=\"0\" max=\"100\" style=\"width: 75px;\">\n    </form>\n    <form>\n      <input type=\"range\" name=\"points3\" min=\"0\" max=\"100\" style=\"width: 75px;\">\n    </form>\n    <gg-lipsum></gg-lipsum>\n  ",
                        directives: [lipsum_1.LipsumCmp]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Slider003Cmp);
                return Slider003Cmp;
            })();
            exports_1("Slider003Cmp", Slider003Cmp);
        }
    }
});
