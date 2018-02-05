webpackJsonp(["main"],{

/***/ "../../../../../configuration.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = {
    defaultGravatarUrl: 'https://gravatar.com/avatar/7038663cc684aa330956752c7e6fe7d4?s=200'
};


/***/ }),

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"inner mat-typography\">  \r\n  <mat-toolbar fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"toolbar__primary mat-elevation-z1\" color=\"primary\">\r\n    <a class=\"toolbar__brand-name color__almost-white\" routerLink=\"/\"><span>AtomiCoconut</span></a>\r\n    \r\n    <span *ngIf=\"!user\" fxLayoutAlign=\" center\">\r\n      <mat-icon routerLink=\"/users/login\" class=\"toolbar__icon\">account_circle</mat-icon>\r\n    </span>\r\n    <span *ngIf=\"user\" fxLayoutAlign=\" center\">\r\n      <img *ngIf=\"user.avatar\" \r\n          [matMenuTriggerFor]=\"userMenu\" \r\n          class=\"toolbar__icon user__avatar\" \r\n          [src]=\"user.avatar\"/>\r\n      <mat-icon *ngIf=\"!user.avatar\"\r\n          class=\"toolbar__icon user__icon--logged-in\" \r\n          [matMenuTriggerFor]=\"userMenu\">\r\n        account_circle\r\n      </mat-icon>\r\n      \r\n      <mat-menu class=\"user__menu--logged-in\" #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <button mat-menu-item routerLink=\"/users/account\">\r\n          <mat-icon>settings</mat-icon>\r\n          <span>My account</span>\r\n        </button>\r\n        <button mat-menu-item routerLink=\"/teams\">\r\n          <mat-icon>group</mat-icon>\r\n          <span>Teams</span>\r\n        </button>\r\n        <button mat-menu-item (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n          <span>Logout</span>\r\n        </button>\r\n      </mat-menu>\r\n    </span>\r\n  </mat-toolbar>\r\n  <div class=\"toolbar__primary__spacer\"><!-- This is a spacer with main toolbar height to avoid any content going behind the toolbar --></div>\r\n\r\n  <mat-toolbar fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"toolbar__secondary\" *ngIf=\"user && user.currency !== 'USD' && currencyExchangeService.currencyRates\">\r\n    <span>Preferred currency is <a class=\"color__almost-white\" routerLink=\"/users/account\" matTooltip=\"Change...\"><strong>{{user.currency}}</strong></a></span>   \r\n    <span>1 USD = {{currencyExchangeService.currencyRates[user.currency]}} {{user.currency}}</span>\r\n  </mat-toolbar>\r\n\r\n  <!-- Main navigator (chips) -->\r\n  <main-navigator></main-navigator>\r\n\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar__primary {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 100; }\n  .toolbar__primary .toolbar__brand-name {\n    text-decoration: none; }\n  .toolbar__primary .toolbar__icon {\n    padding: 0 10px;\n    cursor: pointer; }\n  .toolbar__primary .user__avatar {\n    border-radius: 50%;\n    width: 30px;\n    padding: 0 10px; }\n  .toolbar__primary .user__icon--logged-in {\n    color: #28FE7C; }\n  .toolbar__primary__spacer {\n  height: 54px; }\n  .toolbar__secondary {\n  margin-bottom: 10px;\n  background-color: #9c27b0;\n  font-size: 12px;\n  height: 30px; }\n  /* Chip navigation */\n  ::ng-deep nav.navigation--main {\n  margin-bottom: 20px; }\n  @media screen and (min-width: 600px) {\n  .toolbar__primary__spacer {\n    height: 62px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var configuration_1 = __webpack_require__("../../../../../configuration.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var currency_exchange_service_1 = __webpack_require__("../../../../../src/app/modules/investments/currency-exchange.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, appService, usersService, currencyExchangeService, mainNavigatorService) {
        this.router = router;
        this.appService = appService;
        this.usersService = usersService;
        this.currencyExchangeService = currencyExchangeService;
        this.mainNavigatorService = mainNavigatorService;
        this.title = 'AtomiCoconut';
        this.user = null;
        this.defaultGravatarUrl = configuration_1.configuration.defaultGravatarUrl;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        //set the navigation links valid for this components
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: null, selected: true },
            { displayName: 'Investments', url: '/investments', selected: false },
            { displayName: 'Calculators', url: '/calculators', selected: false }
        ]);
        this.usersService.user$.subscribe(function (user) { return _this.user = user; }); //start listening the source of user
        this.setUser();
        //Get currency exchange rates
        if (!this.currencyExchangeService.currencyRates) {
            this.currencyExchangeService.getCurrencyRates().subscribe(function (data) {
                _this.currencyExchangeService.currencyRates = data;
                _this.appService.consoleLog('info', methodTrace + " Currency exchange rates successfully loaded!");
            }, function (error) {
                _this.appService.consoleLog('error', methodTrace + " There was an error trying to get currency rates data > " + error);
                _this.appService.showResults("There was an error trying to get currency rates data.", 'error');
            });
        }
        this.getCryptoRates('BTC');
        this.getCryptoRates('XMR');
    };
    AppComponent.prototype.getCryptoRates = function (crypto) {
        var _this = this;
        if (crypto === void 0) { crypto = 'BTC'; }
        var methodTrace = this.constructor.name + " > getCryptoRates() > "; //for debugging
        if (!this.currencyExchangeService.cryptoRates[crypto]) {
            this.currencyExchangeService.getCryptoRates(crypto).subscribe(function (data) {
                _this.appService.consoleLog('info', methodTrace + " " + crypto + " exchange rate successfully loaded!");
            }, function (error) {
                _this.appService.consoleLog('error', methodTrace + " There was an error trying to get " + crypto + " rates data > " + error);
                _this.appService.showResults("There was an error trying to get " + crypto + " rates data, please try again in a few minutes.", 'warn');
            });
        }
    };
    AppComponent.prototype.setUser = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > setUser() > "; //for debugging
        this.usersService.getAuthenticatedUser().subscribe(function (data) {
            if (data && data.email) {
                _this.user = new user_1.User(data.name, data.email, data.avatar, null, null, data.currency);
                _this.usersService.setUser(_this.user);
            }
            else {
                _this.appService.consoleLog('info', methodTrace + " User not logged in.", data);
                _this.usersService.setUser(null);
                _this.user = null;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.usersService.setUser(null);
            _this.user = null;
        });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging  
        this.usersService.logout().subscribe(function (data) {
            _this.usersService.setUser(null);
            _this.user = null;
            _this.router.navigate(['/']);
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the logout service.", error);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")],
            providers: [main_navigator_service_1.MainNavigatorService]
        }),
        __metadata("design:paramtypes", [router_1.Router, app_service_1.AppService, users_service_1.UsersService, currency_exchange_service_1.CurrencyExchangeService,
            main_navigator_service_1.MainNavigatorService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
__webpack_require__("../../../../hammerjs/hammer.js");
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app.routing.module.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/util.service.ts");
var auth_resolver_service_1 = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var currency_exchange_service_1 = __webpack_require__("../../../../../src/app/modules/investments/currency-exchange.service.ts");
var auth_guard_1 = __webpack_require__("../../../../../src/app/auth.guard.ts");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var users_module_1 = __webpack_require__("../../../../../src/app/modules/users/users.module.ts");
var teams_module_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.module.ts");
var investments_module_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.module.ts");
var calculators_module_1 = __webpack_require__("../../../../../src/app/modules/calculators/calculators.module.ts");
var welcome_component_1 = __webpack_require__("../../../../../src/app/components/welcome/welcome.component.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                users_module_1.UsersModule,
                teams_module_1.TeamsModule,
                investments_module_1.InvestmentsModule,
                calculators_module_1.CalculatorsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent
            ],
            providers: [app_service_1.AppService, util_service_1.UtilService, currency_exchange_service_1.CurrencyExchangeService, auth_resolver_service_1.AuthResolver, auth_guard_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/app.routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mpaoluc on 13/01/2017.
 */
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var welcome_component_1 = __webpack_require__("../../../../../src/app/components/welcome/welcome.component.ts");
var appRoutes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: welcome_component_1.WelcomeComponent
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
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "../../../../../src/app/app.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var snackbar_simple_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts");
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var AppService = /** @class */ (function () {
    function AppService(snackBar) {
        this.snackBar = snackBar;
    }
    /**
     * Extract data from a server response
     * @param res
     */
    AppService.prototype.extractData = function (res) {
        if (res.codeno === 200 && res.status === 'success') {
            return res.data;
        }
        else {
            throw res;
        }
    };
    /**
     * Handle server service errors and parse the result in an object
     * @param operation (string). The operation performed
     * @param result (T). Optional, a result to handle the fail.
     */
    AppService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            _this.consoleLog('error', "Operation \"" + operation + "\" failed with message:  " + error.message, error);
            return Observable_1.Observable.throw(error.message);
        };
    };
    /**
     * Shows messages in snackbar component
     * @param message . The text to show
     * @param duration . The duration in milliseconds . Optional
     * @param actionName . An action name to close the message on click. Optional
     *
     * @return {MatSnackBar} . The snackbar ref
     */
    AppService.prototype.showResults = function (message, type, duration) {
        if (type === void 0) { type = 'info'; }
        if (duration === void 0) { duration = 5000; }
        var snackBarRef = this.snackBar.openFromComponent(snackbar_simple_component_1.SnackbarSimpleComponent, {
            data: {
                type: type,
                message: message
            },
            duration: duration,
            extraClasses: ['snackbar--simple', "snackbar--" + type]
        });
        return snackBarRef;
    };
    /**
     * Shows multiple messages in snackbar component one after another
     * @param {any[]} messages . The array of messages to show
     * @param {number} index . The index where to start iterating the messages array
     *
     * @return {MatSnackBar} . The snackbar Ref
     */
    AppService.prototype.showManyResults = function (messages, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var snackBarRef = null;
        if (index < messages.length) {
            snackBarRef = this.showResults(messages[index].message, messages[index].type, messages[index].duration);
            snackBarRef.afterDismissed().subscribe(function () {
                _this.showManyResults(messages, index += 1);
            });
        }
        else {
            return snackBarRef;
        }
    };
    /**
     * Show logs in the console if enabled in the current environment
     * @param type . Error type
     * @param message . The message to show
     * @param params . Any extra parameters to list in the log.
     */
    AppService.prototype.consoleLog = function (type, message) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (environment_1.environment.showLogs) {
            console[type](message, params);
        }
    };
    AppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;


/***/ }),

/***/ "../../../../../src/app/auth-resolver.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");
var account_finance_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var AuthResolver = /** @class */ (function () {
    function AuthResolver(appService, usersService, router) {
        this.appService = appService;
        this.usersService = usersService;
        this.router = router;
    }
    AuthResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var methodTrace = this.constructor.name + " > resolve() > "; //for debugging  
        this.usersService.routerRedirectUrl = state.url;
        var urlsForCompleteUserData = ['/investments', '/users/account'];
        var params = null;
        if (urlsForCompleteUserData.includes(state.url)) {
            params = { personalInfo: true, financialInfo: true };
        }
        return this.usersService.getAuthenticatedUser(params).map(function (data) {
            if (data && data.email) {
                var personalInfo = null;
                if (data.personalInfo) {
                    personalInfo = new account_personal_1.AccountPersonal(data.personalInfo.birthday);
                }
                var financialInfo = null;
                if (data.financialInfo) {
                    financialInfo = new account_finance_1.AccountFinance(data.financialInfo.annualIncome, data.financialInfo.annualIncomeUnit, data.financialInfo.savings, data.financialInfo.savingsUnit, data.financialInfo.incomeTaxRate);
                }
                var user = new user_1.User(data.name, data.email, data.avatar, financialInfo, personalInfo, data.currency);
                _this.usersService.setUser(user);
                _this.usersService.routerRedirectUrl = null;
                return user;
            }
            else {
                _this.appService.consoleLog('info', methodTrace + " User not logged in.", data);
                _this.usersService.setUser(null);
                _this.router.navigate(['/users/login']);
                return null;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.usersService.setUser(null);
            _this.router.navigate(['/users/login']);
            return null;
        });
    };
    AuthResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, users_service_1.UsersService, router_1.Router])
    ], AuthResolver);
    return AuthResolver;
}());
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "../../../../../src/app/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(appService, usersService, router) {
        this.appService = appService;
        this.usersService = usersService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        var methodTrace = this.constructor.name + " > canActivate() > "; //for debugging
        this.usersService.routerRedirectUrl = state.url;
        return this.usersService.getAuthenticatedUser().map(function (data) {
            if (data && data.email) {
                _this.usersService.routerRedirectUrl = null; //we don't need this
                return true;
            }
            else {
                _this.appService.consoleLog('info', methodTrace + " User not logged in.", data);
                _this.router.navigate(['/users/login']);
                return false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.router.navigate(['/users/login']);
            return false;
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, users_service_1.UsersService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\" class=\"container__net-worth\">\r\n  <!-- Net Worth Card -->\r\n  <mat-card *ngIf=\"expectedWealth && user.personalInfo.age\"\r\n      fxLayout=\"column\" class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n      <div class=\"wealth__container\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"none center\" fxLayoutAlign.gt-xs=\"space-between none\">\r\n        <span [class.color__accent]=\"wealthAmount >= expectedWealth\" \r\n            [class.color__red]=\"wealthAmount < expectedWealth\">\r\n          Current net worth is <strong>{{ wealthAmount | currency : 'USD' : 'code' : '1.2-2' }}</strong>\r\n        </span>\r\n        <span class=\"accent\">\r\n          Expected net worth at your age ({{user.personalInfo.age}}) is \r\n          <strong>{{ expectedWealth | currency : 'USD' : 'code' : '1.2-2' }}</strong>\r\n        </span>\r\n      </div>\r\n      <div>\r\n        <mat-progress-bar \r\n          class=\"progress-spinner progress-spinner--wealth\"\r\n          [color]=\"wealthAmount < expectedWealth ? 'warn' : 'accent'\"\r\n          [value]=\"progressBarWealthValue\"\r\n          mode=\"determinate\">\r\n        </mat-progress-bar>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n    <!-- EOF Net Worth Card -->\r\n\r\n  <!-- Net Worth Card when Personal and Financial info is incomplete -->\r\n  <mat-card *ngIf=\"!user.financialInfo || !user.personalInfo\"\r\n      fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>\r\n        <a class=\"color__almost-white\" routerLink=\"/users/account\">\r\n          <mat-icon class=\"icon--arrow_forward\">arrow_forward</mat-icon>\r\n          Go to your account and complete your Personal and Financial Info to see expected and current Net Worth\r\n        </a>\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <!-- EOF Net Worth Card when Personal and Financial info is incomplete -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container__net-worth {\n  margin-bottom: 10px; }\n  .container__net-worth .icon--arrow_forward {\n    float: left; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");
var account_finance_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
var investments_service_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.service.ts");
var currency_exchange_service_1 = __webpack_require__("../../../../../src/app/modules/investments/currency-exchange.service.ts");
var currencyInvestment_1 = __webpack_require__("../../../../../src/app/modules/investments/models/currencyInvestment.ts");
var constants_1 = __webpack_require__("../../../../../src/app/constants/constants.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var of_1 = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent(mainNavigatorService, usersService, appService, investmentsService, currencyExchangeService) {
        this.mainNavigatorService = mainNavigatorService;
        this.usersService = usersService;
        this.appService = appService;
        this.investmentsService = investmentsService;
        this.currencyExchangeService = currencyExchangeService;
        this.user = null;
        this.wealthAmount = 0;
        this.expectedWealth = 0;
        this.progressBarWealthValue = 0;
        this.subscription = new Subscription_1.Subscription();
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: null, selected: true },
            { displayName: 'Investments', url: '/investments', selected: false },
            { displayName: 'Calculators', url: '/calculators', selected: false }
        ]);
        var user$ = this.setUser();
        var newSubscription = user$.subscribe(function (investments) {
            var _loop_1 = function (investment) {
                if (investment instanceof currencyInvestment_1.CurrencyInvestment) {
                    var myPercentage_1 = (investment.investmentDistribution.filter(function (portion) { return portion.email === _this.user.email; })[0]).percentage;
                    var currencyInvestment_2 = investment;
                    if (investment.type === constants_1.INVESTMENTS_TYPES.CURRENCY) {
                        _this.currencyExchangeService.getCurrencyRates().take(1).subscribe(function (currencyRates) {
                            var myReturnAmount = (currencyInvestment_2.amount * (currencyRates[currencyInvestment_2.unit] || 1)) * myPercentage_1 / 100;
                            _this.wealthAmount += myReturnAmount;
                            _this.calculateProgressBarWealthValue();
                        }, function (error) {
                            _this.appService.consoleLog('error', methodTrace + " There was an error trying to get currency rates data > ", error);
                            _this.appService.showResults("There was an error trying to get currency rates data, please try again in a few minutes.", 'error');
                        });
                    }
                    else if (investment.type === constants_1.INVESTMENTS_TYPES.CRYPTO) {
                        _this.currencyExchangeService.getCryptoRates(currencyInvestment_2.unit).take(1).subscribe(function (rates) {
                            var myReturnAmount = (currencyInvestment_2.amount * rates.price) * myPercentage_1 / 100;
                            _this.wealthAmount += myReturnAmount;
                            _this.calculateProgressBarWealthValue();
                        }, function (error) {
                            _this.appService.consoleLog('error', methodTrace + " There was an error trying to get " + currencyInvestment_2.unit + " rates data > ", error);
                            _this.appService.showResults("There was an error trying to get " + currencyInvestment_2.unit + " rates data, please try again in a few minutes.", 'error');
                        });
                    }
                }
            };
            //iterate investments and sum returns
            for (var _i = 0, investments_1 = investments; _i < investments_1.length; _i++) {
                var investment = investments_1[_i];
                _loop_1(investment);
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.user = null;
        });
        this.subscription.add(newSubscription);
    };
    WelcomeComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Sets the user property with the current user or null of nobody logged in yet
     */
    WelcomeComponent.prototype.setUser = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > setUser() > "; //for debugging
        var gotAuthenticatedUserFromServer = false;
        var user$ = this.usersService.user$.switchMap(function (user) {
            if (!user) {
                return of_1.of(null);
            }
            else if ((!user.personalInfo || !user.financialInfo) && gotAuthenticatedUserFromServer === false) {
                gotAuthenticatedUserFromServer = true;
                return _this.usersService.getAuthenticatedUser({ personalInfo: true, financialInfo: true });
            }
            else {
                return of_1.of(user);
            }
        });
        return user$.switchMap(function (user) {
            if (user && user.email) {
                var personalInfo = null;
                if (user.personalInfo) {
                    personalInfo = new account_personal_1.AccountPersonal(user.personalInfo.birthday);
                }
                var financialInfo = null;
                if (user.financialInfo) {
                    financialInfo = new account_finance_1.AccountFinance(user.financialInfo.annualIncome, user.financialInfo.annualIncomeUnit, user.financialInfo.savings, user.financialInfo.savingsUnit, user.financialInfo.incomeTaxRate);
                    if (gotAuthenticatedUserFromServer !== null) {
                        _this.wealthAmount += _this.currencyExchangeService.getUsdValueOf(user.financialInfo.savings || 0, user.financialInfo.savingsUnit);
                    }
                    if (user.personalInfo && user.personalInfo.age) {
                        _this.expectedWealth = _this.currencyExchangeService.getUsdValueOf(user.financialInfo.annualIncome || 0, user.financialInfo.annualIncomeUnit) * user.personalInfo.age / 10;
                    }
                    else {
                        _this.expectedWealth = 0;
                    }
                    _this.calculateProgressBarWealthValue();
                }
                user = new user_1.User(user.name, user.email, user.avatar, financialInfo, personalInfo, user.currency);
                _this.user = user;
                if (gotAuthenticatedUserFromServer) {
                    gotAuthenticatedUserFromServer = null; //shut down the flag
                    //we just got updated information from server, let's update the current user source
                    _this.usersService.setUser(user);
                }
                return _this.investmentsService.getInvestments(user.email);
            }
            else {
                _this.user = null;
                return of_1.of([]);
            }
        });
    };
    WelcomeComponent.prototype.calculateProgressBarWealthValue = function () {
        if (!this.expectedWealth) {
            this.progressBarWealthValue = 0;
            return;
        }
        var value = this.wealthAmount * 100 / this.expectedWealth;
        this.progressBarWealthValue = value > 100 ? 100 : value;
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'welcome',
            template: __webpack_require__("../../../../../src/app/components/welcome/welcome.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/welcome/welcome.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, users_service_1.UsersService, app_service_1.AppService,
            investments_service_1.InvestmentsService, currency_exchange_service_1.CurrencyExchangeService])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;


/***/ }),

/***/ "../../../../../src/app/constants/constants.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.INVESTMENTS_TYPES = {
    CURRENCY: 'currency',
    CRYPTO: 'crypto',
    PROPERTY: 'property'
};


/***/ }),

/***/ "../../../../../src/app/modules/calculators/calculators-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var equity_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.ts");
var calculators_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var house_figures_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.ts");
var routes = [{
        path: 'calculators',
        children: [
            { path: '', component: calculators_dashboard_component_1.CalculatorsDashboardComponent },
            { path: 'equity', component: equity_component_1.EquityComponent },
            { path: 'house-figures', component: house_figures_component_1.HouseFiguresComponent }
        ]
    }];
var CalculatorsRoutingModule = /** @class */ (function () {
    function CalculatorsRoutingModule() {
    }
    CalculatorsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CalculatorsRoutingModule);
    return CalculatorsRoutingModule;
}());
exports.CalculatorsRoutingModule = CalculatorsRoutingModule;


/***/ }),

/***/ "../../../../../src/app/modules/calculators/calculators.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
var calculators_routing_module_1 = __webpack_require__("../../../../../src/app/modules/calculators/calculators-routing.module.ts");
var equity_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.ts");
var calculators_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var house_figures_component_1 = __webpack_require__("../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.ts");
var CalculatorsModule = /** @class */ (function () {
    function CalculatorsModule() {
    }
    CalculatorsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                calculators_routing_module_1.CalculatorsRoutingModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                equity_component_1.EquityComponent,
                calculators_dashboard_component_1.CalculatorsDashboardComponent,
                house_figures_component_1.HouseFiguresComponent
            ]
        })
    ], CalculatorsModule);
    return CalculatorsModule;
}());
exports.CalculatorsModule = CalculatorsModule;


/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var CalculatorsDashboardComponent = /** @class */ (function () {
    function CalculatorsDashboardComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
    }
    CalculatorsDashboardComponent.prototype.ngOnInit = function () {
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Calculators', url: null, selected: true },
            { displayName: 'Equity', url: '/calculators/equity', selected: false },
            { displayName: 'House figures', url: '/calculators/house-figures', selected: false }
        ]);
    };
    CalculatorsDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-calculators-dashboard',
            template: __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], CalculatorsDashboardComponent);
    return CalculatorsDashboardComponent;
}());
exports.CalculatorsDashboardComponent = CalculatorsDashboardComponent;


/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/equity/equity.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__equity-calc\" #equityForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Purchase price -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"purchasePrice\" name=\"purchasePrice\" placeholder=\"Purchase price\" \r\n            [(ngModel)]=\"model.purchasePrice\" \r\n            required\r\n            [value]=\"model.purchasePrice\"\r\n            #purchasePrice=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"purchasePrice.invalid && (purchasePrice.dirty || purchasePrice.touched) && purchasePrice.errors.required\">Purchase price is required</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Market value -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\" \r\n            [(ngModel)]=\"model.marketValue\" \r\n            required\r\n            [value]=\"model.marketValue\"\r\n            #marketValue=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.required\">Market value is required</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Loan coverage -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"loanCoverage\" name=\"loanCoverage\" placeholder=\"Loan coverage %\" \r\n            [(ngModel)]=\"model.loanCoverage\" \r\n            required\r\n            [value]=\"model.loanCoverage\"\r\n            #loanCoverage=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"loanCoverage.invalid && (loanCoverage.dirty || loanCoverage.touched) && loanCoverage.errors.required\">Loan coverage is required</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Savings -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"savings\" name=\"savings\" placeholder=\"Current savings\" \r\n            [(ngModel)]=\"model.savings\" \r\n            [value]=\"model.savings\"\r\n            #savings=\"ngModel\">\r\n      </mat-form-field>\r\n\r\n      <!-- Add renovations checkbox -->\r\n      <mat-slide-toggle color=\"accent\" class=\"form__field form__field__toogle form__field__toogle--add-reno\"\r\n          [(ngModel)]=\"model.addRenovations\" name=\"addRenovations\" id=\"addRenovations\">\r\n        \r\n        Add renovations data\r\n      </mat-slide-toggle>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" class=\"form__fields\" *ngIf=\"model.addRenovations\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Renovation cost -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\" \r\n            [(ngModel)]=\"model.renovationCost\" \r\n            [value]=\"model.renovationCost\"\r\n            #renovationCost=\"ngModel\">\r\n      </mat-form-field>\r\n      \r\n      <!-- New market value -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"newMarketValue\" name=\"newMarketValue\" placeholder=\"After renovations market value\" \r\n            [(ngModel)]=\"model.newMarketValue\" \r\n            [value]=\"model.newMarketValue\"\r\n            #newMarketValue=\"ngModel\">\r\n      </mat-form-field>\r\n      \r\n      <!-- First year repayment -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"firstYearRepayment\" name=\"firstYearRepayment\" placeholder=\"First year loan repayments\" \r\n            [(ngModel)]=\"model.firstYearRepayment\" \r\n            [value]=\"model.firstYearRepayment\"\r\n            #firstYearRepayment=\"ngModel\">\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n</form>\r\n\r\n<section  class=\"\">\r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxFlex fxFlex.gt-xs=\"620px\">\r\n    <mat-card fxFlex>\r\n      <mat-card-title class=\"mat-card-title--ac\">Initial figures</mat-card-title>\r\n      <mat-card-content>\r\n        <div><label>Loan amount: </label><span>{{loanAmount}}</span></div>\r\n        <div><label>Deposit amount: </label><span>{{depositAmount}}</span></div>\r\n        <div><label>Discount: </label><span>{{discount}}</span></div>\r\n        <div><label>Equity: </label><span>{{equity}}</span></div>\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n    <mat-card fxFlex *ngIf=\"model.addRenovations\">\r\n      <mat-card-title class=\"mat-card-title--ac\">After renovations figures</mat-card-title>\r\n      <mat-card-content>\r\n        <div><label>Usable equity: </label><span>{{usableEquityAfterReno}}</span></div>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </div>\r\n</section>"

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/equity/equity.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".form__equity-calc .form__field__toogle--add-reno {\n  margin-bottom: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/equity/equity.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var EquityComponent = /** @class */ (function () {
    function EquityComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
        this.loanAmount = 0;
        this.discount = 0;
        this.equity = 0;
        this.depositAmount = 0;
        this.usableEquityAfterReno = 0;
        this.model = {
            purchasePrice: 0,
            marketValue: 0,
            loanCoverage: 0.8,
            savings: 0,
            renovationCost: 0,
            newMarketValue: 0,
            firstYearRepayment: 0,
            addRenovations: false
        };
    }
    EquityComponent.prototype.ngOnInit = function () {
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Calculators', url: '/calculators', selected: false },
            { displayName: 'Equity', url: null, selected: true },
            { displayName: 'House figures', url: '/calculators/house-figures', selected: false }
        ]);
    };
    EquityComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            _this.loanAmount = values.purchasePrice * values.loanCoverage;
            _this.discount = values.marketValue - values.purchasePrice;
            _this.depositAmount = values.purchasePrice - _this.loanAmount;
            _this.equity = values.savings + _this.discount + _this.depositAmount;
            if (values.addRenovations) {
                _this.usableEquityAfterReno = values.newMarketValue * 0.8 - _this.loanAmount + values.firstYearRepayment;
            }
        });
    };
    __decorate([
        core_1.ViewChild('equityForm'),
        __metadata("design:type", Object)
    ], EquityComponent.prototype, "form", void 0);
    EquityComponent = __decorate([
        core_1.Component({
            selector: 'app-equity',
            template: __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], EquityComponent);
    return EquityComponent;
}());
exports.EquityComponent = EquityComponent;


/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"calculator__container\" fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-sm=\"space-between none\">\r\n  <!-- Form  -->\r\n  <form class=\"form__container form__house-figures-calc\" #houseFiguresForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n    <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          Property value\r\n        </h3>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Purchase price -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"purchasePrice\" name=\"purchasePrice\" placeholder=\"Purchase price\" \r\n                [(ngModel)]=\"model.purchasePrice\" \r\n                numberValidator\r\n                [value]=\"model.purchasePrice\"\r\n                #purchasePrice=\"ngModel\">\r\n            \r\n            <mat-error *ngIf=\"purchasePrice.invalid && (purchasePrice.dirty || purchasePrice.touched) && purchasePrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n          \r\n          <!-- Market value -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\" \r\n                [(ngModel)]=\"model.marketValue\" \r\n                numberValidator\r\n                [value]=\"model.marketValue\"\r\n                #marketValue=\"ngModel\">\r\n\r\n            <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Capital growth -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"capitalGrowth\" name=\"capitalGrowth\" placeholder=\"Capital growth %\" \r\n                [(ngModel)]=\"model.capitalGrowth\" \r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                [value]=\"model.capitalGrowth\"\r\n                #capitalGrowth=\"ngModel\">\r\n            \r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n  \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          Loan figures\r\n        </h3>\r\n      \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Loan coverage -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"loanCoverage\" name=\"loanCoverage\" placeholder=\"Loan coverage %\" \r\n                [(ngModel)]=\"model.loanCoverage\" \r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                [value]=\"model.loanCoverage\"\r\n                #loanCoverage=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">Percentage of the purchase price covered by the loan.</mat-hint>\r\n            <mat-error *ngIf=\"loanCoverage.invalid && (loanCoverage.dirty || loanCoverage.touched) && loanCoverage.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"loanCoverage.invalid && (loanCoverage.dirty || loanCoverage.touched) && loanCoverage.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"loanCoverage.invalid && (loanCoverage.dirty || loanCoverage.touched) && loanCoverage.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Interest rates -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"interestRates\" name=\"interestRates\" placeholder=\"Interest rates %\" \r\n                [(ngModel)]=\"model.interestRates\" \r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                [value]=\"model.interestRates\"\r\n                #interestRates=\"ngModel\">\r\n\r\n            <mat-hint align=\"start\">Average loan interest rates (as a percentage).</mat-hint>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Loan term -->\r\n          <!-- <mat-form-field fxFlex  class=\"form__field\"> -->\r\n            <div class=\"\">\r\n              <label class=\"slider__label\">Term</label>\r\n              <mat-slider id=\"loanTerm\" name=\"loanTerm\"\r\n                  color=\"accent\"\r\n                  [max]=\"30\"\r\n                  [min]=\"1\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.loanTerm\"\r\n                  [value]=\"model.loanTerm\"> \r\n              </mat-slider>\r\n              {{model.loanTerm}}\r\n            </div>\r\n          <!-- </mat-form-field> -->\r\n  \r\n        </div>\r\n      </div>\r\n  \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          Rent figures\r\n        </h3>\r\n      \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Weekly rent -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"weeklyRent\" name=\"weeklyRent\" placeholder=\"Weekly rent\" \r\n                [(ngModel)]=\"model.weeklyRent\" \r\n                numberValidator\r\n                [value]=\"model.weeklyRent\"\r\n                #weeklyRent=\"ngModel\">\r\n  \r\n            \r\n            <mat-error *ngIf=\"weeklyRent.invalid && (weeklyRent.dirty || weeklyRent.touched) && weeklyRent.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Vacancy -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"vacancy\" name=\"vacancy\" placeholder=\"Vacancy\" \r\n                [(ngModel)]=\"model.vacancy\" \r\n                numberValidator\r\n                [value]=\"model.vacancy\"\r\n                #vacancy=\"ngModel\">\r\n  \r\n            <mat-hint align=\"start\">The number of weeks per year with no rent.</mat-hint>\r\n            <mat-error *ngIf=\"vacancy.invalid && (vacancy.dirty || vacancy.touched) && vacancy.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Rental manager -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"managed\" name=\"managed\" placeholder=\"Managed %\" \r\n                [(ngModel)]=\"model.managed\" \r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                [value]=\"model.managed\"\r\n                #managed=\"ngModel\">\r\n  \r\n            <mat-hint align=\"start\">Rental manager charges as a percentage of net annual rental income.</mat-hint>\r\n            <mat-error *ngIf=\"managed.invalid && (managed.dirty || managed.touched) && managed.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"managed.invalid && (managed.dirty || managed.touched) && managed.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"managed.invalid && (managed.dirty || managed.touched) && managed.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n        \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          Expenses\r\n        </h3>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Renovation cost -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\" \r\n                [(ngModel)]=\"model.renovationCost\" \r\n                [value]=\"model.renovationCost\"\r\n                numberValidator\r\n                #renovationCost=\"ngModel\">\r\n\r\n                <mat-hint align=\"start\">The cost to do all the renovations.</mat-hint>\r\n                <mat-error *ngIf=\"renovationCost.invalid && (renovationCost.dirty || renovationCost.touched) && renovationCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Mantainance cost -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"mantainanceCost\" name=\"mantainanceCost\" placeholder=\"Mantainance cost\" \r\n                [(ngModel)]=\"model.mantainanceCost\" \r\n                [value]=\"model.mantainanceCost\"\r\n                numberValidator\r\n                #mantainanceCost=\"ngModel\">\r\n\r\n                <mat-hint align=\"start\">The annual cost to maintain the property.</mat-hint>\r\n                <mat-error *ngIf=\"mantainanceCost.invalid && (mantainanceCost.dirty || mantainanceCost.touched) && mantainanceCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Body corporate -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"bodyCorporate\" name=\"bodyCorporate\" placeholder=\"Body corporate\" \r\n                [(ngModel)]=\"model.bodyCorporate\" \r\n                [value]=\"model.bodyCorporate\"\r\n                numberValidator\r\n                #bodyCorporate=\"ngModel\">\r\n  \r\n                <mat-error *ngIf=\"bodyCorporate.invalid && (bodyCorporate.dirty || bodyCorporate.touched) && bodyCorporate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- House rates -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"houseRates\" name=\"houseRates\" placeholder=\"House rates\" \r\n                [(ngModel)]=\"model.houseRates\" \r\n                [value]=\"model.houseRates\"\r\n                numberValidator\r\n                #houseRates=\"ngModel\">\r\n  \r\n                <mat-error *ngIf=\"houseRates.invalid && (houseRates.dirty || houseRates.touched) && houseRates.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- utilities -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"utilities\" name=\"utilities\" placeholder=\"Utitities\" \r\n                [(ngModel)]=\"model.utilities\" \r\n                [value]=\"model.utilities\"\r\n                numberValidator\r\n                #utilities=\"ngModel\">\r\n  \r\n                <mat-hint align=\"start\">Gas, water, electricity, internet, etc..</mat-hint>\r\n                <mat-error *ngIf=\"utilities.invalid && (utilities.dirty || utilities.touched) && utilities.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Insurance -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"insurance\" name=\"insurance\" placeholder=\"Insurances\" \r\n                [(ngModel)]=\"model.insurance\" \r\n                [value]=\"model.insurance\"\r\n                numberValidator\r\n                #insurance=\"ngModel\">\r\n  \r\n                <mat-error *ngIf=\"insurance.invalid && (insurance.dirty || insurance.touched) && insurance.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Other costs -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"otherCosts\" name=\"otherCosts\" placeholder=\"Other costs\" \r\n                [(ngModel)]=\"model.otherCosts\" \r\n                [value]=\"model.otherCosts\"\r\n                numberValidator\r\n                #otherCosts=\"ngModel\">\r\n\r\n                <mat-hint align=\"start\">Any other cost to have in mind not declared in the previous fields.</mat-hint>\r\n                <mat-error *ngIf=\"otherCosts.invalid && (otherCosts.dirty || otherCosts.touched) && otherCosts.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </form>\r\n  \r\n  <!-- Results -->\r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" fxFlex fxFlex.gt-sm=\"300px\" class=\"calculator__results\">\r\n    <mat-card>\r\n      <mat-card-title class=\"mat-card-title--ac\">Results</mat-card-title>\r\n\r\n      <mat-card-content fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Gross yield\" \r\n                text=\"Ratio between Gross annual rent / purchase price (as percentage)\"\r\n                position=\"right\"></info-tooltip>\r\n            <span>{{grossYield | percent : '1.1-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip \r\n                title=\"Net yield\" \r\n                text=\"Ratio between (Net annual rent - Expenses) / Purchase price * 100\"\r\n                position=\"right\"></info-tooltip>\r\n            <span>{{netYield | percent : '1.1-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n        \r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Gross annual rent\" text=\"Rent a week * 52\"></info-tooltip>\r\n            <span>{{grossAnnualRent | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Net annual rent\" text=\"Gross annual rent - Vacancy\"></info-tooltip>\r\n            <span>{{netAnnualRent | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n        \r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Expenses\" \r\n                text=\"Sums all the expenses in detailed before\"></info-tooltip>\r\n            <span>{{expenses | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Loan interest\" \r\n                text=\"The interest of the loan based in the specified interest rate.\"></info-tooltip>\r\n            <span>{{loanInterest | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Pre tax cashflow\" text=\"Net annual rent - Expenses - Loan interest\"></info-tooltip>\r\n            <span>{{preTaxCashflow | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Discount\"></info-tooltip>\r\n            <span>{{discount | percent : '1.1-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Total 1 year return\" text=\"Capital growth + Market value - Purchase price - Renovations + Pre tax cashflow\"></info-tooltip>\r\n            <span>{{totalFirstYearReturn | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Deposit\" text=\"\"></info-tooltip>\r\n            <span>{{deposit | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Return on deposit\" text=\"Ratio between Total 1st year return / Deposit * 100\"></info-tooltip>\r\n            <span>{{returnOnDeposit | percent : '1.1-2'}}</span>\r\n          </div>\r\n          \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Capital growth\" text=\"\"></info-tooltip>\r\n            <span>{{capitalGrowths | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".calculator__container .slider__label {\n  display: block;\n  font-size: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var HouseFiguresComponent = /** @class */ (function () {
    function HouseFiguresComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
        this.grossAnnualRent = 0;
        this.netAnnualRent = 0;
        this.grossYield = 0;
        this.netYield = 0;
        this.expenses = 0;
        this.loanInterest = 0;
        this.preTaxCashflow = 0;
        this.discount = 0;
        this.capitalGrowths = 0;
        this.totalFirstYearReturn = 0;
        this.deposit = 0;
        this.returnOnDeposit = 0;
        this.model = {
            purchasePrice: 0,
            capitalGrowth: 4,
            marketValue: 0,
            loanCoverage: 65,
            interestRates: 7,
            loanTerm: 30,
            weeklyRent: 0,
            vacancy: 4,
            renovationCost: 0,
            mantainanceCost: 0,
            bodyCorporate: 0,
            houseRates: 2000,
            utilities: 0,
            insurance: 900,
            otherCosts: 0,
            managed: 10
        };
    }
    HouseFiguresComponent.prototype.ngOnInit = function () {
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Calculators', url: '/calculators', selected: false },
            { displayName: 'Equity', url: '/calculators/equity', selected: false },
            { displayName: 'House figures', url: null, selected: true }
        ]);
    };
    HouseFiguresComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            _this.grossAnnualRent = _this.model.weeklyRent * 52;
            _this.netAnnualRent = _this.grossAnnualRent - _this.model.weeklyRent * _this.model.vacancy;
            _this.grossYield = _this.grossAnnualRent / _this.model.purchasePrice;
            _this.expenses = _this.model.renovationCost + _this.model.mantainanceCost + _this.model.bodyCorporate + _this.model.houseRates + _this.model.utilities + _this.model.insurance
                + _this.model.otherCosts + _this.netAnnualRent * (_this.model.managed / 100);
            _this.netYield = (_this.netAnnualRent - _this.expenses) / _this.model.purchasePrice;
            _this.loanInterest = _this.model.purchasePrice * (_this.model.interestRates / 100);
            _this.preTaxCashflow = _this.netAnnualRent - _this.expenses - _this.loanInterest;
            _this.discount = (_this.model.marketValue - _this.model.purchasePrice - _this.model.renovationCost) / (_this.model.marketValue || 1);
            _this.capitalGrowths = _this.model.marketValue * (_this.model.capitalGrowth / 100);
            _this.totalFirstYearReturn = _this.capitalGrowths + _this.model.marketValue - _this.model.purchasePrice - _this.model.renovationCost + _this.preTaxCashflow;
            _this.deposit = _this.model.purchasePrice * (1 - _this.model.loanCoverage / 100);
            _this.returnOnDeposit = _this.totalFirstYearReturn / _this.deposit;
        });
    };
    __decorate([
        core_1.ViewChild('houseFiguresForm'),
        __metadata("design:type", Object)
    ], HouseFiguresComponent.prototype, "form", void 0);
    HouseFiguresComponent = __decorate([
        core_1.Component({
            selector: 'app-house-figures',
            template: __webpack_require__("../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/calculators/components/house-figures/house-figures.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], HouseFiguresComponent);
    return HouseFiguresComponent;
}());
exports.HouseFiguresComponent = HouseFiguresComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__edit-currency-investment\">\r\n    <form class=\"form__container form__edit-currency-investment\" #editCurrencyInvestmentForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n      \r\n      <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"form__fields__row\">\r\n            <currency-unit fxFlex fxFlex.gt-xs=\"200px\"\r\n                [id]=\"'currencyInvestmentUnit'\" \r\n                [value]=\"model.unit\"\r\n                [type]=\"model.type\"\r\n                [hint]=\"'Choose the desired currency to invest on...'\"\r\n                [placeHolder]=\"'Desired currency'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n\r\n            <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"amount\" name=\"amount\" placeholder=\"Amount\"\r\n                  [(ngModel)]=\"model.amount\" \r\n                  [value]=\"model.amount\"\r\n                  numberValidator='{\"maxFractionDigits\": 8}' \r\n                  required\r\n                  #amount=\"ngModel\">\r\n              <mat-hint align=\"start\">Set the buying amount.</mat-hint>\r\n              <mat-error *ngIf=\"amount.invalid && (amount.dirty || amount.touched) && amount.errors.required\">Amount is required.</mat-error>\r\n              <mat-error *ngIf=\"amount.invalid && (amount.dirty || amount.touched) && amount.errors.numberValidator\">Value must be numeric, with no more than 8 decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"form__fields__row\">\r\n            <!-- Buying date -->\r\n            <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n              <input placeholder=\"Buying date\"\r\n                  id=\"buyingDate\"\r\n                  name=\"buyingDate\"\r\n                  readonly\r\n                  required\r\n                  #buyingDate=\"ngModel\"\r\n                  matInput \r\n                  [(ngModel)]=\"model.buyingDate\" \r\n                  [matDatepicker]=\"pickerBuyingDate\"\r\n                  (click)=\"pickerBuyingDate.open()\">\r\n              <mat-datepicker-toggle matSuffix [for]=\"pickerBuyingDate\"></mat-datepicker-toggle>\r\n              <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBuyingDate></mat-datepicker>\r\n              <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.required\">Buying date is required.</mat-error>\r\n              <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.matDatepickerParse\">Buying date is invalid or not follows the pattern \"mm/dd/yyyy\"</mat-error>\r\n            </mat-form-field>\r\n\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n              <!-- Buying price unit -->\r\n              <currency-unit fxFlex=\"50px\"\r\n                  [id]=\"'buyingPriceUnit'\" \r\n                  [view]=\"'narrow'\"\r\n                  [value]=\"model.buyingPriceUnit\"\r\n                  (newValue)=\"onCurrencyUnitChange($event)\">\r\n              </currency-unit>\r\n\r\n              <!-- Buying price -->\r\n              <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n                <input matInput type=\"number\" id=\"buyingPrice\" name=\"buyingPrice\" placeholder=\"Price\"\r\n                    [(ngModel)]=\"model.buyingPrice\" \r\n                    [value]=\"model.buyingPrice\"\r\n                    numberValidator \r\n                    required\r\n                    #buyingPrice=\"ngModel\">\r\n                <mat-hint align=\"start\">Price on buying date.</mat-hint>\r\n                <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.required\">Buying price is required.</mat-error>\r\n                <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n              </mat-form-field>\r\n            </div>\r\n            \r\n          </div>\r\n        </div>\r\n      </section>\r\n    </form>\r\n  </div>\r\n  "

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var util_service_1 = __webpack_require__("../../../../../src/app/util.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var CurrencyInvestmentFormComponent = /** @class */ (function () {
    function CurrencyInvestmentFormComponent(dateAdapter, appService, utilService) {
        this.dateAdapter = dateAdapter;
        this.appService = appService;
        this.utilService = utilService;
        this.defaultValues = null; //the default values of the component model  
        this.values = new core_1.EventEmitter();
        this.model = {
            type: null,
            unit: null,
            amount: null,
            buyingPrice: null,
            buyingPriceUnit: null,
            buyingDate: null
        };
        this.subscription = new Subscription_1.Subscription();
        this.dateAdapter.setLocale('en-GB');
    }
    CurrencyInvestmentFormComponent.prototype.ngOnInit = function () {
        this.model.unit = this.model.type === 'currency' ? 'USD' : 'BTC';
        this.model.buyingDate = new Date(Date.now());
        this.model.buyingPriceUnit = 'USD';
        Object.assign(this.model, this.defaultValues);
    };
    CurrencyInvestmentFormComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    CurrencyInvestmentFormComponent.prototype.onCurrencyUnitChange = function ($event) {
        if ($event.source.id === 'currencyInvestmentUnit') {
            this.model.unit = $event.value;
        }
        else if ($event.source.id === 'buyingPriceUnit') {
            this.model.buyingPriceUnit = $event.value;
        }
        this.values.emit({
            value: {
                model: this.model,
                valid: this.form.valid
            }
        });
    };
    CurrencyInvestmentFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //send data before touching any value
        this.values.emit({
            value: {
                model: this.model,
                valid: this.form.valid
            }
        });
        //after any event in the form we send updated data
        var newSubscription = this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            _this.values.emit({
                value: {
                    model: _this.model,
                    valid: _this.form.valid
                }
            });
        });
        this.subscription.add(newSubscription);
    };
    __decorate([
        core_1.ViewChild('editCurrencyInvestmentForm'),
        __metadata("design:type", Object)
    ], CurrencyInvestmentFormComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CurrencyInvestmentFormComponent.prototype, "defaultValues", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyInvestmentFormComponent.prototype, "values", void 0);
    CurrencyInvestmentFormComponent = __decorate([
        core_1.Component({
            selector: 'currency-investment-form',
            template: __webpack_require__("../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.scss")]
        }),
        __metadata("design:paramtypes", [material_1.DateAdapter, app_service_1.AppService,
            util_service_1.UtilService])
    ], CurrencyInvestmentFormComponent);
    return CurrencyInvestmentFormComponent;
}());
exports.CurrencyInvestmentFormComponent = CurrencyInvestmentFormComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"currency-card\">\r\n  <mat-card-header>\r\n    <div mat-card-avatar class=\"header-image\">\r\n        <img [src]=\"'/assets/images/' + investment.type + '/' + investment.unit + '.png'\" [alt]=\"investment.type\" />\r\n    </div>\r\n    <mat-card-title>{{investment.unit}} ({{investment.amount}})</mat-card-title>\r\n    <mat-card-subtitle>\r\n      today at <strong>{{currentPrice | currency : 'USD' : 'code' : '1.2-2'}}</strong>\r\n    </mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content class=\"card__content\">\r\n    Investment: <strong>{{investmentAmount | currency : 'USD' : 'code' : '1.2-2' }}</strong> \r\n    <br>\r\n\r\n    on {{investment.buyingDate | date}} at {{ buyingPrice | currency : 'USD' : 'code' : '1.2-2' }}\r\n\r\n    <div [class.color__accent]=\"investmentReturn >= investmentValueWhenBought\" \r\n        [class.color__red]=\"investmentReturn < investmentValueWhenBought\">\r\n      <br>\r\n      ROI: <strong>{{ investmentReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{investmentReturn / investmentValueWhenBought * 100 | number : '1.1-2'}}%)\r\n    </div>\r\n\r\n    <!-- Team -->\r\n    <mat-expansion-panel *ngIf=\"team\" class=\"team-panel\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-panel__content\">\r\n\r\n        <section class=\"members\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n          <div *ngFor=\"let portion of investmentDistribution\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"portion.member.avatar\"/>\r\n            <div fxFlex class=\"member__info\" fxLayout=\"column\">\r\n              <p class=\"member__name\">{{portion.member.name}}</p>\r\n              <!-- <p class=\"member__email\">{{member.email}}</p> -->\r\n              <div class=\"member__money\" fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-between end\">\r\n                <p>{{ portion.percentage }}%</p>\r\n                <p>{{ portion.money | currency : 'USD' : 'code' : '1.2-2' }}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team -->\r\n\r\n    <section class=\"card__actions\" fxLayout=\"row\" fxLayoutAlign=\"end none\" fxLayoutGap=\"10px\">\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab routerLink=\"/investments/crypto/edit/{{investment.id}}\" color=\"primary\" (click)=\"actionRunning = true\">\r\n        <mat-icon aria-label=\"Edit Investment\">edit</mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab color=\"warn\" (click)=\"openDeleteDialog()\">\r\n        <mat-icon aria-label=\"Delete investment\">delete</mat-icon>\r\n      </button>\r\n\r\n      <mat-progress-spinner *ngIf=\"actionRunning\"\r\n        class=\"progress-spinner progress-spinner--action\"\r\n        color=\"warn\"\r\n        [diameter]=\"40\" [strokeWidth]=\"7\"\r\n        mode=\"indeterminate\">\r\n      </mat-progress-spinner>\r\n    </section>\r\n  </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".currency-card {\n  text-align: left; }\n  .currency-card .header-image img {\n    width: 40px; }\n  .currency-card .card__content {\n    text-align: center; }\n  .currency-card .card__content .team-panel {\n      cursor: default;\n      margin-top: 10px; }\n  .currency-card .card__content .team-panel mat-panel-title {\n        font-size: 18px; }\n  .currency-card .card__content .team-panel .team-panel__content {\n        text-align: left; }\n  .currency-card .card__content .team-panel .team-panel__content .members .member .member__avatar {\n          border-radius: 50%;\n          width: 40px;\n          height: 40px;\n          padding: 0 10px 0 0; }\n  .currency-card .card__content .team-panel .team-panel__content .members .member .member__info .member__email {\n          font-size: 11px; }\n  .currency-card .card__content .card__actions {\n      margin: 10px 0 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var yes_no_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var investments_service_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.service.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var currency_exchange_service_1 = __webpack_require__("../../../../../src/app/modules/investments/currency-exchange.service.ts");
var currencyInvestment_1 = __webpack_require__("../../../../../src/app/modules/investments/models/currencyInvestment.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var BehaviorSubject_1 = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var CurrencyInvestmentComponent = /** @class */ (function () {
    function CurrencyInvestmentComponent(currencyExchangeService, appService, usersService, investmentsService, dialog, router) {
        this.currencyExchangeService = currencyExchangeService;
        this.appService = appService;
        this.usersService = usersService;
        this.investmentsService = investmentsService;
        this.dialog = dialog;
        this.router = router;
        this.totalReturns = new core_1.EventEmitter();
        this.deletedId = new core_1.EventEmitter();
        this.teams$ = new BehaviorSubject_1.BehaviorSubject([]);
        this.investmentAmount = 0;
        this.buyingPrice = 0;
        this.investmentReturn = 0;
        this.investmentValueWhenBought = 0;
        this.currentPrice = 0;
        this.actionRunning = false;
        this.user = null;
        this.team = null; //if the investment has a tema this will be populated with the full info of the team
        this.investmentDistribution = [];
        this.subscription = new Subscription_1.Subscription();
    }
    Object.defineProperty(CurrencyInvestmentComponent.prototype, "teams", {
        get: function () {
            return this.teams$.getValue();
        },
        set: function (teams) {
            this.teams$.next(teams);
        },
        enumerable: true,
        configurable: true
    });
    CurrencyInvestmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        //get the team of the investmetn if exists
        var newSubscription = null;
        var currencyRates$ = this.currencyExchangeService.getCurrencyRates(); //get currency rates observable source
        var currencyRatesAndUser$ = this.usersService.user$.combineLatest(currencyRates$, function (user, currencyRates) {
            _this.user = user;
            return { user: user, currencyRates: currencyRates };
        }); //(currency rates and user) source
        if (this.investment.type === 'crypto') {
            //crypto investment
            var cryptoRates$ = this.currencyExchangeService.getCryptoRates(this.investment.unit); //get crypto rates observable source
            newSubscription = cryptoRates$.combineLatest(currencyRatesAndUser$, function (cryptoRates, currencyRatesAndUser) {
                return {
                    currencyRates: currencyRatesAndUser.currencyRates,
                    user: currencyRatesAndUser.user,
                    cryptoRates: cryptoRates
                };
            }).switchMap(function (data) {
                _this.currentPrice = data.cryptoRates.price;
                _this.investmentAmount = _this.currencyExchangeService.getUsdValueOf(_this.investment.investmentAmount, _this.investment.investmentAmountUnit);
                _this.buyingPrice = _this.currencyExchangeService.getUsdValueOf(_this.investment.buyingPrice, _this.investment.buyingPriceUnit);
                _this.investmentValueWhenBought = _this.buyingPrice * _this.investment.amount;
                _this.investmentReturn = _this.currentPrice * _this.investment.amount;
                return _this.teams$;
            }).subscribe(function (teams) {
                _this.setInvestmentTeamData(teams);
            }, function (error) {
                _this.appService.consoleLog('error', methodTrace + " There was an error trying to generate investment data > ", error);
                _this.appService.showResults("There was an error trying to generate investment data, please try again in a few minutes.", 'error');
            });
        }
        else {
            //currency exchange
            newSubscription = currencyRatesAndUser$.switchMap(function (data) {
                _this.currentPrice = data.currencyRates[_this.investment.unit] || 1;
                _this.investmentAmount = _this.currencyExchangeService.getUsdValueOf(_this.investment.investmentAmount, _this.investment.investmentAmountUnit);
                _this.buyingPrice = _this.currencyExchangeService.getUsdValueOf(_this.investment.buyingPrice, _this.investment.buyingPriceUnit);
                _this.investmentValueWhenBought = _this.buyingPrice * _this.investment.amount;
                _this.investmentReturn = _this.currentPrice * _this.investment.amount;
                return _this.teams$;
            }).subscribe(function (teams) {
                _this.setInvestmentTeamData(teams);
            }, function (error) {
                _this.appService.consoleLog('error', methodTrace + " There was an error trying to generate investment data > ", error);
                _this.appService.showResults("There was an error trying to generate investment data, please try again in a few minutes.", 'error');
            });
        }
        this.subscription.add(newSubscription);
    };
    CurrencyInvestmentComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Populates team data as well as the distribution on the investment between team members when the investment is asigned to a team
     *
     * @param {Team[]} teams . The teams of the current user
     */
    CurrencyInvestmentComponent.prototype.setInvestmentTeamData = function (teams) {
        var _this = this;
        this.team = this.investment.team ? teams.filter(function (team) { return team.slug === _this.investment.team.slug; })[0] : null; //look for the team of the investment
        //set totals to emit to parent component. If no team assigned then the total of the investment is the same as my portion
        var totals = {
            investmentId: this.investment.id,
            investmentAmount: this.investmentAmount,
            investmentReturn: this.investmentReturn,
            myInvestmentAmount: this.investmentAmount,
            myInvestmentReturn: this.investmentReturn
        };
        if (this.team) {
            var _loop_1 = function (member) {
                var percentage = (this_1.investment.investmentDistribution.filter(function (portion) { return portion.email === member.email; })[0]).percentage;
                this_1.investmentDistribution.push({
                    member: member,
                    percentage: percentage,
                    money: this_1.investmentReturn * percentage / 100
                });
                if (this_1.user && this_1.user.email === member.email) {
                    totals.myInvestmentAmount = this_1.investmentAmount * percentage / 100;
                    totals.myInvestmentReturn = this_1.investmentReturn * percentage / 100;
                }
            };
            var this_1 = this;
            //if team is present then get my portion of the investment
            for (var _i = 0, _a = this.team.members; _i < _a.length; _i++) {
                var member = _a[_i];
                _loop_1(member);
            }
        }
        this.totalReturns.emit(totals);
    };
    CurrencyInvestmentComponent.prototype.openDeleteDialog = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > openDeleteDialog() > "; //for debugging
        if (!this.investment.id) {
            this.appService.consoleLog('error', methodTrace + " Investment ID is required to delete.");
            return false;
        }
        this.actionRunning = true;
        var yesNoDialogRef = this.dialog.open(yes_no_dialog_component_1.YesNoDialogComponent, {
            width: '250px',
            data: {
                title: 'Delete investment',
                message: "Are you sure you want to delete this investment forever?"
            }
        });
        yesNoDialogRef.afterClosed().subscribe(function (result) {
            if (result === 'yes') {
                _this.delete();
            }
            else {
                _this.actionRunning = false;
            }
        });
        return false;
    };
    CurrencyInvestmentComponent.prototype.delete = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        if (this.user) {
            this.actionRunning = true;
            var newSubscription = this.investmentsService.delete(this.investment.id, this.user.email).subscribe(function (data) {
                if (data && data.removed > 0) {
                    _this.appService.showResults("Investment successfully removed!", 'success');
                    _this.deletedId.emit(_this.investment.id);
                }
                else {
                    _this.appService.showResults("Investment could not be removed, please try again.", 'error');
                    _this.actionRunning = false;
                }
            }, function (error) {
                _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
                if (error.codeno === 400) {
                    _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
                }
                else {
                    _this.appService.showResults("There was an error with this service and the information provided.", 'error');
                }
                _this.actionRunning = false;
            });
            this.subscription.add(newSubscription);
        }
        else {
            this.appService.showResults("You are not logged into AtomiCoconut, you must login first.", 'error');
            this.router.navigate(['/users/login']);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", currencyInvestment_1.CurrencyInvestment)
    ], CurrencyInvestmentComponent.prototype, "investment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CurrencyInvestmentComponent.prototype, "teams", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyInvestmentComponent.prototype, "totalReturns", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyInvestmentComponent.prototype, "deletedId", void 0);
    CurrencyInvestmentComponent = __decorate([
        core_1.Component({
            selector: 'currency-investment',
            template: __webpack_require__("../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.scss")]
        }),
        __metadata("design:paramtypes", [currency_exchange_service_1.CurrencyExchangeService, app_service_1.AppService, users_service_1.UsersService, investments_service_1.InvestmentsService,
            material_1.MatDialog, router_1.Router])
    ], CurrencyInvestmentComponent);
    return CurrencyInvestmentComponent;
}());
exports.CurrencyInvestmentComponent = CurrencyInvestmentComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Create investment</h2>\r\n\r\n<mat-dialog-content>\r\n  <mat-button-toggle-group fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"selector__investment-type\" (change)=\"onChange($event)\" #investmentTypesGroup>\r\n    <mat-button-toggle class=\"option__investment-type\" value=\"currency\" matTooltip=\"Currency exchange\" routerLink=\"investments/currency/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/exchange.png\" alt=\"currency\" />\r\n    </mat-button-toggle>\r\n    <mat-button-toggle class=\"option__investment-type\" value=\"cryptocurrency\" matTooltip=\"Crypto currency\" routerLink=\"investments/crypto/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/cryptocurrency.png\" alt=\"Crypto currency\" />\r\n    </mat-button-toggle>\r\n    <!-- <mat-button-toggle class=\"option__investment-type\" value=\"property\" matTooltip=\"Property\" routerLink=\"investments/property/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/house.png\" alt=\"Property\" />\r\n    </mat-button-toggle> -->\r\n  </mat-button-toggle-group>\r\n</mat-dialog-content>\r\n"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  text-align: center; }\n  :host .selector__investment-type .option__investment-type {\n    padding: 10px; }\n  :host .selector__investment-type .option__investment-type img {\n      width: 50px; }\n  @media screen and (min-width: 600px) {\n    :host .selector__investment-type .option__investment-type img {\n      width: 90px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var util_service_1 = __webpack_require__("../../../../../src/app/util.service.ts");
var InvestmentSelectorDialogComponent = /** @class */ (function () {
    function InvestmentSelectorDialogComponent(dialogRef, data, utilService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.utilService = utilService;
    }
    InvestmentSelectorDialogComponent.prototype.ngOnInit = function () { };
    InvestmentSelectorDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    InvestmentSelectorDialogComponent.prototype.onChange = function (event) {
        this.dialogRef.close();
    };
    InvestmentSelectorDialogComponent = __decorate([
        core_1.Component({
            selector: 'investment-selector-dialog',
            template: __webpack_require__("../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, util_service_1.UtilService])
    ], InvestmentSelectorDialogComponent);
    return InvestmentSelectorDialogComponent;
}());
exports.InvestmentSelectorDialogComponent = InvestmentSelectorDialogComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__investments\">\r\n  <section *ngIf=\"!getInvestmentsServiceRunning && investments.length > 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    \r\n    <div *ngFor=\"let row of investmentsUI\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\">\r\n      <currency-investment *ngFor=\"let investment of row\" fxFlex fxFlex.gt-xs=\"50\"\r\n        [investment]=\"investment\"\r\n        [teams]=\"teams\"\r\n        (totalReturns)=\"setTotals($event)\"\r\n        (deletedId)=\"removeInvestment($event)\">\r\n      </currency-investment>\r\n    </div>\r\n\r\n    <mat-card fxFlex class=\"totals__card\">\r\n      <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"20px\">\r\n        <!-- Totals -->\r\n        <div *ngIf=\"!myTotals.checked\" fxFlex fxFlex.xs=\"none\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n          <p>Total investments: <strong>{{totalInvestment | currency : 'USD' : 'code' : '1.2-2' }}</strong></p>\r\n          <p [class.color__accent]=\"totalReturn >= totalInvestment\" \r\n              [class.color__red]=\"totalReturn < totalInvestment\">\r\n            Total ROI: <strong>{{ totalReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n          </p>\r\n        </div>\r\n\r\n        <!-- My totals -->\r\n        <div *ngIf=\"myTotals.checked\" fxFlex fxFlex.xs=\"none\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n          <p>My total investments: <strong>{{myTotalInvestment | currency : 'USD' : 'code' : '1.2-2' }}</strong></p>\r\n          <p [class.color__accent]=\"myTotalReturn >= myTotalInvestment\" \r\n              [class.color__red]=\"myTotalReturn < myTotalInvestment\">\r\n            My total ROI: <strong>{{ myTotalReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{myTotalReturn / myTotalInvestment * 100 | number : '1.1-2'}}%)\r\n          </p>\r\n        </div>\r\n\r\n        <!-- Totals switcher -->\r\n        <mat-slide-toggle fxFlexAlign.xs=\"center\" color=\"accent\" class=\"form__field form__field__toogle\" [checked]=\"false\" #myTotals>\r\n          My totals\r\n        </mat-slide-toggle>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n  </section>\r\n\r\n  <section *ngIf=\"!getInvestmentsServiceRunning && investments.length == 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <mat-card fxFlex class=\"no-investments__card\">\r\n      <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n          fxLayoutAlign=\"space-around center\">\r\n        <p> You do not have investments yet.</p>\r\n      </mat-card-content>\r\n    </mat-card>\r\n    \r\n  </section>\r\n\r\n  <mat-progress-bar *ngIf=\"getInvestmentsServiceRunning\"\r\n    fxFlexAlign=\"center\"\r\n    class=\"progress-bar progress-bar--get-investments\"\r\n    color=\"primary\"\r\n    mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\" class=\"actions fab mat-elevation-z10\">\r\n    <button mat-fab class=\"fab mat-elevation-z10\" color=\"accent\" matTooltip=\"Create new investment\" matTooltipPosition=\"left\" (click)=\"openNewInvestmentDialog()\">\r\n      <mat-icon aria-label=\"Create new investemt\">add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".totals__card, .no-investments__card {\n  text-align: center; }\n  .totals__card md-card-content p, .no-investments__card md-card-content p {\n    margin-bottom: 0; }\n  .progress-bar--get-investments {\n  width: 100%; }\n  @media screen and (min-width: 600px) {\n  .progress-bar--get-investments {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var investment_selector_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var investments_service_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.service.ts");
var teams_service_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var currency_exchange_service_1 = __webpack_require__("../../../../../src/app/modules/investments/currency-exchange.service.ts");
var constants_1 = __webpack_require__("../../../../../src/app/constants/constants.ts");
var InvestmentsDashboardComponent = /** @class */ (function () {
    function InvestmentsDashboardComponent(route, mainNavigatorService, usersService, dialog, appService, teamsService, investmentsService, currencyExchangeService) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.usersService = usersService;
        this.dialog = dialog;
        this.appService = appService;
        this.teamsService = teamsService;
        this.investmentsService = investmentsService;
        this.currencyExchangeService = currencyExchangeService;
        this.investments = [];
        this.teams = [];
        this.investmentsUI = []; //this is a structure to use in the view an make the rendering easier organizing the info in rows
        this.totalInvestment = 0;
        this.totalReturn = 0;
        this.myTotalInvestment = 0;
        this.myTotalReturn = 0;
        this.totals = {};
        this.user = null;
        this.subscription = new Subscription_1.Subscription();
        this.getInvestmentsServiceRunning = false;
        this.getTeamsServiceRunning = false;
    }
    InvestmentsDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: null, selected: true }
        ]);
        //get authUser from resolver
        var user$ = this.route.data.map(function (data) {
            _this.user = data.authUser;
            return data.authUser;
        });
        if (!this.investments.length) {
            this.getInvestments(user$);
        }
        this.getTeams(user$);
    };
    InvestmentsDashboardComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Get my teams from server
     */
    InvestmentsDashboardComponent.prototype.getTeams = function (user$) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        this.teams = [];
        this.getTeamsServiceRunning = true;
        var newSubscription = user$.switchMap(function (user) {
            return _this.teamsService.getTeams(user.email);
        }).subscribe(function (teams) {
            _this.teams = teams;
            _this.getTeamsServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getTeamsServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Get my investments from server
     */
    InvestmentsDashboardComponent.prototype.getInvestments = function (user$) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getInvestments() > "; //for debugging
        this.investments = [];
        this.getInvestmentsServiceRunning = true;
        var newSubscription = user$.switchMap(function (user) {
            return _this.investmentsService.getInvestments(user.email);
        }).subscribe(function (investments) {
            _this.investments = investments;
            //organize investments in rows of n-items to show in the view
            var investmentsRow = [];
            for (var _i = 0, investments_1 = investments; _i < investments_1.length; _i++) {
                var item = investments_1[_i];
                if (investmentsRow.length < 2) {
                    investmentsRow.push(item);
                }
                else {
                    _this.investmentsUI.push(investmentsRow);
                    investmentsRow = [item];
                }
            }
            if (investmentsRow.length) {
                _this.investmentsUI.push(investmentsRow);
            }
            _this.getInvestmentsServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getInvestmentsServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    InvestmentsDashboardComponent.prototype.setTotals = function (totalReturns) {
        //update the total that matches the id
        this.totals[totalReturns.investmentId] = totalReturns;
        //reset totals
        this.totalReturn = 0;
        this.totalInvestment = 0;
        this.myTotalInvestment = 0;
        this.myTotalReturn = 0;
        //re calculate totals
        for (var _i = 0, _a = Object.keys(this.totals); _i < _a.length; _i++) {
            var investmentId = _a[_i];
            this.totalReturn += this.totals[investmentId].investmentReturn;
            this.totalInvestment += this.totals[investmentId].investmentAmount;
            this.myTotalInvestment += this.totals[investmentId].myInvestmentAmount;
            this.myTotalReturn += this.totals[investmentId].myInvestmentReturn;
        }
    };
    /**
     * Removes the investment from the investments array and from the investmentUI array used in view
     */
    InvestmentsDashboardComponent.prototype.removeInvestment = function (deletedId) {
        var _this = this;
        var methodTrace = this.constructor.name + " > removeInvestment() > "; //for debugging
        if (deletedId) {
            var index = 0;
            var _loop_1 = function (investment) {
                //update totals and break loop
                if (investment.id === deletedId) {
                    //get my portion in the investment
                    var myPortion_1 = 0;
                    for (var _i = 0, _a = investment.investmentDistribution; _i < _a.length; _i++) {
                        var portion = _a[_i];
                        if (this_1.user.email === portion.email) {
                            myPortion_1 = portion.percentage;
                            break;
                        }
                    }
                    var currencyInvestment_1 = investment;
                    if (currencyInvestment_1.type === constants_1.INVESTMENTS_TYPES.CURRENCY) {
                        this_1.currencyExchangeService.getCurrencyRates().take(1).subscribe(function (currencyRates) {
                            var investmentReturn = currencyInvestment_1.amount * (currencyRates[currencyInvestment_1.unit] || 1);
                            var investmentAmount = _this.currencyExchangeService.getUsdValueOf(currencyInvestment_1.investmentAmount, currencyInvestment_1.investmentAmountUnit);
                            _this.totalReturn -= investmentReturn;
                            _this.totalInvestment -= investmentAmount;
                            _this.myTotalReturn -= investmentReturn * myPortion_1 / 100;
                            _this.myTotalInvestment -= investmentAmount * myPortion_1 / 100;
                        }, function (error) {
                            _this.appService.consoleLog('error', methodTrace + " There was an error trying to get currency rates data > ", error);
                            _this.appService.showResults("There was an error trying to get currency rates data, please try again in a few minutes.", 'error');
                        });
                    }
                    else if (investment.type === constants_1.INVESTMENTS_TYPES.CRYPTO) {
                        this_1.currencyExchangeService.getCryptoRates(currencyInvestment_1.unit).take(1).subscribe(function (rates) {
                            var investmentReturn = currencyInvestment_1.amount * rates.price;
                            var investmentAmount = _this.currencyExchangeService.getUsdValueOf(currencyInvestment_1.investmentAmount, currencyInvestment_1.investmentAmountUnit);
                            _this.totalReturn -= investmentReturn;
                            _this.totalInvestment -= investmentAmount;
                            _this.myTotalReturn -= investmentReturn * myPortion_1 / 100;
                            _this.myTotalInvestment -= investmentAmount * myPortion_1 / 100;
                        }, function (error) {
                            _this.appService.consoleLog('error', methodTrace + " There was an error trying to get " + currencyInvestment_1.unit + " rates data > ", error);
                            _this.appService.showResults("There was an error trying to get " + currencyInvestment_1.unit + " rates data, please try again in a few minutes.", 'error');
                        });
                    }
                    return "break";
                }
                index += 1;
            };
            var this_1 = this;
            for (var _i = 0, _a = this.investments; _i < _a.length; _i++) {
                var investment = _a[_i];
                var state_1 = _loop_1(investment);
                if (state_1 === "break")
                    break;
            }
            //remove investment from array
            this.investments.splice(index, 1);
            //update ui array
            var row = 0;
            var offset = 0;
            var found = false;
            for (var i = 0; i < this.investmentsUI.length; i++) {
                for (var j = 0; j < this.investmentsUI[i].length; j++) {
                    if (this.investmentsUI[i][j].id === deletedId) {
                        row = i;
                        offset = j;
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            this.investmentsUI[row].splice(offset, 1);
            if (!this.investmentsUI[row].length) {
                this.investmentsUI.splice(row, 1);
            }
        }
    };
    InvestmentsDashboardComponent.prototype.openNewInvestmentDialog = function () {
        var addPersonDialogRef = this.dialog.open(investment_selector_dialog_component_1.InvestmentSelectorDialogComponent, {});
        return false;
    };
    InvestmentsDashboardComponent = __decorate([
        core_1.Component({
            selector: 'investments-dashboard',
            template: __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, users_service_1.UsersService, material_1.MatDialog,
            app_service_1.AppService, teams_service_1.TeamsService, investments_service_1.InvestmentsService, currency_exchange_service_1.CurrencyExchangeService])
    ], InvestmentsDashboardComponent);
    return InvestmentsDashboardComponent;
}());
exports.InvestmentsDashboardComponent = InvestmentsDashboardComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__edit-investment\">\r\n  <form class=\"form__container form__edit-investment\" (ngSubmit)=\"editMode ? onUpdate() : onSubmit()\" #editInvestmentForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <div *ngIf=\"!getInvestmentServiceRunning\">\r\n      <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n        \r\n        <mat-progress-bar *ngIf=\"getTeamsServiceRunning\"\r\n          class=\"progress-bar progress-bar--get-teams\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n        </mat-progress-bar>\r\n\r\n        <div *ngIf=\"teams.length && !getTeamsServiceRunning\" fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title\">\r\n            Owner\r\n            <p class=\"mat-caption\">Specify the owner of this investment</p>\r\n          </h3>\r\n  \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n            <mat-radio-group fxFlex.gt-xs=\"230px\" class=\"form__field radiogroup__owner\"\r\n                [(ngModel)]=\"model.owner\" \r\n                name=\"owner\" \r\n                id=\"owner\" \r\n                #owner=\"ngModel\"\r\n                (change)=\"onRadioChange($event)\">\r\n              <mat-radio-button class=\"owner__option\" value=\"me\">Just me</mat-radio-button>\r\n              <mat-radio-button class=\"owner__option\" value=\"team\">My team</mat-radio-button>\r\n            </mat-radio-group>\r\n    \r\n            <mat-form-field *ngIf=\"teams.length && model.owner === 'team'\" fxFlex fxFlex.gt-xs=\"350px\" class=\"form__field\">\r\n              <mat-select [(ngModel)]=\"model.team\"\r\n                  name=\"team\" \r\n                  id=\"team\" \r\n                  #team=\"ngModel\" \r\n                  placeholder=\"Select a team\"\r\n                  (selectionChange)=\"onSelectChange($event)\"\r\n                  required>\r\n                <mat-option *ngFor=\"let team of teams\" [value]=\"team\">\r\n                  {{team.name}}\r\n                </mat-option>\r\n              </mat-select>\r\n              <mat-error *ngIf=\"team.invalid && (team.dirty || team.touched) && team.errors.required\">Please choose a team</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n        \r\n        <div *ngIf=\"model.team\" fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title\">\r\n            Split between team members\r\n            <p class=\"mat-caption\">Specify how to split the returns setting a percentage of the total investment amount to each member</p>\r\n          </h3>\r\n  \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"form__fields__row\">         \r\n            <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"20px\" class=\"team-members\">\r\n              <div *ngFor=\"let member of model.team.members; index as memberIndex\" fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"member\">\r\n                <div class=\"member-details\" fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n                  <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n                  <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === model.team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n                    <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === model.team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n                    <p class=\"member__email\">{{member.email}}</p>\r\n                  </div>\r\n                </div>\r\n      \r\n                <div class=\"member-percentage\">\r\n                  <mat-form-field class=\"form__field\">\r\n                    <input matInput type=\"number\" id=\"memberPercentage_{{member.email}}\" name=\"memberPercentage_{{member.email}}\" placeholder=\"Percentage of investment\"\r\n                        [(ngModel)]=\"model.membersPercentage[member.email]\" \r\n                        [value]=\"model.membersPercentage[member.email]\"\r\n                        numberValidator='{\"min\": 0, \"max\": 100}'\r\n                        required\r\n                        #memberPercentage=\"ngModel\">\r\n                    <mat-hint align=\"start\">(%) Investment portion for {{member.email}}.</mat-hint>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.required\">Percentage of investment is required.</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n                  </mat-form-field>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            \r\n          </div>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title title__investment-amount\">\r\n            Investment details\r\n          </h3>\r\n  \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"form__fields__row\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n                <currency-unit fxFlex=\"50px\"\r\n                    [id]=\"'investmentAmountUnit'\" \r\n                    [value]=\"model.investmentAmountUnit\"\r\n                    [view]=\"'narrow'\"\r\n                    (newValue)=\"onCurrencyUnitChange($event)\">\r\n                </currency-unit>\r\n                \r\n                <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n                  <input matInput type=\"number\" id=\"investmentAmount\" name=\"investmentAmount\" placeholder=\"Investment amount\"\r\n                      [(ngModel)]=\"model.investmentAmount\" \r\n                      [value]=\"model.investmentAmount\"\r\n                      numberValidator \r\n                      required\r\n                      #investmentAmount=\"ngModel\">\r\n                  <mat-hint align=\"start\">Set the amount of money to invest.</mat-hint>\r\n                  <mat-error *ngIf=\"investmentAmount.invalid && (investmentAmount.dirty || investmentAmount.touched) && investmentAmount.errors.required\">Investment amount is required.</mat-error>\r\n                  <mat-error *ngIf=\"investmentAmount.invalid && (investmentAmount.dirty || investmentAmount.touched) && investmentAmount.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n          </div>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <currency-investment-form [defaultValues]=\"model.investmentData\"\r\n              (values)=\"onInvestmentDataChange($event)\">\r\n          </currency-investment-form>\r\n        </div>\r\n      </section>\r\n  \r\n      \r\n      \r\n      <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-investment\">\r\n        <button *ngIf=\"!editInvestmentServiceRunning\" \r\n            class=\"form__action mat-raised-button\" \r\n            mat-raised-button \r\n            type=\"submit\" \r\n            color=\"accent\" \r\n            [disabled]=\"!editInvestmentForm.form.valid || !investmentDataValid\">Save</button>\r\n        \r\n        <mat-progress-bar *ngIf=\"editInvestmentServiceRunning\"\r\n            class=\"progress-bar progress-bar--edit-investment\"\r\n            color=\"primary\"\r\n            mode=\"indeterminate\">\r\n        </mat-progress-bar>\r\n      </section>\r\n    </div>\r\n    \r\n    <!-- <pre>{{model | json}}</pre> -->\r\n  </form>\r\n\r\n  <mat-progress-bar *ngIf=\"getInvestmentServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-investment\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n.progress-bar--get-investment, .progress-bar--get-teams {\n  width: 100%; }\n\n.container__edit-investment .form__fields .form__fields__row__container .radiogroup__owner .owner__option {\n  margin-right: 10px; }\n\n.container__edit-investment .form__fields .form__fields__row__container .radiogroup__owner .owner__option:last-child {\n    margin-right: 0; }\n\n.container__edit-investment .form__fields .form__fields__row__container .title__investment-amount {\n  margin-bottom: 5px !important; }\n\n.container__edit-investment .team-members .member .member__avatar {\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  padding: 0 10px 0 0; }\n\n.container__edit-investment .team-members .member .member__info .admin-icon {\n  font-size: 14px;\n  height: auto;\n  width: auto; }\n\n.container__edit-investment .team-members .member .member__info .member__email {\n  font-size: 11px; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-investment, .progress-bar--get-teams {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var teams_service_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var investments_service_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.service.ts");
var currencyInvestment_1 = __webpack_require__("../../../../../src/app/modules/investments/models/currencyInvestment.ts");
var InvestmentsEditComponent = /** @class */ (function () {
    function InvestmentsEditComponent(route, mainNavigatorService, investmentsService, teamsService, appService, router) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.investmentsService = investmentsService;
        this.teamsService = teamsService;
        this.appService = appService;
        this.router = router;
        this.editMode = false;
        this.user = null;
        this.teams = [];
        this.investment = null;
        this.model = {
            id: null,
            email: null,
            owner: 'me',
            team: null,
            teamSlug: null,
            membersPercentage: {},
            investmentAmount: null,
            investmentAmountUnit: null,
            type: null,
            investmentData: {},
            investmentDistribution: [] //how the investment would be distributed into its owners
        };
        this.id = null; //investment id
        this.type = null; //investment type
        //services flags
        this.editInvestmentServiceRunning = false;
        this.getInvestmentServiceRunning = false;
        this.getTeamsServiceRunning = false;
        this.subscription = new Subscription_1.Subscription();
        this.formChangesSubscription = null;
        this.investmentDataValid = false; //this value is set when investment data form is updated
    }
    InvestmentsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: '/investments', selected: false }
        ]);
        //generates a user source object from authUser from resolver
        var user$ = this.route.data.map(function (data) { return data.authUser; });
        //generates an investment id source from id parameter in url
        var id$ = this.route.paramMap.map(function (params) { return params.get('id'); });
        //combine user$ and id$ sources into one object and start listen to it for changes
        this.subscription = user$.combineLatest(id$, function (user, id) {
            return { user: user, investmentId: id };
        }).subscribe(function (data) {
            _this.user = data.user;
            _this.model.email = data.user.email;
            _this.model.investmentAmountUnit = _this.user.currency;
            _this.model.id = data.investmentId || null;
            _this.editInvestmentServiceRunning = false;
            _this.getInvestmentServiceRunning = false;
            //get user teams
            _this.getTeams();
            if (!data.investmentId) {
                //we are creating a new investment
                _this.id = null;
                _this.editMode = false;
                _this.mainNavigatorService.appendLink({ displayName: 'Create Investment', url: '', selected: true });
            }
            else {
                _this.mainNavigatorService.appendLink({ displayName: 'Edit Investment', url: '', selected: true });
                //we are editing an existing investment
                _this.id = data.investmentId; //the new slug
                _this.editMode = true;
                _this.getInvestment(data.investmentId); //get data
            }
        });
        //get TYPE parameter
        this.route.paramMap.map(function (params) { return params.get('type'); }).subscribe(function (type) {
            if (!['currency', 'crypto', 'property'].includes(type)) {
                _this.appService.showResults('You must provide a valid investment type to continue.', 'error');
                _this.router.navigate(['welcome']);
            }
            else {
                _this.type = type;
                _this.model.type = type;
                _this.model.investmentData.type = type;
            }
        });
    };
    InvestmentsEditComponent.prototype.ngAfterViewInit = function () {
        if (this.form && !this.formChangesSubscription) {
            this.subscribeFormValueChanges();
        }
    };
    /**
     * This methods subscribes to changes on the main form in the view. We do it in a separate method because when the page loads for edition the form it is not defined in the
     * view until an investment is retrived from the server. We save an instance of the subscription to avoid subscriwe twice or more times.
     */
    InvestmentsEditComponent.prototype.subscribeFormValueChanges = function () {
        var _this = this;
        this.formChangesSubscription = this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            if (values.owner === 'team' && values.team && _this.model.team) {
                //calculates the percentage acum from all the members
                var percentageAcum = _this.model.team.members.reduce(function (total, member) {
                    return total + (_this.model.membersPercentage[member.email] || 0);
                }, 0);
                if (percentageAcum > 100) {
                    var lastMember = _this.model.team.members.slice(-1)[0];
                    var diff = percentageAcum - 100;
                    var newValue = Number(common_1.DecimalPipe.prototype.transform(_this.model.membersPercentage[lastMember.email] - diff, '1.0-2', 'en'));
                    if (newValue < 0) {
                        _this.setDefaultInvestmentPercentages();
                        _this.appService.showResults("The sum of percentages must not exceed 100%, we reset the values to make it valid.", 'warn');
                    }
                    else {
                        _this.model.membersPercentage[lastMember.email] = newValue <= 100 ? newValue : 0;
                        _this.appService.showResults("The sum of percentages must not exceed 100%, we reset the last values to make it valid.", 'warn');
                    }
                }
            }
        });
        this.subscription.add(this.formChangesSubscription);
    };
    InvestmentsEditComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    InvestmentsEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.editInvestmentServiceRunning = true;
        this.model.investmentDistribution = this.populateInvestmentDistributionArray();
        this.model.createdOn = new Date(Date.now());
        this.model.updatedOn = new Date(Date.now());
        //call the investment create service
        var newSubscription = this.investmentsService.create(this.model).subscribe(function (data) {
            if (data && data.id && data.type) {
                _this.appService.showResults("Investment successfully created!", 'success');
                _this.router.navigate(['/investments/', data.type, 'edit', data.id]);
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.editInvestmentServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit investment service.", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error with the investment services, please try again in a few minutes.", 'error');
            }
            _this.editInvestmentServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    InvestmentsEditComponent.prototype.onUpdate = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onUpdate() > "; //for debugging
        this.editInvestmentServiceRunning = true;
        this.model.investmentDistribution = this.populateInvestmentDistributionArray();
        this.model.updatedOn = new Date(Date.now());
        //call the investment create service
        var newSubscription = this.investmentsService.update(this.model).subscribe(function (data) {
            if (data && data.id && data.type) {
                _this.appService.showResults("Investment successfully updated!", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.editInvestmentServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit investment service.", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error with the investment services, please try again in a few minutes.", 'error');
            }
            _this.editInvestmentServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Get my teams from server
     */
    InvestmentsEditComponent.prototype.getTeams = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        this.teams = [];
        this.getTeamsServiceRunning = true;
        var newSubscription = this.teamsService.getTeams(this.user.email).subscribe(function (teams) {
            _this.teams = teams;
            _this.getTeamsServiceRunning = false;
            if (teams.length) {
                _this.getSelectedTeam();
            }
            else {
                _this.appService.showResults("You are not member of any team yet!. Create a team if you want to split your investment with other people.", 'info');
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getTeamsServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Get the selected team . This is going to works when teams and investment is here (so we are in edit mode) and the investment has a team selected
     */
    InvestmentsEditComponent.prototype.getSelectedTeam = function () {
        if (this.teams && this.teams.length && this.investment && this.investment.team) {
            for (var _i = 0, _a = this.teams; _i < _a.length; _i++) {
                var team = _a[_i];
                if (this.investment.team.slug === team.slug) {
                    this.model.team = team;
                }
            }
        }
    };
    /**
     * Populates an array that specifies the distribution of the investment between its owners and returns it.
     *
     * @return {array} The distribution of the investment
     */
    InvestmentsEditComponent.prototype.populateInvestmentDistributionArray = function () {
        var result = [];
        if (!this.model.team) {
            result.push({ email: this.user.email, percentage: 100 });
        }
        else {
            for (var _i = 0, _a = Object.keys(this.model.membersPercentage); _i < _a.length; _i++) {
                var email = _a[_i];
                result.push({ email: email, percentage: this.model.membersPercentage[email] });
            }
        }
        return result;
    };
    /**
     * Get a team from server based on the id provided
     * @param {string} id
     */
    InvestmentsEditComponent.prototype.getInvestment = function (id) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getInvestment() > "; //for debugging
        if (!id) {
            this.appService.showResults("Invalid investment ID", 'error');
            this.appService.consoleLog('error', methodTrace + " ID parameter must be provided, but was: ", id);
            return false;
        }
        this.getInvestmentServiceRunning = true;
        var newSubscription = this.investmentsService.getInvestmentById(this.user.email, id).subscribe(function (investment) {
            _this.investment = investment;
            //populate the model
            _this.model.owner = investment.team ? 'team' : 'me';
            _this.model.team = investment.team;
            _this.getSelectedTeam(); //this is necesary to make the selectbox in ui set a team
            _this.model.teamSlug = investment.team ? investment.team.slug : null;
            _this.model.investmentDistribution = investment.investmentDistribution;
            for (var _i = 0, _a = investment.investmentDistribution; _i < _a.length; _i++) {
                var portion = _a[_i];
                _this.model.membersPercentage[portion.email] = portion.percentage;
            }
            _this.model.investmentAmount = investment.investmentAmount;
            _this.model.investmentAmountUnit = investment.investmentAmountUnit;
            _this.model.type = investment.type;
            if (investment instanceof currencyInvestment_1.CurrencyInvestment) {
                _this.model.investmentData = {
                    type: investment.type,
                    unit: investment.unit,
                    amount: investment.amount,
                    buyingPrice: investment.buyingPrice,
                    buyingPriceUnit: investment.buyingPriceUnit,
                    buyingDate: investment.buyingDate
                };
            }
            _this.getInvestmentServiceRunning = false;
            if (_this.form && !_this.formChangesSubscription) {
                _this.subscribeFormValueChanges();
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 461 || error.codeno === 462) {
                _this.appService.showResults(error.msg, 'error');
                _this.router.navigate(['/welcome']);
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getInvestmentServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    InvestmentsEditComponent.prototype.onSelectChange = function (matSelectChange) {
        this.model.teamSlug = matSelectChange.value.slug;
        this.setDefaultInvestmentPercentages();
    };
    InvestmentsEditComponent.prototype.onRadioChange = function (matRadioChange) {
        if (matRadioChange.value === 'me') {
            //reset team values from model
            this.model.team = this.model.teamSlug = null;
        }
        this.model.membersPercentage = {};
    };
    InvestmentsEditComponent.prototype.onCurrencyUnitChange = function ($event) {
        if ($event.source.id === 'investmentAmountUnit') {
            this.model.investmentAmountUnit = $event.value;
        }
    };
    InvestmentsEditComponent.prototype.onInvestmentDataChange = function ($event) {
        this.model.investmentData = $event.value.model;
        this.investmentDataValid = $event.value.valid;
    };
    /**
     * Splits equally the percentage of an investment to all the team members
     */
    InvestmentsEditComponent.prototype.setDefaultInvestmentPercentages = function () {
        this.model.membersPercentage = {};
        //set the default percentage of the investment to each member
        var defaultPercentage = Number(common_1.DecimalPipe.prototype.transform(100 / this.model.team.members.length, '1.0-2', 'en'));
        for (var _i = 0, _a = this.model.team.members; _i < _a.length; _i++) {
            var member = _a[_i];
            this.model.membersPercentage[member.email] = defaultPercentage;
        }
    };
    __decorate([
        core_1.ViewChild('editInvestmentForm'),
        __metadata("design:type", Object)
    ], InvestmentsEditComponent.prototype, "form", void 0);
    InvestmentsEditComponent = __decorate([
        core_1.Component({
            selector: 'investments-edit',
            template: __webpack_require__("../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, investments_service_1.InvestmentsService,
            teams_service_1.TeamsService, app_service_1.AppService, router_1.Router])
    ], InvestmentsEditComponent);
    return InvestmentsEditComponent;
}());
exports.InvestmentsEditComponent = InvestmentsEditComponent;


/***/ }),

/***/ "../../../../../src/app/modules/investments/currency-exchange.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var CurrencyExchangeService = /** @class */ (function () {
    function CurrencyExchangeService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.cryptoExchangeServerUrl = 'https://coincap.io/page/';
        this.cryptoRates = {};
        this.currencyExchangeServiceUrl = 'https://api.fixer.io/latest';
        this.currencyRates = null;
    }
    CurrencyExchangeService.prototype.getCurrencyRates = function (base) {
        if (base === void 0) { base = 'USD'; }
        var methodTrace = this.constructor.name + " > getCurrencyRates() > "; //for debugging
        if (this.currencyRates) {
            return Observable_1.Observable.of(this.currencyRates);
        }
        return this.http.get(this.currencyExchangeServiceUrl + "?base=" + base)
            .map(this.extractCurrencyExchangeData)
            .catch(this.appService.handleError(methodTrace))
            .retry(3);
    };
    CurrencyExchangeService.prototype.extractCurrencyExchangeData = function (res) {
        if (Object.keys(res.rates).length > 0) {
            return res.rates;
        }
        else {
            throw res;
        }
    };
    CurrencyExchangeService.prototype.getCryptoRates = function (crypto) {
        var _this = this;
        if (crypto === void 0) { crypto = 'BTC'; }
        var methodTrace = this.constructor.name + " > getCryptoRates() > "; //for debugging
        if (this.cryptoRates[crypto.toUpperCase()]) {
            return Observable_1.Observable.of(this.cryptoRates[crypto.toUpperCase()]);
        }
        return this.http.get("" + this.cryptoExchangeServerUrl + crypto.toUpperCase())
            .map(function (res) {
            _this.cryptoRates[crypto.toUpperCase()] = _this.extractCryptoExchangeData(crypto, res);
            return _this.cryptoRates[crypto.toUpperCase()];
        })
            .catch(this.appService.handleError(methodTrace));
    };
    CurrencyExchangeService.prototype.extractCryptoExchangeData = function (crypto, res) {
        if (res['id'] === crypto.toUpperCase()) {
            return res;
        }
        else {
            throw res;
        }
    };
    CurrencyExchangeService.prototype.getUsdValueOf = function (amount, unit) {
        if (unit !== 'USD') {
            if (this.currencyRates) {
                return amount / this.currencyRates[unit];
            }
            else {
                this.appService.showResults('Currency rates data was not loaded yet. Figures are shown as USD', 'error');
            }
        }
        return amount;
    };
    CurrencyExchangeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], CurrencyExchangeService);
    return CurrencyExchangeService;
}());
exports.CurrencyExchangeService = CurrencyExchangeService;


/***/ }),

/***/ "../../../../../src/app/modules/investments/investments-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var investments_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
var investments_edit_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.ts");
var auth_resolver_service_1 = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var routes = [
    {
        path: 'investments',
        children: [
            {
                path: ':type/create',
                component: investments_edit_component_1.InvestmentsEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: ':type/edit/:id',
                component: investments_edit_component_1.InvestmentsEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: '',
                pathMatch: 'full',
                component: investments_dashboard_component_1.InvestmentsDashboardComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            }
        ]
    }
];
var InvestmentsRoutingModule = /** @class */ (function () {
    function InvestmentsRoutingModule() {
    }
    InvestmentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], InvestmentsRoutingModule);
    return InvestmentsRoutingModule;
}());
exports.InvestmentsRoutingModule = InvestmentsRoutingModule;


/***/ }),

/***/ "../../../../../src/app/modules/investments/investments.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var investments_routing_module_1 = __webpack_require__("../../../../../src/app/modules/investments/investments-routing.module.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
var investments_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
var currency_investment_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/currency-investment/currency-investment.component.ts");
var investment_selector_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts");
var investments_edit_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/investments-edit/investments-edit.component.ts");
var currency_investment_form_component_1 = __webpack_require__("../../../../../src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.ts");
var investments_service_1 = __webpack_require__("../../../../../src/app/modules/investments/investments.service.ts");
var InvestmentsModule = /** @class */ (function () {
    function InvestmentsModule() {
    }
    InvestmentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                investments_routing_module_1.InvestmentsRoutingModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                currency_investment_component_1.CurrencyInvestmentComponent,
                investments_dashboard_component_1.InvestmentsDashboardComponent,
                investment_selector_dialog_component_1.InvestmentSelectorDialogComponent,
                investments_edit_component_1.InvestmentsEditComponent,
                currency_investment_form_component_1.CurrencyInvestmentFormComponent
            ],
            entryComponents: [
                investment_selector_dialog_component_1.InvestmentSelectorDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
            ],
            providers: [investments_service_1.InvestmentsService]
        })
    ], InvestmentsModule);
    return InvestmentsModule;
}());
exports.InvestmentsModule = InvestmentsModule;


/***/ }),

/***/ "../../../../../src/app/modules/investments/investments.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var http_2 = __webpack_require__("../../../common/esm5/http.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var currencyInvestment_1 = __webpack_require__("../../../../../src/app/modules/investments/models/currencyInvestment.ts");
var team_1 = __webpack_require__("../../../../../src/app/modules/teams/models/team.ts");
var of_1 = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
var InvestmentsService = /** @class */ (function () {
    function InvestmentsService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = environment_1.environment.apiHost + '/api/investments';
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    }
    /**
     * Server call to Create a new investment in the system
     * @param postData
     */
    InvestmentsService.prototype.create = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > create() > "; //for debugging
        return this.http.post(this.serverHost + "/create", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to Update an investment in the system
     * @param postData
     */
    InvestmentsService.prototype.update = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > update() > "; //for debugging
        return this.http.post(this.serverHost + "/update", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to Get an investment from the server based on its ID
     * @param {string} id . The investment id
     */
    InvestmentsService.prototype.getInvestmentById = function (email, id) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getInvestmentById() > "; //for debugging
        if (!id || !email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return of_1.of(null);
        }
        var params = new http_2.HttpParams()
            .set('id', id)
            .set('email', email);
        var investmentData$ = this.http.get(this.serverHost + "/getbyId", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
        return investmentData$.switchMap(function (investmentData) {
            var investment = null;
            if (investmentData && investmentData._id) {
                var createdBy = new user_1.User(investmentData.createdBy.name, investmentData.createdBy.email, investmentData.createdBy.gravatar);
                var team = null;
                if (investmentData.team) {
                    //fill team members
                    var admin = null;
                    var members = [];
                    for (var _i = 0, _a = investmentData.team.members; _i < _a.length; _i++) {
                        var member = _a[_i];
                        var newMember = new user_1.User(member.name, member.email, member.gravatar);
                        members.push(newMember);
                        if (member.isAdmin) {
                            admin = newMember;
                        }
                    }
                    team = new team_1.Team(investmentData.team.name, investmentData.team.description, investmentData.team.slug, admin, members);
                }
                if (investmentData.investmentType === 'currency' || investmentData.investmentType === 'crypto') {
                    investment = new currencyInvestment_1.CurrencyInvestment(investmentData._id, investmentData.amount, investmentData.amountUnit, createdBy, team, investmentData.investmentDistribution, investmentData.currencyInvestmentData.amountUnit, investmentData.currencyInvestmentData.amount, investmentData.currencyInvestmentData.buyingPrice, investmentData.currencyInvestmentData.buyingPriceUnit, investmentData.currencyInvestmentData.buyingDate, investmentData.investmentType);
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return Rx_1.Observable.of(investment);
        });
    };
    /**
     * Server call to Get all the Investments for the current user from the server
     * @param {string} email . The team slug
     */
    InvestmentsService.prototype.getInvestments = function (email) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getInvestments() > "; //for debugging
        if (!email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Rx_1.Observable.from([]);
        }
        var params = new http_2.HttpParams().set('email', email);
        var investmentsData$ = this.http.get(this.serverHost + "/getAll", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
        return investmentsData$.switchMap(function (investmentsData) {
            var investments = [];
            if (investmentsData && investmentsData instanceof Array) {
                for (var _i = 0, investmentsData_1 = investmentsData; _i < investmentsData_1.length; _i++) {
                    var item = investmentsData_1[_i];
                    var createdBy = new user_1.User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
                    var team = item.team ? new team_1.Team(item.team.name, item.team.description, item.team.slug) : null;
                    if (item.investmentType === 'currency' || item.investmentType === 'crypto') {
                        investments.push(new currencyInvestment_1.CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.currencyInvestmentData.amountUnit, item.currencyInvestmentData.amount, item.currencyInvestmentData.buyingPrice, item.currencyInvestmentData.buyingPriceUnit, item.currencyInvestmentData.buyingDate, item.investmentType));
                    }
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return Rx_1.Observable.of(investments);
        });
    };
    /**
     * Server call to delete an investment from the server
     * @param {string} id . The investment id
     * @param {string} email . The current user email.
     */
    InvestmentsService.prototype.delete = function (id, email) {
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        if (!id || !email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Rx_1.Observable.throw(null);
        }
        var params = new http_2.HttpParams().set('email', email);
        return this.http.delete(this.serverHost + "/delete/" + id, { headers: this.headers, params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    InvestmentsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], InvestmentsService);
    return InvestmentsService;
}());
exports.InvestmentsService = InvestmentsService;


/***/ }),

/***/ "../../../../../src/app/modules/investments/models/currencyInvestment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var investment_1 = __webpack_require__("../../../../../src/app/modules/investments/models/investment.ts");
var CurrencyInvestment = /** @class */ (function (_super) {
    __extends(CurrencyInvestment, _super);
    function CurrencyInvestment(id, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution, unit, amount, buyingPrice, buyingPriceUnit, buyingDate, type) {
        if (team === void 0) { team = null; }
        if (investmentDistribution === void 0) { investmentDistribution = []; }
        if (type === void 0) { type = 'currency'; }
        var _this = _super.call(this, id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution) || this;
        _this.unit = unit;
        _this.amount = amount;
        _this.buyingDate = buyingDate;
        _this.buyingPrice = buyingPrice;
        _this.buyingPriceUnit = buyingPriceUnit;
        return _this;
    }
    return CurrencyInvestment;
}(investment_1.Investment));
exports.CurrencyInvestment = CurrencyInvestment;


/***/ }),

/***/ "../../../../../src/app/modules/investments/models/investment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Investment = /** @class */ (function () {
    function Investment(id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution) {
        if (team === void 0) { team = null; }
        if (investmentDistribution === void 0) { investmentDistribution = []; }
        this.investmentAmount = investmentAmount;
        this.investmentAmountUnit = investmentAmountUnit;
        this.team = team;
        this.investmentDistribution = investmentDistribution;
        this.createdBy = createdBy;
        this.id = id;
        this.type = type;
    }
    return Investment;
}());
exports.Investment = Investment;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-form-field class=\"form__field\">\r\n  <mat-select *ngIf=\"type === 'currency'\" id=\"{{id}}\" placeholder=\"{{placeHolder}}\" value=\"{{value}}\" (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option value=\"AUD\">{{view === 'narrow' ? 'AUD' : 'Australian Dollar'}}</mat-option>\r\n    <mat-option value=\"EUR\">{{view === 'narrow' ? 'EUR' : 'Euro'}}</mat-option>\r\n    <mat-option value=\"NZD\">{{view === 'narrow' ? 'NZD' : 'New Zealand Dollar'}}</mat-option>\r\n    <mat-option value=\"USD\">{{view === 'narrow' ? 'USD' : 'US Dollar'}}</mat-option>\r\n  </mat-select>\r\n\r\n  <mat-select *ngIf=\"type === 'crypto'\" id=\"{{id}}\" placeholder=\"{{placeHolder}}\" value=\"{{value}}\" (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option value=\"BTC\">{{view === 'narrow' ? 'BTC' : 'Bitcoin'}}</mat-option>\r\n    <mat-option value=\"XMR\">{{view === 'narrow' ? 'XMR' : 'Monero'}}</mat-option>\r\n  </mat-select>\r\n  \r\n  <mat-hint align=\"start\">{{hint}}</mat-hint>\r\n</mat-form-field>"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var CurrencyUnitComponent = /** @class */ (function () {
    function CurrencyUnitComponent() {
        this.view = 'normal';
        this.type = 'currency';
        this.newValue = new core_1.EventEmitter();
        this.model = {};
    }
    CurrencyUnitComponent.prototype.ngOnInit = function () { };
    CurrencyUnitComponent.prototype.onSelectionChange = function (matSelectChange) {
        this.newValue.emit(matSelectChange);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "hint", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CurrencyUnitComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CurrencyUnitComponent.prototype, "newValue", void 0);
    CurrencyUnitComponent = __decorate([
        core_1.Component({
            selector: 'currency-unit',
            template: __webpack_require__("../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CurrencyUnitComponent);
    return CurrencyUnitComponent;
}());
exports.CurrencyUnitComponent = CurrencyUnitComponent;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.html":
/***/ (function(module, exports) {

module.exports = "<span fxLayout=\"row\" fxLayoutGap=\"5px\" fxLayoutAlign=\"start center\" *ngIf=\"(title && title.length > 0) || (text && text.length > 0)\">\r\n    <label *ngIf=\"title && title.length > 0\">{{title}}</label>\r\n    <mat-icon *ngIf=\"text && text.length > 0\" \r\n        [matTooltip]=\"text\" \r\n        [matTooltipPosition]=\"position\"\r\n        [matTooltipHideDelay]=\"5000\">info_outline</mat-icon>  \r\n</span>"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var InfoTooltipComponent = /** @class */ (function () {
    function InfoTooltipComponent() {
        this.title = "";
        this.text = "";
        this.position = "above";
    }
    InfoTooltipComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoTooltipComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoTooltipComponent.prototype, "text", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoTooltipComponent.prototype, "position", void 0);
    InfoTooltipComponent = __decorate([
        core_1.Component({
            selector: 'info-tooltip',
            template: __webpack_require__("../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], InfoTooltipComponent);
    return InfoTooltipComponent;
}());
exports.InfoTooltipComponent = InfoTooltipComponent;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navigation--main\">\r\n  <mat-chip-list fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap>\r\n    <mat-chip class=\"nav--item\" *ngFor=\"let link of links\" [routerLink]=\"link.url\" [selected]=\"link.selected\">{{link.displayName}}</mat-chip>\r\n  </mat-chip-list>      \r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navigation--main mat-chip.nav--item {\n  margin: 0 8px 8px 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var MainNavigatorComponent = /** @class */ (function () {
    function MainNavigatorComponent(mainNavigatorService, appService) {
        this.mainNavigatorService = mainNavigatorService;
        this.appService = appService;
        this.subscription = new Subscription_1.Subscription();
    }
    MainNavigatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.mainNavigatorService.links$.subscribe(function (links) { return _this.links = links; });
    };
    MainNavigatorComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    MainNavigatorComponent = __decorate([
        core_1.Component({
            selector: 'main-navigator',
            template: __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, app_service_1.AppService])
    ], MainNavigatorComponent);
    return MainNavigatorComponent;
}());
exports.MainNavigatorComponent = MainNavigatorComponent;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var BehaviorSubject_1 = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var MainNavigatorService = /** @class */ (function () {
    function MainNavigatorService() {
        this.linksSource = new BehaviorSubject_1.BehaviorSubject(null);
        this.links$ = this.linksSource.asObservable();
    }
    //links source feeder
    MainNavigatorService.prototype.setLinks = function (newLinks) {
        this.linksSource.next(newLinks);
    };
    //add a link to the source feeder
    MainNavigatorService.prototype.appendLink = function (link) {
        var currentLinks = this.linksSource.getValue();
        currentLinks.push(link);
        this.setLinks(currentLinks);
    };
    MainNavigatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], MainNavigatorService);
    return MainNavigatorService;
}());
exports.MainNavigatorService = MainNavigatorService;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap fxLayoutAlign=\"space-around center\" class=\"snackbar--simple\">\r\n  <p fxFlex class=\"message\">{{data.message}}</p>\r\n  <mat-icon class=\"icon\" aria-label=\"Close\" (click)=\"actionClicked()\">clear</mat-icon>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".snackbar--simple {\n  font-size: 12px;\n  cursor: default; }\n  .snackbar--simple .icon {\n    cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var SnackbarSimpleComponent = /** @class */ (function () {
    function SnackbarSimpleComponent(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    SnackbarSimpleComponent.prototype.ngOnInit = function () { };
    SnackbarSimpleComponent.prototype.actionClicked = function () {
        this.snackBarRef.dismiss();
    };
    SnackbarSimpleComponent = __decorate([
        core_1.Component({
            selector: 'app-snackbar-simple',
            template: __webpack_require__("../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_SNACK_BAR_DATA)),
        __metadata("design:paramtypes", [material_1.MatSnackBarRef, Object])
    ], SnackbarSimpleComponent);
    return SnackbarSimpleComponent;
}());
exports.SnackbarSimpleComponent = SnackbarSimpleComponent;


/***/ }),

/***/ "../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>{{data.title}}</h2>\r\n\r\n<mat-dialog-content>\r\n  <div fxLayout=\"column\" class=\"container__yes-no-dialog\">\r\n    {{data.message}}\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n  <button mat-mini-fab color=\"warn\" mat-dialog-close=\"no\">\r\n    <mat-icon aria-label=\"No\">clear</mat-icon>\r\n  </button>\r\n  <button mat-mini-fab color=\"accent\" mat-dialog-close=\"yes\">\r\n    <mat-icon aria-label=\"Yes\">done</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var YesNoDialogComponent = /** @class */ (function () {
    function YesNoDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    YesNoDialogComponent.prototype.ngOnInit = function () { };
    YesNoDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    YesNoDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-yes-no-dialog',
            template: __webpack_require__("../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], YesNoDialogComponent);
    return YesNoDialogComponent;
}());
exports.YesNoDialogComponent = YesNoDialogComponent;


/***/ }),

/***/ "../../../../../src/app/modules/shared/custom-material-design.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var CustomMaterialDesignModule = /** @class */ (function () {
    function CustomMaterialDesignModule() {
    }
    CustomMaterialDesignModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatSnackBarModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatSlideToggleModule,
                material_1.MatMenuModule,
                material_1.MatToolbarModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatCardModule,
                material_1.MatNativeDateModule,
                material_1.MatTabsModule,
                material_1.MatExpansionModule,
                material_1.MatTooltipModule,
                material_1.MatDialogModule,
                material_1.MatSelectModule,
                material_1.MatButtonToggleModule,
                material_1.MatRadioModule,
                material_1.MatSliderModule
            ],
            exports: [
                material_1.MatButtonModule,
                material_1.MatCheckboxModule,
                material_1.MatSnackBarModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatSlideToggleModule,
                material_1.MatMenuModule,
                material_1.MatToolbarModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatButtonModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatCardModule,
                material_1.MatNativeDateModule,
                material_1.MatTabsModule,
                material_1.MatExpansionModule,
                material_1.MatTooltipModule,
                material_1.MatDialogModule,
                material_1.MatSelectModule,
                material_1.MatButtonToggleModule,
                material_1.MatRadioModule,
                material_1.MatSliderModule
            ]
        })
    ], CustomMaterialDesignModule);
    return CustomMaterialDesignModule;
}());
exports.CustomMaterialDesignModule = CustomMaterialDesignModule;


/***/ }),

/***/ "../../../../../src/app/modules/shared/directives/equal-validator.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var EqualValidatorDirective = /** @class */ (function () {
    function EqualValidatorDirective(equalFormControlName, reverse) {
        this.equalFormControlName = equalFormControlName;
        this.reverse = reverse;
    }
    EqualValidatorDirective_1 = EqualValidatorDirective;
    Object.defineProperty(EqualValidatorDirective.prototype, "isReverse", {
        get: function () {
            if (!this.reverse) {
                return false;
            }
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    EqualValidatorDirective.prototype.validate = function (control) {
        var equalsFormControl = control.root.get(this.equalFormControlName);
        if (equalsFormControl && equalsFormControl.value !== control.value) {
            if (this.isReverse) {
                equalsFormControl.setErrors({ 'equalvalidator': true });
            }
            else {
                return { 'equalvalidator': true };
            }
        }
        else if (equalsFormControl) {
            //value is the same on both
            if (this.reverse) {
                delete equalsFormControl.errors['equalvalidator'];
                if (!Object.keys(equalsFormControl.errors).length) {
                    equalsFormControl.setErrors(null);
                }
            }
        }
        return null;
    };
    EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
        core_1.Directive({
            selector: '[equalvalidator]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: EqualValidatorDirective_1, multi: true }]
        }),
        __param(0, core_1.Attribute('equalvalidator')),
        __param(1, core_1.Attribute('reverse')),
        __metadata("design:paramtypes", [String, String])
    ], EqualValidatorDirective);
    return EqualValidatorDirective;
    var EqualValidatorDirective_1;
}());
exports.EqualValidatorDirective = EqualValidatorDirective;


/***/ }),

/***/ "../../../../../src/app/modules/shared/directives/number-validator.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var NumberValidatorDirective = /** @class */ (function () {
    function NumberValidatorDirective(validationType) {
        this.validationType = validationType;
    }
    NumberValidatorDirective_1 = NumberValidatorDirective;
    NumberValidatorDirective.prototype.validate = function (control) {
        var validationObj = {};
        if (this.validationType) {
            validationObj = JSON.parse(this.validationType);
        }
        //original pattern: ^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$
        var pattern = '^[+-]?[0-9]{1,';
        pattern += !isNaN(validationObj.maxIntegerDigits) && validationObj.maxIntegerDigits > 1 ? validationObj.maxIntegerDigits : 9;
        pattern += '}(?:\.[0-9]{1,';
        pattern += !isNaN(validationObj.maxFractionDigits) && validationObj.maxFractionDigits > 1 ? validationObj.maxFractionDigits : 2;
        pattern += '})?$';
        var numberRegExp = new RegExp(pattern);
        var val = control.value;
        if (!numberRegExp.test(val + '')) {
            return { "numberValidator": true };
        }
        var result = {};
        if (!isNaN(validationObj.min) && val < validationObj.min) {
            result.numberValidatorMin = true;
        }
        if (!isNaN(validationObj.max) && val > validationObj.max) {
            result.numberValidatorMax = true;
        }
        return Object.keys(result).length ? result : null;
    };
    NumberValidatorDirective = NumberValidatorDirective_1 = __decorate([
        core_1.Directive({
            selector: '[numberValidator]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: NumberValidatorDirective_1, multi: true }]
        }),
        __param(0, core_1.Attribute('numberValidator')),
        __metadata("design:paramtypes", [String])
    ], NumberValidatorDirective);
    return NumberValidatorDirective;
    var NumberValidatorDirective_1;
}());
exports.NumberValidatorDirective = NumberValidatorDirective;


/***/ }),

/***/ "../../../../../src/app/modules/shared/shared.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
var main_navigator_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.ts");
var currency_unit_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/currency-unit/currency-unit.component.ts");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var yes_no_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var snackbar_simple_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts");
var equal_validator_directive_1 = __webpack_require__("../../../../../src/app/modules/shared/directives/equal-validator.directive.ts");
var number_validator_directive_1 = __webpack_require__("../../../../../src/app/modules/shared/directives/number-validator.directive.ts");
var info_tooltip_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/info-tooltip/info-tooltip.component.ts");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule
            ],
            declarations: [
                main_navigator_component_1.MainNavigatorComponent,
                currency_unit_component_1.CurrencyUnitComponent,
                yes_no_dialog_component_1.YesNoDialogComponent,
                snackbar_simple_component_1.SnackbarSimpleComponent,
                equal_validator_directive_1.EqualValidatorDirective,
                number_validator_directive_1.NumberValidatorDirective,
                info_tooltip_component_1.InfoTooltipComponent
            ],
            exports: [
                main_navigator_component_1.MainNavigatorComponent,
                currency_unit_component_1.CurrencyUnitComponent,
                yes_no_dialog_component_1.YesNoDialogComponent,
                snackbar_simple_component_1.SnackbarSimpleComponent,
                equal_validator_directive_1.EqualValidatorDirective,
                number_validator_directive_1.NumberValidatorDirective,
                info_tooltip_component_1.InfoTooltipComponent
            ],
            entryComponents: [
                yes_no_dialog_component_1.YesNoDialogComponent,
                snackbar_simple_component_1.SnackbarSimpleComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ "../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<h2 mat-dialog-title>Add team member</h2>\r\n\r\n<mat-dialog-content>\r\n  <div fxLayout=\"column\" class=\"container__add-person-to-team\">\r\n    <form class=\"form__container form__add-person-to-team\" #addPersonToTeamForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n      \r\n      <section fxLayout=\"column\" class=\"form__fields\">\r\n        <div fxLayout=\"column\" class=\"form__fields__row\">\r\n          <!-- Member email -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <input matInput type=\"tezt\" id=\"email\" name=\"email\" placeholder=\"Member email\" \r\n                [(ngModel)]=\"model.email\"\r\n                required \r\n                email\r\n                #email=\"ngModel\">\r\n            <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n            <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </section>\r\n    </form>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n  <button mat-mini-fab color=\"warn\" mat-dialog-close>\r\n    <mat-icon aria-label=\"Cancel\">clear</mat-icon>\r\n  </button>\r\n  <button mat-mini-fab color=\"accent\" [mat-dialog-close]=\"email.value || null\" [disabled]=\"!addPersonToTeamForm.form.valid\">\r\n    <mat-icon aria-label=\"Add\">done</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var AddPersonToTeamDialogComponent = /** @class */ (function () {
    function AddPersonToTeamDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.model = { email: null };
    }
    AddPersonToTeamDialogComponent.prototype.ngOnInit = function () { };
    AddPersonToTeamDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AddPersonToTeamDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-add-person-to-team-dialog',
            template: __webpack_require__("../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AddPersonToTeamDialogComponent);
    return AddPersonToTeamDialogComponent;
}());
exports.AddPersonToTeamDialogComponent = AddPersonToTeamDialogComponent;


/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__teams\">\r\n  <section fxLayoutWrap \r\n      fxLayout=\"row\" fxLayout.xs=\"column\" \r\n      fxLayoutGap.xs=\"10px\" \r\n      fxLayoutAlign=\"space-around center\" fxLayoutAlign.xs=\"none none\" >\r\n    \r\n    <div *ngIf=\"!teams.length && !getTeamsServiceRunning\" fxFlexAlign=\"center\">You are not member of any team yet.</div>\r\n    <!-- Team Cards -->\r\n    <mat-expansion-panel *ngFor=\"let team of teams; index as teamIndex\"\r\n        fxFlex.sm=\"45\" fxFlex.gt-sm=\"30\" \r\n        class=\"team-card\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-card__content\">\r\n        <section *ngIf=\"team.description\" class=\"description\">\r\n          <p>{{team.description}}</p>\r\n        </section>\r\n\r\n        <section class=\"members\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n          <div *ngFor=\"let member of team.members\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n            <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n              <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n              <p class=\"member__email\">{{member.email}}</p>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <section *ngIf=\"team.admin.email === user.email\" class=\"card__actions\" fxLayout=\"row\" fxLayoutAlign=\"end none\" fxLayoutGap=\"10px\">\r\n          <button *ngIf=\"!teamActionRunning[teamIndex]\" mat-mini-fab routerLink=\"/teams/edit/{{team.slug}}\" color=\"primary\" (click)=\"teamActionRunning[teamIndex] = true\">\r\n            <mat-icon aria-label=\"Edit team\">edit</mat-icon>\r\n          </button>\r\n\r\n          <button *ngIf=\"!teamActionRunning[teamIndex]\" mat-mini-fab color=\"warn\" (click)=\"openDeleteTeamDialog(teamIndex, team)\">\r\n            <mat-icon aria-label=\"Delete team\">delete</mat-icon>\r\n          </button>\r\n\r\n          <mat-progress-spinner *ngIf=\"teamActionRunning[teamIndex]\"\r\n            class=\"progress-spinner progress-spinner--delete-team\"\r\n            color=\"warn\"\r\n            [diameter]=\"40\" [strokeWidth]=\"7\"\r\n            mode=\"indeterminate\">\r\n          </mat-progress-spinner>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team Cards -->\r\n  </section>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamsServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-teams\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\" class=\"actions\">\r\n    <button mat-fab routerLink=\"create\" color=\"accent\" class=\"fab mat-elevation-z10\">\r\n      <mat-icon class=\"mat-24\" aria-label=\"Create team\">group_add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container__teams .team-card {\n  cursor: default; }\n  .container__teams .team-card mat-panel-title {\n    font-size: 18px; }\n  .container__teams .team-card .team-card__content .description {\n    margin-bottom: 20px;\n    font-size: 13px; }\n  .container__teams .team-card .team-card__content .members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    padding: 0 10px 0 0; }\n  .container__teams .team-card .team-card__content .members .member .member__info .admin-icon {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n  .container__teams .team-card .team-card__content .members .member .member__info .member__email {\n    font-size: 11px; }\n  .container__teams .team-card .team-card__content .card__actions {\n    margin: 0 8px 8px 0; }\n  .container__teams .progress-bar--get-teams {\n  width: 100%; }\n  @media screen and (min-width: 600px) {\n  .container__teams .team-card {\n    margin-bottom: 10px; }\n  .container__teams .progress-bar--get-teams {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var teams_service_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var yes_no_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var TeamsDashboardComponent = /** @class */ (function () {
    function TeamsDashboardComponent(route, mainNavigatorService, teamsService, appService, router, dialog) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.teamsService = teamsService;
        this.appService = appService;
        this.router = router;
        this.dialog = dialog;
        this.user = null;
        this.getTeamsServiceRunning = false;
        this.teamActionRunning = [];
        this.teams = [];
    }
    TeamsDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Teams', url: null, selected: true }
        ]);
        //get authUser from resolver
        this.route.data.subscribe(function (data) {
            _this.user = data.authUser;
        });
        if (!this.teams.length) {
            this.getTeams();
        }
    };
    /**
     * Get my teams from server
     */
    TeamsDashboardComponent.prototype.getTeams = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        this.teams = [];
        this.getTeamsServiceRunning = true;
        this.teamsService.getTeams(this.user.email).subscribe(function (teams) {
            var index = 0;
            _this.teams = teams;
            for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                var item = teams_1[_i];
                _this.teamActionRunning[index] = false;
                index += 1;
            }
            _this.getTeamsServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getTeamsServiceRunning = false;
        });
    };
    TeamsDashboardComponent.prototype.openDeleteTeamDialog = function (index, team) {
        var _this = this;
        if (team === void 0) { team = null; }
        var methodTrace = this.constructor.name + " > openDeleteTeamDialog() > "; //for debugging
        if (!team) {
            this.appService.consoleLog('error', methodTrace + " Team is required to delete.");
            return false;
        }
        this.teamActionRunning[index] = true;
        var yesNoDialogRef = this.dialog.open(yes_no_dialog_component_1.YesNoDialogComponent, {
            width: '250px',
            data: {
                title: 'Delete team',
                message: "Are you sure you want to delete the team \"" + team.name + "\" forever?"
            }
        });
        yesNoDialogRef.afterClosed().subscribe(function (result) {
            if (result === 'yes') {
                _this.delete(index, team);
            }
            else {
                _this.teamActionRunning[index] = false;
            }
        });
        return false;
    };
    TeamsDashboardComponent.prototype.delete = function (index, team) {
        var _this = this;
        if (team === void 0) { team = null; }
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        this.teamActionRunning[index] = true;
        this.teamsService.delete(team.slug, this.user.email).subscribe(function (data) {
            if (data && data.removed > 0) {
                _this.teams.splice(index, 1);
                _this.teamActionRunning.splice(index, 1);
                _this.appService.showResults("Team \"" + team.name + "\" successfully removed!", 'success');
            }
            else {
                _this.appService.showResults("Team \"" + team.name + "\" could not be removed, please try again.", 'error');
            }
            _this.teamActionRunning[index] = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 471) {
                _this.appService.showResults(error.msg, 'error', 7000);
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.teamActionRunning[index] = false;
        });
    };
    TeamsDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-teams-dashboard',
            template: __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, teams_service_1.TeamsService,
            app_service_1.AppService, router_1.Router, material_1.MatDialog])
    ], TeamsDashboardComponent);
    return TeamsDashboardComponent;
}());
exports.TeamsDashboardComponent = TeamsDashboardComponent;


/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__edit-team\">\r\n  <form *ngIf=\"!getTeamServiceRunning\" \r\n      class=\"form__container form__edit-team\" (ngSubmit)=\"editMode ? onUpdate() : onSubmit()\" #editTeamForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    \r\n    <section fxLayout=\"column\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" fxLayoutAlign.gt-xs=\"none end\" class=\"form__fields__row\">\r\n        <!-- Team name -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <input matInput type=\"tezt\" id=\"name\" name=\"name\" placeholder=\"Team name\" \r\n              [(ngModel)]=\"model.name\" \r\n              value=\"model.name\"\r\n              required\r\n              minlength=\"4\"\r\n              #name=\"ngModel\">\r\n          <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n          <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Value must be longer than 3 characters</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Description -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <textarea matInput id=\"description\" name=\"description\" placeholder=\"Description\"\r\n              [(ngModel)]=\"model.description\" \r\n              value=\"model.description\"\r\n              #description=\"ngModel\"></textarea>\r\n        </mat-form-field>\r\n      </div>\r\n    </section>\r\n\r\n    <section *ngIf=\"editMode\" class=\"members\" fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap>\r\n      <mat-card *ngFor=\"let member of team.members; index as memberIndex\" class=\"member\" [class.not-saved-yet]=\"!member.name && !member.avatar\">\r\n        <mat-card-content fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"none center\">\r\n          \r\n          <img *ngIf=\"member.avatar\" class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n          <mat-icon *ngIf=\"!member.avatar\" class=\"member__avatar member__avatar--default\">account_circle</mat-icon>\r\n          \r\n          <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n            <p *ngIf=\"member.name\" class=\"member__name\">\r\n              {{member.name}}\r\n              <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"icon__admin\" aria-label=\"Admin\" >lock</mat-icon>\r\n            </p>\r\n            <p class=\"member__email\">{{member.email}}</p>\r\n          </div>\r\n\r\n          <mat-icon *ngIf=\"member.email !== team.admin.email\" matTooltip=\"Remove\" class=\"icon__remove-member\" (click)=\"removeMember(memberIndex)\">clear</mat-icon>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </section>\r\n\r\n    <section *ngIf=\"editMode\" class=\"add-members\" fxLayout=\"column\" fxLayoutAlign=\"start end\">\r\n      <button mat-fab color=\"accent\" (click)=\"openAddPersonDialog()\">\r\n        <mat-icon aria-label=\"Add new member\">person_add</mat-icon>\r\n      </button>\r\n    </section>\r\n\r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-team\">\r\n      <button *ngIf=\"!editTeamServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!editTeamForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"editTeamServiceRunning\"\r\n          class=\"progress-bar progress-bar--edit-team\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n    \r\n  </form>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-team\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n.progress-bar--get-team {\n  width: 100%; }\n\n.form__edit-team .form__actions--edit-team {\n  margin: 20px 0; }\n\n.members .member {\n  margin-bottom: 10px;\n  padding: 14px;\n  border-radius: 50px;\n  cursor: default; }\n\n.members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px; }\n\n.members .member .member__info .icon__admin {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n\n.members .member .member__info .member__email {\n    font-size: 11px; }\n\n.members .member .icon__remove-member {\n    font-size: 16px;\n    height: auto;\n    width: auto;\n    cursor: pointer; }\n\n.members .member.not-saved-yet .member__avatar--default {\n    font-size: 40px;\n    color: #f44336; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-team {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var add_person_to_team_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var teams_service_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var team_1 = __webpack_require__("../../../../../src/app/modules/teams/models/team.ts");
var Subscription_1 = __webpack_require__("../../../../rxjs/_esm5/Subscription.js");
var TeamsEditComponent = /** @class */ (function () {
    function TeamsEditComponent(route, mainNavigatorService, teamsService, appService, router, dialog) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.teamsService = teamsService;
        this.appService = appService;
        this.router = router;
        this.dialog = dialog;
        this.editMode = false;
        this.user = null;
        this.team = null;
        this.editTeamServiceRunning = false;
        this.getTeamServiceRunning = false;
        this.model = {
            name: null,
            description: null,
            email: null,
            members: []
        };
        this.slug = null;
        this.subscription = new Subscription_1.Subscription();
    }
    TeamsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Teams', url: '/teams', selected: false }
        ]);
        //generates a user source object from authUser from resolver
        var user$ = this.route.data.map(function (data) { return data.authUser; });
        //generates an investment id source from id parameter in url
        var slug$ = this.route.paramMap.map(function (params) { return params.get('slug'); });
        //combine user$ and id$ sources into one object and start listen to it for changes
        this.subscription = user$.combineLatest(slug$, function (user, slug) {
            return { user: user, teamSlug: slug };
        }).subscribe(function (data) {
            _this.user = data.user;
            _this.model.email = data.user.email;
            _this.editTeamServiceRunning = false;
            _this.getTeamServiceRunning = false;
            if (!data.teamSlug) {
                //we are creating a new team
                _this.slug = null;
                _this.editMode = false;
                _this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected: true });
            }
            else {
                if (_this.slug) {
                    //if this is true means the user updated the name and we refresh the page to update the slug in the url
                    //in this case we don't want to append the edit team link to the navigation component because it is already there.
                }
                else {
                    _this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected: true });
                }
                //we are editing an existing investment
                _this.slug = data.teamSlug; //the new slug
                _this.editMode = true;
                _this.getTeam(data.teamSlug); //get data
            }
        });
    };
    TeamsEditComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    TeamsEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.editTeamServiceRunning = true;
        //call the team create service
        var newSubscription = this.teamsService.create(this.model).subscribe(function (data) {
            if (data && data.slug) {
                _this.appService.showResults("Team " + data.name + " successfully created!", 'success');
                _this.router.navigate(['/teams/edit', data.slug]);
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.editTeamServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit team service.", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error with the team services, please try again in a few minutes.", 'error');
            }
            _this.editTeamServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    TeamsEditComponent.prototype.onUpdate = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onUpdate() > "; //for debugging
        this.editTeamServiceRunning = true;
        //add slug and members to service payload
        this.model.slug = this.slug;
        this.model.members = []; //reset the members array
        for (var _i = 0, _a = this.team.members; _i < _a.length; _i++) {
            var member = _a[_i];
            this.model.members.push(member.email);
        }
        //TODO check the new members are not duplicated, especially the admin
        //call the team update service
        var newSubscription = this.teamsService.update(this.model).subscribe(function (data) {
            if (data && data.team && data.team.slug) {
                var messages = [
                    {
                        message: "Team \"" + data.team.name + "\" successfully updated!",
                        type: 'success'
                    }
                ];
                if (data.usersNotRegistered.length) {
                    //handle not registered users
                    var message = {
                        message: "The following emails added to the team are not registered users in AtomiCoconut: ",
                        duration: 8000
                    };
                    for (var _i = 0, _a = data.usersNotRegistered; _i < _a.length; _i++) {
                        var email = _a[_i];
                        message.message += "\"" + email + "\", ";
                    }
                    message.message = message.message.slice(0, -2); //remove last comma char
                    message.message += '. We sent them an email to create an account. Once they do it try to add them again.';
                    messages.push(message);
                }
                _this.appService.showManyResults(messages);
                //TODO redirect to the new team slug name if changed
                if (_this.slug !== data.team.slug) {
                    //this means that the team name was update and therefore the slug too
                    _this.router.navigate(['/teams/edit', data.team.slug]); //go home 
                }
                else {
                    _this.populateTeam(data.team);
                    _this.editTeamServiceRunning = false;
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.editTeamServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.editTeamServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Get a team from server based on the slug provided
     * @param {string} slug
     */
    TeamsEditComponent.prototype.getTeam = function (slug) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeam() > "; //for debugging
        if (!slug) {
            this.appService.showResults("Invalid team ID", 'error');
            this.appService.consoleLog('error', methodTrace + " Slug parameter must be provided, but was: ", slug);
            return false;
        }
        this.getTeamServiceRunning = true;
        var newSubscription = this.teamsService.getMyTeamBySlug(this.user.email, slug).subscribe(function (data) {
            if (data && data.slug) {
                _this.populateTeam(data);
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.getTeamServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 461 || error.codeno === 462) {
                _this.appService.showResults(error.msg, 'error');
                _this.router.navigate(['/welcome']);
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getTeamServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Populates the team and model with a team object coming from a service
     * @param {*} team . Team object retrieved from a service
     */
    TeamsEditComponent.prototype.populateTeam = function (team) {
        //populate admin
        var admin = new user_1.User(team.admin.name, team.admin.email, team.admin.gravatar);
        //populate members
        var members = [];
        for (var _i = 0, _a = team.members; _i < _a.length; _i++) {
            var member = _a[_i];
            var newMember = new user_1.User(member.name, member.email, member.gravatar);
            members.push(newMember);
        }
        //create team
        this.team = new team_1.Team(team.name, team.description || null, team.slug, admin, members);
        //populate the model
        this.model.name = this.team.name;
        this.model.description = this.team.description;
    };
    TeamsEditComponent.prototype.openAddPersonDialog = function () {
        var _this = this;
        var addPersonDialogRef = this.dialog.open(add_person_to_team_dialog_component_1.AddPersonToTeamDialogComponent, {
            width: '250px',
            data: {}
        });
        var newSubscription = addPersonDialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                var newMember = new user_1.User('', result);
                _this.team.members.push(newMember);
            }
        });
        this.subscription.add(newSubscription);
        return false;
    };
    TeamsEditComponent.prototype.removeMember = function (index) {
        this.team.members.splice(index, 1);
    };
    TeamsEditComponent = __decorate([
        core_1.Component({
            selector: 'app-teams-edit',
            template: __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, teams_service_1.TeamsService,
            app_service_1.AppService, router_1.Router, material_1.MatDialog])
    ], TeamsEditComponent);
    return TeamsEditComponent;
}());
exports.TeamsEditComponent = TeamsEditComponent;


/***/ }),

/***/ "../../../../../src/app/modules/teams/models/team.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Team = /** @class */ (function () {
    function Team(name, description, slug, admin, members) {
        if (name === void 0) { name = null; }
        if (description === void 0) { description = null; }
        if (slug === void 0) { slug = null; }
        if (admin === void 0) { admin = null; }
        if (members === void 0) { members = null; }
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.admin = admin;
        this.members = members;
    }
    return Team;
}());
exports.Team = Team;


/***/ }),

/***/ "../../../../../src/app/modules/teams/teams-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var teams_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
var teams_edit_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
var auth_resolver_service_1 = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var routes = [
    {
        path: 'teams',
        children: [
            {
                path: 'create',
                component: teams_edit_component_1.TeamsEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: 'edit/:slug',
                component: teams_edit_component_1.TeamsEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: '',
                pathMatch: 'full',
                component: teams_dashboard_component_1.TeamsDashboardComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            }
        ]
    }
];
var TeamsRoutingModule = /** @class */ (function () {
    function TeamsRoutingModule() {
    }
    TeamsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TeamsRoutingModule);
    return TeamsRoutingModule;
}());
exports.TeamsRoutingModule = TeamsRoutingModule;


/***/ }),

/***/ "../../../../../src/app/modules/teams/teams.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
var teams_routing_module_1 = __webpack_require__("../../../../../src/app/modules/teams/teams-routing.module.ts");
var teams_dashboard_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var teams_edit_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
var teams_service_1 = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var add_person_to_team_dialog_component_1 = __webpack_require__("../../../../../src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts");
var TeamsModule = /** @class */ (function () {
    function TeamsModule() {
    }
    TeamsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                teams_routing_module_1.TeamsRoutingModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule
            ],
            declarations: [
                teams_dashboard_component_1.TeamsDashboardComponent,
                teams_edit_component_1.TeamsEditComponent,
                add_person_to_team_dialog_component_1.AddPersonToTeamDialogComponent
            ],
            entryComponents: [
                add_person_to_team_dialog_component_1.AddPersonToTeamDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
            ],
            providers: [teams_service_1.TeamsService]
        })
    ], TeamsModule);
    return TeamsModule;
}());
exports.TeamsModule = TeamsModule;


/***/ }),

/***/ "../../../../../src/app/modules/teams/teams.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var team_1 = __webpack_require__("../../../../../src/app/modules/teams/models/team.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var Observable_1 = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var of_1 = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
var from_1 = __webpack_require__("../../../../rxjs/_esm5/observable/from.js");
var TeamsService = /** @class */ (function () {
    function TeamsService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = environment_1.environment.apiHost + '/api/teams';
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    }
    /**
     * Server call to Create a new team in the system
     * @param postData
     */
    TeamsService.prototype.create = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > register() > "; //for debugging
        return this.http.post(this.serverHost + "/create", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to Update a team in the system
     * @param postData
     */
    TeamsService.prototype.update = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > register() > "; //for debugging
        return this.http.post(this.serverHost + "/update", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to Get a team from the server based on its slug
     * @param {string} slug . The team slug
     */
    TeamsService.prototype.getMyTeamBySlug = function (email, slug) {
        var methodTrace = this.constructor.name + " > getMyTeamBySlug() > "; //for debugging
        if (!email || !slug) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return of_1.of(null);
        }
        var params = new http_1.HttpParams()
            .set('email', email)
            .set('slug', slug);
        return this.http.get(this.serverHost + "/getMyTeamBySlug", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to Get all the teams for the current user from the server
     * @param {string} slug . The team slug
     */
    TeamsService.prototype.getTeams = function (email) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        if (!email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return from_1.from([]);
        }
        var params = new http_1.HttpParams().set('email', email);
        var teamsData$ = this.http.get(this.serverHost + "/getAll", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
        return teamsData$.switchMap(function (teamsData) {
            var teams = [];
            if (teamsData && teamsData instanceof Array) {
                for (var _i = 0, teamsData_1 = teamsData; _i < teamsData_1.length; _i++) {
                    var item = teamsData_1[_i];
                    var admin = null;
                    var members = [];
                    for (var _a = 0, _b = item.members; _a < _b.length; _a++) {
                        var member = _b[_a];
                        var newMember = new user_1.User(member.name, member.email, member.gravatar);
                        members.push(newMember);
                        if (member.isAdmin) {
                            admin = newMember;
                        }
                    }
                    teams.push(new team_1.Team(item.name, item.description || null, item.slug, admin, members));
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return of_1.of(teams);
        });
    };
    /**
     * Server call to Get all the teams for the current user from the server
     * @param {string} slug . The team slug
     * @param {string} email . The current user email.
     */
    TeamsService.prototype.delete = function (slug, email) {
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        if (!slug || !email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Observable_1.Observable.throw(null);
        }
        var params = new http_1.HttpParams().set('email', email);
        return this.http.delete(this.serverHost + "/delete/" + slug, { headers: this.headers, params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    TeamsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], TeamsService);
    return TeamsService;
}());
exports.TeamsService = TeamsService;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-finance\" (ngSubmit)=\"onSubmit()\" #financeForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Active income -->\r\n      <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <currency-unit fxFlex=\"50px\"\r\n            [id]=\"'annualIncomeUnit'\" \r\n            [value]=\"model.annualIncomeUnit\"\r\n            [view]=\"'narrow'\"\r\n            (newValue)=\"onCurrencyUnitChange($event)\">\r\n        </currency-unit>\r\n        \r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"annualIncome\" name=\"annualIncome\" placeholder=\"Annual Income\"\r\n              [(ngModel)]=\"model.annualIncome\" \r\n              value=\"model.annualIncome\"\r\n              numberValidator \r\n              #annualIncome=\"ngModel\">\r\n          <mat-hint align=\"start\">Annual income amount pre-tax.</mat-hint>\r\n          <mat-error *ngIf=\"annualIncome.invalid && (annualIncome.dirty || annualIncome.touched) && annualIncome.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n        <!-- <pre>{{annualIncome.errors | json}}</pre> -->\r\n      </div>\r\n\r\n      <!-- Tax rate -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"150px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"incomeTaxRate\" name=\"incomeTaxRate\" placeholder=\"Income tax rate (%)\" \r\n            [(ngModel)]=\"model.incomeTaxRate\" \r\n            value=\"model.incomeTaxRate\"\r\n            numberValidator='{\"min\": 0, \"max\": 100}' \r\n            #incomeTaxRate=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{incomeTaxRate.errors | json}}</pre> -->\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Savings -->\r\n      <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <currency-unit fxFlex=\"50px\"\r\n            [id]=\"'savingsUnit'\" \r\n            [value]=\"model.savingsUnit\"\r\n            [view]=\"'narrow'\"\r\n            (newValue)=\"onCurrencyUnitChange($event)\">\r\n        </currency-unit>\r\n        \r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"savings\" name=\"savings\" placeholder=\"Current savings\" \r\n              [(ngModel)]=\"model.savings\" \r\n              value=\"model.savings\"\r\n              numberValidator\r\n              #savings=\"ngModel\">\r\n\r\n          <mat-error *ngIf=\"savings.invalid && (savings.dirty || savings.touched) && savings.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxFlex fxFlex.gt-xs=\"150px\" class=\"form__spacer\"></div>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-finance\">\r\n    <button *ngIf=\"!accountFinanceServiceRunning\" \r\n        class=\"form__action mat-raised-button\" \r\n        mat-raised-button \r\n        type=\"submit\" \r\n        color=\"accent\" \r\n        [disabled]=\"!financeForm.form.valid\">Save</button>\r\n    \r\n    <mat-progress-bar *ngIf=\"accountFinanceServiceRunning\"\r\n        class=\"progress-bar progress-bar--account-finance\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var account_finance_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var AccountFinanceInfoComponent = /** @class */ (function () {
    function AccountFinanceInfoComponent(usersService, appService) {
        this.usersService = usersService;
        this.appService = appService;
        this.model = {
            email: null,
            annualIncome: null,
            annualIncomeUnit: null,
            incomeTaxRate: null,
            savings: null,
            savingsUnit: null
        };
        this.accountFinanceServiceRunning = false;
    }
    AccountFinanceInfoComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.model.email = this.user.email;
        this.model.annualIncomeUnit = this.user.currency;
        this.model.savingsUnit = this.user.currency;
        if (this.user.financialInfo) {
            Object.assign(this.model, {
                annualIncome: this.user.financialInfo.annualIncome,
                annualIncomeUnit: this.user.financialInfo.annualIncomeUnit,
                incomeTaxRate: this.user.financialInfo.incomeTaxRate,
                savings: this.user.financialInfo.savings,
                savingsUnit: this.user.financialInfo.savingsUnit
            });
        }
    };
    AccountFinanceInfoComponent.prototype.onCurrencyUnitChange = function ($event) {
        if ($event.source.id === 'annualIncomeUnit') {
            this.model.annualIncomeUnit = $event.value;
        }
        else if ($event.source.id === 'savingsUnit') {
            this.model.savingsUnit = $event.value;
        }
    };
    AccountFinanceInfoComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.accountFinanceServiceRunning = true;
        //call the account service
        this.usersService.updateFinancialInfo(this.model).subscribe(function (data) {
            if (data === null) {
                var user = _this.usersService.getUser();
                user.financialInfo = new account_finance_1.AccountFinance(_this.model.annualIncome, _this.model.annualIncomeUnit, _this.model.savings, _this.model.savingsUnit, _this.model.incomeTaxRate);
                _this.usersService.setUser(user);
                _this.appService.showResults("Your personal information was successfully updated!.", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.accountFinanceServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.accountFinanceServiceRunning = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", user_1.User)
    ], AccountFinanceInfoComponent.prototype, "user", void 0);
    AccountFinanceInfoComponent = __decorate([
        core_1.Component({
            selector: 'account-finance-info',
            template: __webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService])
    ], AccountFinanceInfoComponent);
    return AccountFinanceInfoComponent;
}());
exports.AccountFinanceInfoComponent = AccountFinanceInfoComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-personal\" #personalInfoForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n    <section fxLayout=\"column\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n        \r\n        <!-- Birthday -->\r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input \r\n              placeholder=\"Day of birth\"\r\n              id=\"birthday\"\r\n              name=\"birthday\"\r\n              readonly\r\n              required\r\n              #birthday=\"ngModel\"\r\n              matInput \r\n              [(ngModel)]=\"model.birthday\" \r\n              [matDatepicker]=\"pickerBirthday\"\r\n              (click)=\"pickerBirthday.open()\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"pickerBirthday\"></mat-datepicker-toggle>\r\n          <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBirthday startView=\"year\" [startAt]=\"startAt\"></mat-datepicker>\r\n          <mat-error *ngIf=\"birthday.invalid && (birthday.dirty || birthday.touched) && birthday.errors.matDatepickerParse\">Day of birth is invalid or not follow the pattern \"mm/dd/yyyy\"</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </section>\r\n    \r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-personal\">\r\n      <button *ngIf=\"!accountPersonalServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!personalInfoForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"accountPersonalServiceRunning\"\r\n          class=\"progress-bar progress-bar--account-personal\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n  </form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/util.service.ts");
var AccountPersonalInfoComponent = /** @class */ (function () {
    function AccountPersonalInfoComponent(dateAdapter, usersService, appService, utilService) {
        this.dateAdapter = dateAdapter;
        this.usersService = usersService;
        this.appService = appService;
        this.utilService = utilService;
        this.model = { birthday: null, email: null };
        this.startAt = new Date(1990, 0, 1);
        this.accountPersonalServiceRunning = false;
        this.dateAdapter.setLocale('en-GB');
    }
    AccountPersonalInfoComponent.prototype.ngOnInit = function () {
        this.model.email = this.user.email;
        if (this.user.personalInfo) {
            this.model.birthday = this.user.personalInfo.birthday;
            if (this.user.personalInfo.birthday) {
                this.startAt = this.user.personalInfo.birthday;
            }
        }
    };
    AccountPersonalInfoComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.accountPersonalServiceRunning = true;
        //call the account service
        this.usersService.updatePersonalInfo(this.model).subscribe(function (data) {
            if (data === null) {
                var user = _this.usersService.getUser();
                user.personalInfo = new account_personal_1.AccountPersonal(_this.model.birthday);
                _this.usersService.setUser(user);
                _this.appService.showResults("Your personal information was successfully updated!.", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.accountPersonalServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.accountPersonalServiceRunning = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", user_1.User)
    ], AccountPersonalInfoComponent.prototype, "user", void 0);
    AccountPersonalInfoComponent = __decorate([
        core_1.Component({
            selector: 'account-personal-info',
            template: __webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.scss")]
        }),
        __metadata("design:paramtypes", [material_1.DateAdapter, users_service_1.UsersService, app_service_1.AppService,
            util_service_1.UtilService])
    ], AccountPersonalInfoComponent);
    return AccountPersonalInfoComponent;
}());
exports.AccountPersonalInfoComponent = AccountPersonalInfoComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #accountForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            value=\"model.name\"\r\n            #name=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            value=\"model.email\"\r\n            #email=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Preferred currency -->\r\n      <currency-unit fxFlex fxFlex.gt-xs=\"200px\"\r\n          [id]=\"'preferredCurrency'\"\r\n          [hint]=\"'Your preferred currency format to use across the platform'\" \r\n          [placeHolder]=\"'Preferred currency'\" \r\n          [value]=\"model.currency\"\r\n          (newValue)=\"onCurrencyUnitChange($event)\">\r\n      </currency-unit>\r\n    </div>\r\n\r\n    <div fxFlex class=\"form__spacer\"></div>\r\n  </div>\r\n\r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!updateAccountServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!accountForm.form.valid\">Save</button>\r\n\r\n    <mat-progress-bar *ngIf=\"updateAccountServiceRunning\"\r\n        class=\"progress-bar progress-bar--update-account\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var AccountUserInfoComponent = /** @class */ (function () {
    function AccountUserInfoComponent(usersService, appService) {
        this.usersService = usersService;
        this.appService = appService;
        this.user = null;
        this.model = { name: '', email: '', currency: '' };
        this.updateAccountServiceRunning = false;
    }
    AccountUserInfoComponent.prototype.ngOnInit = function () {
        this.model = { name: this.user.name, email: this.user.email, currency: this.user.currency };
    };
    AccountUserInfoComponent.prototype.onCurrencyUnitChange = function ($event) {
        if ($event.source.id === 'preferredCurrency') {
            this.model.currency = $event.value;
        }
    };
    /**
     * When user submits the register form.
     */
    AccountUserInfoComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.updateAccountServiceRunning = true;
        //call the account service
        this.usersService.updateAccount(this.model).subscribe(function (data) {
            if (data && data.email) {
                var user = _this.usersService.getUser();
                user.name = data.name;
                user.email = data.email;
                user.currency = data.currency;
                _this.usersService.setUser(user);
                _this.appService.showResults("Your profile was successfully updated!.", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.updateAccountServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.updateAccountServiceRunning = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", user_1.User)
    ], AccountUserInfoComponent.prototype, "user", void 0);
    AccountUserInfoComponent = __decorate([
        core_1.Component({
            selector: 'account-user-info',
            template: __webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService])
    ], AccountUserInfoComponent);
    return AccountUserInfoComponent;
}());
exports.AccountUserInfoComponent = AccountUserInfoComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- SM and higher view -->\r\n<mat-tab-group *ngIf=\"utilService.isGtXs()\">\r\n  <mat-tab label=\"Account info\">\r\n    <account-user-info [user]=\"user\"></account-user-info>\r\n  </mat-tab>\r\n  <mat-tab label=\"Personal info\">\r\n    <account-personal-info [user]=\"user\"></account-personal-info>\r\n  </mat-tab>\r\n  <mat-tab label=\"Financial info\">\r\n    <account-finance-info [user]=\"user\"></account-finance-info>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n<!-- XS view -->\r\n<mat-accordion *ngIf=\"utilService.isXs()\">  \r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Account info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-user-info [user]=\"user\"></account-user-info>\r\n    </mat-expansion-panel>\r\n  \r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Personal info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-personal-info [user]=\"user\"></account-personal-info>\r\n    </mat-expansion-panel>\r\n\r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Financial info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-finance-info [user]=\"user\"></account-finance-info>\r\n    </mat-expansion-panel>\r\n\r\n  </mat-accordion>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account/account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account/account.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var util_service_1 = __webpack_require__("../../../../../src/app/util.service.ts");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(mainNavigatorService, route, utilService) {
        this.mainNavigatorService = mainNavigatorService;
        this.route = route;
        this.utilService = utilService;
        this.user = null;
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'My account', url: null, selected: true }
        ]);
        //get authUser from resolver
        this.route.data.subscribe(function (data) {
            _this.user = data.authUser;
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'app-account',
            template: __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/account/account.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, router_1.ActivatedRoute, util_service_1.UtilService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__login\" (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\"\r\n            #password=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--login\">\r\n    <button *ngIf=\"!loginServiceRunning\" class=\"form__action mat-raised-button\" mat-raised-button type=\"submit\" \r\n        color=\"accent\" [disabled]=\"!loginForm.form.valid\">Login</button>\r\n    \r\n    <mat-progress-bar *ngIf=\"loginServiceRunning\"\r\n        class=\"progress-bar progress-bar--login\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n    \r\n    <mat-checkbox fxLayoutAlign.xs=\"center center\" class=\"form__action\" [(ngModel)]=\"forgotModel.forgot\" name=\"forgot\" id=\"forgot\">Forgot my password</mat-checkbox>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" class=\"form__actions form__actions--create-account\">\r\n    <a mat-button color=\"accent\" class=\"color__almost-white ac__link\" routerLink=\"/users/register\">Create an account</a>\r\n  </section>\r\n\r\n</form>\r\n\r\n<form class=\"form__container form__forgot\" (ngSubmit)=\"onForgotSubmit()\" #forgotForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" *ngIf=\"forgotModel.forgot\">\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        \r\n        <input matInput type=\"email\" id=\"emailForgot\" name=\"emailForgot\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"forgotModel.email\" \r\n            required email\r\n            #emailForgot=\"ngModel\">\r\n        <mat-hint align=\"start\">Type your email and we will send you an email to reset your password.</mat-hint>\r\n        <mat-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!forgotServiceRunning\" class=\"form__action mat-raised-button\" \r\n        color=\"accent\" mat-raised-button type=\"submit\" [disabled]=\"!forgotForm.form.valid\">Send</button>\r\n\r\n    <mat-progress-bar *ngIf=\"forgotServiceRunning\"\r\n        class=\"progress-bar progress-bar--forgot\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n.form__login .form__actions--create-account {\n  margin: 20px 0; }\n\n.form__forgot {\n  margin-top: 50px; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(usersService, appService, mainNavigatorService, router, route) {
        this.usersService = usersService;
        this.appService = appService;
        this.mainNavigatorService = mainNavigatorService;
        this.router = router;
        this.route = route;
        this.model = { email: '', password: '' };
        this.forgotModel = { email: '', forgot: false };
        this.loginServiceRunning = false;
        this.forgotServiceRunning = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Login', url: null, selected: true }
        ]);
        this.route.paramMap.map(function (params) { return params.get('state'); })
            .subscribe(function (state) {
            if (state === 'reset-password-token-expired') {
                _this.appService.showResults('Reset password token has expired or is invalid. Click on "Forgot my password" again to create a new one.', 'error', 10000);
            }
        });
    };
    /**
     * When user submits the login form
     */
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.loginServiceRunning = true;
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.login(this.model).subscribe(function (data) {
            if (data && data.email) {
                var user = new user_1.User(data.name, data.email, data.avatar, null, null, data.currency);
                _this.usersService.setUser(user);
                var redirectUrl = _this.usersService.routerRedirectUrl ? _this.usersService.routerRedirectUrl : '/';
                _this.usersService.routerRedirectUrl = null;
                _this.router.navigate([redirectUrl]); //go home
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.loginServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 451) {
                _this.appService.showResults(error.msg, 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.loginServiceRunning = false;
        });
    };
    /**
     * When user submits the forgot password form
     */
    LoginComponent.prototype.onForgotSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onForgotSubmit() > "; //for debugging
        this.forgotServiceRunning = true;
        //call the register service
        this.usersService.forgot(this.forgotModel).subscribe(function (data) {
            _this.forgotServiceRunning = false;
            _this.appService.showResults("You have been emailed a password reset link.", 'info');
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 455) {
                //invalid email
                _this.appService.showResults(error.msg, 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.forgotServiceRunning = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService,
            main_navigator_service_1.MainNavigatorService, router_1.Router, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #registerForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            #name=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"passwordConfirm\" reverse=\"true\"\r\n            #password=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Password confirm -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \r\n            [(ngModel)]=\"model['password-confirm']\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"password\"\r\n            #passwordConfirm=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.equalvalidator\">Confirm password must match password</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{passwordConfirm.errors | json}}</pre> -->\r\n    </div>\r\n    \r\n  </div>\r\n  \r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!registerServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!registerForm.form.valid\">Create account</button>\r\n\r\n    <mat-progress-bar *ngIf=\"registerServiceRunning\"\r\n        class=\"progress-bar progress-bar--register\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 127px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/register/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(usersService, appService, router, mainNavigatorService) {
        this.usersService = usersService;
        this.appService = appService;
        this.router = router;
        this.mainNavigatorService = mainNavigatorService;
        this.model = { name: '', email: '', password: '', 'password-confirm': '' };
        this.registerServiceRunning = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Login', url: '/users/login', selected: false },
            { displayName: 'Create account', url: null, selected: true }
        ]);
    };
    /**
     * When user submits the register form.
     */
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.registerServiceRunning = true;
        //chech that the password and the confirmed password are the same
        if (this.model.password !== this.model['password-confirm']) {
            this.appService.consoleLog('error', methodTrace + " Confirm password must match password.");
            this.registerServiceRunning = false;
            return false;
        }
        this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.register(this.model).subscribe(function (data) {
            if (data && data.email) {
                var user = new user_1.User(data.name, data.email, data.avatar, null, null, data.currency);
                _this.usersService.setUser(user);
                _this.router.navigate(['/']); //go home
                _this.appService.showResults(user.name + " welcome to AtomiCoconut!", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.", data);
            }
            _this.registerServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                if (error.data && error.data.name === 'UserExistsError') {
                    //the mail system failed for external reasons
                    _this.appService.showResults("The selected email address already in use by another person, pick a different one please.", 'error');
                }
                else {
                    _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
                }
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.registerServiceRunning = false;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'users-register',
            template: __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService, router_1.Router,
            main_navigator_service_1.MainNavigatorService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #resetForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"passwordConfirm\" reverse=\"true\"\r\n            #password=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Password confirm -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \r\n            [(ngModel)]=\"model['password-confirm']\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"password\"\r\n            #passwordConfirm=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.equalvalidator\">Confirm password must match password</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    \r\n    \r\n    \r\n  </div>\r\n  \r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!resetPasswordServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!resetForm.form.valid\">Reset password</button>\r\n\r\n    <mat-progress-bar *ngIf=\"resetPasswordServiceRunning\"\r\n        class=\"progress-bar progress-bar--reset-password\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 127px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var user_1 = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(appService, usersService, router, route, mainNavigatorService) {
        this.appService = appService;
        this.usersService = usersService;
        this.router = router;
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.model = { password: '', 'password-confirm': '' };
        this.token = '';
        this.resetPasswordServiceRunning = false;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Login', url: '/users/login', selected: false },
            { displayName: 'Reset password', url: null, selected: true }
        ]);
        this.route.paramMap.map(function (params) { return params.get('token'); })
            .subscribe(function (token) {
            if (token) {
                _this.token = token;
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Token must be set to reset a password.");
                _this.router.navigate(['/']);
            }
        });
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.resetPasswordServiceRunning = true;
        //chech that the password and the confirmed password are the same
        if (this.model.password !== this.model['password-confirm']) {
            this.appService.consoleLog('error', methodTrace + " Confirm password must match password.");
            this.resetPasswordServiceRunning = false;
            return false;
        }
        //call the reset password service.
        this.usersService.setUser(null); //reset authenticated user. Reset automatically authenticates the registered user.
        this.usersService.reset(this.token, this.model).subscribe(function (data) {
            if (data) {
                var user = new user_1.User(data.name, data.email, data.avatar, null, null, data.currency);
                _this.usersService.setUser(user);
                _this.appService.showResults('Your password was successfully updated!', 'success');
                _this.router.navigate(['/']); //go home
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.resetPasswordServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.resetPasswordServiceRunning = false;
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            template: __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, users_service_1.UsersService, router_1.Router, router_1.ActivatedRoute,
            main_navigator_service_1.MainNavigatorService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;


/***/ }),

/***/ "../../../../../src/app/modules/users/models/account-finance.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccountFinance = /** @class */ (function () {
    function AccountFinance(annualIncome, annualIncomeUnit, savings, savingsUnit, incomeTaxRate) {
        if (annualIncome === void 0) { annualIncome = null; }
        if (annualIncomeUnit === void 0) { annualIncomeUnit = 'USD'; }
        if (savings === void 0) { savings = null; }
        if (savingsUnit === void 0) { savingsUnit = 'USD'; }
        if (incomeTaxRate === void 0) { incomeTaxRate = null; }
        this.annualIncome = annualIncome;
        this.annualIncomeUnit = annualIncomeUnit;
        this.savings = savings;
        this.savingsUnit = savingsUnit;
        this.incomeTaxRate = incomeTaxRate;
    }
    return AccountFinance;
}());
exports.AccountFinance = AccountFinance;


/***/ }),

/***/ "../../../../../src/app/modules/users/models/account-personal.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccountPersonal = /** @class */ (function () {
    function AccountPersonal(birthday) {
        if (birthday === void 0) { birthday = null; }
        this.birthday = null;
        this.birthday = birthday;
    }
    Object.defineProperty(AccountPersonal.prototype, "age", {
        get: function () {
            if (this.birthday) {
                var ageDifMs = Date.now() - new Date(this.birthday).getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return AccountPersonal;
}());
exports.AccountPersonal = AccountPersonal;


/***/ }),

/***/ "../../../../../src/app/modules/users/models/user.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name, email, avatar, financialInfo, personalInfo, currency) {
        if (name === void 0) { name = ''; }
        if (email === void 0) { email = ''; }
        if (avatar === void 0) { avatar = ''; }
        if (financialInfo === void 0) { financialInfo = null; }
        if (personalInfo === void 0) { personalInfo = null; }
        if (currency === void 0) { currency = 'USD'; }
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.currency = currency;
        if (financialInfo) {
            this.financialInfo = financialInfo;
        }
        else {
            this.financialInfo = null;
        }
        if (personalInfo) {
            this.personalInfo = personalInfo;
        }
        else {
            this.personalInfo = null;
        }
    }
    return User;
}());
exports.User = User;


/***/ }),

/***/ "../../../../../src/app/modules/users/users-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var register_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
var reset_password_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts");
var account_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.ts");
var auth_resolver_service_1 = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var routes = [
    {
        path: 'users',
        children: [
            { path: 'register', component: register_component_1.RegisterComponent },
            { path: 'login/:state', component: login_component_1.LoginComponent },
            { path: 'login', component: login_component_1.LoginComponent },
            {
                path: 'account',
                component: account_component_1.AccountComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: 'account/reset/expired',
                redirectTo: 'login/reset-password-token-expired',
                pathMatch: 'full'
            },
            { path: 'account/reset/:token', component: reset_password_component_1.ResetPasswordComponent }
        ]
    }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;


/***/ }),

/***/ "../../../../../src/app/modules/users/users.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var users_routing_module_1 = __webpack_require__("../../../../../src/app/modules/users/users-routing.module.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
var users_service_1 = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
var reset_password_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts");
var account_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.ts");
var account_finance_info_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.ts");
var account_personal_info_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.ts");
var account_user_info_component_1 = __webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.ts");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                users_routing_module_1.UsersRoutingModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                reset_password_component_1.ResetPasswordComponent,
                account_component_1.AccountComponent,
                account_finance_info_component_1.AccountFinanceInfoComponent,
                account_personal_info_component_1.AccountPersonalInfoComponent,
                account_user_info_component_1.AccountUserInfoComponent
            ],
            providers: [users_service_1.UsersService]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;


/***/ }),

/***/ "../../../../../src/app/modules/users/users.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var BehaviorSubject_1 = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var app_service_1 = __webpack_require__("../../../../../src/app/app.service.ts");
var UsersService = /** @class */ (function () {
    function UsersService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = environment_1.environment.apiHost + '/api/users';
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        this.routerRedirectUrl = null; //a route to redirect the user to when login is successfull
        this.userSource = new BehaviorSubject_1.BehaviorSubject(null);
        this.user$ = this.userSource.asObservable();
    }
    /**
     * user source feeder
     */
    UsersService.prototype.setUser = function (user) {
        if (user === void 0) { user = null; }
        this.userSource.next(user);
    };
    /**
     * get the current user from the source
     */
    UsersService.prototype.getUser = function () {
        return this.userSource.getValue();
    };
    /**
     * Server call to Register a new user in the system
     * @param postData
     */
    UsersService.prototype.register = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > register() > "; //for debugging
        return this.http.post(this.serverHost + "/register", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to update account user details
     * @param postData
     */
    UsersService.prototype.updateAccount = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > updateAccount() > "; //for debugging
        return this.http.post(this.serverHost + "/account", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to update account personal details
     * @param postData
     */
    UsersService.prototype.updatePersonalInfo = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > updatePersonalInfo() > "; //for debugging
        return this.http.post(this.serverHost + "/accountPersonalInfo", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to update account financial details
     * @param postData
     */
    UsersService.prototype.updateFinancialInfo = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > updateFinancialInfo() > "; //for debugging
        return this.http.post(this.serverHost + "/accountFinancialInfo", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to retrieve the currently authenticated user, or null if nobody .
     * @param {any} parameters . The parameters for the service call. Accepted are personalInfo (boolean), financeInfo (boolean)
     */
    UsersService.prototype.getAuthenticatedUser = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        var methodTrace = this.constructor.name + " > getAuthenticatedUser() > "; //for debugging
        var params = new http_1.HttpParams();
        if (parameters && Object.keys(parameters).length) {
            for (var _i = 0, _a = Object.keys(parameters); _i < _a.length; _i++) {
                var key = _a[_i];
                params = params.set(key, parameters[key] + '');
            }
        }
        return this.http.get(this.serverHost + "/getUser", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.login = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > login() > "; //for debugging
        return this.http.post(this.serverHost + "/login", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to forgot with the provided user email.
     */
    UsersService.prototype.forgot = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > forgot() > "; //for debugging
        return this.http.post(this.serverHost + "/account/forgot", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to reset password api with the provided new password.
     */
    UsersService.prototype.reset = function (token, postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > reset() > "; //for debugging
        return this.http.post(this.serverHost + "/account/reset/" + token, postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.logout = function () {
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging
        return this.http.get(this.serverHost + "/logout")
            .map(this.appService.extractData)
            .catch(this.appService.handleError(methodTrace));
    };
    UsersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;


/***/ }),

/***/ "../../../../../src/app/util.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var UtilService = /** @class */ (function () {
    function UtilService() {
        this.settings = {
            flexLayoutBkpts: {
                xs: { min: 0, max: 599 },
                sm: { min: 600, max: 959 },
                md: { min: 960, max: 1279 },
                lg: { min: 1280, max: 1919 },
                xl: { min: 1920, max: 5000 }
            }
        };
    }
    UtilService.prototype.isXs = function () {
        return window.innerWidth <= this.settings.flexLayoutBkpts.xs.max;
    };
    UtilService.prototype.isSm = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.sm.min && window.innerWidth <= this.settings.flexLayoutBkpts.sm.max;
    };
    UtilService.prototype.isMd = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.md.min && window.innerWidth <= this.settings.flexLayoutBkpts.md.max;
    };
    UtilService.prototype.isLg = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.lg.min && window.innerWidth <= this.settings.flexLayoutBkpts.lg.max;
    };
    UtilService.prototype.isXl = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.xl.min && window.innerWidth <= this.settings.flexLayoutBkpts.xl.max;
    };
    UtilService.prototype.isGtXs = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.sm.min;
    };
    UtilService.prototype.isGtSm = function () {
        return window.innerWidth >= this.settings.flexLayoutBkpts.md.min;
    };
    /**
     * Show logs in the console if enabled in the current environment
     * @param type . Error type
     * @param message . The message to show
     * @param params . Any extra parameters to list in the log.
     */
    UtilService.prototype.consoleLog = function (type, message) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (environment_1.environment.showLogs) {
            console[type](message, params);
        }
    };
    UtilService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    apiHost: '',
    showLogs: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
    console.log('ENV: Production');
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map