webpackJsonp(["main"],{

/***/ "../../../../../configuration.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return configuration; });
var configuration = {
    defaultGravatarUrl: 'https://gravatar.com/avatar/7038663cc684aa330956752c7e6fe7d4?s=200'
};
//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"inner mat-typography\">\r\n\r\n  <md-toolbar class=\"toolbar\" color=\"primary\">\r\n    <span>AtomiCoconut</span>\r\n    <span class=\"example-spacer\"></span>\r\n    \r\n    <span *ngIf=\"!usersService.getUser()\" fxLayoutAlign=\" center\">\r\n      <md-icon routerLink=\"/login\" class=\"toolbar__icon\">account_circle</md-icon>\r\n    </span>\r\n    <span *ngIf=\"usersService.getUser()\" fxLayoutAlign=\" center\">\r\n      <img *ngIf=\"usersService.getUser().avatar !== defaultGravatarUrl\" [mdMenuTriggerFor]=\"userMenu\" \r\n          class=\"toolbar__icon user__avatar\" [src]=\"usersService.getUser().avatar\" />\r\n      <md-icon *ngIf=\"usersService.getUser().avatar === defaultGravatarUrl\"\r\n          class=\"toolbar__icon user__icon--logged-in\" [mdMenuTriggerFor]=\"userMenu\">account_circle</md-icon>\r\n      \r\n      <md-menu class=\"user__menu--logged-in\" #userMenu=\"mdMenu\" [overlapTrigger]=\"false\">\r\n        <button md-menu-item>\r\n          <md-icon>settings</md-icon>\r\n          <span>My account</span>\r\n        </button>\r\n        <button md-menu-item (click)=\"logout()\">\r\n          <md-icon>exit_to_app</md-icon>\r\n          <span>Logout</span>\r\n        </button>\r\n      </md-menu>\r\n    </span>\r\n    \r\n  </md-toolbar>\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar {\n  margin-bottom: 10px; }\n  .toolbar .toolbar__icon {\n    padding: 0 10px;\n    cursor: pointer; }\n  .toolbar .example-spacer {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  .toolbar .user__avatar {\n    border-radius: 50%;\n    width: 30px;\n    padding: 0 10px; }\n  .toolbar .user__icon--logged-in {\n    color: #28FE7C; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../configuration.ts");
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
        this.defaultGravatarUrl = __WEBPACK_IMPORTED_MODULE_3__configuration__["a" /* configuration */].defaultGravatarUrl;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging  
        this.usersService.getAuthenticatedUser().subscribe(function (data) {
            if (data && data.email) {
                _this.usersService.setUser(data);
            }
            else {
                _this.usersService.setUser();
                console.info(methodTrace + " User not logged in.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging  
        this.usersService.logout().subscribe(function (data) {
            _this.usersService.setUser();
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
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
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__investments_investments_component__ = __webpack_require__("../../../../../src/app/investments/investments.component.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
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
    }
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
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
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
exports.push([module.i, ".currency-card {\n  text-align: center; }\n  .currency-card .header-image {\n    background-size: cover; }\n    .currency-card .header-image.header-image__xmr {\n      background-image: url(\"/assets/images/xmr.png\"); }\n    .currency-card .header-image.header-image__btc {\n      background-image: url(\"/assets/images/btc.png\"); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/crypto-currency/crypto-currency.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__ = __webpack_require__("../../../../../src/app/crypto-currency/crypto-currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
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
        this.totalReturns = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", String)
], CryptoCurrencyComponent.prototype, "cryptoCurrency", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Number)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyCount", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Number)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyBuyPrice", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], CryptoCurrencyComponent.prototype, "cryptoCurrencyBuyDate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
], CryptoCurrencyComponent.prototype, "totalReturns", void 0);
CryptoCurrencyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrytoCurrencyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
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
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], CrytoCurrencyService);

var _a;
//# sourceMappingURL=crypto-currency.service.js.map

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
        this.xmrBuyDate = new Date(2017, 5, 23);
        this.btcBuyDate = new Date(2017, 6, 19);
        this.totalInvestment = 0;
        this.totalReturn = 0;
    }
    InvestmentsComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
    };
    InvestmentsComponent.prototype.setTotals = function (totalReturns) {
        this.totalReturn += totalReturns.usdFromCryptoCurrency;
        this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
    };
    return InvestmentsComponent;
}());
InvestmentsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialDesignModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MaterialModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MaterialModule */]]
    })
], CustomMaterialDesignModule);

//# sourceMappingURL=custom-material-design.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap.gt-sm=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n  \r\n        <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</md-error>\r\n        <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</md-error>\r\n      </md-input-container>\r\n      \r\n      <!-- Password -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\"\r\n            #password=\"ngModel\">\r\n  \r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</md-error>\r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</md-error>\r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</md-error>\r\n      </md-input-container>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions\">\r\n    <button class=\"form__action mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!loginForm.form.valid\">Login</button>\r\n    <md-checkbox fxLayoutAlign.xs=\"center center\" class=\"form__action\" [(ngModel)]=\"forgotModel.forgot\" name=\"forgot\" id=\"forgot\">Forgot my password</md-checkbox>\r\n  </section>\r\n\r\n</form>\r\n\r\n<form class=\"form__container form__forgot\" (ngSubmit)=\"onForgotSubmit()\" #forgotForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" *ngIf=\"forgotModel.forgot\">\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap.gt-sm=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        \r\n        <input mdInput type=\"email\" id=\"emailForgot\" name=\"emailForgot\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"forgotModel.email\" \r\n            required email\r\n            #emailForgot=\"ngModel\">\r\n        <md-hint align=\"start\">Type your email and we will send you an email to reset your password.</md-hint>\r\n        <md-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.required\">Email is required</md-error>\r\n        <md-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.email\">Email must be a valid email address</md-error>\r\n      </md-input-container>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button class=\"form__action mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!forgotForm.form.valid\">Send</button>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".form__forgot {\n  margin-top: 50px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
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
    function LoginComponent(usersService, router, snackBar) {
        this.usersService = usersService;
        this.router = router;
        this.snackBar = snackBar;
        this.model = { email: '', password: '' };
        this.forgotModel = { email: '', forgot: false };
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.login(this.model).subscribe(function (data) {
            if (data && data.email) {
                _this.usersService.setUser(data);
                _this.router.navigate(['/']); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    LoginComponent.prototype.onForgotSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onForgotSubmit() > "; //for debugging
        //call the register service
        this.usersService.forgot(this.forgotModel).subscribe(function (data) {
            _this.showResults("You have been emailed a password reset link.");
        }, function (error) {
            console.error(methodTrace + " There was an error with the register service > " + error);
            _this.showResults("No account with that email exists.");
        });
    };
    LoginComponent.prototype.showResults = function (message) {
        this.snackBar.open(message, null, {
            duration: 3000,
            extraClasses: ['snack-bar--simple']
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/login/login.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MdSnackBar */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap.gt-sm=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            #name=\"ngModel\">\r\n\r\n        <md-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</md-error>\r\n        <md-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</md-error>\r\n      </md-input-container>\r\n      \r\n      <!-- Email -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n\r\n        <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</md-error>\r\n        <md-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</md-error>\r\n      </md-input-container>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap.gt-sm=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Password -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\"\r\n            #password=\"ngModel\">\r\n\r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</md-error>\r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</md-error>\r\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</md-error>\r\n      </md-input-container>\r\n\r\n      <!-- Password confirm -->\r\n      <md-input-container fxFlex class=\"form__field\">\r\n        <input mdInput type=\"password\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \r\n            [(ngModel)]=\"model['password-confirm']\" \r\n            required minlength=\"3\" maxlength=\"8\"\r\n            #passwordConfirm=\"ngModel\">\r\n\r\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</md-error>\r\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</md-error>\r\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</md-error>\r\n      </md-input-container>\r\n    </div>\r\n    \r\n    \r\n    \r\n  </div>\r\n  \r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button fxFlex class=\"form__action mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!loginForm.form.valid\">Register</button>\r\n  </div>\r\n\r\n</form>"

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
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
    function RegisterComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.model = { name: '', email: '', password: '', 'password-confirm': '' };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        //chech that the password and the confirmed password are the same
        if (this.model.password !== this.model['password-confirm']) {
            console.error(methodTrace + " Confirm password must match password.");
            return false;
        }
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.register(this.model).subscribe(function (data) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'users-register',
        template: __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/register/register.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], RegisterComponent);

var _a, _b;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #resetForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\n  \n  <div fxLayout=\"column\" class=\"form__fields\">\n    <div fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap.gt-sm=\"10px\" class=\"form__fields__row\" >\n      <!-- Password -->\n      <md-input-container fxFlex class=\"form__field\">\n        <input mdInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \n            [(ngModel)]=\"model.password\" \n            required minlength=\"3\" maxlength=\"8\"\n            #password=\"ngModel\">\n\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</md-error>\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</md-error>\n        <md-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</md-error>\n      </md-input-container>\n\n      <!-- Password confirm -->\n      <md-input-container fxFlex class=\"form__field\">\n        <input mdInput type=\"password\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \n            [(ngModel)]=\"model['password-confirm']\" \n            required minlength=\"3\" maxlength=\"8\"\n            #passwordConfirm=\"ngModel\">\n\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</md-error>\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</md-error>\n        <md-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</md-error>\n      </md-input-container>\n    </div>\n    \n    \n    \n  </div>\n  \n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\n    <button fxFlex class=\"form__action mat-raised-button\" md-raised-button type=\"submit\" [disabled]=\"!resetForm.form.valid\">Reset password</button>\n  </div>\n\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.model = { password: '', 'password-confirm': '' };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () { };
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        //chech that the password and the confirmed password are the same
        if (this.model.password !== this.model['password-confirm']) {
            console.error(methodTrace + " Confirm password must match password.");
            return false;
        }
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.register(this.model).subscribe(function (data) {
            if (data && data.email) {
                _this.usersService.setUser(data);
                _this.router.navigate(['/']); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
        }, function (error) { return console.error(methodTrace + " There was an error with the register service > " + error); });
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-reset-password',
        template: __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], ResetPasswordComponent);

var _a, _b;
//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__ = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_reset_password_reset_password_component__ = __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'account/reset/:token', component: __WEBPACK_IMPORTED_MODULE_4__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */] },
    { path: 'account/reset/expired', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    return UsersRoutingModule;
}());
UsersRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], UsersRoutingModule);

//# sourceMappingURL=users-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_routing_module__ = __webpack_require__("../../../../../src/app/modules/users/users-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_custom_material_design_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/custom-material-design/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_register_register_component__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__ = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_reset_password_reset_password_component__ = __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__users_routing_module__["a" /* UsersRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__modules_custom_material_design_custom_material_design_module__["a" /* CustomMaterialDesignModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__users_service__["a" /* UsersService */]]
    })
], UsersModule);

//# sourceMappingURL=users.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/users.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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
        this.serverHost = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiHost + '/api/users';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
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
     * Server call to forgot with the provided user email.
     */
    UsersService.prototype.forgot = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/account/forgot", postData, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Server call to reset password api with the provided new password.
     */
    UsersService.prototype.reset = function (postData) {
        if (postData === void 0) { postData = {}; }
        ////////////////////////////////////////////
        ///////////// FALTA EL TOKEN Q LO TENGO EN LA URL
        ///////////////////////////////////////////////
        return this.http.post(this.serverHost + "/api/users/account/reset/", postData, { headers: this.headers })
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
        if (user === void 0) { user = null; }
        this.user = user;
    };
    UsersService.prototype.getUser = function () {
        return this.user;
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
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UsersService);

var _a;
//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    apiHost: ''
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
    console.log('ENV: Production');
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map