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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"inner mat-typography\">\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
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
    }
    AppComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging  
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__("../../../../../src/app/app.routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__custom_material_design_custom_material_design_module__ = __webpack_require__("../../../../../src/app/custom-material-design/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__crypto_currency_crypto_currency_component__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__crypto_currency_crypto_currency_service__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__investments_investments_component__ = __webpack_require__("../../../../../src/app/investments/investments.component.ts");
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__crypto_currency_crypto_currency_component__["a" /* CryptoCurrencyComponent */],
            __WEBPACK_IMPORTED_MODULE_12__investments_investments_component__["a" /* InvestmentsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_9__custom_material_design_custom_material_design_module__["a" /* CustomMaterialDesignModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_11__crypto_currency_crypto_currency_service__["a" /* CrytoCurrencyService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__investments_investments_component__ = __webpack_require__("../../../../../src/app/investments/investments.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by mpaoluc on 13/01/2017.
 */



var appRoutes = [
    {
        path: '',
        redirectTo: 'investments',
        pathMatch: 'full'
    },
    {
        path: 'investments',
        component: __WEBPACK_IMPORTED_MODULE_2__investments_investments_component__["a" /* InvestmentsComponent */]
    }
    // {
    //   path : 'page-not-found',
    //   component : PageNotFoundComponent
    // },
    // {
    //   path : '**',
    //   component : PageNotFoundComponent
    // }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app.routing.module.js.map

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

/***/ "../../../../../src/app/crypto-currency/crypto-currency.component.html":
/***/ (function(module, exports) {

module.exports = "<md-card class=\"currency-card\">\r\n  <md-card-header>\r\n    <div md-card-avatar \r\n        class=\"header-image\"\r\n        [class.header-image__xmr]=\"cryptoCurrency === 'xmr'\"\r\n        [class.header-image__btc]=\"cryptoCurrency === 'btc'\">\r\n    </div>\r\n    <md-card-title>{{cryptoCurrency === 'xmr' ? 'Monero' : 'Bitcoin' }} ({{cryptoCurrencyCount}})</md-card-title>\r\n    <md-card-subtitle>\r\n      today at <strong>{{cryptoCurrencyCurrentPrice | currency}}</strong>\r\n    </md-card-subtitle>\r\n  </md-card-header>\r\n  <md-card-content>\r\n    Investment: <strong>{{usdFromCryptoCurrencyWhenBought | currency }}</strong> \r\n    <br>\r\n\r\n    on {{cryptoCurrencyBuyDate | date}} at {{cryptoCurrencyBuyPrice | currency}}\r\n\r\n    <div [class.color__green]=\"usdFromCryptoCurrency >= usdFromCryptoCurrencyWhenBought\" \r\n        [class.color__red]=\"usdFromCryptoCurrency < usdFromCryptoCurrencyWhenBought\">\r\n      <br>\r\n      ROI: <strong>{{ usdFromCryptoCurrency | currency }}</strong> ({{usdFromCryptoCurrency / usdFromCryptoCurrencyWhenBought * 100 | number : '1.1-2'}}%)\r\n    </div>\r\n  </md-card-content>\r\n</md-card>"

/***/ }),

/***/ "../../../../../src/app/crypto-currency/crypto-currency.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".currency-card .header-image {\n  background-size: cover; }\n  .currency-card .header-image.header-image__xmr {\n    background-image: url(\"/assets/images/xmr.png\"); }\n  .currency-card .header-image.header-image__btc {\n    background-image: url(\"/assets/images/btc.png\"); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/crypto-currency/crypto-currency.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CryptoCurrencyComponent = (function () {
    function CryptoCurrencyComponent(crytoCurrencyService) {
        this.crytoCurrencyService = crytoCurrencyService;
        this.usdFromCryptoCurrency = 0;
        this.usdFromCryptoCurrencyWhenBought = 0;
        this.cryptoCurrencyCurrentPrice = 0;
        this.totalReturns = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.cryptoCurrency$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
    }
    CryptoCurrencyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.usdFromCryptoCurrencyWhenBought = this.cryptoCurrencyBuyPrice * this.cryptoCurrencyCount;
        this.crytoCurrencyService.getPrices(this.cryptoCurrency).subscribe(function (pricesData) {
            _this.cryptoCurrency$.next(pricesData);
            _this.cryptoCurrencyCurrentPrice = pricesData.price;
            _this.usdFromCryptoCurrency = pricesData.price * _this.cryptoCurrencyCount;
            _this.totalReturns.emit({
                usdFromCryptoCurrencyWhenBought: _this.usdFromCryptoCurrencyWhenBought,
                usdFromCryptoCurrency: _this.usdFromCryptoCurrency
            });
        }, function (error) { return console.error(methodTrace + " There was an error trying to load Monero prices > " + error); });
    };
    return CryptoCurrencyComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], CryptoCurrencyComponent.prototype, "cryptoCurrency", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyCount", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyBuyPrice", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyBuyDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], CryptoCurrencyComponent.prototype, "totalReturns", void 0);
CryptoCurrencyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'app-crypto-currency',
        template: __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.component.html"),
        styles: [__webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__["a" /* CrytoCurrencyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__["a" /* CrytoCurrencyService */]) === "function" && _b || Object])
], CryptoCurrencyComponent);

var _a, _b;
//# sourceMappingURL=crypto-currency.component.js.map

/***/ }),

/***/ "../../../../../src/app/crypto-currency/crypto-currency.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrytoCurrencyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CrytoCurrencyService = (function () {
    function CrytoCurrencyService(http) {
        this.http = http;
        this.serverUrl = 'https://api.cryptonator.com/api/ticker/';
        this.serverUrl2 = '/node';
    }
    CrytoCurrencyService.prototype.getPrices = function (currency) {
        if (currency === void 0) { currency = 'btc'; }
        return this.http.get("" + this.serverUrl + currency + "-usd")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CrytoCurrencyService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.success === true) {
            return body.ticker;
        }
        else {
            throw body;
        }
    };
    CrytoCurrencyService.prototype.handleError = function (error) {
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
    return CrytoCurrencyService;
}());
CrytoCurrencyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], CrytoCurrencyService);

var _a;
//# sourceMappingURL=crypto-currency.service.js.map

/***/ }),

/***/ "../../../../../src/app/custom-material-design/custom-material-design.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialDesignModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomMaterialDesignModule = (function () {
    function CustomMaterialDesignModule() {
    }
    return CustomMaterialDesignModule;
}());
CustomMaterialDesignModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MaterialModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MaterialModule */]]
    })
], CustomMaterialDesignModule);

//# sourceMappingURL=custom-material-design.module.js.map

/***/ }),

/***/ "../../../../../src/app/investments/investments.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\">\r\n    <app-crypto-currency fxFlex \r\n      [cryptoCurrency]=\"'xmr'\"\r\n      [cryptoCurrencyCount]=\"218\"\r\n      [cryptoCurrencyBuyPrice]=\"50\"\r\n      [cryptoCurrencyBuyDate]=\"xmrBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </app-crypto-currency>\r\n\r\n    <app-crypto-currency fxFlex\r\n      [cryptoCurrency]=\"'btc'\"\r\n      [cryptoCurrencyCount]=\"1.28129356\"\r\n      [cryptoCurrencyBuyPrice]=\"2359.99\"\r\n      [cryptoCurrencyBuyDate]=\"btcBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </app-crypto-currency>\r\n  </div>\r\n\r\n  <md-card fxFlex class=\"totals-card\">\r\n    <md-card-header>\r\n      <div md-card-avatar \r\n          class=\"header-image header-image__totals\">\r\n      </div>\r\n      <md-card-title>Totals</md-card-title>\r\n      <md-card-subtitle>\r\n        today at <strong>{{cryptoCurrencyCurrentPrice | currency}}</strong>\r\n      </md-card-subtitle>\r\n    </md-card-header>\r\n    <md-card-content>\r\n      Investment: <strong>{{totalInvestment | currency }}</strong>\r\n      <br>\r\n\r\n      <div [class.color__green]=\"totalReturn >= totalInvestment\" \r\n          [class.color__red]=\"totalReturn < totalInvestment\">\r\n        ROI: <strong>{{ totalReturn | currency }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n      </div>\r\n    </md-card-content>\r\n  </md-card>\r\n  \r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/investments/investments.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".totals-card .header-image {\n  background-size: cover; }\n  .totals-card .header-image.header-image__totals {\n    background-image: url(\"/assets/images/equals.jpg\"); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/investments/investments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InvestmentsComponent = (function () {
    function InvestmentsComponent() {
        // this.usdFromXmrWhenBought = this.xmrBuyPrice * this.xmrCount;
        // this.usdFromBtcWhenBought = this.btcBuyPrice * this.btcCount;
        // this.totalInvestment = this.usdFromBtcWhenBought + this.usdFromXmrWhenBought;
        this.xmrBuyDate = new Date(2017, 5, 23);
        this.btcBuyDate = new Date(2017, 6, 19);
        // private xmr$ : BehaviorSubject<any>;
        // private xmrCount = 218;
        // private xmrBuyPrice = 50; //USD
        // private xmrBuyDate = new Date(2017, 5, 23);
        // private usdFromXmr = 0;
        // private usdFromXmrWhenBought = 0;
        // private xmrCurrentPrice = 0;
        // private btc$ : BehaviorSubject<any>;
        // private btcCount = 1.28129356;
        // private btcBuyPrice = 2359.99; //USD
        // private btcBuyDate = new Date(2017, 6, 19);
        // private usdFromBtc = 0;
        // private usdFromBtcWhenBought = 0;
        // private btcCurrentPrice = 0;
        this.totalInvestment = 0;
        this.totalReturn = 0;
        // this.xmr$ = new BehaviorSubject<any>(null);
        // this.btc$ = new BehaviorSubject<any>(null);
    }
    InvestmentsComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        // this.crytoCurrencyService.getPrices('xmr').subscribe(
        //   (pricesData : any) => {
        //     this.xmr$.next(pricesData);
        //     this.xmrCurrentPrice = pricesData.price; 
        //     this.usdFromXmr = pricesData.price * this.xmrCount;
        //     this.totalReturn += this.usdFromXmr; 
        //   },
        //   (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
        // );
        // this.crytoCurrencyService.getPrices().subscribe(
        //   (pricesData : any) => {
        //     this.btc$.next(pricesData);
        //     this.btcCurrentPrice = pricesData.price;
        //     this.usdFromBtc = pricesData.price * this.btcCount;
        //     this.totalReturn += this.usdFromBtc;
        //   },
        //   (error : any) =>  console.error(`${methodTrace} There was an error trying to load Bitcoin prices > ${error}`)
        // );
    };
    InvestmentsComponent.prototype.setTotals = function (totalReturns) {
        this.totalReturn += totalReturns.usdFromCryptoCurrency;
        this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
    };
    return InvestmentsComponent;
}());
InvestmentsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'app-investments',
        template: __webpack_require__("../../../../../src/app/investments/investments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/investments/investments.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], InvestmentsComponent);

//# sourceMappingURL=investments.component.js.map

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