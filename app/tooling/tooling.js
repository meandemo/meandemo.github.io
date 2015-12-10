var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
///////////////////////////////////////////////////////////////////////////////
//
// Tooling Component  
// 
// route displayed as: http://localhost:3000/tooling 
//
///////////////////////////////////////////////////////////////////////////////
var ToolingCmp = (function () {
    function ToolingCmp() {
    }
    ToolingCmp = __decorate([
        angular2_1.Component({
            selector: 'gg-tooling-cmp'
        }),
        angular2_1.View({
            template: "\n  <div class=\"w3-row w3-text-theme\">\n    <div class=\"w3-col m3 l2 w3-theme-l3\">\n      <div class=\"w3-container\">\n        <h3>Left panel</h3>\n      </div>     \n    </div>     \n    <div class=\"w3-col m6 l8\">\n      <div class=\"w3-container w3-light-green\">\n        <h3>Tooling</h3>\n        <table class=\"w3-table w3-bordered w3-border\" style=\"width:30%\">\n            <tr>\n              <th>Item</th>\n              <th>Value</th>\n            </tr>\n            <tr>\n              <td>class</td>\n              <td><code>ToolingCmp</code></td>\n            </tr>\n            <tr>\n              <td>selector</td>\n              <td><code>gg-tooling-cmp</code></td>\n            </tr>\n        </table>\n      </div>     \n    </div>     \n  </div>  \n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ToolingCmp);
    return ToolingCmp;
})();
exports.ToolingCmp = ToolingCmp;
