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
// \file      src/app/stickydiv/stickydiv.ts
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
// A configurable sticky div component
//
///////////////////////////////////////////////////////////////////////////////
var StickyDivCmp = (function () {
    //
    // We use the constructor to register a unique id
    // needed for the div#2 above
    //  <div [id]="id_div2_" ...>
    // and used by getElementById()
    //
    function StickyDivCmp() {
        this.is_sticky_ = false;
        this.y_offset_ = 0;
        this.div_width_ = 0;
        this.div_height_ = 0;
        this.div_top_ = 0;
        this.div_initial_top_ = 0;
        this.div_left_ = 0;
        this.do_resize_ = false;
        this.is_div2_fixed_ = false;
        this.id_div_top_ = "sticky-top-magic-" + StickyDivCmp.instance_cnt_;
        this.id_div2_ = "sticky-div2-magic-" + StickyDivCmp.instance_cnt_;
        ++StickyDivCmp.instance_cnt_;
    }
    //
    // At the ngOnInit() stage, we can't do much
    // The @Input is not yet injected as the maxscroll value
    // is not known at this stage (except if hardcoded value).
    //
    StickyDivCmp.prototype.ngOnInit = function () {
    };
    StickyDivCmp.prototype.height = function () {
        return this.div_height_;
    };
    //
    // At the afterViewInit() stage,
    // we can extract the div#2 size and position using getElementById.  
    // (could not find an 'angular' way to access DOM elements of the template)  
    //
    // Note that the use of a unique id for div#2  (using a static instance counter)
    // guarantees that getElementById() returns the div#2 
    // linked with 'this', the current class instance.
    // Note: @Input may not be injected yet!
    //
    StickyDivCmp.prototype.ngAfterViewInit = function () {
        this.div2_elm_ = document.getElementById(this.id_div2_);
        var bbox = this.div2_elm_.getBoundingClientRect();
        this.div_height_ = bbox.height;
        this.div_width_ = bbox.width;
        this.div_initial_top_ = bbox.top;
        this.div_left_ = bbox.left;
    };
    // At the afterViewChecked() stage,
    // @Input is injected, so we can finally obtain the numerical
    // value associated with this maxscroll property
    //
    StickyDivCmp.prototype.ngAfterViewChecked = function () {
        if ('maxscroll' in this) {
            this.is_sticky_ = true;
            this.y_offset_ = 0 + this.maxscroll;
            this.div_top_ = this.div_initial_top_ - this.y_offset_;
            if (this.do_resize_) {
                this.is_div2_fixed_ = false;
                var bbox = this.div2_elm_.getBoundingClientRect();
                this.div_height_ = bbox.height;
                this.div_width_ = bbox.width;
                this.div_initial_top_ = bbox.top;
                this.div_left_ = bbox.left;
                this.div_top_ = this.div_initial_top_ - this.y_offset_;
                this.do_resize_ = false;
            }
        }
    };
    StickyDivCmp.prototype.setStyles = function (is_fixed) {
        if (is_fixed) {
            return {
                'position': 'fixed',
                'padding': '0px',
                'z-index': 140,
                'height': this.div_height_ + "px",
                'width': this.div_width_ + "px",
                'top': this.div_top_ + "px",
                'left': this.div_left_ + "px"
            };
        }
        else {
            return {};
        }
    };
    //
    // When a sticky-div has scrolled up to its
    // max amount, it becomes fixed.
    //
    StickyDivCmp.prototype.onScroll = function () {
        if (this.is_sticky_) {
            this.is_div2_fixed_ = (window.pageYOffset >= this.y_offset_);
        }
    };
    //
    // Using a non-optiminal reset viewport 
    // to the top position.
    //
    StickyDivCmp.prototype.onResize = function () {
        window.scroll(0, 0);
        if (this.is_sticky_) {
            this.do_resize_ = true;
        }
        else {
            // update the div_height_ of fully scrollable sticky-div
            var bbox = this.div2_elm_.getBoundingClientRect();
            this.div_height_ = bbox.height;
        }
    };
    StickyDivCmp.instance_cnt_ = 0;
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], StickyDivCmp.prototype, "maxscroll", void 0);
    StickyDivCmp = __decorate([
        angular2_1.Component({
            selector: 'sticky-div',
            template: "\n  <!--\n    The 2 div below make the sticky div magic\n    We'll comment on the first after.\n    The second div includes the user content with ng-content,\n    after it has scrolled to it max position,\n    its position style is changed to 'fixed' with a high z-index, therefore\n    it remains always visible and the scrollable content located below\n    simply passes under it.\n\n    When the second div position is changed to 'fixed', it is removed from the\n    scrollable content, so we must add a content of the same height in place\n    of the the navbar. The first div is doing just this\n  -->\n\n    <div [id]=\"id_div_top_\"  (window:resize)=\"onResize()\">\n\n    <!-- div 1 -->\n\n    <div *ngIf=\"is_div2_fixed_\"\n      [style.height.px]=\"div_height_\"\n      [style.width.px]=\"div_width_\"\n      style=\"padding: 0; font-size: 12px; color: black; background-color: red\">\n      Ouch! If you see this text on the browser, you have a problem with\n      stick div id: {{id_div2_}}. It is likely that\n      the maxscroll value is not large enough, please\n      increase it.\n    </div>\n\n    <!-- div 2 -->\n\n    <div [id]=\"id_div2_\" [ngStyle]=\"setStyles(is_div2_fixed_)\"\n      (window:scroll)=\"onScroll()\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n  ",
            styles: ["\n  "],
            directives: [angular2_1.NgIf, angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [])
    ], StickyDivCmp);
    return StickyDivCmp;
})();
exports.StickyDivCmp = StickyDivCmp;
