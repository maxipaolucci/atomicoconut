webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div style=\"text-align:center\">\r\n\r\n  <div>\r\n    <div class=\"currency-box\">\r\n      <div class=\"currency-box__contents\">\r\n        <h3>Moneros ({{xmrCount}})</h3> \r\n        today at <strong>{{xmrCurrentPrice | currency}}</strong>\r\n        <br><br>\r\n\r\n        Investment: <strong>{{usdFromXmrWhenBought | currency }}</strong> \r\n        <br>\r\n\r\n        on {{xmrBuyDate | date}} at {{xmrBuyPrice | currency}}\r\n\r\n        <div [class.color__green]=\"usdFromXmr >= usdFromXmrWhenBought\" \r\n            [class.color__red]=\"usdFromXmr < usdFromXmrWhenBought\">\r\n          <br>\r\n          ROI: <strong>{{ usdFromXmr | currency }}</strong> ({{usdFromXmr / usdFromXmrWhenBought * 100 | number : '1.1-2'}}%)\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n    <div class=\"currency-box\">\r\n      <div class=\"currency-box__contents\">\r\n        <h3>Bitcoins ({{btcCount}})</h3>\r\n        today at <strong>{{btcCurrentPrice | currency}}</strong>\r\n        <br><br>\r\n        \r\n        Investment: <strong>{{usdFromBtcWhenBought | currency }}</strong>\r\n        <br>\r\n        \r\n        on {{btcBuyDate | date}} at {{btcBuyPrice | currency}}\r\n\r\n        <div [class.color__green]=\"usdFromBtc >= usdFromBtcWhenBought\" \r\n            [class.color__red]=\"usdFromBtc < usdFromBtcWhenBought\">\r\n            <br>\r\n          ROI: <strong>{{ usdFromBtc | currency }}</strong> ({{usdFromBtc / usdFromBtcWhenBought * 100 | number : '1.1-2'}}%)\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"currency-box\">\r\n      <div class=\"currency-box__contents\">\r\n        <h3>Totals</h3>\r\n        <br>\r\n\r\n        Investment: <strong>{{totalInvestment | currency }}</strong>\r\n        <br>\r\n\r\n        <div [class.color__green]=\"totalReturn >= totalInvestment\" \r\n            [class.color__red]=\"totalReturn < totalInvestment\">\r\n          ROI: <strong>{{ totalReturn | currency }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".color__green {\n  color: green; }\n\n.color__red {\n  color: red; }\n\n.currency-box {\n  width: 100%; }\n  .currency-box .currency-box__contents {\n    font-family: Arial, Helvetica, sans-serif;\n    border: 1px solid blueviolet;\n    padding: 20px;\n    margin-bottom: 20px; }\n    .currency-box .currency-box__contents h3 {\n      margin: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.title = 'app';
        this.xmrCount = 218;
        this.xmrBuyPrice = 50; //USD
        this.xmrBuyDate = new Date(2017, 5, 23);
        this.usdFromXmr = 0;
        this.usdFromXmrWhenBought = 0;
        this.xmrCurrentPrice = 0;
        this.btcCount = 1.28129356;
        this.btcBuyPrice = 2359.99; //USD
        this.btcBuyDate = new Date(2017, 6, 19);
        this.usdFromBtc = 0;
        this.usdFromBtcWhenBought = 0;
        this.btcCurrentPrice = 0;
        this.totalInvestment = 0;
        this.totalReturn = 0;
        this.usdFromXmrWhenBought = this.xmrBuyPrice * this.xmrCount;
        this.usdFromBtcWhenBought = this.btcBuyPrice * this.btcCount;
        this.totalInvestment = this.usdFromBtcWhenBought + this.usdFromXmrWhenBought;
        this.xmr$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.btc$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.appService.getPrices('xmr').subscribe(function (pricesData) {
            _this.xmr$.next(pricesData);
            _this.xmrCurrentPrice = pricesData.price;
            _this.usdFromXmr = pricesData.price * _this.xmrCount;
            _this.totalReturn += _this.usdFromXmr;
        }, function (error) { return console.error(methodTrace + " There was an error trying to load Monero prices > " + error); });
        this.appService.getPrices().subscribe(function (pricesData) {
            _this.btc$.next(pricesData);
            _this.btcCurrentPrice = pricesData.price;
            _this.usdFromBtc = pricesData.price * _this.btcCount;
            _this.totalReturn += _this.usdFromBtc;
        }, function (error) { return console.error(methodTrace + " There was an error trying to load Bitcoin prices > " + error); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AppService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.serverUrl = 'https://api.cryptonator.com/api/ticker/';
        this.serverUrl2 = '/node';
    }
    AppService.prototype.getPrices = function (currency) {
        if (currency === void 0) { currency = 'btc'; }
        return this.http.get("" + this.serverUrl + currency + "-usd")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AppService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.success === true) {
            return body.ticker;
        }
        else {
            throw body;
        }
    };
    AppService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return AppService;
}());
AppService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], AppService);

var _a;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map