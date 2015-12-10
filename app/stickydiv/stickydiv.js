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
    // needed for the div#2 above: <div [id]="instance_id_" ...>
    // and used by getElementById()
    //
    function StickyDivCmp() {
        this.y_offset_ = 0;
        this.div_width_ = 0;
        this.div_height_ = 0;
        this.div_top_ = 0;
        this.div_current_top_ = 0;
        this.div_left_ = 0;
        this.is_fixed_ = false;
        this.is_enabled_ = false;
        this.do_check_ = false;
        this.instance_id_ = "sticky-div-magic-" + StickyDivCmp.instance_cnt_;
        ++StickyDivCmp.instance_cnt_;
    }
    // 
    // At the ngOnInit() stage, we can't do much
    // The @Input is not yet injected if the maxscroll value
    // is not known at this stage.
    //
    StickyDivCmp.prototype.ngOnInit = function () {
        if ('maxscroll' in this) {
            this.is_enabled_ = true;
        }
    };
    StickyDivCmp.prototype.height = function () {
        return this.div_height_;
    };
    //
    // At the afterViewInit() stage,
    // we can extract the div#2 size and position using getElementById.  
    // We could not find an 'angular' way to access DOM elements of the template  
    // Note that without the use of a unique instance_id_,
    // we could not ensure that getElementById() returns the div#2 object
    // linked with 'this', the current class instance.
    // Note: @Input may not be injected yet.
    //
    StickyDivCmp.prototype.ngAfterViewInit = function () {
        var obj = document.getElementById(this.instance_id_);
        var bbox = obj.getBoundingClientRect();
        this.div_height_ = bbox.bottom - bbox.top;
        this.div_width_ = bbox.right - bbox.left;
        this.div_current_top_ = bbox.top;
        this.div_left_ = bbox.left;
        //console.log('[Trace] afterViewInit()     id     ' + this.instance_id_);
        //console.log('[Trace] afterViewInit()     top    ' + bbox.top);
        //console.log('[Trace] afterViewInit()     bottom ' + bbox.bottom);
        //console.log('[Trace] afterViewInit()     left   ' + bbox.left);
        //console.log('[Trace] afterViewInit()     right  ' + bbox.right);
    };
    //
    // At the afterViewChecked() stage,
    // @Input is injected, so we can finally obtain the numerical
    // value associated with this maxscroll property 
    //
    StickyDivCmp.prototype.ngAfterViewChecked = function () {
        if (!('maxscroll' in this)) {
            this.is_enabled_ = false;
            return;
        }
        this.is_enabled_ = true;
        //console.log('[Trace] afterViewChecked() id        = ' + this.instance_id_);
        this.y_offset_ = 0 + this.maxscroll;
        this.div_top_ = this.div_current_top_ - this.y_offset_;
    };
    StickyDivCmp.prototype.setStyles = function (is_fixed) {
        if (is_fixed) {
            return {
                'height': this.div_height_ + "px",
                'width': this.div_width_ + "px",
                'position': 'fixed',
                'padding': '0px',
                'z-index': 140,
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
        this.is_fixed_ = (window.pageYOffset >= this.y_offset_);
        // console.log('[Trace] onScroll()         id        = ' + this.instance_id_);
        // console.log('[Trace] onScroll()         pageYOf.. = ' + window.pageYOffset);
        // console.log('[Trace] onScroll()         is_fixed  = ' + this.is_fixed_);
    };
    //
    // not yet implemented
    //
    StickyDivCmp.prototype.onResize = function () {
        //console.log('[Trace] onResize() id        = ' + this.instance_id_);
    };
    StickyDivCmp.instance_cnt_ = 0;
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], StickyDivCmp.prototype, "maxscroll", void 0);
    StickyDivCmp = __decorate([
        angular2_1.Component({
            selector: 'sticky-div',
            template: "\n  <!--\n    The 2 div below make the sticky div magic   \n    We'll comment on the first after.\n    The second div includes the user content with ng-content,\n    after it has scrolled to it max position,\n    its position style is changed to 'fixed' with a high z-index, therefore\n    it remains always visible and the scrollable content located below\n    simply passes under it.\n\n    When the second div position is changed to 'fixed', it is removed from the\n    scrollable content, so we must add a content of the same height in place\n    of the the navbar. The first div is doing just this\n  -->     \n\n  <!-- div 1 -->\n\n    <div *ngIf=\"is_fixed_ && is_enabled_\" \n      [style.height.px]=\"div_height_\"\n      [style.width.px]=\"div_width_\"\n      style=\"padding: 0; font-size: 12px; color: black; background-color: red\">\n      Ouch! If you see this text on the browser, you have a problem with\n      stick div id: {{instance_id_}}. It is likely that  \n      the maxscroll value is not large enough, please\n      increase it.\n    </div>\n\n  <!-- div 2 -->\n\n    <div [id]=\"instance_id_\" [ngStyle]=\"setStyles(is_fixed_ && is_enabled_)\"\n      (window:scroll)=\"onScroll()\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n  "],
            directives: [angular2_1.NgIf, angular2_1.NgClass]
        }), 
        __metadata('design:paramtypes', [])
    ], StickyDivCmp);
    return StickyDivCmp;
})();
exports.StickyDivCmp = StickyDivCmp;
