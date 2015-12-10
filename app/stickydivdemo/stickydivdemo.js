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
// \file      src/app/stickydivdemo/stickydivdemo.ts
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
///////////////////////////////////////////////////////////////////////////////
//
// StickyDivDemo Component  
// 
// route displayed as: http://localhost:3000/stickydivdemo 
//
///////////////////////////////////////////////////////////////////////////////
var stickydiv_1 = require('../stickydiv/stickydiv');
var StickyDivDemoCmp = (function () {
    function StickyDivDemoCmp() {
    }
    StickyDivDemoCmp.prototype.onClick = function () {
        var w = window.open();
        w.document.open();
        w.document.write("<h1>Hello World!</h1><p>To be removed in dist. version</p>");
        w.document.close();
    };
    StickyDivDemoCmp = __decorate([
        angular2_1.Component({
            selector: 'sticky-div-demo',
            templateUrl: 'app/stickydivdemo/stickydivdemo.html',
            directives: [stickydiv_1.StickyDivCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], StickyDivDemoCmp);
    return StickyDivDemoCmp;
})();
exports.StickyDivDemoCmp = StickyDivDemoCmp;
