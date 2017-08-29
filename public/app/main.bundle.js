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

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"inner mat-typography\">\r\n\r\n  <md-toolbar class=\"toolbar\" color=\"primary\">\r\n    <span>AtomiCoconut</span>\r\n    <span class=\"example-spacer\"></span>\r\n    <md-icon class=\"example-icon\">build</md-icon>\r\n    <md-icon (click)=\"logout()\" class=\"example-icon\">exit_to_app</md-icon>\r\n  </md-toolbar>\r\n\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar {\n  margin-bottom: 10px; }\n  .toolbar .example-icon {\n    padding: 0 14px;\n    cursor: pointer; }\n  .toolbar .example-spacer {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
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
    function AppComponent(appService, usersService) {
        this.appService = appService;
        this.usersService = usersService;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging  
        this.usersService.getAuthenticatedUser().subscribe(function (data) {
            if (data && data.email) {
                console.log(methodTrace, data);
            }
            else {
                console.info(methodTrace + " User not logged in.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    AppComponent.prototype.logout = function () {
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging  
        this.usersService.logout().subscribe(function (data) {
            console.log(methodTrace, data);
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_custom_material_design_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/custom-material-design/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_users_users_module__ = __webpack_require__("../../../../../src/app/modules/users/users.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__crypto_currency_crypto_currency_component__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__crypto_currency_crypto_currency_service__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__investments_investments_component__ = __webpack_require__("../../../../../src/app/investments/investments.component.ts");
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
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_9__modules_custom_material_design_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_10__modules_users_users_module__["a" /* UsersModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__crypto_currency_crypto_currency_component__["a" /* CryptoCurrencyComponent */],
            __WEBPACK_IMPORTED_MODULE_13__investments_investments_component__["a" /* InvestmentsComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_12__crypto_currency_crypto_currency_service__["a" /* CrytoCurrencyService */]],
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
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]
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

module.exports = "<md-card class=\"currency-card\">\n  <md-card-header>\n    <div md-card-avatar \n        class=\"header-image\"\n        [class.header-image__xmr]=\"cryptoCurrency === 'xmr'\"\n        [class.header-image__btc]=\"cryptoCurrency === 'btc'\">\n    </div>\n    <md-card-title>{{cryptoCurrency === 'xmr' ? 'Monero' : 'Bitcoin' }} ({{cryptoCurrencyCount}})</md-card-title>\n    <md-card-subtitle>\n      today at <strong>{{cryptoCurrencyCurrentPrice | currency}}</strong>\n    </md-card-subtitle>\n  </md-card-header>\n  <md-card-content>\n    Investment: <strong>{{usdFromCryptoCurrencyWhenBought | currency }}</strong> \n    <br>\n\n    on {{cryptoCurrencyBuyDate | date}} at {{cryptoCurrencyBuyPrice | currency}}\n\n    <div [class.color__green]=\"usdFromCryptoCurrency >= usdFromCryptoCurrencyWhenBought\" \n        [class.color__red]=\"usdFromCryptoCurrency < usdFromCryptoCurrencyWhenBought\">\n      <br>\n      ROI: <strong>{{ usdFromCryptoCurrency | currency }}</strong> ({{usdFromCryptoCurrency / usdFromCryptoCurrencyWhenBought * 100 | number : '1.1-2'}}%)\n    </div>\n  </md-card-content>\n</md-card>"

/***/ }),

/***/ "../../../../../src/app/crypto-currency/crypto-currency.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".currency-card {\n  text-align: center; }\n  .currency-card .header-image {\n    background-size: cover; }\n    .currency-card .header-image.header-image__xmr {\n      background-image: url(\"/assets/images/xmr.png\"); }\n    .currency-card .header-image.header-image__btc {\n      background-image: url(\"/assets/images/btc.png\"); }\n", ""]);

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], CryptoCurrencyComponent.prototype, "totalReturns", void 0);
CryptoCurrencyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
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

/***/ "../../../../../src/app/directives/equal-validator.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EqualValidatorDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var EqualValidatorDirective = EqualValidatorDirective_1 = (function () {
    function EqualValidatorDirective(equalFormControlName) {
        this.equalFormControlName = equalFormControlName;
    }
    EqualValidatorDirective.prototype.validate = function (control) {
        var equalsFormControl = control.root.get(this.equalFormControlName);
        if (equalsFormControl && equalsFormControl.value !== control.value) {
            return { 'equalValidator': true };
        }
        return null;
    };
    return EqualValidatorDirective;
}());
EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Directive */])({
        selector: '[equalvalidation]',
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* NG_VALIDATORS */], useExisting: EqualValidatorDirective_1, multi: true }]
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Attribute */])('equalvalidation')),
    __metadata("design:paramtypes", [String])
], EqualValidatorDirective);

var EqualValidatorDirective_1;
//# sourceMappingURL=equal-validator.directive.js.map

/***/ }),

/***/ "../../../../../src/app/investments/investments.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\">\r\n    <app-crypto-currency fxFlex \r\n      [cryptoCurrency]=\"'xmr'\"\r\n      [cryptoCurrencyCount]=\"218.85627651\"\r\n      [cryptoCurrencyBuyPrice]=\"50\"\r\n      [cryptoCurrencyBuyDate]=\"xmrBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </app-crypto-currency>\r\n\r\n    <app-crypto-currency fxFlex\r\n      [cryptoCurrency]=\"'btc'\"\r\n      [cryptoCurrencyCount]=\"1.28129356\"\r\n      [cryptoCurrencyBuyPrice]=\"2359.99\"\r\n      [cryptoCurrencyBuyDate]=\"btcBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </app-crypto-currency>\r\n  </div>\r\n\r\n  <md-card fxFlex class=\"totals-card\">\r\n    <md-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>Total Investments: <strong>{{totalInvestment | currency }}</strong></p>\r\n      <p [class.color__green]=\"totalReturn >= totalInvestment\" \r\n          [class.color__red]=\"totalReturn < totalInvestment\">\r\n        Total ROI: <strong>{{ totalReturn | currency }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n      </p>\r\n    </md-card-content>\r\n  </md-card>\r\n  \r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/investments/investments.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".totals-card {\n  text-align: center; }\n  .totals-card md-card-content p {\n    margin-bottom: 0; }\n", ""]);

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-investments',
        template: __webpack_require__("../../../../../src/app/investments/investments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/investments/investments.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], InvestmentsComponent);

//# sourceMappingURL=investments.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/custom-material-design/custom-material-design.module.ts":
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

/***/ "../../../../../src/app/modules/dynamic-form/dynamic-form-question/dynamic-form-question.component.html":
/***/ (function(module, exports) {

module.exports = "<div [formGroup]=\"form\" [ngSwitch]=\"question.controlType\">\r\n  \r\n  <md-input-container *ngSwitchCase=\"'textbox'\" class=\"example-full-width\">\r\n    <input mdInput \r\n        [type]=\"question.type\" \r\n        [id]=\"question.key\" \r\n        [placeholder]=\"question.label\" \r\n        [formControlName]=\"question.key\">\r\n\r\n    <md-error *ngIf=\"!isValid && form.get(question.key).hasError('required')\">{{question.label}} is required</md-error>\r\n    <md-error *ngIf=\"!isValid && form.get(question.key).hasError('minlength')\">{{question.label}} must contains at least {{form.get(question.key).errors.minlength.requiredLength}} characters</md-error>\r\n    <md-error *ngIf=\"!isValid && form.get(question.key).hasError('maxlength')\">{{question.label}} must contains {{form.get(question.key).errors.maxlength.requiredLength}} or less characters</md-error>\r\n    <md-error *ngIf=\"!isValid && form.get(question.key).hasError('email')\">{{question.label}} must be a valid email address</md-error>\r\n  </md-input-container>\r\n  <!-- <pre>{{form.get(question.key).errors | json}}</pre> -->\r\n\r\n  <md-select [id]=\"question.key\" *ngSwitchCase=\"'dropdown'\" [formControlName]=\"question.key\" [placeholder]=\"question.label\">\r\n    <md-option *ngFor=\"let opt of question.options\" [value]=\"opt.key\">{{opt.value}}</md-option>\r\n  </md-select>\r\n\r\n</div> "

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/dynamic-form-question/dynamic-form-question.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_base__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/question-base.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormQuestionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DynamicFormQuestionComponent = (function () {
    function DynamicFormQuestionComponent() {
    }
    Object.defineProperty(DynamicFormQuestionComponent.prototype, "isValid", {
        get: function () {
            return this.form.controls[this.question.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    return DynamicFormQuestionComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__question_base__["a" /* QuestionBase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__question_base__["a" /* QuestionBase */]) === "function" && _a || Object)
], DynamicFormQuestionComponent.prototype, "question", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormGroup */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormGroup */]) === "function" && _b || Object)
], DynamicFormQuestionComponent.prototype, "form", void 0);
DynamicFormQuestionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'df-question',
        template: __webpack_require__("../../../../../src/app/modules/dynamic-form/dynamic-form-question/dynamic-form-question.component.html")
    })
], DynamicFormQuestionComponent);

var _a, _b;
//# sourceMappingURL=dynamic-form-question.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/dynamic-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\" novalidate>\r\n\r\n    <df-question *ngFor=\"let question of questions\" [question]=\"question\" [form]=\"form\"></df-question>\r\n    <md-error *ngFor=\"let error of postSubmitErrors\">{{error}}</md-error>\r\n    <div>\r\n      <button class=\"mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!form.valid\">Register</button>\r\n    </div>\r\n  </form>\r\n\r\n  <div *ngIf=\"payLoad\">\r\n    <strong>Saved the following values</strong><br>{{payLoad}}\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/dynamic-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__question_control_service__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/question-control.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicFormComponent = (function () {
    function DynamicFormComponent(qcs) {
        this.qcs = qcs;
        this.questions = [];
        this.postSubmitErrors = [];
        this.formData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.payLoad = '';
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.qcs.toFormGroup(this.questions);
    };
    DynamicFormComponent.prototype.ngOnChanges = function (changes) {
        // if (changes.postSubmitErrors && !changes.postSubmitErrors.isFirstChange()) {
        // }
        // //OR....
        // for (let propName in changes) {
        //   let changedProp = changes[propName];
        //   let to = JSON.stringify(changedProp.currentValue);
        //   if (changedProp.isFirstChange()) {
        //     console.log(`Initial value of ${propName} set to ${to}`);
        //   } else {
        //     let from = JSON.stringify(changedProp.previousValue);
        //     console.log(`${propName} changed from ${from} to ${to}`);
        //   }
        // }
    };
    DynamicFormComponent.prototype.onSubmit = function () {
        this.payLoad = JSON.stringify(this.form.value);
        this.formData.emit(this.form.value); //send data to the component that use the dynamic form compoennt
    };
    return DynamicFormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Array)
], DynamicFormComponent.prototype, "questions", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Array)
], DynamicFormComponent.prototype, "postSubmitErrors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], DynamicFormComponent.prototype, "formData", void 0);
DynamicFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'dynamic-form',
        template: __webpack_require__("../../../../../src/app/modules/dynamic-form/dynamic-form.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_1__question_control_service__["a" /* QuestionControlService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__question_control_service__["a" /* QuestionControlService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__question_control_service__["a" /* QuestionControlService */]) === "function" && _b || Object])
], DynamicFormComponent);

var _a, _b;
//# sourceMappingURL=dynamic-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/dynamic-form.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dynamic_form_component__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dynamic_form_question_dynamic_form_question_component__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/dynamic-form-question/dynamic-form-question.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__question_control_service__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/question-control.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_custom_material_design_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/custom-material-design/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_equal_validator_directive__ = __webpack_require__("../../../../../src/app/directives/equal-validator.directive.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DynamicFormModule = (function () {
    function DynamicFormModule() {
    }
    return DynamicFormModule;
}());
DynamicFormModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__dynamic_form_component__["a" /* DynamicFormComponent */],
            __WEBPACK_IMPORTED_MODULE_4__dynamic_form_question_dynamic_form_question_component__["a" /* DynamicFormQuestionComponent */],
            __WEBPACK_IMPORTED_MODULE_7__directives_equal_validator_directive__["a" /* EqualValidatorDirective */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__modules_custom_material_design_custom_material_design_module__["a" /* CustomMaterialDesignModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__dynamic_form_component__["a" /* DynamicFormComponent */],
            __WEBPACK_IMPORTED_MODULE_4__dynamic_form_question_dynamic_form_question_component__["a" /* DynamicFormQuestionComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_5__question_control_service__["a" /* QuestionControlService */]]
    })
], DynamicFormModule);

//# sourceMappingURL=dynamic-form.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/question-base.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionBase; });
var QuestionBase = (function () {
    function QuestionBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    return QuestionBase;
}());

//# sourceMappingURL=question-base.js.map

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/question-control.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionControlService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionControlService = (function () {
    function QuestionControlService() {
    }
    QuestionControlService.prototype.toFormGroup = function (questions) {
        var group = {};
        questions.forEach(function (question) {
            group[question.key] = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormControl */](question.value || '', question.validators || []);
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormGroup */](group);
    };
    return QuestionControlService;
}());
QuestionControlService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], QuestionControlService);

//# sourceMappingURL=question-control.service.js.map

/***/ }),

/***/ "../../../../../src/app/modules/dynamic-form/question-textbox.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__question_base__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/question-base.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextboxQuestion; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextboxQuestion = (function (_super) {
    __extends(TextboxQuestion, _super);
    function TextboxQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.type = options['type'] || '';
        return _this;
    }
    return TextboxQuestion;
}(__WEBPACK_IMPORTED_MODULE_0__question_base__["a" /* QuestionBase */]));

//# sourceMappingURL=question-textbox.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" novalidate>\r\n    <!-- Email -->\r\n    <md-input-container class=\"example-full-width\">\r\n      <input mdInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n          [(ngModel)]=\"model.email\" \r\n          required email\r\n          #email=\"ngModel\">\r\n\r\n      <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</md-error>\r\n      <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</md-error>\r\n    </md-input-container>\r\n    \r\n    <!-- Password -->\r\n    <md-input-container class=\"example-full-width\">\r\n      <input mdInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n          [(ngModel)]=\"model.password\" \r\n          required minlength=\"3\" maxlength=\"8\"\r\n          #password=\"ngModel\">\r\n\r\n      <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</md-error>\r\n      <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</md-error>\r\n      <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</md-error>\r\n    </md-input-container>\r\n\r\n    <div>\r\n      <button class=\"mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!loginForm.form.valid\">Register</button>\r\n    </div>\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.model = { email: '', password: '' };
        this.submitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.submitted = true;
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.login(this.model).subscribe(function (data) {
            if (data && data.email) {
                console.log(data);
                _this.usersService.setUser(data);
                _this.router.navigate(['/']); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    LoginComponent.prototype.resetForm = function () {
        this.model = { email: '', password: '' };
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/login/login.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register-form-question.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dynamic_form_question_textbox__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/question-textbox.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterFormQuestionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterFormQuestionService = (function () {
    function RegisterFormQuestionService() {
    }
    RegisterFormQuestionService.prototype.getQuestions = function () {
        var questions = [
            new __WEBPACK_IMPORTED_MODULE_2__dynamic_form_question_textbox__["a" /* TextboxQuestion */]({
                key: 'name',
                label: 'Name',
                value: '',
                validators: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].minLength(3)
                ],
                order: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__dynamic_form_question_textbox__["a" /* TextboxQuestion */]({
                key: 'email',
                label: 'Email',
                type: 'email',
                validators: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].email
                ],
                order: 2
            }),
            new __WEBPACK_IMPORTED_MODULE_2__dynamic_form_question_textbox__["a" /* TextboxQuestion */]({
                key: 'password',
                label: 'Password',
                type: 'password',
                validators: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].minLength(4),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].maxLength(20)
                ],
                order: 3
            }),
            new __WEBPACK_IMPORTED_MODULE_2__dynamic_form_question_textbox__["a" /* TextboxQuestion */]({
                key: 'password-confirm',
                label: 'Confirm password',
                type: 'password',
                validators: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].minLength(4),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* Validators */].maxLength(20)
                ],
                order: 4
            })
        ];
        return questions.sort(function (a, b) { return a.order - b.order; });
    };
    return RegisterFormQuestionService;
}());
RegisterFormQuestionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], RegisterFormQuestionService);

//# sourceMappingURL=register-form-question.service.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n\r\n  <dynamic-form \r\n      [questions]=\"questions\" \r\n      [postSubmitErrors]=\"postSubmitErrors\"\r\n      (formData)=\"onFormSubmitHandler($event)\"></dynamic-form>\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_form_question_service__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register-form-question.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(registerFormQuestionService, usersService, router) {
        this.registerFormQuestionService = registerFormQuestionService;
        this.usersService = usersService;
        this.router = router;
        this.data = {};
        this.postSubmitErrors = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.questions = this.registerFormQuestionService.getQuestions();
    };
    RegisterComponent.prototype.onFormSubmitHandler = function (formData) {
        var _this = this;
        var methodTrace = this.constructor.name + " > onFormSubmitHandler() > "; //for debugging
        //chech that the password and the confirmed password are the same
        if (formData['password'] !== formData['password-confirm']) {
            this.postSubmitErrors.push('The confirm password field must match the password');
            return false;
        }
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.register(formData).subscribe(function (data) {
            if (data && data.email) {
                _this.usersService.setUser(data);
                _this.router.navigate(['/']); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'users-register',
        template: __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/register/register.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_3__register_form_question_service__["a" /* RegisterFormQuestionService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__register_form_question_service__["a" /* RegisterFormQuestionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__register_form_question_service__["a" /* RegisterFormQuestionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    return UsersRoutingModule;
}());
UsersRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], UsersRoutingModule);

//# sourceMappingURL=users-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_routing_module__ = __webpack_require__("../../../../../src/app/modules/users/users-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dynamic_form_dynamic_form_module__ = __webpack_require__("../../../../../src/app/modules/dynamic-form/dynamic-form.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_custom_material_design_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/custom-material-design/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_register_register_component__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_form_question_service__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register-form-question.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var UsersModule = (function () {
    function UsersModule() {
    }
    return UsersModule;
}());
UsersModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__users_routing_module__["a" /* UsersRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__dynamic_form_dynamic_form_module__["a" /* DynamicFormModule */],
            __WEBPACK_IMPORTED_MODULE_5__modules_custom_material_design_custom_material_design_module__["a" /* CustomMaterialDesignModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_8__components_register_register_form_question_service__["a" /* RegisterFormQuestionService */]]
    })
], UsersModule);

//# sourceMappingURL=users.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.serverHost = 'http://localhost:7777/api/users';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({ 'Content-Type': 'application/json' });
        this.user = null;
    }
    /**
     * Server call to Register a new user in the system
     * @param postData
     */
    UsersService.prototype.register = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/register", postData, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Server call to retrieve the currently authenticated user, or null if nobody .
     */
    UsersService.prototype.getAuthenticatedUser = function () {
        return this.http.get(this.serverHost + "/getUser")
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.login = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/login", postData, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.logout = function () {
        return this.http.get(this.serverHost + "/logout")
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Tells whether the user is logged in in the system. Checks the local user variable
     */
    UsersService.prototype.isLoggedIn = function () {
        return this.user && this.user.email ? true : false;
    };
    /**
     * Sets the local user variable with the user provided as param
     * @param user (any). The user to set
     */
    UsersService.prototype.setUser = function (user) {
        this.user = user;
    };
    UsersService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.codeno === 200 && body.status === 'success') {
            return body.data;
        }
        else {
            throw body;
        }
    };
    UsersService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            errMsg = body.message || JSON.stringify(body);
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return UsersService;
}());
UsersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], UsersService);

var _a;
//# sourceMappingURL=users.service.js.map

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