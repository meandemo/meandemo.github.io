System.register(['angular2/core', 'angular2/src/animate/animation_builder'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, animation_builder_1;
    var AnimateHeightDrctv;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (animation_builder_1_1) {
                animation_builder_1 = animation_builder_1_1;
            }],
        execute: function() {
            ///////////////////////////////////////////////////////////////////////////////
            //
            // Height Animation Directive
            //
            ///////////////////////////////////////////////////////////////////////////////
            //
            // inspired from http://embed.plnkr.co/xkHA4HWwT9McoA4sbUnI
            // The exportAs allow the parent to get a reference to instance.
            // and call toggle() directly
            //
            AnimateHeightDrctv = (function () {
                function AnimateHeightDrctv(ab_, e_) {
                    this.ab_ = ab_;
                    this.e_ = e_;
                    this.is_visible_ = false;
                    this.value_ = '100px';
                }
                AnimateHeightDrctv.prototype.ngOnInit = function () {
                    if ('gg-animate-height' in this) {
                        this.value_ = this['gg-animate-height'];
                    }
                    // console.log("DEBUG height = ", this.value_);
                };
                AnimateHeightDrctv.prototype.toggle = function () {
                    this.is_visible_ = !this.is_visible_;
                    var animation = this.ab_.css();
                    animation.setDuration(500); // Duration in ms
                    if (this.is_visible_) {
                        // was invisible, change to visible
                        // height will change from 0 to given value
                        animation
                            .setFromStyles({ height: '0' })
                            .setToStyles({ height: this.value_ });
                    }
                    else {
                        // If is visible we make it slide up
                        animation
                            .setFromStyles({ height: this.value_ })
                            .setToStyles({ height: '0' });
                    }
                    // Animation has been defined, it can now start
                    animation.start(this.e_.nativeElement);
                };
                __decorate([
                    core_1.Input('gg-animate-height'), 
                    __metadata('design:type', String)
                ], AnimateHeightDrctv.prototype, "value_", void 0);
                AnimateHeightDrctv = __decorate([
                    core_1.Directive({
                        selector: '[gg-animate-height]',
                        exportAs: 'ah',
                    }), 
                    __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef])
                ], AnimateHeightDrctv);
                return AnimateHeightDrctv;
            })();
            exports_1("AnimateHeightDrctv", AnimateHeightDrctv);
        }
    }
});
