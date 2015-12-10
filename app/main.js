var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//
// header-start
//////////////////////////////////////////////////////////////////////////////////
//
// \file      src/app/main.ts
//
// \brief     This file belongs to the ng2 tutorial project
//
// \author    Bernard
//
// \copyright Copyright ng2goodies 2015
//            Distributed under the MIT License
//            See http://opensource.org/licenses/MIT
//
//////////////////////////////////////////////////////////////////////////////////
// header-log
//
// $Author$
// $Date$
// $Revision$
//
//////////////////////////////////////////////////////////////////////////////////
// header-end
//
var angular2_1 = require('angular2/angular2');
var stickydivdemo_1 = require('./stickydivdemo/stickydivdemo');
var MainCmp = (function () {
    function MainCmp() {
    }
    MainCmp = __decorate([
        angular2_1.Component({
            selector: 'main-cmp'
        }),
        angular2_1.View({
            template: "\n    <sticky-div-demo></sticky-div-demo>\n    ",
            directives: [stickydivdemo_1.StickyDivDemoCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], MainCmp);
    return MainCmp;
})();
angular2_1.bootstrap(MainCmp, []);