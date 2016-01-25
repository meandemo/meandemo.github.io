System.register(['angular2/core', 'angular2/common', 'angular2/router', '../http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, http_1;
    var ErrorCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ErrorCmp = (function () {
                function ErrorCmp(http_, location_) {
                    var _this = this;
                    this.http_ = http_;
                    this.location_ = location_;
                    this.error_state_ = 'forbidden';
                    var obs = http_.get_error_url();
                    obs.subscribe(function (response) {
                        // console.log('[TRACE obs.subscribe response = ', response);
                        _this.error_url_ = response.text();
                        _this.error_state_ = (_this.error_url_ === '/error') ? 'reloaded' : 'normal';
                    }, function (error) {
                        _this.error_state_ = 'forbidden';
                        // console.log('ERR =', error.text());
                    });
                }
                ErrorCmp = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        selector: 'gg-error',
                        template: "\n  <div [ngSwitch]=\"error_state_\">\n    <div *ngSwitchWhen=\"'forbidden'\">\n      Error,<br>\n      The previous request from server did not trigger a 404 response.<br>\n      You're running a test or you've hit the 'back' button of your browser.<br>\n    </div>\n    <div *ngSwitchWhen=\"'reloaded'\">\n      Error,<br>\n      You've done a reload of this page, haven't you?<br>\n      Either through a manual reload or a livereload or <br>\n      you've typed/pasted the /error url in the browser url bar.<br>\n    </div>\n    <div *ngSwitchWhen=\"'normal'\">\n      Error,<br>\n      The requested url: {{error_url_}} does not exists.<br>\n    </div>\n    <div *ngSwitchDefault>\n      Internal Error<br>\n      The internal state value is incorrect (state value is {{error_state_}}).\n       The requested url: {{error_url_}} does not exists.<br>\n    </div>\n  </div>  \n  <br>\n  <br>\n  You can get back to the home page now!<br>\n  <a [routerLink]=\"['HomeCmp']\"><i class=\"fa fa-home w3-large\"></i></a>\n  ",
                        styles: ["\n  "],
                        directives: [router_1.RouterLink, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault]
                    }), 
                    __metadata('design:paramtypes', [http_1.CustomHttp, router_1.Location])
                ], ErrorCmp);
                return ErrorCmp;
            })();
            exports_1("ErrorCmp", ErrorCmp);
        }
    }
});
