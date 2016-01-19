System.register(['angular2/core', 'angular2/common', 'angular2/router', 'angular2/http'], function(exports_1) {
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
            ///////////////////////////////////////////////////////////////////////////////
            //
            // A 404 Page Catcher
            //
            // We've added a special http request to retrieve the URL
            // which has triggered the error route.
            //
            ///////////////////////////////////////////////////////////////////////////////
            ErrorCmp = (function () {
                function ErrorCmp(http_) {
                    var _this = this;
                    this.http_ = http_;
                    this.is_error_ = false;
                    http_.get('api/public/v1/errorurl').subscribe(function (response) {
                        _this.error_url_ = response.text();
                        _this.is_error_ = (_this.error_url_ !== '/error');
                    }, function (error) {
                        _this.is_error_ = false;
                        console.log('ERR =', error.text());
                    });
                }
                ErrorCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-error',
                        bindings: [http_1.HTTP_BINDINGS],
                        template: "\n  <div *ngIf=\"is_error_\">\n    Error,<br>\n    The requested url: {{error_url_}} does not exists.<br>\n  </div>\n  <div *ngIf=\"!is_error_\">\n    This is the site error page.<br>\n    You've done a reload of this page, haven't you?<br>\n    Or you've typed/pasted the url in the browser url bar.<br>\n  </div>\n  You can get back to the home page now!<br>\n  <a [routerLink]=\"['HomeCmp']\"><i class=\"fa fa-home w3-large\"></i></a>\n  ",
                        styles: ["\n  "],
                        directives: [router_1.RouterLink, common_1.NgIf]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ErrorCmp);
                return ErrorCmp;
            })();
            exports_1("ErrorCmp", ErrorCmp);
        }
    }
});
