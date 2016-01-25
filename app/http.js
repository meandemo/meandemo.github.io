System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var CustomHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            /*
            export class CustomHttp extends Http {
            
              constructor(backend_: ConnectionBackend, defaultOptions_: RequestOptions) {
                super(backend_, defaultOptions_);
                console.log('CustomHTTP constructor');
              }
            
              public request(url: string | Request, options?: RequestOptionsArgs) {
                console.log('CustomHTTP REQ ', url);
                return super.request(url, options).do((res: Response) => {
                  console.log('REQ do()');
                  const warn: string = res.headers.get('Warning');
                  if (warn) {
                    console.log('Received: Warning = ', warn);
                  }
                });
              }
            
              public get(url: string, options?: RequestOptionsArgs) {
                console.log('CustomHTTP GET1 ', url);
                console.log('CustomHTTP GET2 ', options);
                let res = super.get(url, options);
                console.log('GET res()', res);
                return res;
              }
            }
            
            */
            //              @Inject(forwardRef(() => SliderDemoService)) private slider_demo_service_: SliderDemoService ) {
            CustomHttp = (function () {
                //private str_: string;
                //get str_() {
                //  console.log('TRACE: str_ has changed', this.str_);
                //  return this.str_;
                //}
                function CustomHttp(http_) {
                    this.http_ = http_;
                    // super();
                    // @Inject(forwardRef(() => Http)) private http_: Http) {
                    console.log('CustomHTTP constructor');
                }
                CustomHttp.prototype.request = function (url, options) {
                    console.log('CustomHTTP REQ ', url);
                    return this.http_.request(url, options).do(function (res) {
                        console.log('REQ do()');
                        var warn = res.headers.get('Warning');
                        if (warn) {
                            console.log('Received: Warning = ', warn);
                        }
                    });
                };
                CustomHttp.prototype.get = function (url, options) {
                    // console.log('CustomHTTP GET1 ', url);
                    // console.log('CustomHTTP GET2 ', options);
                    //  let res = this.http_.get(url, options);
                    //  console.log('GET res()', res);
                    //  return res;
                    //    console.log('GET subscribe()');
                    return this.http_.get(url, options).subscribe(function (res) {
                        // console.log('GET subscribe()');
                        var warn = res.headers.get('Warning');
                        if (warn) {
                        }
                    });
                };
                CustomHttp.prototype.get_error_url = function () {
                    var error_api = 'api/public/v1/errorurl';
                    // console.log('CustomHTTP GET*1 ', error_api);
                    return this.http_.get(error_api, null);
                };
                CustomHttp.prototype.post = function (url, body, options) {
                    return this.http_.post(url, body, options);
                };
                CustomHttp.prototype.put = function (url, body, options) {
                    console.log('CustomHTTP PUT ', url);
                    return this.http_.put(url, body, options);
                };
                CustomHttp.prototype.delete = function (url, options) {
                    return this.http_.delete(url, options);
                };
                CustomHttp.prototype.patch = function (url, body, options) {
                    return this.http_.patch(url, body, options);
                };
                CustomHttp.prototype.head = function (url, options) {
                    return this.http_.head(url, options);
                };
                CustomHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CustomHttp);
                return CustomHttp;
            })();
            exports_1("CustomHttp", CustomHttp);
        }
    }
});
