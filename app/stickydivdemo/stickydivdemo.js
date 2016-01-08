System.register(['angular2/core', 'angular2/router', '../stickydiv/stickydiv'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, stickydiv_1;
    var StickyDivDemoCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (stickydiv_1_1) {
                stickydiv_1 = stickydiv_1_1;
            }],
        execute: function() {
            StickyDivDemoCmp = (function () {
                function StickyDivDemoCmp() {
                }
                StickyDivDemoCmp = __decorate([
                    core_1.Component({
                        selector: 'gg-sticky-div-demo',
                        templateUrl: 'app/stickydivdemo/stickydivdemo.html',
                        directives: [stickydiv_1.StickyDivCmp, router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [])
                ], StickyDivDemoCmp);
                return StickyDivDemoCmp;
            })();
            exports_1("StickyDivDemoCmp", StickyDivDemoCmp);
        }
    }
});
/*
  private height_section_b_: number = 40;

  ngOnInit() {
    this.elm_hdr1_ = document.getElementById('inst1');
    //this.elm_hdr1_height_ += this.elm_hdr1_.getBoundingClientRect().height + ':ngOnInit ';
    this.inst1_height_ = this.elm_hdr1_.getBoundingClientRect().height; // + ':ngOnInit ';
  }

  ngAfterViewChecked() {
    if (!this.checked_) {
      this.elm_hdr1_ = document.getElementById('inst1');
      this.inst1_height_ = this.elm_hdr1_.getBoundingClientRect().height; // + ':ngAfterViewChecked ';
      this.checked_ = true;
    }
  }

  ngAfterViewInit() {
    this.elm_hdr1_ = document.getElementById('inst1');
    this.inst1_height_ = this.elm_hdr1_.getBoundingClientRect().height; // + ':ngAfterViewInit ';
  }
}

*/ 
