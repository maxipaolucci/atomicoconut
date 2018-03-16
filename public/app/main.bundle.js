webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"inner mat-typography\">  \r\n  <mat-toolbar fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"toolbar__primary mat-elevation-z1\" color=\"primary\">\r\n    <a class=\"toolbar__brand-name color__almost-white\" routerLink=\"/\"><span>AtomiCoconut</span></a>\r\n    \r\n    <span *ngIf=\"!user\" fxLayoutAlign=\" center\">\r\n      <mat-icon routerLink=\"/users/login\" class=\"toolbar__icon\">account_circle</mat-icon>\r\n    </span>\r\n    <span *ngIf=\"user\" fxLayoutAlign=\" center\">\r\n      <img *ngIf=\"user.avatar\" \r\n          [matMenuTriggerFor]=\"userMenu\" \r\n          class=\"toolbar__icon user__avatar\" \r\n          [src]=\"user.avatar\"/>\r\n      <mat-icon *ngIf=\"!user.avatar\"\r\n          class=\"toolbar__icon user__icon--logged-in\" \r\n          [matMenuTriggerFor]=\"userMenu\">\r\n        account_circle\r\n      </mat-icon>\r\n      \r\n      <mat-menu class=\"user__menu--logged-in\" #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <button mat-menu-item routerLink=\"/users/account\">\r\n          <mat-icon>settings</mat-icon>\r\n          <span>My account</span>\r\n        </button>\r\n        <button mat-menu-item routerLink=\"/teams\">\r\n          <mat-icon>group</mat-icon>\r\n          <span>Teams</span>\r\n        </button>\r\n        <button mat-menu-item (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n          <span>Logout</span>\r\n        </button>\r\n      </mat-menu>\r\n    </span>\r\n  </mat-toolbar>\r\n  <div class=\"toolbar__primary__spacer\"><!-- This is a spacer with main toolbar height to avoid any content going behind the toolbar --></div>\r\n\r\n  <mat-toolbar fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"toolbar__secondary\" *ngIf=\"user && user.currency !== 'USD' && currencyExchangeService.currencyRates\">\r\n    <span>Preferred currency is <a class=\"color__almost-white\" routerLink=\"/users/account\" matTooltip=\"Change...\"><strong>{{user.currency}}</strong></a></span>   \r\n    <span>1 USD = {{currencyExchangeService.currencyRates[user.currency]}} {{user.currency}}</span>\r\n  </mat-toolbar>\r\n\r\n  <!-- Main navigator (chips) -->\r\n  <main-navigator></main-navigator>\r\n\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = ".toolbar__primary {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 100; }\n  .toolbar__primary .toolbar__brand-name {\n    text-decoration: none; }\n  .toolbar__primary .toolbar__icon {\n    padding: 0 10px;\n    cursor: pointer; }\n  .toolbar__primary .user__avatar {\n    border-radius: 50%;\n    width: 30px;\n    padding: 0 10px; }\n  .toolbar__primary .user__icon--logged-in {\n    color: #28FE7C; }\n  .toolbar__primary__spacer {\n  height: 54px; }\n  .toolbar__secondary {\n  margin-bottom: 10px;\n  background-color: #9c27b0;\n  font-size: 12px;\n  height: 30px; }\n  /* Chip navigation */\n  ::ng-deep nav.navigation--main {\n  margin-bottom: 20px; }\n  @media screen and (min-width: 600px) {\n  .toolbar__primary__spacer {\n    height: 62px; } }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, appService, usersService, currencyExchangeService) {
        this.router = router;
        this.appService = appService;
        this.usersService = usersService;
        this.currencyExchangeService = currencyExchangeService;
        this.title = 'AtomiCoconut';
        this.user = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
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
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.scss")],
            providers: [main_navigator_service_1.MainNavigatorService]
        }),
        __metadata("design:paramtypes", [router_1.Router, app_service_1.AppService, users_service_1.UsersService, currency_exchange_service_1.CurrencyExchangeService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var animations_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
__webpack_require__("./node_modules/hammerjs/hammer.js");
var app_routing_module_1 = __webpack_require__("./src/app/app.routing.module.ts");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var auth_resolver_service_1 = __webpack_require__("./src/app/auth-resolver.service.ts");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var auth_guard_1 = __webpack_require__("./src/app/auth.guard.ts");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var users_module_1 = __webpack_require__("./src/app/modules/users/users.module.ts");
var teams_module_1 = __webpack_require__("./src/app/modules/teams/teams.module.ts");
var investments_module_1 = __webpack_require__("./src/app/modules/investments/investments.module.ts");
var calculators_module_1 = __webpack_require__("./src/app/modules/calculators/calculators.module.ts");
var welcome_component_1 = __webpack_require__("./src/app/components/welcome/welcome.component.ts");
var shared_module_1 = __webpack_require__("./src/app/modules/shared/shared.module.ts");
var properties_module_1 = __webpack_require__("./src/app/modules/properties/properties.module.ts");
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
                shared_module_1.SharedModule,
                properties_module_1.PropertiesModule
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

/***/ "./src/app/app.routing.module.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var welcome_component_1 = __webpack_require__("./src/app/components/welcome/welcome.component.ts");
var appRoutes = [
    {
        path: 'welcome',
        component: welcome_component_1.WelcomeComponent
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
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

/***/ "./src/app/app.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var snackbar_simple_component_1 = __webpack_require__("./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts");
var ErrorObservable_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/ErrorObservable.js");
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
    AppService.prototype.handleError = function (result) {
        console.error(result);
        return new ErrorObservable_1.ErrorObservable(result.error);
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

/***/ "./src/app/auth-resolver.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("./src/app/modules/users/models/account-personal.ts");
var account_finance_1 = __webpack_require__("./src/app/modules/users/models/account-finance.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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

/***/ "./src/app/auth.guard.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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

/***/ "./src/app/components/welcome/welcome.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\" class=\"container__net-worth\">\r\n  <!-- Net Worth Card -->\r\n  <mat-card *ngIf=\"expectedWealth && user.personalInfo.age\"\r\n      fxLayout=\"column\" class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n      <div class=\"wealth__container\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"none center\" fxLayoutAlign.gt-xs=\"space-between none\">\r\n        <span [class.color__accent]=\"wealthAmount >= expectedWealth\" \r\n            [class.color__red]=\"wealthAmount < expectedWealth\">\r\n          Current net worth is <strong>{{ wealthAmount | currency : 'USD' : 'code' : '1.2-2' }}</strong>\r\n        </span>\r\n        <span class=\"accent\">\r\n          Expected net worth at your age ({{user.personalInfo.age}}) is \r\n          <strong>{{ expectedWealth | currency : 'USD' : 'code' : '1.2-2' }}</strong>\r\n        </span>\r\n      </div>\r\n      <div>\r\n        <mat-progress-bar \r\n          class=\"progress-spinner progress-spinner--wealth\"\r\n          [color]=\"wealthAmount < expectedWealth ? 'warn' : 'accent'\"\r\n          [value]=\"progressBarWealthValue\"\r\n          mode=\"determinate\">\r\n        </mat-progress-bar>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n    <!-- EOF Net Worth Card -->\r\n\r\n  <!-- Net Worth Card when Personal and Financial info is incomplete -->\r\n  <mat-card *ngIf=\"!user.financialInfo || !user.personalInfo\"\r\n      fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>\r\n        <a class=\"color__almost-white\" routerLink=\"/users/account\">\r\n          <mat-icon class=\"icon--arrow_forward\">arrow_forward</mat-icon>\r\n          Go to your account and complete your Personal and Financial Info to see expected and current Net Worth\r\n        </a>\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <!-- EOF Net Worth Card when Personal and Financial info is incomplete -->\r\n</div>"

/***/ }),

/***/ "./src/app/components/welcome/welcome.component.scss":
/***/ (function(module, exports) {

module.exports = ".container__net-worth {\n  margin-bottom: 10px; }\n  .container__net-worth .icon--arrow_forward {\n    float: left; }\n"

/***/ }),

/***/ "./src/app/components/welcome/welcome.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("./src/app/modules/users/models/account-personal.ts");
var account_finance_1 = __webpack_require__("./src/app/modules/users/models/account-finance.ts");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var currencyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/currencyInvestment.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var of_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
var constants_1 = __webpack_require__("./src/app/constants.ts");
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
            { displayName: 'Properties', url: '/properties', selected: false },
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
            template: __webpack_require__("./src/app/components/welcome/welcome.component.html"),
            styles: [__webpack_require__("./src/app/components/welcome/welcome.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, users_service_1.UsersService, app_service_1.AppService,
            investments_service_1.InvestmentsService, currency_exchange_service_1.CurrencyExchangeService])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;


/***/ }),

/***/ "./src/app/constants.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyTypes = {
    HOUSE: 'house'
};
exports.houseBuildingTypes = {
    HOUSE: 'house',
    APARTMENT: 'apartment',
    UNIT: 'unit'
};
exports.nzHouseTitleTypes = {
    FEE_SIMPLE: 'feeSimple',
    CROSS_LEASE: 'crossLease',
    LEASE_HOLD: 'leaseHold'
};
exports.INVESTMENTS_TYPES = {
    CURRENCY: 'currency',
    CRYPTO: 'crypto',
    PROPERTY: 'property'
};


/***/ }),

/***/ "./src/app/modules/calculators/calculators-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var equity_component_1 = __webpack_require__("./src/app/modules/calculators/components/equity/equity.component.ts");
var calculators_dashboard_component_1 = __webpack_require__("./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var house_figures_component_1 = __webpack_require__("./src/app/modules/calculators/components/house-figures/house-figures.component.ts");
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

/***/ "./src/app/modules/calculators/calculators.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("./src/app/modules/shared/shared.module.ts");
var calculators_routing_module_1 = __webpack_require__("./src/app/modules/calculators/calculators-routing.module.ts");
var equity_component_1 = __webpack_require__("./src/app/modules/calculators/components/equity/equity.component.ts");
var calculators_dashboard_component_1 = __webpack_require__("./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var house_figures_component_1 = __webpack_require__("./src/app/modules/calculators/components/house-figures/house-figures.component.ts");
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

/***/ "./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
            template: __webpack_require__("./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.html"),
            styles: [__webpack_require__("./src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], CalculatorsDashboardComponent);
    return CalculatorsDashboardComponent;
}());
exports.CalculatorsDashboardComponent = CalculatorsDashboardComponent;


/***/ }),

/***/ "./src/app/modules/calculators/components/equity/equity.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"calculator__container\" fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-sm=\"space-between none\">\r\n  <!--  form  -->\r\n  <form class=\"form__container form__equity-calc\" #equityForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n    <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Purchase price -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"purchasePrice\" name=\"purchasePrice\" placeholder=\"Purchase price\" \r\n                [(ngModel)]=\"model.purchasePrice\" \r\n                numberValidator\r\n                [value]=\"model.purchasePrice\"\r\n                #purchasePrice=\"ngModel\">\r\n            \r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"purchasePrice.invalid && (purchasePrice.dirty || purchasePrice.touched) && purchasePrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n          \r\n          <!-- Market value -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\" \r\n                [(ngModel)]=\"model.marketValue\" \r\n                numberValidator\r\n                [value]=\"model.marketValue\"\r\n                #marketValue=\"ngModel\">\r\n            \r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Loan coverage -->\r\n          <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field slider__field\">\r\n            <label class=\"slider__label\">Loan coverage</label>\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n              <mat-slider fxFlex id=\"loanCoverage\" name=\"loanCoverage\"\r\n                  color=\"accent\"\r\n                  [max]=\"100\"\r\n                  [min]=\"0\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.loanCoverage\"\r\n                  [value]=\"model.loanCoverage\"> \r\n              </mat-slider>\r\n              <span *ngIf=\"model.loanCoverage\">{{model.loanCoverage}}%</span>\r\n            </div>\r\n            <label class=\"mat-hint slider__label__hint\">Percentage of the purchase price covered by the loan.</label>\r\n          </div>\r\n\r\n          <!-- Savings -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"savings\" name=\"savings\" placeholder=\"Savings\" \r\n                [(ngModel)]=\"model.savings\" \r\n                numberValidator\r\n                [value]=\"model.savings\"\r\n                #savings=\"ngModel\">\r\n\r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"savings.invalid && (savings.dirty || savings.touched) && savings.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n           <!-- Renovation cost -->\r\n           <mat-form-field fxFlex  class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\" \r\n                  [(ngModel)]=\"model.renovationCost\" \r\n                  [value]=\"model.renovationCost\"\r\n                  numberValidator\r\n                  #renovationCost=\"ngModel\">\r\n  \r\n                  <mat-icon matPrefix>attach_money</mat-icon>\r\n                  <mat-hint align=\"start\">The cost to do all the renovations.</mat-hint>\r\n                  <mat-error *ngIf=\"renovationCost.invalid && (renovationCost.dirty || renovationCost.touched) && renovationCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n\r\n            <!-- Loan amount paid -->\r\n            <mat-form-field fxFlex  class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"loanAmountPaid\" name=\"loanAmountPaid\" placeholder=\"Loan amount paid\" \r\n                  [(ngModel)]=\"model.loanAmountPaid\" \r\n                  [value]=\"model.loanAmountPaid\"\r\n                  numberValidator\r\n                  #loanAmountPaid=\"ngModel\">\r\n  \r\n                  <mat-icon matPrefix>attach_money</mat-icon>\r\n                  <mat-hint align=\"start\">The amount of money paid back to the lender.</mat-hint>\r\n                  <mat-error *ngIf=\"loanAmountPaid.invalid && (loanAmountPaid.dirty || loanAmountPaid.touched) && loanAmountPaid.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Second loan coverage -->\r\n          <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field slider__field\">\r\n            <label class=\"slider__label\">Second loan coverage</label>\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n              <mat-slider fxFlex id=\"secondLoanCoverage\" name=\"secondLoanCoverage\"\r\n                  color=\"accent\"\r\n                  [max]=\"100\"\r\n                  [min]=\"0\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.secondLoanCoverage\"\r\n                  [value]=\"model.secondLoanCoverage\"> \r\n              </mat-slider>\r\n              <span *ngIf=\"model.secondLoanCoverage\">{{model.secondLoanCoverage}}%</span>\r\n            </div>\r\n            <label class=\"mat-hint slider__label__hint\">Percentage of the purchase price of a new property covered by a second loan.</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </form>\r\n\r\n  <!-- Results -->\r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" fxFlex fxFlex.gt-sm=\"300px\" class=\"calculator__results\">\r\n    <mat-card>\r\n      <mat-card-title class=\"mat-card-title--ac\">Results</mat-card-title>\r\n\r\n      <mat-card-content fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Loan amount\"></info-tooltip>\r\n            <span>{{loanAmount | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Deposit amount\"></info-tooltip>\r\n            <span>{{depositAmount | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Discount\"></info-tooltip>\r\n            <span>{{discount | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Equity\"></info-tooltip>\r\n            <span>{{equity | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Usable equity\"></info-tooltip>\r\n            <span>{{usableEquity | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Purchase capacity\"\r\n                text=\"Maximum purchase capacity based on the usable equity and the second loan coverage.\"></info-tooltip>\r\n            <span>{{purchaseCapacity | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n        </div>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/calculators/components/equity/equity.component.scss":
/***/ (function(module, exports) {

module.exports = ".calculator__container .form__field.slider__field .slider__label__hint {\n  font-size: 75%; }\n"

/***/ }),

/***/ "./src/app/modules/calculators/components/equity/equity.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var EquityComponent = /** @class */ (function () {
    function EquityComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
        this.loanAmount = 0;
        this.discount = 0;
        this.equity = 0;
        this.depositAmount = 0;
        this.usableEquity = 0;
        this.purchaseCapacity = 0;
        this.model = {
            purchasePrice: 0,
            marketValue: 0,
            loanCoverage: 80,
            savings: 0,
            renovationCost: 0,
            loanAmountPaid: 0,
            secondLoanCoverage: 65
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
            _this.loanAmount = values.purchasePrice * (values.loanCoverage / 100);
            _this.discount = values.marketValue - values.purchasePrice - values.renovationCost;
            _this.depositAmount = values.purchasePrice - _this.loanAmount;
            _this.equity = values.savings + _this.discount + _this.depositAmount;
            _this.usableEquity = values.marketValue * (_this.model.loanCoverage / 100) - _this.loanAmount + values.loanAmountPaid + values.savings;
            _this.purchaseCapacity = (_this.usableEquity * 100) / (100 - values.secondLoanCoverage);
        });
    };
    __decorate([
        core_1.ViewChild('equityForm'),
        __metadata("design:type", Object)
    ], EquityComponent.prototype, "form", void 0);
    EquityComponent = __decorate([
        core_1.Component({
            selector: 'app-equity',
            template: __webpack_require__("./src/app/modules/calculators/components/equity/equity.component.html"),
            styles: [__webpack_require__("./src/app/modules/calculators/components/equity/equity.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], EquityComponent);
    return EquityComponent;
}());
exports.EquityComponent = EquityComponent;


/***/ }),

/***/ "./src/app/modules/calculators/components/house-figures/house-figures.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"calculator__container\" fxLayout=\"column\" fxLayout.gt-sm=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-sm=\"space-between none\">\r\n  <!-- Form  -->\r\n  <form class=\"form__container form__house-figures-calc\" #houseFiguresForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n    <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Property value</p>\r\n        </h3>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Purchase price -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"purchasePrice\" name=\"purchasePrice\" placeholder=\"Purchase price\" \r\n                [(ngModel)]=\"model.purchasePrice\" \r\n                numberValidator\r\n                [value]=\"model.purchasePrice\"\r\n                #purchasePrice=\"ngModel\">\r\n            \r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"purchasePrice.invalid && (purchasePrice.dirty || purchasePrice.touched) && purchasePrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n          \r\n          <!-- Market value -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\" \r\n                [(ngModel)]=\"model.marketValue\" \r\n                numberValidator\r\n                [value]=\"model.marketValue\"\r\n                #marketValue=\"ngModel\">\r\n\r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Capital growth -->\r\n          <mat-form-field fxFlex fxFlex.sm=\"140px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"capitalGrowth\" name=\"capitalGrowth\" placeholder=\"Capital growth\" \r\n                [(ngModel)]=\"model.capitalGrowth\" \r\n                [value]=\"model.capitalGrowth\"\r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                #capitalGrowth=\"ngModel\">\r\n            \r\n            <mat-icon matPrefix>trending_up</mat-icon>\r\n            <span matSuffix>%</span>\r\n            <mat-hint align=\"start\">Annual capital growth percentage for owning the property.</mat-hint>\r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n  \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Loan figures</p>\r\n        </h3>\r\n      \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Loan coverage -->\r\n          <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field slider__field\">\r\n            <label class=\"slider__label\">Loan coverage</label>\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n              <mat-slider fxFlex id=\"loanCoverage\" name=\"loanCoverage\"\r\n                  color=\"accent\"\r\n                  [max]=\"100\"\r\n                  [min]=\"0\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.loanCoverage\"\r\n                  [value]=\"model.loanCoverage\"> \r\n              </mat-slider>\r\n              <span *ngIf=\"model.loanCoverage\">{{model.loanCoverage}}%</span>\r\n            </div>\r\n            <label class=\"mat-hint slider__label__hint\">Percentage of the purchase price covered by the loan.</label>\r\n          </div>\r\n  \r\n          <!-- Interest rates -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"interestRates\" name=\"interestRates\" placeholder=\"Interest rates\" \r\n                [(ngModel)]=\"model.interestRates\" \r\n                numberValidator='{\"min\": 0, \"max\": 100}' \r\n                [value]=\"model.interestRates\"\r\n                #interestRates=\"ngModel\">\r\n\r\n            <mat-icon matPrefix>timeline</mat-icon>\r\n            <span matSuffix>%</span>\r\n            <mat-hint align=\"start\">Average loan interest rates (as a percentage).</mat-hint>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n            <mat-error *ngIf=\"interestRates.invalid && (interestRates.dirty || interestRates.touched) && interestRates.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Loan term -->\r\n          <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field slider__field\">\r\n            <label class=\"slider__label\">Term</label>\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n              <mat-slider fxFlex id=\"loanTerm\" name=\"loanTerm\"\r\n                  color=\"accent\"\r\n                  [max]=\"30\"\r\n                  [min]=\"1\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.loanTerm\"\r\n                  [value]=\"model.loanTerm\"> \r\n              </mat-slider>\r\n              <span *ngIf=\"model.loanTerm\">{{model.loanTerm}} years</span>\r\n            </div>\r\n          </div>\r\n\r\n          <!-- Payment frecuency -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <mat-select id=\"paymentFrecuency\" name=\"paymentFrecuency\" placeholder=\"Frecuency\" \r\n                [(ngModel)]=\"model.paymentFrecuency\" [value]=\"model.paymentFrecuency\">\r\n              <mat-option value=\"12\">Monthly</mat-option>\r\n              <mat-option value=\"26\">Fornightly</mat-option>\r\n              <mat-option value=\"52\">Weekly</mat-option>\r\n            </mat-select>\r\n            \r\n            <mat-hint align=\"start\">Payment frecuency</mat-hint>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n  \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Rent figures</p>\r\n        </h3>\r\n      \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Weekly rent -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"weeklyRent\" name=\"weeklyRent\" placeholder=\"Weekly rent\" \r\n                [(ngModel)]=\"model.weeklyRent\" \r\n                numberValidator\r\n                [value]=\"model.weeklyRent\"\r\n                #weeklyRent=\"ngModel\">\r\n  \r\n            <mat-icon matPrefix>attach_money</mat-icon>\r\n            <mat-error *ngIf=\"weeklyRent.invalid && (weeklyRent.dirty || weeklyRent.touched) && weeklyRent.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Vacancy -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"vacancy\" name=\"vacancy\" placeholder=\"Vacancy\" \r\n                [(ngModel)]=\"model.vacancy\" \r\n                numberValidator\r\n                [value]=\"model.vacancy\"\r\n                #vacancy=\"ngModel\">\r\n  \r\n            <mat-hint align=\"start\">The number of weeks per year with no rent.</mat-hint>\r\n            <mat-error *ngIf=\"vacancy.invalid && (vacancy.dirty || vacancy.touched) && vacancy.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Rental manager -->\r\n          <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field slider__field\">\r\n            <label class=\"slider__label\">Manager rate</label>\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n              <mat-slider fxFlex id=\"managed\" name=\"managed\"\r\n                  color=\"accent\"\r\n                  [max]=\"20\"\r\n                  [min]=\"0\"\r\n                  [step]=\"1\"\r\n                  [thumb-label]=\"true\"\r\n                  [tick-interval]=\"1\"\r\n                  [(ngModel)]=\"model.managed\"\r\n                  [value]=\"model.managed\"> \r\n              </mat-slider>\r\n              <span *ngIf=\"model.managed\">{{model.managed}}%</span>\r\n            </div>\r\n            <label class=\"mat-hint slider__label__hint\">Rental manager charge as a percentage of net annual rental income.</label>\r\n          </div>\r\n        </div>\r\n      </div>\r\n        \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Expenses</p>\r\n        </h3>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Renovation cost -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\" \r\n                [(ngModel)]=\"model.renovationCost\" \r\n                [value]=\"model.renovationCost\"\r\n                numberValidator\r\n                #renovationCost=\"ngModel\">\r\n\r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-hint align=\"start\">The cost to do all the renovations.</mat-hint>\r\n                <mat-error *ngIf=\"renovationCost.invalid && (renovationCost.dirty || renovationCost.touched) && renovationCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Mantainance cost -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"mantainanceCost\" name=\"mantainanceCost\" placeholder=\"Mantainance cost\" \r\n                [(ngModel)]=\"model.mantainanceCost\" \r\n                [value]=\"model.mantainanceCost\"\r\n                numberValidator\r\n                #mantainanceCost=\"ngModel\">\r\n\r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-hint align=\"start\">The annual cost to maintain the property.</mat-hint>\r\n                <mat-error *ngIf=\"mantainanceCost.invalid && (mantainanceCost.dirty || mantainanceCost.touched) && mantainanceCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Body corporate -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"bodyCorporate\" name=\"bodyCorporate\" placeholder=\"Body corporate\" \r\n                [(ngModel)]=\"model.bodyCorporate\" \r\n                [value]=\"model.bodyCorporate\"\r\n                numberValidator\r\n                #bodyCorporate=\"ngModel\">\r\n  \r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-error *ngIf=\"bodyCorporate.invalid && (bodyCorporate.dirty || bodyCorporate.touched) && bodyCorporate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- House rates -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"houseRates\" name=\"houseRates\" placeholder=\"House rates\" \r\n                [(ngModel)]=\"model.houseRates\" \r\n                [value]=\"model.houseRates\"\r\n                numberValidator\r\n                #houseRates=\"ngModel\">\r\n  \r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-error *ngIf=\"houseRates.invalid && (houseRates.dirty || houseRates.touched) && houseRates.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- utilities -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"utilities\" name=\"utilities\" placeholder=\"Utitities\" \r\n                [(ngModel)]=\"model.utilities\" \r\n                [value]=\"model.utilities\"\r\n                numberValidator\r\n                #utilities=\"ngModel\">\r\n  \r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-hint align=\"start\">Gas, water, electricity, internet, etc..</mat-hint>\r\n                <mat-error *ngIf=\"utilities.invalid && (utilities.dirty || utilities.touched) && utilities.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Insurance -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"insurance\" name=\"insurance\" placeholder=\"Insurances\" \r\n                [(ngModel)]=\"model.insurance\" \r\n                [value]=\"model.insurance\"\r\n                numberValidator\r\n                #insurance=\"ngModel\">\r\n\r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-error *ngIf=\"insurance.invalid && (insurance.dirty || insurance.touched) && insurance.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Other costs -->\r\n          <mat-form-field fxFlex  class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"otherCosts\" name=\"otherCosts\" placeholder=\"Other costs\" \r\n                [(ngModel)]=\"model.otherCosts\" \r\n                [value]=\"model.otherCosts\"\r\n                numberValidator\r\n                #otherCosts=\"ngModel\">\r\n\r\n                <mat-icon matPrefix>attach_money</mat-icon>\r\n                <mat-hint align=\"start\">Any other cost to have in mind not declared in the previous fields.</mat-hint>\r\n                <mat-error *ngIf=\"otherCosts.invalid && (otherCosts.dirty || otherCosts.touched) && otherCosts.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </form>\r\n  \r\n  <!-- Results -->\r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" fxFlex fxFlex.gt-sm=\"300px\" class=\"calculator__results\">\r\n    <mat-card>\r\n      <mat-card-title class=\"mat-card-title--ac\">Results</mat-card-title>\r\n\r\n      <mat-card-content fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip\r\n                title=\"Gross yield\" \r\n                text=\"Ratio between Gross annual rent / purchase price (as percentage)\"\r\n                position=\"right\"></info-tooltip>\r\n            <span>{{grossYield | percent : '1.1-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip \r\n                title=\"Net yield\" \r\n                text=\"Ratio between (Net annual rent - Expenses) / Purchase price * 100\"\r\n                position=\"right\"></info-tooltip>\r\n            <span>{{netYield | percent : '1.1-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n        \r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Gross annual rent\" text=\"Rent a week * 52\"></info-tooltip>\r\n            <span>{{grossAnnualRent | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n  \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Net annual rent\" text=\"Gross annual rent - Vacancy\"></info-tooltip>\r\n            <span>{{netAnnualRent | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n        \r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Loan interest\" \r\n                text=\"The interest of the loan based in the specified interest rate.\"\r\n                position=\"right\"></info-tooltip>\r\n            <span>{{loanInterest | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Loan repayments\" text=\"{{loanRepaymentsLabels[model.paymentFrecuency]}}\"></info-tooltip>\r\n            <span>{{loanRepayments | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Pre tax cashflow\" text=\"Net annual rent - Expenses - Loan interest\"></info-tooltip>\r\n            <span>{{preTaxCashflow | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Discount\"></info-tooltip>\r\n            <span>{{discount | percent : '1.1-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Total 1 year return\" text=\"Capital growth + Market value - Purchase price - Renovations + Pre tax cashflow\"></info-tooltip>\r\n            <span>{{totalFirstYearReturn | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Deposit\" text=\"\"></info-tooltip>\r\n            <span>{{deposit | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Return on deposit\" text=\"Ratio between Total 1st year return / Deposit * 100\"></info-tooltip>\r\n            <span>{{returnOnDeposit | percent : '1.1-2'}}</span>\r\n          </div>\r\n          \r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Capital growth\" text=\"\"></info-tooltip>\r\n            <span>{{capitalGrowths | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout.xs=\"column\" fxLayout.gt-xs=\"row\" fxLayout.gt-sm=\"column\" \r\n            fxLayoutGap.xs=\"10px\"fxLayoutGap.gt-xs=\"50px\" fxLayoutGap.gt-sm=\"10px\"\r\n            fxLayoutAlign.xs=\"start none\" fxLayoutAlign.gt-xs=\"space-between none\" fxLayoutAlign.gt-sm=\"start none\">\r\n\r\n          <div fxFlex.xs=\"none\" fxFlex.gt-xs fxFlex.gt-sm=\"none\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\r\n            <info-tooltip title=\"Expenses\" text=\"Sums all the expenses in detailed before\"></info-tooltip>\r\n            <span>{{expenses | currency : 'USD' : 'symbol' : '1.2-2'}}</span>\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/calculators/components/house-figures/house-figures.component.scss":
/***/ (function(module, exports) {

module.exports = ".calculator__container .form__field.slider__field .slider__label__hint {\n  font-size: 75%; }\n\n.calculator__container .slider__label {\n  display: block;\n  font-size: 10px; }\n"

/***/ }),

/***/ "./src/app/modules/calculators/components/house-figures/house-figures.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var HouseFiguresComponent = /** @class */ (function () {
    function HouseFiguresComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
        this.grossAnnualRent = 0;
        this.netAnnualRent = 0;
        this.grossYield = 0;
        this.netYield = 0;
        this.expenses = 0;
        this.loanInterest = 0;
        this.loanRepayments = 0;
        this.loanRepaymentsLabels = { '12': 'Monthly', '26': 'Fortnightly', '52': 'Weekly' };
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
            paymentFrecuency: "26",
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
            var numberOfPayments = _this.model.loanTerm * parseInt(_this.model.paymentFrecuency);
            var periodicInterestRate = (_this.model.interestRates / 100) / parseInt(_this.model.paymentFrecuency);
            var loanDiscountFactor = (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1) / (periodicInterestRate * Math.pow(1 + periodicInterestRate, numberOfPayments));
            _this.loanRepayments = (_this.model.purchasePrice * (_this.model.loanCoverage / 100)) / loanDiscountFactor;
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
            template: __webpack_require__("./src/app/modules/calculators/components/house-figures/house-figures.component.html"),
            styles: [__webpack_require__("./src/app/modules/calculators/components/house-figures/house-figures.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService])
    ], HouseFiguresComponent);
    return HouseFiguresComponent;
}());
exports.HouseFiguresComponent = HouseFiguresComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__edit-currency-investment\" #editCurrencyInvestmentForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">  \r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <currency-unit fxFlex fxFlex.gt-xs=\"200px\"\r\n            [id]=\"'currencyInvestmentUnit'\" \r\n            [value]=\"model.unit\"\r\n            [type]=\"model.type\"\r\n            [hint]=\"'Choose the desired currency to invest on...'\"\r\n            [placeHolder]=\"'Desired currency'\"\r\n            (newValue)=\"onCurrencyUnitChange($event)\">\r\n        </currency-unit>\r\n\r\n        <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"amount\" name=\"amount\" placeholder=\"Amount\"\r\n              [(ngModel)]=\"model.amount\" \r\n              [value]=\"model.amount\"\r\n              numberValidator='{\"maxFractionDigits\": 8}' \r\n              required\r\n              #amount=\"ngModel\">\r\n          <mat-hint align=\"start\">Set the buying amount.</mat-hint>\r\n          <mat-error *ngIf=\"amount.invalid && (amount.dirty || amount.touched) && amount.errors.required\">Amount is required.</mat-error>\r\n          <mat-error *ngIf=\"amount.invalid && (amount.dirty || amount.touched) && amount.errors.numberValidator\">Value must be numeric, with no more than 8 decimal digits</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Buying date -->\r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"100px\" class=\"form__field\">\r\n          <input placeholder=\"Buying date\"\r\n              id=\"buyingDate\"\r\n              name=\"buyingDate\"\r\n              readonly\r\n              required\r\n              #buyingDate=\"ngModel\"\r\n              matInput \r\n              [(ngModel)]=\"model.buyingDate\" \r\n              [matDatepicker]=\"pickerBuyingDate\"\r\n              (click)=\"pickerBuyingDate.open()\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"pickerBuyingDate\"></mat-datepicker-toggle>\r\n          <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBuyingDate></mat-datepicker>\r\n          <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.required\">Buying date is required.</mat-error>\r\n          <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.matDatepickerParse\">Buying date is invalid or not follows the pattern \"mm/dd/yyyy\"</mat-error>\r\n        </mat-form-field>\r\n\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <!-- Buying price unit -->\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'buyingPriceUnit'\" \r\n              [view]=\"'narrow'\"\r\n              [value]=\"model.buyingPriceUnit\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n\r\n          <!-- Buying price -->\r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"buyingPrice\" name=\"buyingPrice\" placeholder=\"Price\"\r\n                [(ngModel)]=\"model.buyingPrice\" \r\n                [value]=\"model.buyingPrice\"\r\n                numberValidator \r\n                required\r\n                #buyingPrice=\"ngModel\">\r\n            <mat-hint align=\"start\">Price on buying date.</mat-hint>\r\n            <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.required\">Buying price is required.</mat-error>\r\n            <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        \r\n      </div>\r\n    </div>\r\n  </section>\r\n</form>"

/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
            template: __webpack_require__("./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.scss")]
        }),
        __metadata("design:paramtypes", [material_1.DateAdapter, app_service_1.AppService,
            util_service_1.UtilService])
    ], CurrencyInvestmentFormComponent);
    return CurrencyInvestmentFormComponent;
}());
exports.CurrencyInvestmentFormComponent = CurrencyInvestmentFormComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment/currency-investment.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"currency-card\">\r\n  <mat-card-header>\r\n    <div mat-card-avatar class=\"header-image\">\r\n        <img [src]=\"'/assets/images/' + investment.type + '/' + investment.unit + '.png'\" [alt]=\"investment.type\" />\r\n    </div>\r\n    <mat-card-title>{{investment.unit}} ({{investment.amount}})</mat-card-title>\r\n    <mat-card-subtitle>\r\n      today at <strong>{{currentPrice | currency : 'USD' : 'code' : '1.2-2'}}</strong>\r\n    </mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content class=\"card__content\">\r\n    Investment: <strong>{{investmentAmount | currency : 'USD' : 'code' : '1.2-2' }}</strong> \r\n    <br>\r\n\r\n    on {{investment.buyingDate | date}} at {{ buyingPrice | currency : 'USD' : 'code' : '1.2-2' }}\r\n\r\n    <div [class.color__accent]=\"investmentReturn >= investmentValueWhenBought\" \r\n        [class.color__red]=\"investmentReturn < investmentValueWhenBought\">\r\n      <br>\r\n      ROI: <strong>{{ investmentReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{investmentReturn / investmentValueWhenBought * 100 | number : '1.1-2'}}%)\r\n    </div>\r\n\r\n    <!-- Team -->\r\n    <mat-expansion-panel *ngIf=\"team\" class=\"team-panel\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-panel__content\">\r\n\r\n        <section class=\"members\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n          <div *ngFor=\"let portion of investmentDistribution\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"portion.member.avatar\"/>\r\n            <div fxFlex class=\"member__info\" fxLayout=\"column\">\r\n              <p class=\"member__name\">{{portion.member.name}}</p>\r\n              <!-- <p class=\"member__email\">{{member.email}}</p> -->\r\n              <div class=\"member__money\" fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-between end\">\r\n                <p>{{ portion.percentage }}%</p>\r\n                <p>{{ portion.money | currency : 'USD' : 'code' : '1.2-2' }}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team -->\r\n\r\n    <section class=\"card__actions\" fxLayout=\"row\" fxLayoutAlign=\"end none\" fxLayoutGap=\"10px\">\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab routerLink=\"/investments/crypto/edit/{{investment.id}}\" color=\"primary\" (click)=\"actionRunning = true\">\r\n        <mat-icon aria-label=\"Edit Investment\">edit</mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab color=\"warn\" (click)=\"openDeleteDialog()\">\r\n        <mat-icon aria-label=\"Delete investment\">delete</mat-icon>\r\n      </button>\r\n\r\n      <mat-progress-spinner *ngIf=\"actionRunning\"\r\n        class=\"progress-spinner progress-spinner--action\"\r\n        color=\"warn\"\r\n        [diameter]=\"40\" [strokeWidth]=\"7\"\r\n        mode=\"indeterminate\">\r\n      </mat-progress-spinner>\r\n    </section>\r\n  </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment/currency-investment.component.scss":
/***/ (function(module, exports) {

module.exports = ".currency-card {\n  text-align: left; }\n  .currency-card .header-image img {\n    width: 40px; }\n  .currency-card .card__content {\n    text-align: center; }\n  .currency-card .card__content .team-panel {\n      cursor: default;\n      margin-top: 10px; }\n  .currency-card .card__content .team-panel mat-panel-title {\n        font-size: 18px; }\n  .currency-card .card__content .team-panel .team-panel__content {\n        text-align: left; }\n  .currency-card .card__content .team-panel .team-panel__content .members .member .member__avatar {\n          border-radius: 50%;\n          width: 40px;\n          height: 40px;\n          padding: 0 10px 0 0; }\n  .currency-card .card__content .team-panel .team-panel__content .members .member .member__info .member__email {\n          font-size: 11px; }\n  .currency-card .card__content .card__actions {\n      margin: 10px 0 0; }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/currency-investment/currency-investment.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var yes_no_dialog_component_1 = __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var currencyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/currencyInvestment.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var constants_1 = __webpack_require__("./src/app/constants.ts");
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
        if (this.investment.type === constants_1.INVESTMENTS_TYPES.CRYPTO) {
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
            template: __webpack_require__("./src/app/modules/investments/components/currency-investment/currency-investment.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/currency-investment/currency-investment.component.scss")]
        }),
        __metadata("design:paramtypes", [currency_exchange_service_1.CurrencyExchangeService, app_service_1.AppService, users_service_1.UsersService, investments_service_1.InvestmentsService,
            material_1.MatDialog, router_1.Router])
    ], CurrencyInvestmentComponent);
    return CurrencyInvestmentComponent;
}());
exports.CurrencyInvestmentComponent = CurrencyInvestmentComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Create investment</h2>\r\n\r\n<mat-dialog-content>\r\n  <mat-button-toggle-group fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" class=\"selector__investment-type\" (change)=\"onChange($event)\" #investmentTypesGroup>\r\n    <mat-button-toggle class=\"option__investment-type\" value=\"currency\" matTooltip=\"Currency exchange\" routerLink=\"investments/currency/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/exchange.png\" alt=\"currency\" />\r\n    </mat-button-toggle>\r\n    <mat-button-toggle class=\"option__investment-type\" value=\"cryptocurrency\" matTooltip=\"Crypto currency\" routerLink=\"investments/crypto/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/cryptocurrency.png\" alt=\"Crypto currency\" />\r\n    </mat-button-toggle>\r\n    <mat-button-toggle class=\"option__investment-type\" value=\"property\" matTooltip=\"Property\" routerLink=\"investments/property/create\"\r\n        [matTooltipPosition]=\"utilService.isXs() ? 'right' : 'below'\">\r\n      <img src=\"/assets/images/house.png\" alt=\"Property\" />\r\n    </mat-button-toggle>\r\n  </mat-button-toggle-group>\r\n</mat-dialog-content>\r\n"

/***/ }),

/***/ "./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = ":host {\n  text-align: center; }\n  :host .selector__investment-type .option__investment-type {\n    padding: 10px; }\n  :host .selector__investment-type .option__investment-type img {\n      width: 50px; }\n  @media screen and (min-width: 600px) {\n    :host .selector__investment-type .option__investment-type img {\n      width: 90px; } }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
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
            template: __webpack_require__("./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, util_service_1.UtilService])
    ], InvestmentSelectorDialogComponent);
    return InvestmentSelectorDialogComponent;
}());
exports.InvestmentSelectorDialogComponent = InvestmentSelectorDialogComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__investments\">\r\n  <section *ngIf=\"!getInvestmentsServiceRunning && investments.length > 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    \r\n    <div *ngFor=\"let row of investmentsUI\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\">\r\n      <div *ngFor=\"let investment of row\" fxFlex fxFlex.gt-xs=\"50\">\r\n        <currency-investment *ngIf=\"investment.type === INVESTMENTS_TYPES.CURRENCY || investment.type === INVESTMENTS_TYPES.CRYPTO\"\r\n          [investment]=\"investment\"\r\n          [teams]=\"teams\"\r\n          (totalReturns)=\"setTotals($event)\"\r\n          (deletedId)=\"removeInvestment($event)\">\r\n        </currency-investment>\r\n\r\n        <property-investment *ngIf=\"investment.type === INVESTMENTS_TYPES.PROPERTY\"\r\n          [investment]=\"investment\"\r\n          [teams]=\"teams\"\r\n          (totalReturns)=\"setTotals($event)\"\r\n          (deletedId)=\"removeInvestment($event)\">\r\n        </property-investment>\r\n      </div>\r\n      \r\n    </div>\r\n\r\n    <mat-card fxFlex class=\"totals__card\">\r\n      <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"20px\">\r\n        <!-- Totals -->\r\n        <div *ngIf=\"!myTotals.checked\" fxFlex fxFlex.xs=\"none\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n          <p>Total investments: <strong>{{totalInvestment | currency : 'USD' : 'code' : '1.2-2' }}</strong></p>\r\n          <p [class.color__accent]=\"totalReturn >= totalInvestment\" \r\n              [class.color__red]=\"totalReturn < totalInvestment\">\r\n            Total ROI: <strong>{{ totalReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n          </p>\r\n        </div>\r\n\r\n        <!-- My totals -->\r\n        <div *ngIf=\"myTotals.checked\" fxFlex fxFlex.xs=\"none\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n          <p>My total investments: <strong>{{myTotalInvestment | currency : 'USD' : 'code' : '1.2-2' }}</strong></p>\r\n          <p [class.color__accent]=\"myTotalReturn >= myTotalInvestment\" \r\n              [class.color__red]=\"myTotalReturn < myTotalInvestment\">\r\n            My total ROI: <strong>{{ myTotalReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{myTotalReturn / myTotalInvestment * 100 | number : '1.1-2'}}%)\r\n          </p>\r\n        </div>\r\n\r\n        <!-- Totals switcher -->\r\n        <mat-slide-toggle fxFlexAlign.xs=\"center\" color=\"accent\" class=\"form__field form__field__toogle\" [checked]=\"false\" #myTotals>\r\n          My totals\r\n        </mat-slide-toggle>\r\n\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n  </section>\r\n\r\n  <section *ngIf=\"!getInvestmentsServiceRunning && investments.length == 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <mat-card fxFlex class=\"no-investments__card\">\r\n      <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n          fxLayoutAlign=\"space-around center\">\r\n        <p> You do not have investments yet.</p>\r\n      </mat-card-content>\r\n    </mat-card>\r\n    \r\n  </section>\r\n\r\n  <mat-progress-bar *ngIf=\"getInvestmentsServiceRunning\"\r\n    fxFlexAlign=\"center\"\r\n    class=\"progress-bar progress-bar--get-investments\"\r\n    color=\"primary\"\r\n    mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\" class=\"actions\">\r\n    <button mat-fab class=\"fab mat-elevation-z10\" color=\"accent\" matTooltip=\"Create new investment\" matTooltipPosition=\"left\" (click)=\"openNewInvestmentDialog()\">\r\n      <mat-icon aria-label=\"Create new investemt\">add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = ".totals__card, .no-investments__card {\n  text-align: center; }\n  .totals__card md-card-content p, .no-investments__card md-card-content p {\n    margin-bottom: 0; }\n  .progress-bar--get-investments {\n  width: 100%; }\n  @media screen and (min-width: 600px) {\n  .progress-bar--get-investments {\n    width: 300px; } }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var investment_selector_dialog_component_1 = __webpack_require__("./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var teams_service_1 = __webpack_require__("./src/app/modules/teams/teams.service.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
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
        this.INVESTMENTS_TYPES = constants_1.INVESTMENTS_TYPES; //make it available in the view
    }
    InvestmentsDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: null, selected: true },
            { displayName: 'Properties', url: '/properties', selected: false }
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
            template: __webpack_require__("./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, users_service_1.UsersService, material_1.MatDialog,
            app_service_1.AppService, teams_service_1.TeamsService, investments_service_1.InvestmentsService, currency_exchange_service_1.CurrencyExchangeService])
    ], InvestmentsDashboardComponent);
    return InvestmentsDashboardComponent;
}());
exports.InvestmentsDashboardComponent = InvestmentsDashboardComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/investments-edit/investments-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container__edit-investment\" fxLayout=\"column\" fxLayoutAlign=\"none none\" fxLayout.gt-xs=\"row\" fxLayoutAlign.gt-xs=\"center none\" fxLayoutGap=\"10px\">\r\n  <form class=\"form__container form__edit-investment\" (ngSubmit)=\"editMode ? onUpdate() : onSubmit()\" #editInvestmentForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <div *ngIf=\"!getInvestmentServiceRunning\">\r\n      <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n        \r\n        <mat-progress-bar *ngIf=\"getTeamsServiceRunning\"\r\n          class=\"progress-bar progress-bar--get-teams\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n        </mat-progress-bar>\r\n\r\n        <div *ngIf=\"teams.length && !getTeamsServiceRunning\" fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title\">\r\n            <p class=\"header\">Owner</p>\r\n            <p class=\"mat-caption\">Specify the owner of this investment</p>\r\n          </h3>\r\n          \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n            <mat-radio-group fxFlex fxFlex.gt-xs=\"230px\" class=\"form__field radiogroup__owner\"\r\n                [(ngModel)]=\"model.owner\" \r\n                name=\"owner\" \r\n                id=\"owner\" \r\n                #owner=\"ngModel\"\r\n                (change)=\"onRadioChange($event)\">\r\n              <mat-radio-button class=\"owner__option\" value=\"me\">Just me</mat-radio-button>\r\n              <mat-radio-button class=\"owner__option\" value=\"team\">My team</mat-radio-button>\r\n            </mat-radio-group>\r\n    \r\n            <mat-form-field *ngIf=\"teams.length && model.owner === 'team'\" fxFlex fxFlex.gt-xs=\"350px\" class=\"form__field\">\r\n              <mat-select [(ngModel)]=\"model.team\"\r\n                  name=\"team\" \r\n                  id=\"team\" \r\n                  #team=\"ngModel\" \r\n                  placeholder=\"Select a team\"\r\n                  (selectionChange)=\"onSelectChange($event)\"\r\n                  required>\r\n                <mat-option *ngFor=\"let team of teams\" [value]=\"team\">\r\n                  {{team.name}}\r\n                </mat-option>\r\n              </mat-select>\r\n\r\n              <mat-icon matPrefix>group</mat-icon>\r\n              <mat-error *ngIf=\"team.invalid && (team.dirty || team.touched) && team.errors.required\">Please choose a team</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n        \r\n        <div *ngIf=\"model.team\" fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title\">\r\n            <p class=\"header\">Split between team members</p>\r\n            <p class=\"mat-caption\">Specify how to split the returns setting a percentage of the total investment amount to each member</p>\r\n          </h3>\r\n  \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n            <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"20px\" class=\"team-members\" fxLayoutWrap>\r\n              <div *ngFor=\"let member of model.team.members; index as memberIndex\" fxFlex=\"none\" fxFlex.gt-xs=\"250px\" fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"member\">\r\n                <div class=\"member-details\" fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n                  <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n                  <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === model.team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n                    <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === model.team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n                    <p class=\"member__email\">{{member.email}}</p>\r\n                  </div>\r\n                </div>\r\n      \r\n                <div class=\"member-percentage\">\r\n                  <mat-form-field class=\"form__field\">\r\n                    <input matInput type=\"number\" id=\"memberPercentage_{{member.email}}\" name=\"memberPercentage_{{member.email}}\" placeholder=\"Percentage of investment\"\r\n                        [(ngModel)]=\"model.membersPercentage[member.email]\" \r\n                        [value]=\"model.membersPercentage[member.email]\"\r\n                        numberValidator='{\"min\": 0, \"max\": 100}'\r\n                        required\r\n                        #memberPercentage=\"ngModel\">\r\n                    <mat-hint align=\"start\">(%) Investment portion for {{member.email}}.</mat-hint>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.required\">Percentage of investment is required.</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n                    <mat-error *ngIf=\"memberPercentage.invalid && (memberPercentage.dirty || memberPercentage.touched) && memberPercentage.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n                  </mat-form-field>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            \r\n          </div>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <h3 class=\"title title__investment-amount\">\r\n            <p class=\"header\">Investment details</p>\r\n          </h3>\r\n  \r\n          <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n                <currency-unit fxFlex=\"50px\"\r\n                    [id]=\"'investmentAmountUnit'\" \r\n                    [value]=\"model.investmentAmountUnit\"\r\n                    [view]=\"'narrow'\"\r\n                    (newValue)=\"onCurrencyUnitChange($event)\">\r\n                </currency-unit>\r\n                \r\n                <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n                  <input matInput type=\"number\" id=\"investmentAmount\" name=\"investmentAmount\" placeholder=\"Investment amount\"\r\n                      [(ngModel)]=\"model.investmentAmount\" \r\n                      [value]=\"model.investmentAmount\"\r\n                      numberValidator \r\n                      required\r\n                      #investmentAmount=\"ngModel\">\r\n                  <mat-hint align=\"start\">Set the amount of money to invest.</mat-hint>\r\n                  <mat-error *ngIf=\"investmentAmount.invalid && (investmentAmount.dirty || investmentAmount.touched) && investmentAmount.errors.required\">Investment amount is required.</mat-error>\r\n                  <mat-error *ngIf=\"investmentAmount.invalid && (investmentAmount.dirty || investmentAmount.touched) && investmentAmount.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n          </div>\r\n        </div>\r\n  \r\n        <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n          <currency-investment-form *ngIf=\"type === INVESTMENT_TYPES.CRYPTO || type === INVESTMENT_TYPES.CURRENCY\" [defaultValues]=\"model.investmentData\"\r\n              (values)=\"onInvestmentDataChange($event)\">\r\n          </currency-investment-form>\r\n\r\n          <property-investment-form *ngIf=\"type === INVESTMENT_TYPES.PROPERTY\" [defaultValues]=\"model.investmentData\"\r\n              [user]=\"user\"\r\n              (values)=\"onInvestmentDataChange($event)\">\r\n          </property-investment-form>\r\n        </div>\r\n      </section>\r\n  \r\n      \r\n      \r\n      <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-investment\">\r\n        <button *ngIf=\"!editInvestmentServiceRunning\" \r\n            class=\"form__action mat-raised-button\" \r\n            mat-raised-button \r\n            type=\"submit\" \r\n            color=\"accent\" \r\n            [disabled]=\"!editInvestmentForm.form.valid || !investmentDataValid\">Save</button>\r\n        \r\n        <mat-progress-bar *ngIf=\"editInvestmentServiceRunning\"\r\n            class=\"progress-bar progress-bar--edit-investment\"\r\n            color=\"primary\"\r\n            mode=\"indeterminate\">\r\n        </mat-progress-bar>\r\n      </section>\r\n    </div>\r\n    \r\n    <!-- <pre>{{model | json}}</pre> -->\r\n  </form>\r\n\r\n  <mat-progress-bar *ngIf=\"getInvestmentServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-investment\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/modules/investments/components/investments-edit/investments-edit.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n.progress-bar--get-investment, .progress-bar--get-teams {\n  width: 100%; }\n\n.container__edit-investment .form__fields .form__fields__row__container .radiogroup__owner .owner__option {\n  margin-right: 10px; }\n\n.container__edit-investment .form__fields .form__fields__row__container .radiogroup__owner .owner__option:last-child {\n    margin-right: 0; }\n\n.container__edit-investment .form__fields .form__fields__row__container .title__investment-amount {\n  margin-bottom: 5px !important; }\n\n.container__edit-investment .team-members .member .member__avatar {\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  padding: 0 10px 0 0; }\n\n.container__edit-investment .team-members .member .member__info .admin-icon {\n  font-size: 14px;\n  height: auto;\n  width: auto; }\n\n.container__edit-investment .team-members .member .member__info .member__email {\n  font-size: 11px; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-investment, .progress-bar--get-teams {\n    width: 300px; } }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/investments-edit/investments-edit.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var teams_service_1 = __webpack_require__("./src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var currencyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/currencyInvestment.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var PropertyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/PropertyInvestment.ts");
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
        this.INVESTMENT_TYPES = constants_1.INVESTMENTS_TYPES;
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
            var urlObject = _this.route.url.getValue();
            var investmentId = null;
            var propertyId = null;
            if (urlObject[0]['path'] === constants_1.INVESTMENTS_TYPES.PROPERTY && urlObject[1]['path'] === 'create') {
                //we are creating a property investment coming from the property component
                propertyId = id;
            }
            else {
                //we are editing an investment or creating a new one coming from the investment dashboard
                investmentId = id;
            }
            return { user: user, investmentId: investmentId, propertyId: propertyId };
        }).subscribe(function (data) {
            _this.user = data.user;
            _this.model.email = data.user.email;
            _this.model.investmentAmountUnit = _this.user.currency;
            _this.model.id = data.investmentId || null;
            if (data.propertyId) {
                _this.model.investmentData.propertyId = data.propertyId;
            }
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
            if (![constants_1.INVESTMENTS_TYPES.CURRENCY, constants_1.INVESTMENTS_TYPES.CRYPTO, constants_1.INVESTMENTS_TYPES.PROPERTY].includes(type)) {
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
     * Get an investment from server based on the id provided
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
            else if (investment instanceof PropertyInvestment_1.PropertyInvestment) {
                _this.model.investmentData = {
                    type: investment.type,
                    property: investment.property,
                    address: investment.property.address,
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
            template: __webpack_require__("./src/app/modules/investments/components/investments-edit/investments-edit.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/investments-edit/investments-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, investments_service_1.InvestmentsService,
            teams_service_1.TeamsService, app_service_1.AppService, router_1.Router])
    ], InvestmentsEditComponent);
    return InvestmentsEditComponent;
}());
exports.InvestmentsEditComponent = InvestmentsEditComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/property-investment-form/property-investment-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__edit-property-investment\" #editPropertyInvestmentForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  \r\n  <mat-progress-bar *ngIf=\"getPropertyServiceRunning\"\r\n    class=\"progress-bar progress-bar--get-property\"\r\n    color=\"primary\"\r\n    mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n  \r\n  <section *ngIf=\"!getPropertyServiceRunning\" fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n    \r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Address -->\r\n        <mat-form-field fxFlex class=\"form__field address__field\">\r\n          <input matInput type=\"text\" id=\"property\" name=\"property\" placeholder=\"Property\" \r\n              [(ngModel)]=\"model.address\" \r\n              required\r\n              readonly\r\n              matTooltip=\"Select property...\"\r\n              [value]=\"model.address\"\r\n              #property=\"ngModel\"\r\n              (click)=\"openPropertySelectionDialog()\">\r\n          \r\n          <mat-icon matPrefix [matTooltip]=\"model.property ? 'Go to property' : ''\" [routerLink]=\"model.property ? '/properties/' + model.property.type + '/edit/' + model.property.id : '.'\">home</mat-icon>\r\n          <button mat-button matTooltip=\"Select property...\" matSuffix mat-icon-button aria-label=\"Choose property...\" (click)=\"openPropertySelectionDialog()\">\r\n            <mat-icon>view_list</mat-icon>\r\n          </button>\r\n              \r\n          <mat-error *ngIf=\"property.invalid && (property.dirty || property.touched) && property.errors.required\">This field is required.</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Buying date -->\r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"100px\" class=\"form__field\">\r\n          <input placeholder=\"Buying date\"\r\n              id=\"buyingDate\"\r\n              name=\"buyingDate\"\r\n              readonly\r\n              required\r\n              #buyingDate=\"ngModel\"\r\n              matInput \r\n              [(ngModel)]=\"model.buyingDate\" \r\n              [matDatepicker]=\"pickerBuyingDate\"\r\n              (click)=\"pickerBuyingDate.open()\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"pickerBuyingDate\"></mat-datepicker-toggle>\r\n          <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBuyingDate></mat-datepicker>\r\n          <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.required\">Buying date is required.</mat-error>\r\n          <mat-error *ngIf=\"buyingDate.invalid && (buyingDate.dirty || buyingDate.touched) && buyingDate.errors.matDatepickerParse\">Buying date is invalid or not follows the pattern \"mm/dd/yyyy\"</mat-error>\r\n        </mat-form-field>\r\n\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <!-- Buying price unit -->\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'buyingPriceUnit'\" \r\n              [view]=\"'narrow'\"\r\n              [value]=\"model.buyingPriceUnit\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n\r\n          <!-- Buying price -->\r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"buyingPrice\" name=\"buyingPrice\" placeholder=\"Price\"\r\n                [(ngModel)]=\"model.buyingPrice\" \r\n                [value]=\"model.buyingPrice\"\r\n                numberValidator \r\n                required\r\n                #buyingPrice=\"ngModel\">\r\n            <mat-hint align=\"start\">Price on buying date.</mat-hint>\r\n            <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.required\">Buying price is required.</mat-error>\r\n            <mat-error *ngIf=\"buyingPrice.invalid && (buyingPrice.dirty || buyingPrice.touched) && buyingPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        \r\n      </div>\r\n    </div>\r\n  </section>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/modules/investments/components/property-investment-form/property-investment-form.component.scss":
/***/ (function(module, exports) {

module.exports = ".form__edit-property-investment .address__field {\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/property-investment-form/property-investment-form.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var properties_service_1 = __webpack_require__("./src/app/modules/properties/properties.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var property_selector_dialog_component_1 = __webpack_require__("./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.ts");
var PropertyInvestmentFormComponent = /** @class */ (function () {
    function PropertyInvestmentFormComponent(dateAdapter, appService, dialog, utilService, propertiesService, router) {
        this.dateAdapter = dateAdapter;
        this.appService = appService;
        this.dialog = dialog;
        this.utilService = utilService;
        this.propertiesService = propertiesService;
        this.router = router;
        this.defaultValues = null; //the default values of the component model  
        this.user = null;
        this.values = new core_1.EventEmitter();
        this.model = {
            type: null,
            property: null,
            propertyId: null,
            address: null,
            buyingPrice: null,
            buyingPriceUnit: null,
            buyingDate: null
        };
        this.subscription = new rxjs_1.Subscription();
        this.getPropertyServiceRunning = false;
        this.dateAdapter.setLocale('en-GB');
    }
    PropertyInvestmentFormComponent.prototype.ngOnInit = function () {
        this.model.type = constants_1.INVESTMENTS_TYPES.PROPERTY;
        this.model.buyingDate = new Date(Date.now());
        this.model.buyingPriceUnit = this.user.currency;
        Object.assign(this.model, this.defaultValues);
        if (this.model.propertyId) {
            //when creating from the property "invest action" or some component that shows properties an allow the creation of an investment of it
            this.getProperty(this.model.propertyId);
        }
        else if (this.model.property) {
            //when editing a property investment
            this.model.address = this.model.property.address.description;
        }
    };
    PropertyInvestmentFormComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    PropertyInvestmentFormComponent.prototype.onCurrencyUnitChange = function ($event) {
        this.model[$event.source.id] = $event.value;
        this.emitValues();
    };
    PropertyInvestmentFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //send data before touching any value
        this.emitValues();
        //after any event in the form we send updated data
        var newSubscription = this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            _this.emitValues();
        });
        this.subscription.add(newSubscription);
    };
    PropertyInvestmentFormComponent.prototype.emitValues = function () {
        this.values.emit({
            value: {
                model: this.model,
                valid: this.form.valid
            }
        });
    };
    /**
     * Get a property from server based on the id provided
     * @param {string} id
     */
    PropertyInvestmentFormComponent.prototype.getProperty = function (id) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getProperty() > "; //for debugging
        if (!id) {
            this.appService.showResults("Invalid property ID", 'error');
            this.appService.consoleLog('error', methodTrace + " ID parameter must be provided, but was: ", id);
            this.router.navigate(['/properties']);
        }
        this.getPropertyServiceRunning = true;
        var newSubscription = this.propertiesService.getPropertyById(this.user.email, id).subscribe(function (property) {
            console.log(1, property);
            _this.setProperty(property);
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > ", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 461 || error.codeno === 462) {
                _this.appService.showResults(error.msg, 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.router.navigate(['/properties']);
            _this.getPropertyServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    PropertyInvestmentFormComponent.prototype.setProperty = function (property) {
        if (property.createdBy.email !== this.user.email) {
            //we cannot create an investment of a property not created by me
            this.appService.showResults("Only the property creator (" + property.createdBy.name + ") is allowed to create an investment with this property.", 'error');
            return this.router.navigate(['/properties']);
        }
        else {
            this.model.property = property;
            this.model.address = property.address.description;
            var buyingPrice = null;
            var buyingPriceUnit = null;
            if (property.salePrice) {
                buyingPrice = property.salePrice;
                buyingPriceUnit = property.salePriceUnit;
            }
            else if (property.offerPrice) {
                buyingPrice = property.offerPrice;
                buyingPriceUnit = property.offerPriceUnit;
            }
            else if (property.askingPrice) {
                buyingPrice = property.askingPrice;
                buyingPriceUnit = property.askingPriceUnit;
            }
            else if (property.walkAwayPrice) {
                buyingPrice = property.walkAwayPrice;
                buyingPriceUnit = property.walkAwayPriceUnit;
            }
            this.model.buyingPrice = buyingPrice;
            this.model.buyingPriceUnit = buyingPriceUnit || this.user.currency;
            this.getPropertyServiceRunning = false;
        }
    };
    PropertyInvestmentFormComponent.prototype.openPropertySelectionDialog = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > openDeleteTeamDialog() > "; //for debugging
        var propertySelectorDialogRef = this.dialog.open(property_selector_dialog_component_1.PropertySelectorDialogComponent, {
            data: {
                title: 'Select a property',
                user: this.user
            }
        });
        var newSubscription = propertySelectorDialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.setProperty(result);
            }
        });
        this.subscription.add(newSubscription);
        return false;
    };
    __decorate([
        core_1.ViewChild('editPropertyInvestmentForm'),
        __metadata("design:type", Object)
    ], PropertyInvestmentFormComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PropertyInvestmentFormComponent.prototype, "defaultValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", user_1.User)
    ], PropertyInvestmentFormComponent.prototype, "user", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PropertyInvestmentFormComponent.prototype, "values", void 0);
    PropertyInvestmentFormComponent = __decorate([
        core_1.Component({
            selector: 'property-investment-form',
            template: __webpack_require__("./src/app/modules/investments/components/property-investment-form/property-investment-form.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/property-investment-form/property-investment-form.component.scss")]
        }),
        __metadata("design:paramtypes", [material_1.DateAdapter, app_service_1.AppService, material_1.MatDialog,
            util_service_1.UtilService, properties_service_1.PropertiesService, router_1.Router])
    ], PropertyInvestmentFormComponent);
    return PropertyInvestmentFormComponent;
}());
exports.PropertyInvestmentFormComponent = PropertyInvestmentFormComponent;


/***/ }),

/***/ "./src/app/modules/investments/components/property-investment/property-investment.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"investment__card\">\r\n  <mat-card-header routerLink=\"/properties/{{investment.property.type}}/edit/{{investment.property.id}}\">\r\n    <div mat-card-avatar class=\"header-image\">\r\n        <img [src]=\"'/assets/images/house.png'\" [alt]=\"investment.type\" />\r\n    </div>\r\n    <mat-card-title>{{investmentTitle}}</mat-card-title>\r\n    <mat-card-subtitle>{{investment.property.address.description}}</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content class=\"card__content\">\r\n    Investment: <strong>{{investmentAmount | currency : 'USD' : 'code' : '1.2-2' }}</strong> \r\n    <br>\r\n\r\n    on {{investment.buyingDate | date}}\r\n    <br>\r\n    Sold at {{ buyingPrice | currency : 'USD' : 'code' : '1.2-2' }}\r\n    <br>\r\n    today market value at <strong>{{currentPrice | currency : 'USD' : 'code' : '1.2-2'}}</strong>\r\n    <div [class.color__accent]=\"investmentReturn >= investmentValueWhenBought\" \r\n        [class.color__red]=\"investmentReturn < investmentValueWhenBought\">\r\n      <br>\r\n      ROI: <strong>{{ investmentReturn | currency : 'USD' : 'code' : '1.2-2' }}</strong> ({{investmentReturn / investmentValueWhenBought | percent : '1.1-2'}}%)\r\n    </div>\r\n\r\n    <!-- Team -->\r\n    <mat-expansion-panel *ngIf=\"team\" class=\"team-panel\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-panel__content\">\r\n\r\n        <section class=\"members\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n          <div *ngFor=\"let portion of investmentDistribution\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"portion.member.avatar\"/>\r\n            <div fxFlex class=\"member__info\" fxLayout=\"column\">\r\n              <p class=\"member__name\">{{portion.member.name}}</p>\r\n              <!-- <p class=\"member__email\">{{member.email}}</p> -->\r\n              <div class=\"member__money\" fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-between end\">\r\n                <p>{{ portion.percentage }}%</p>\r\n                <p>{{ portion.money | currency : 'USD' : 'code' : '1.2-2' }}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team -->\r\n\r\n    <section class=\"card__actions\" fxLayout=\"row\" fxLayoutAlign=\"end none\" fxLayoutGap=\"10px\">\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab routerLink=\"/investments/property/edit/{{investment.id}}\" color=\"primary\" (click)=\"actionRunning = true\">\r\n        <mat-icon aria-label=\"Edit Investment\">edit</mat-icon>\r\n      </button>\r\n\r\n      <button *ngIf=\"!actionRunning\" mat-mini-fab color=\"warn\" (click)=\"openDeleteDialog()\">\r\n        <mat-icon aria-label=\"Delete investment\">delete</mat-icon>\r\n      </button>\r\n\r\n      <mat-progress-spinner *ngIf=\"actionRunning\"\r\n        class=\"progress-spinner progress-spinner--action\"\r\n        color=\"warn\"\r\n        [diameter]=\"40\" [strokeWidth]=\"7\"\r\n        mode=\"indeterminate\">\r\n      </mat-progress-spinner>\r\n    </section>\r\n  </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/modules/investments/components/property-investment/property-investment.component.scss":
/***/ (function(module, exports) {

module.exports = ".investment__card {\n  text-align: left; }\n  .investment__card mat-card-header {\n    cursor: pointer; }\n  .investment__card mat-card-header .header-image img {\n      width: 40px; }\n  .investment__card .card__content {\n    text-align: center; }\n  .investment__card .card__content .team-panel {\n      cursor: default;\n      margin-top: 10px; }\n  .investment__card .card__content .team-panel mat-panel-title {\n        font-size: 18px; }\n  .investment__card .card__content .team-panel .team-panel__content {\n        text-align: left; }\n  .investment__card .card__content .team-panel .team-panel__content .members .member .member__avatar {\n          border-radius: 50%;\n          width: 40px;\n          height: 40px;\n          padding: 0 10px 0 0; }\n  .investment__card .card__content .team-panel .team-panel__content .members .member .member__info .member__email {\n          font-size: 11px; }\n  .investment__card .card__content .card__actions {\n      margin: 10px 0 0; }\n"

/***/ }),

/***/ "./src/app/modules/investments/components/property-investment/property-investment.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var PropertyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/PropertyInvestment.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var currency_exchange_service_1 = __webpack_require__("./src/app/modules/investments/currency-exchange.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var yes_no_dialog_component_1 = __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var house_1 = __webpack_require__("./src/app/modules/properties/models/house.ts");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var PropertyInvestmentComponent = /** @class */ (function () {
    function PropertyInvestmentComponent(currencyExchangeService, appService, usersService, investmentsService, dialog, router, utilService) {
        this.currencyExchangeService = currencyExchangeService;
        this.appService = appService;
        this.usersService = usersService;
        this.investmentsService = investmentsService;
        this.dialog = dialog;
        this.router = router;
        this.utilService = utilService;
        this.totalReturns = new core_1.EventEmitter();
        this.deletedId = new core_1.EventEmitter();
        this.teams$ = new rxjs_1.BehaviorSubject([]);
        this.investmentAmount = 0;
        this.buyingPrice = 0;
        this.investmentReturn = 0;
        this.investmentValueWhenBought = 0;
        this.currentPrice = 0;
        this.investmentTitle = null;
        this.actionRunning = false;
        this.user = null;
        this.team = null; //if the investment has a tema this will be populated with the full info of the team
        this.investmentDistribution = [];
        this.subscription = new rxjs_1.Subscription();
    }
    Object.defineProperty(PropertyInvestmentComponent.prototype, "teams", {
        get: function () {
            return this.teams$.getValue();
        },
        set: function (teams) {
            this.teams$.next(teams);
        },
        enumerable: true,
        configurable: true
    });
    PropertyInvestmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        if (this.investment.property instanceof house_1.House) {
            this.investmentTitle = this.utilService.capitalizeFirstLetter(this.investment.property.buildingType);
        }
        //get the team of the investmetn if exists
        var newSubscription = null;
        var currencyRates$ = this.currencyExchangeService.getCurrencyRates(); //get currency rates observable source
        var currencyRatesAndUser$ = this.usersService.user$.combineLatest(currencyRates$, function (user, currencyRates) {
            _this.user = user;
            return { user: user, currencyRates: currencyRates };
        }); //(currency rates and user) source
        newSubscription = currencyRatesAndUser$.switchMap(function (data) {
            _this.currentPrice = _this.currencyExchangeService.getUsdValueOf(_this.investment.property.marketValue, _this.investment.property.marketValueUnit);
            _this.investmentAmount = _this.currencyExchangeService.getUsdValueOf(_this.investment.investmentAmount, _this.investment.investmentAmountUnit);
            _this.buyingPrice = _this.currencyExchangeService.getUsdValueOf(_this.investment.buyingPrice, _this.investment.buyingPriceUnit);
            _this.investmentValueWhenBought = _this.buyingPrice;
            _this.investmentReturn = _this.currentPrice;
            return _this.teams$;
        }).subscribe(function (teams) {
            _this.setInvestmentTeamData(teams);
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error trying to generate investment data > ", error);
            _this.appService.showResults("There was an error trying to generate investment data, please try again in a few minutes.", 'error');
        });
        this.subscription.add(newSubscription);
    };
    PropertyInvestmentComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Populates team data as well as the distribution on the investment between team members when the investment is asigned to a team
     *
     * @param {Team[]} teams . The teams of the current user
     */
    PropertyInvestmentComponent.prototype.setInvestmentTeamData = function (teams) {
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
    PropertyInvestmentComponent.prototype.openDeleteDialog = function () {
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
    PropertyInvestmentComponent.prototype.delete = function () {
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
        __metadata("design:type", PropertyInvestment_1.PropertyInvestment)
    ], PropertyInvestmentComponent.prototype, "investment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PropertyInvestmentComponent.prototype, "teams", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PropertyInvestmentComponent.prototype, "totalReturns", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PropertyInvestmentComponent.prototype, "deletedId", void 0);
    PropertyInvestmentComponent = __decorate([
        core_1.Component({
            selector: 'property-investment',
            template: __webpack_require__("./src/app/modules/investments/components/property-investment/property-investment.component.html"),
            styles: [__webpack_require__("./src/app/modules/investments/components/property-investment/property-investment.component.scss")]
        }),
        __metadata("design:paramtypes", [currency_exchange_service_1.CurrencyExchangeService, app_service_1.AppService, users_service_1.UsersService, investments_service_1.InvestmentsService,
            material_1.MatDialog, router_1.Router, util_service_1.UtilService])
    ], PropertyInvestmentComponent);
    return PropertyInvestmentComponent;
}());
exports.PropertyInvestmentComponent = PropertyInvestmentComponent;


/***/ }),

/***/ "./src/app/modules/investments/currency-exchange.service.ts":
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
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
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
            .catch(this.appService.handleError)
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
            .catch(this.appService.handleError);
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

/***/ "./src/app/modules/investments/investments-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var investments_dashboard_component_1 = __webpack_require__("./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
var investments_edit_component_1 = __webpack_require__("./src/app/modules/investments/components/investments-edit/investments-edit.component.ts");
var auth_resolver_service_1 = __webpack_require__("./src/app/auth-resolver.service.ts");
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
                path: ':type/create/:id',
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

/***/ "./src/app/modules/investments/investments.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var investments_routing_module_1 = __webpack_require__("./src/app/modules/investments/investments-routing.module.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("./src/app/modules/shared/shared.module.ts");
var investments_dashboard_component_1 = __webpack_require__("./src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
var currency_investment_component_1 = __webpack_require__("./src/app/modules/investments/components/currency-investment/currency-investment.component.ts");
var investment_selector_dialog_component_1 = __webpack_require__("./src/app/modules/investments/components/investment-selector-dialog/investment-selector-dialog.component.ts");
var investments_edit_component_1 = __webpack_require__("./src/app/modules/investments/components/investments-edit/investments-edit.component.ts");
var currency_investment_form_component_1 = __webpack_require__("./src/app/modules/investments/components/currency-investment-form/currency-investment-form.component.ts");
var investments_service_1 = __webpack_require__("./src/app/modules/investments/investments.service.ts");
var property_investment_form_component_1 = __webpack_require__("./src/app/modules/investments/components/property-investment-form/property-investment-form.component.ts");
var property_investment_component_1 = __webpack_require__("./src/app/modules/investments/components/property-investment/property-investment.component.ts");
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
                currency_investment_form_component_1.CurrencyInvestmentFormComponent,
                property_investment_form_component_1.PropertyInvestmentFormComponent,
                property_investment_component_1.PropertyInvestmentComponent
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

/***/ "./src/app/modules/investments/investments.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var Rx_1 = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var currencyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/currencyInvestment.ts");
var PropertyInvestment_1 = __webpack_require__("./src/app/modules/investments/models/PropertyInvestment.ts");
var team_1 = __webpack_require__("./src/app/modules/teams/models/team.ts");
var of_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var house_1 = __webpack_require__("./src/app/modules/properties/models/house.ts");
var address_1 = __webpack_require__("./src/app/modules/properties/models/address.ts");
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
        var params = new http_1.HttpParams()
            .set('id', id)
            .set('email', email);
        var investment$ = this.http.get(this.serverHost + "/getbyId", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
        return investment$.switchMap(function (investment) {
            var result = null;
            if (investment && investment._id) {
                var createdBy = new user_1.User(investment.createdBy.name, investment.createdBy.email, investment.createdBy.gravatar);
                var team = null;
                if (investment.team) {
                    //fill team members
                    var admin = null;
                    var members = [];
                    for (var _i = 0, _a = investment.team.members; _i < _a.length; _i++) {
                        var member = _a[_i];
                        var newMember = new user_1.User(member.name, member.email, member.gravatar);
                        members.push(newMember);
                        if (member.isAdmin) {
                            admin = newMember;
                        }
                    }
                    team = new team_1.Team(investment.team.name, investment.team.description, investment.team.slug, admin, members);
                }
                if (investment.investmentType === constants_1.INVESTMENTS_TYPES.CURRENCY || investment.investmentType === constants_1.INVESTMENTS_TYPES.CRYPTO) {
                    result = new currencyInvestment_1.CurrencyInvestment(investment._id, investment.amount, investment.amountUnit, createdBy, team, investment.investmentDistribution, investment.investmentData.amountUnit, investment.investmentData.amount, investment.investmentData.buyingPrice, investment.investmentData.buyingPriceUnit, investment.investmentData.buyingDate, investment.investmentType);
                }
                else if (investment.investmentType === constants_1.INVESTMENTS_TYPES.PROPERTY) {
                    var property = null;
                    var propertyData = investment.investmentData.property;
                    var address = new address_1.Address();
                    if (propertyData.location) {
                        address = new address_1.Address(propertyData.location.address, propertyData.location.coordinates[1], propertyData.location.coordinates[0], propertyData.location.mapsPlaceId);
                    }
                    if (propertyData.propertyType === constants_1.propertyTypes.HOUSE) {
                        //we share the createdBy of the investment because we know is the same
                        property = new house_1.House(propertyData._id, propertyData.propertyType, address, createdBy, propertyData.landArea, propertyData.floorArea, propertyData.askingPrice, propertyData.askingPriceUnit, propertyData.offerPrice, propertyData.offerPriceUnit, propertyData.walkAwayPrice, propertyData.walkAwayPriceUnit, propertyData.salePrice, propertyData.salePriceUnit, propertyData.dateListed, propertyData.reasonForSelling, propertyData.marketValue, propertyData.marketValueUnit, propertyData.registeredValue, propertyData.registeredValueUnit, propertyData.rates, propertyData.ratesUnit, propertyData.insurance, propertyData.insuranceUnit, propertyData.renovationCost, propertyData.renovationCostUnit, propertyData.maintenanceCost, propertyData.maintenanceCostUnit, propertyData.description, propertyData.otherCost, propertyData.otherCostUnit, propertyData.notes, propertyData.capitalGrowth, propertyData.bedrooms, propertyData.bathrooms, propertyData.parkingSpaces, propertyData.fenced, propertyData.rented, propertyData.rentPrice, propertyData.rentPriceUnit, propertyData.rentPricePeriod, propertyData.rentAppraisalDone, propertyData.vacancy, propertyData.bodyCorporate, propertyData.bodyCorporateUnit, propertyData.utilitiesCost, propertyData.utilitiesCostUnit, propertyData.agent, propertyData.managed, propertyData.managerRate, propertyData.buildingType, propertyData.titleType);
                    }
                    result = new PropertyInvestment_1.PropertyInvestment(investment._id, investment.amount, investment.amountUnit, createdBy, team, investment.investmentDistribution, property, investment.investmentData.buyingPrice, investment.investmentData.buyingPriceUnit, investment.investmentData.buyingDate, investment.investmentType);
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return Rx_1.Observable.of(result);
        });
    };
    /**
     * Server call to Get all the Investments for the current user from the server
     * @param {string} email . The user email
     */
    InvestmentsService.prototype.getInvestments = function (email) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getInvestments() > "; //for debugging
        if (!email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Rx_1.Observable.from([]);
        }
        var params = new http_1.HttpParams().set('email', email);
        var investmentsData$ = this.http.get(this.serverHost + "/getAll", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
        return investmentsData$.switchMap(function (investmentsData) {
            var investments = [];
            if (investmentsData && investmentsData instanceof Array) {
                for (var _i = 0, investmentsData_1 = investmentsData; _i < investmentsData_1.length; _i++) {
                    var item = investmentsData_1[_i];
                    var createdBy = new user_1.User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
                    var team = item.team ? new team_1.Team(item.team.name, item.team.description, item.team.slug) : null;
                    if (item.investmentType === constants_1.INVESTMENTS_TYPES.CURRENCY || item.investmentType === constants_1.INVESTMENTS_TYPES.CRYPTO) {
                        investments.push(new currencyInvestment_1.CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.investmentData.amountUnit, item.investmentData.amount, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, item.investmentType));
                    }
                    else if (item.investmentType === constants_1.INVESTMENTS_TYPES.PROPERTY) {
                        var property = null;
                        var propertyData = item.investmentData.property;
                        var address = new address_1.Address();
                        if (propertyData.location) {
                            address = new address_1.Address(propertyData.location.address, propertyData.location.coordinates[1], propertyData.location.coordinates[0], propertyData.location.mapsPlaceId);
                        }
                        if (propertyData.propertyType === constants_1.propertyTypes.HOUSE) {
                            //we share the createdBy of the investment because we know is the same
                            property = new house_1.House(propertyData._id, propertyData.propertyType, address, createdBy, propertyData.landArea, propertyData.floorArea, propertyData.askingPrice, propertyData.askingPriceUnit, propertyData.offerPrice, propertyData.offerPriceUnit, propertyData.walkAwayPrice, propertyData.walkAwayPriceUnit, propertyData.salePrice, propertyData.salePriceUnit, propertyData.dateListed, propertyData.reasonForSelling, propertyData.marketValue, propertyData.marketValueUnit, propertyData.registeredValue, propertyData.registeredValueUnit, propertyData.rates, propertyData.ratesUnit, propertyData.insurance, propertyData.insuranceUnit, propertyData.renovationCost, propertyData.renovationCostUnit, propertyData.maintenanceCost, propertyData.maintenanceCostUnit, propertyData.description, propertyData.otherCost, propertyData.otherCostUnit, propertyData.notes, propertyData.capitalGrowth, propertyData.bedrooms, propertyData.bathrooms, propertyData.parkingSpaces, propertyData.fenced, propertyData.rented, propertyData.rentPrice, propertyData.rentPriceUnit, propertyData.rentPricePeriod, propertyData.rentAppraisalDone, propertyData.vacancy, propertyData.bodyCorporate, propertyData.bodyCorporateUnit, propertyData.utilitiesCost, propertyData.utilitiesCostUnit, propertyData.agent, propertyData.managed, propertyData.managerRate, propertyData.buildingType, propertyData.titleType);
                        }
                        investments.push(new PropertyInvestment_1.PropertyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, property, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, item.investmentType));
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
        var params = new http_1.HttpParams().set('email', email);
        return this.http.delete(this.serverHost + "/delete/" + id, { headers: this.headers, params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    InvestmentsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], InvestmentsService);
    return InvestmentsService;
}());
exports.InvestmentsService = InvestmentsService;


/***/ }),

/***/ "./src/app/modules/investments/models/PropertyInvestment.ts":
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
var investment_1 = __webpack_require__("./src/app/modules/investments/models/investment.ts");
var PropertyInvestment = /** @class */ (function (_super) {
    __extends(PropertyInvestment, _super);
    function PropertyInvestment(id, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution, property, buyingPrice, buyingPriceUnit, buyingDate, type) {
        if (team === void 0) { team = null; }
        if (investmentDistribution === void 0) { investmentDistribution = []; }
        if (type === void 0) { type = 'property'; }
        var _this = _super.call(this, id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution) || this;
        _this.property = property;
        _this.buyingDate = buyingDate;
        _this.buyingPrice = buyingPrice;
        _this.buyingPriceUnit = buyingPriceUnit;
        return _this;
    }
    return PropertyInvestment;
}(investment_1.Investment));
exports.PropertyInvestment = PropertyInvestment;


/***/ }),

/***/ "./src/app/modules/investments/models/currencyInvestment.ts":
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
var investment_1 = __webpack_require__("./src/app/modules/investments/models/investment.ts");
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

/***/ "./src/app/modules/investments/models/investment.ts":
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

/***/ "./src/app/modules/properties/components/houses-edit/houses-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__edit-house\" #editHouseForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <h3 class=\"title\">\r\n        <p class=\"header\">Features</p>\r\n      </h3>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Building type -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <mat-select id=\"buildingType\" name=\"buildingType\" placeholder=\"Building type\" [value]=\"model.buildingType\" [(ngModel)]=\"model.buildingType\">\r\n            <mat-option value=\"house\">House</mat-option>\r\n            <mat-option value=\"apartment\">Apartment</mat-option>\r\n            <mat-option value=\"unit\">Unit</mat-option>\r\n          </mat-select>\r\n\r\n          <mat-icon matPrefix>home</mat-icon>\r\n        </mat-form-field>\r\n        \r\n        <!-- Title type -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <mat-select id=\"titleType\" name=\"titleType\" placeholder=\"Title type\" [value]=\"model.titleType\" [(ngModel)]=\"model.titleType\">\r\n            <mat-option value=\"feeSimple\">Fee simple</mat-option>\r\n            <mat-option value=\"crossLease\">Cross lease</mat-option>\r\n            <mat-option value=\"leaseHold\">Lease hold</mat-option>\r\n          </mat-select>\r\n\r\n          <mat-icon matPrefix>description</mat-icon>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Land area -->\r\n        <mat-form-field fxFlex  class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"landArea\" name=\"landArea\" placeholder=\"Land area\" \r\n              [(ngModel)]=\"model.landArea\" \r\n              [value]=\"model.landArea\"\r\n              numberValidator\r\n              #landArea=\"ngModel\">\r\n              \r\n          <span matSuffix>m2</span>\r\n          <mat-hint align=\"start\">Land area in square meters.</mat-hint>\r\n          <mat-error *ngIf=\"landArea.invalid && (landArea.dirty || landArea.touched) && landArea.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Floor area -->\r\n        <mat-form-field fxFlex  class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"floorArea\" name=\"floorArea\" placeholder=\"Floor area\" \r\n              [(ngModel)]=\"model.floorArea\" \r\n              [value]=\"model.floorArea\"\r\n              numberValidator\r\n              #floorArea=\"ngModel\">\r\n              \r\n          <span matSuffix>m2</span>\r\n          <mat-hint align=\"start\">Floor area in square meters.</mat-hint>\r\n          <mat-error *ngIf=\"floorArea.invalid && (floorArea.dirty || floorArea.touched) && floorArea.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Bedrooms -->\r\n        <mat-form-field fxFlex fxFlex.sm=\"140px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"bedrooms\" name=\"bedrooms\" placeholder=\"Bedrooms\" \r\n              [(ngModel)]=\"model.bedrooms\" \r\n              [value]=\"model.bedrooms\"\r\n              numberValidator\r\n              #bedrooms=\"ngModel\">\r\n              \r\n          <mat-icon matPrefix>hotel</mat-icon>\r\n          <mat-error *ngIf=\"bedrooms.invalid && (bedrooms.dirty || bedrooms.touched) && bedrooms.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Bathrooms -->\r\n        <mat-form-field fxFlex fxFlex.sm=\"140px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"bathrooms\" name=\"bathrooms\" placeholder=\"Bathrooms\" \r\n              [(ngModel)]=\"model.bathrooms\" \r\n              [value]=\"model.bathrooms\"\r\n              numberValidator\r\n              #bathrooms=\"ngModel\">\r\n\r\n          <mat-icon matPrefix>airline_seat_legroom_reduced</mat-icon>\r\n          <mat-error *ngIf=\"bathrooms.invalid && (bathrooms.dirty || bathrooms.touched) && bathrooms.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Parking spaces -->\r\n        <mat-form-field fxFlex fxFlex.sm=\"140px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"parkingSpaces\" name=\"parkingSpaces\" placeholder=\"Parking spaces\" \r\n              [(ngModel)]=\"model.parkingSpaces\" \r\n              [value]=\"model.parkingSpaces\"\r\n              numberValidator\r\n              #parkingSpaces=\"ngModel\">\r\n              \r\n          <mat-icon matPrefix>directions_car</mat-icon>\r\n          <mat-error *ngIf=\"parkingSpaces.invalid && (parkingSpaces.dirty || parkingSpaces.touched) && parkingSpaces.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Fenced? -->\r\n        <div fxFlex class=\"form__field\">\r\n          <mat-checkbox id=\"fenced\" name=\"fenced\" class=\"\"\r\n              labelPosition=\"before\"\r\n              [(ngModel)]=\"model.fenced\">\r\n            Fenced?\r\n          </mat-checkbox>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <h3 class=\"title\">\r\n        <p class=\"header\">Rent information</p>\r\n      </h3>\r\n    \r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Rent price -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'rentPriceUnit'\" \r\n              [value]=\"model.rentPriceUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"rentPrice\" name=\"rentPrice\" placeholder=\"Rent price\"\r\n                [(ngModel)]=\"model.rentPrice\" \r\n                [value]=\"model.rentPrice\"\r\n                numberValidator\r\n                #rentPrice=\"ngModel\">\r\n            \r\n            <mat-error *ngIf=\"rentPrice.invalid && (rentPrice.dirty || rentPrice.touched) && rentPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <!-- Rent payment period -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <mat-select id=\"rentPricePeriod\" name=\"rentPricePeriod\" placeholder=\"Pay frecuency\" [value]=\"model.rentPricePeriod\" [(ngModel)]=\"model.rentPricePeriod\">\r\n            <mat-option value=\"week\">per week</mat-option>\r\n            <mat-option value=\"month\">per month</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Managed? -->\r\n        <div fxFlex class=\"form__field\">\r\n          <mat-slide-toggle class=\"\" id=\"managed\" name=\"managed\"\r\n              color=\"accent\"\r\n              [checked]=\"model.managed\"\r\n              (change)=\"onSlideToggleChange($event)\">\r\n            Managed?\r\n          </mat-slide-toggle>\r\n        </div>\r\n\r\n        <!-- Manager rate -->\r\n        <div fxFlex=\"none\" fxFlex.gt-xs fxLayout=\"column\" class=\"form__field\">\r\n          <label class=\"slider__label\">Manager rate</label>\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n            <mat-slider fxFlex id=\"managerRate\" name=\"managerRate\"\r\n                color=\"accent\"\r\n                [max]=\"20\"\r\n                [min]=\"0\"\r\n                [step]=\"1\"\r\n                [disabled]=\"!model.managed\"\r\n                [thumb-label]=\"true\"\r\n                [tick-interval]=\"1\"\r\n                [(ngModel)]=\"model.managerRate\"\r\n                [value]=\"model.managerRate\"> \r\n            </mat-slider>\r\n            <span *ngIf=\"model.managerRate\">{{model.managerRate}}%</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Address -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <input matInput type=\"text\" id=\"agent\" name=\"agent\" placeholder=\"Agent\" \r\n              [(ngModel)]=\"model.agent\"\r\n              [value]=\"model.agent\"\r\n              #agent=\"ngModel\">\r\n\r\n          <mat-icon matPrefix>person</mat-icon>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Vacancy -->\r\n        <div fxFlex=\"none\" fxFlex.gt-xs=\"250px\" fxLayout=\"column\" class=\"form__field\">\r\n          <label class=\"slider__label\">Vacancy</label>\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"start center\">\r\n            <mat-slider fxFlex id=\"vacancy\" name=\"vacancy\"\r\n                color=\"accent\"\r\n                [max]=\"20\"\r\n                [min]=\"0\"\r\n                [step]=\"1\"\r\n                [thumb-label]=\"true\"\r\n                [tick-interval]=\"1\"\r\n                [(ngModel)]=\"model.vacancy\"\r\n                [value]=\"model.vacancy\"> \r\n            </mat-slider>\r\n            <span *ngIf=\"model.vacancy\">{{model.vacancy}} weeks</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Rent appraisal done? -->\r\n        <div fxFlex class=\"form__field\">\r\n          <mat-checkbox id=\"rentAppraisalDone\" name=\"rentAppraisalDone\" class=\"\"\r\n              labelPosition=\"before\"\r\n              [(ngModel)]=\"model.rentAppraisalDone\">\r\n            Rent appraisal done?\r\n          </mat-checkbox>\r\n        </div>\r\n\r\n        <!-- Rented? -->\r\n        <div fxFlex class=\"form__field\">\r\n          <mat-checkbox id=\"rented\" name=\"rented\" class=\"\"\r\n              labelPosition=\"before\"\r\n              [(ngModel)]=\"model.rented\">\r\n            Rented?\r\n          </mat-checkbox>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <h3 class=\"title\">\r\n        <p class=\"header\">Additional information</p>\r\n      </h3>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Registered value -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'registeredValueUnit'\" \r\n              [value]=\"model.registeredValueUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"registeredValue\" name=\"registeredValue\" placeholder=\"Registered value\"\r\n                [(ngModel)]=\"model.registeredValue\" \r\n                [value]=\"model.registeredValue\"\r\n                numberValidator\r\n                #registeredValue=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">The value an independent valuator gives to the house based on the recent sales in the area.</mat-hint>\r\n            <mat-error *ngIf=\"registeredValue.invalid && (registeredValue.dirty || registeredValue.touched) && registeredValue.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <!-- Capital growth -->\r\n        <mat-form-field fxFlex fxFlex.sm=\"140px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"capitalGrowth\" name=\"capitalGrowth\" placeholder=\"Capital growth\" \r\n              [(ngModel)]=\"model.capitalGrowth\" \r\n              [value]=\"model.capitalGrowth\"\r\n              numberValidator='{\"min\": 0, \"max\": 100}' \r\n              #capitalGrowth=\"ngModel\">\r\n          \r\n          <mat-icon matPrefix>trending_up</mat-icon>\r\n          <span matSuffix>%</span>\r\n          <mat-hint align=\"start\">Annual capital growth percentage for owning the property.</mat-hint>\r\n          <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n          <mat-error *ngIf=\"capitalGrowth.invalid && (capitalGrowth.dirty || capitalGrowth.touched) && capitalGrowth.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n    \r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <h3 class=\"title\">\r\n        <p class=\"header\">Living costs</p>\r\n      </h3>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Body corporate -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'bodyCorporateUnit'\" \r\n              [value]=\"model.bodyCorporateUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"bodyCorporate\" name=\"bodyCorporate\" placeholder=\"Body corporate\"\r\n                [(ngModel)]=\"model.bodyCorporate\" \r\n                [value]=\"model.bodyCorporate\"\r\n                numberValidator\r\n                #bodyCorporate=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">The bodyCorporate rates this property pays annually.</mat-hint>\r\n            <mat-error *ngIf=\"bodyCorporate.invalid && (bodyCorporate.dirty || bodyCorporate.touched) && bodyCorporate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <!-- Utilities -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'utilitiesCostUnit'\" \r\n              [value]=\"model.utilitiesCostUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"utilitiesCost\" name=\"utilitiesCost\" placeholder=\"Utilities\"\r\n                [(ngModel)]=\"model.utilitiesCost\" \r\n                [value]=\"model.utilitiesCost\"\r\n                numberValidator\r\n                #utilitiesCost=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">Electricity, water, gas, internet, ...</mat-hint>\r\n            <mat-error *ngIf=\"utilitiesCost.invalid && (utilitiesCost.dirty || utilitiesCost.touched) && utilitiesCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <!-- Rates -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'ratesUnit'\" \r\n              [value]=\"model.ratesUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"rates\" name=\"rates\" placeholder=\"Rates\"\r\n                [(ngModel)]=\"model.rates\" \r\n                [value]=\"model.rates\"\r\n                numberValidator\r\n                #rates=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">The rates this property pays annually.</mat-hint>\r\n            <mat-error *ngIf=\"rates.invalid && (rates.dirty || rates.touched) && rates.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <!-- Insurance -->\r\n        <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <currency-unit fxFlex=\"50px\"\r\n              [id]=\"'insuranceUnit'\" \r\n              [value]=\"model.insuranceUnit\"\r\n              [view]=\"'narrow'\"\r\n              (newValue)=\"onCurrencyUnitChange($event)\">\r\n          </currency-unit>\r\n          \r\n          <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n            <input matInput type=\"number\" id=\"insurance\" name=\"insurance\" placeholder=\"Insurance\"\r\n                [(ngModel)]=\"model.insurance\" \r\n                [value]=\"model.insurance\"\r\n                numberValidator\r\n                #insurance=\"ngModel\">\r\n            \r\n            <mat-hint align=\"start\">Annual insurance price for the house.</mat-hint>\r\n            <mat-error *ngIf=\"insurance.invalid && (insurance.dirty || insurance.touched) && insurance.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/properties/components/houses-edit/houses-edit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/properties/components/houses-edit/houses-edit.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var HousesEditComponent = /** @class */ (function () {
    function HousesEditComponent(appService, utilService) {
        this.appService = appService;
        this.utilService = utilService;
        this.defaultValues = null; //the default values of the component model
        this.defaultCurrencyUnit = 'USD'; //the default currency unit
        this.values = new core_1.EventEmitter();
        this.model = {
            buildingType: null,
            titleType: null,
            landArea: null,
            floorArea: null,
            registeredValue: null,
            registeredValueUnit: null,
            rates: null,
            ratesUnit: null,
            insurance: null,
            insuranceUnit: null,
            capitalGrowth: null,
            bedrooms: null,
            bathrooms: null,
            parkingSpaces: null,
            fenced: false,
            rented: false,
            rentPrice: null,
            rentPriceUnit: null,
            rentPricePeriod: null,
            rentAppraisalDone: false,
            vacancy: null,
            bodyCorporate: null,
            bodyCorporateUnit: null,
            utilitiesCost: null,
            utilitiesCostUnit: null,
            managed: false,
            managerRate: null,
            agent: null
        };
        this.subscription = new Subscription_1.Subscription();
    }
    HousesEditComponent.prototype.ngOnInit = function () {
        this.model.registeredValueUnit = this.model.ratesUnit = this.model.insuranceUnit = this.model.rentPriceUnit = this.model.bodyCorporateUnit =
            this.model.utilitiesCostUnit = this.defaultCurrencyUnit;
        this.model.buildingType = constants_1.houseBuildingTypes.HOUSE;
        this.model.rentPricePeriod = 'week';
        Object.assign(this.model, this.defaultValues);
    };
    HousesEditComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    HousesEditComponent.prototype.onCurrencyUnitChange = function ($event) {
        this.model[$event.source.id] = $event.value;
        this.emitValues();
    };
    HousesEditComponent.prototype.onSlideToggleChange = function ($event) {
        this.model[$event.source.id] = $event.checked;
        this.emitValues();
    };
    HousesEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //send data before touching any value
        this.emitValues();
        //after any event in the form we send updated data
        var newSubscription = this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            _this.emitValues();
        });
        this.subscription.add(newSubscription);
    };
    HousesEditComponent.prototype.emitValues = function () {
        this.values.emit({
            value: {
                model: this.model,
                valid: this.form.valid
            }
        });
    };
    __decorate([
        core_1.ViewChild('editHouseForm'),
        __metadata("design:type", Object)
    ], HousesEditComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HousesEditComponent.prototype, "defaultValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], HousesEditComponent.prototype, "defaultCurrencyUnit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], HousesEditComponent.prototype, "values", void 0);
    HousesEditComponent = __decorate([
        core_1.Component({
            selector: 'houses-edit',
            template: __webpack_require__("./src/app/modules/properties/components/houses-edit/houses-edit.component.html"),
            styles: [__webpack_require__("./src/app/modules/properties/components/houses-edit/houses-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, util_service_1.UtilService])
    ], HousesEditComponent);
    return HousesEditComponent;
}());
exports.HousesEditComponent = HousesEditComponent;


/***/ }),

/***/ "./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__properties\">\r\n  <properties-table [user]=\"user\" [showActions]=\"true\"></properties-table>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\" class=\"actions\">\r\n    <button mat-fab routerLink=\"house/create\" class=\"fab mat-elevation-z10\" color=\"accent\" matTooltip=\"Create new property\" matTooltipPosition=\"left\">\r\n      <mat-icon aria-label=\"Create new property\">add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var PropertiesDashboardComponent = /** @class */ (function () {
    function PropertiesDashboardComponent(route, mainNavigatorService, appService) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.appService = appService;
        this.user = null;
        this.subscription = new Subscription_1.Subscription();
    }
    PropertiesDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: '/investments', selected: false },
            { displayName: 'Properties', url: null, selected: true },
            { displayName: 'Calculators', url: '/calculators', selected: false }
        ]);
        //get authUser from resolver
        this.route.data.subscribe(function (data) {
            _this.user = data.authUser;
        });
    };
    PropertiesDashboardComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    PropertiesDashboardComponent = __decorate([
        core_1.Component({
            selector: 'properties-dashboard',
            template: __webpack_require__("./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.html"),
            styles: [__webpack_require__("./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService,
            app_service_1.AppService])
    ], PropertiesDashboardComponent);
    return PropertiesDashboardComponent;
}());
exports.PropertiesDashboardComponent = PropertiesDashboardComponent;


/***/ }),

/***/ "./src/app/modules/properties/components/properties-edit/properties-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container__edit-property\" fxLayout=\"column\" fxLayoutAlign=\"none none\" fxLayout.gt-xs=\"row\" fxLayoutAlign.gt-xs=\"center none\" fxLayoutGap=\"10px\">\r\n  <!-- Form  -->\r\n  <form *ngIf=\"!getPropertyServiceRunning\" class=\"form__container form__edit-property\" (ngSubmit)=\"editMode ? onUpdate() : onSubmit()\" #editPropertyForm=\"ngForm\" \r\n      novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Basic info</p>\r\n        </h3>\r\n  \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Address -->\r\n          <address-autocomplete fxFlex\r\n              [id]=\"'address'\" \r\n              [defaultValues]=\"model.address\"\r\n              [placeHolder]=\"'Address'\"\r\n              \r\n              (values)=\"onAddressChange($event)\">\r\n          </address-autocomplete>\r\n        </div>\r\n\r\n        <div *ngIf=\"model.address && model.address.latitude && model.address.longitude\" fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Map -->\r\n          <dynamic-map fxFlex [latitude]=\"model.address.latitude\" [longitude]=\"model.address.longitude\" [markers]=\"[model.address]\" [mapContainerHeight]=\"300\"></dynamic-map>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Description -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <textarea matInput id=\"description\" name=\"description\" placeholder=\"Description\"\r\n                matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\"\r\n                [(ngModel)]=\"model.description\" \r\n                value=\"model.description\"\r\n                #description=\"ngModel\">\r\n            </textarea>\r\n\r\n            <mat-icon matPrefix>subject</mat-icon>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n  \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Pricing information</p>\r\n        </h3>\r\n      \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Asking price -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'askingPriceUnit'\" \r\n                [value]=\"model.askingPriceUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"askingPrice\" name=\"askingPrice\" placeholder=\"Asking price\"\r\n                  [(ngModel)]=\"model.askingPrice\" \r\n                  [value]=\"model.askingPrice\"\r\n                  numberValidator\r\n                  #askingPrice=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">The price the owner ask for sell the house.</mat-hint>\r\n              <mat-error *ngIf=\"askingPrice.invalid && (askingPrice.dirty || askingPrice.touched) && askingPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n          \r\n          <!-- Offer price -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'offerPriceUnit'\" \r\n                [value]=\"model.offerPriceUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"offerPrice\" name=\"offerPrice\" placeholder=\"Offer price\"\r\n                  [(ngModel)]=\"model.offerPrice\" \r\n                  [value]=\"model.offerPrice\"\r\n                  numberValidator\r\n                  #offerPrice=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">The price the owner ask for sell the house.</mat-hint>\r\n              <mat-error *ngIf=\"offerPrice.invalid && (offerPrice.dirty || offerPrice.touched) && offerPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n\r\n          <!-- Walk away price -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'walkAwayPriceUnit'\" \r\n                [value]=\"model.walkAwayPriceUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"walkAwayPrice\" name=\"walkAwayPrice\" placeholder=\"Walk away price\"\r\n                  [(ngModel)]=\"model.walkAwayPrice\" \r\n                  [value]=\"model.walkAwayPrice\"\r\n                  numberValidator\r\n                  #walkAwayPrice=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">The price the owner ask for sell the house.</mat-hint>\r\n              <mat-error *ngIf=\"walkAwayPrice.invalid && (walkAwayPrice.dirty || walkAwayPrice.touched) && walkAwayPrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Sale price -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'salePriceUnit'\" \r\n                [value]=\"model.salePriceUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"salePrice\" name=\"salePrice\" placeholder=\"Sale price\"\r\n                  [(ngModel)]=\"model.salePrice\" \r\n                  [value]=\"model.salePrice\"\r\n                  numberValidator\r\n                  #salePrice=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">Last sale price.</mat-hint>\r\n              <mat-error *ngIf=\"salePrice.invalid && (salePrice.dirty || salePrice.touched) && salePrice.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n\r\n          <!-- Market value -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'marketValueUnit'\" \r\n                [value]=\"model.marketValueUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\"\r\n                  [(ngModel)]=\"model.marketValue\" \r\n                  [value]=\"model.marketValue\"\r\n                  numberValidator\r\n                  #marketValue=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">Last sale price.</mat-hint>\r\n              <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Costs</p>\r\n        </h3>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Reno cost -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'renovationCostUnit'\" \r\n                [value]=\"model.renovationCostUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\"\r\n                  [(ngModel)]=\"model.renovationCost\" \r\n                  [value]=\"model.renovationCost\"\r\n                  numberValidator\r\n                  #renovationCost=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">Last sale price.</mat-hint>\r\n              <mat-error *ngIf=\"renovationCost.invalid && (renovationCost.dirty || renovationCost.touched) && renovationCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n\r\n          <!-- Maintenance cost -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'maintenanceCostUnit'\" \r\n                [value]=\"model.maintenanceCostUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"maintenanceCost\" name=\"maintenanceCost\" placeholder=\"Maintenance cost\"\r\n                  [(ngModel)]=\"model.maintenanceCost\" \r\n                  [value]=\"model.maintenanceCost\"\r\n                  numberValidator\r\n                  #maintenanceCost=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">Last sale price.</mat-hint>\r\n              <mat-error *ngIf=\"maintenanceCost.invalid && (maintenanceCost.dirty || maintenanceCost.touched) && maintenanceCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n          \r\n          <!-- Other cost -->\r\n          <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n            <currency-unit fxFlex=\"50px\"\r\n                [id]=\"'otherCostUnit'\" \r\n                [value]=\"model.otherCostUnit\"\r\n                [view]=\"'narrow'\"\r\n                (newValue)=\"onCurrencyUnitChange($event)\">\r\n            </currency-unit>\r\n            \r\n            <mat-form-field fxFlex fxFlex.sm=\"120px\" fxFlex.gt-sm=\"200px\" class=\"form__field\">\r\n              <input matInput type=\"number\" id=\"otherCost\" name=\"otherCost\" placeholder=\"Other cost\"\r\n                  [(ngModel)]=\"model.otherCost\" \r\n                  [value]=\"model.otherCost\"\r\n                  numberValidator\r\n                  #otherCost=\"ngModel\">\r\n              \r\n              <mat-hint align=\"start\">Last sale price.</mat-hint>\r\n              <mat-error *ngIf=\"otherCost.invalid && (otherCost.dirty || otherCost.touched) && otherCost.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Other information</p>\r\n        </h3>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Date listed -->\r\n          <mat-form-field fxFlex fxFlex.gt-xs=\"100px\" class=\"form__field\">\r\n            <input placeholder=\"Listing date\"\r\n                id=\"dateListed\"\r\n                name=\"dateListed\"\r\n                readonly\r\n                #dateListed=\"ngModel\"\r\n                matInput \r\n                [(ngModel)]=\"model.dateListed\" \r\n                [matDatepicker]=\"pickerDateListed\"\r\n                (click)=\"pickerDateListed.open()\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"pickerDateListed\"></mat-datepicker-toggle>\r\n            <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerDateListed></mat-datepicker>\r\n            <mat-error *ngIf=\"dateListed.invalid && (dateListed.dirty || dateListed.touched) && dateListed.errors.matDatepickerParse\">Buying date is invalid or not follows the pattern \"mm/dd/yyyy\"</mat-error>\r\n          </mat-form-field>\r\n  \r\n          <!-- Reason for selling -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <textarea matInput id=\"reasonForSelling\" name=\"reasonForSelling\" placeholder=\"Reason for selling\"\r\n                matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\"\r\n                [(ngModel)]=\"model.reasonForSelling\" \r\n                value=\"model.reasonForSelling\"\r\n                #reasonForSelling=\"ngModel\">\r\n            </textarea>\r\n          </mat-form-field>\r\n        </div>\r\n\r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Notes -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <textarea matInput id=\"notes\" name=\"notes\" placeholder=\"Other notes\"\r\n                matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\"\r\n                [(ngModel)]=\"model.notes\" \r\n                value=\"model.notes\"\r\n                #notes=\"ngModel\">\r\n            </textarea>\r\n\r\n            <mat-icon matPrefix>subject</mat-icon>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <houses-edit *ngIf=\"type === propertyTypes.HOUSE\" \r\n            [defaultValues]=\"model.propertyTypeData\"\r\n            [defaultCurrencyUnit]=\"user.currency\"\r\n            (values)=\"onPropertyTypeDataChange($event)\">\r\n        </houses-edit>\r\n      </div>\r\n    </section>\r\n\r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-property\">\r\n      <button *ngIf=\"!editPropertyServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!(editPropertyForm.form.valid && includedFormsValid())\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"editPropertyServiceRunning\"\r\n          class=\"progress-bar progress-bar--edit-property\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n  </form>\r\n  <!-- <pre>{{model | json}}</pre> -->\r\n\r\n  <mat-progress-bar *ngIf=\"getPropertyServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-property\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/properties/components/properties-edit/properties-edit.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n.progress-bar--get-property {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-property {\n    width: 300px; } }\n"

/***/ }),

/***/ "./src/app/modules/properties/components/properties-edit/properties-edit.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var properties_service_1 = __webpack_require__("./src/app/modules/properties/properties.service.ts");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var house_1 = __webpack_require__("./src/app/modules/properties/models/house.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var PropertiesEditComponent = /** @class */ (function () {
    function PropertiesEditComponent(route, mainNavigatorService, propertiesService, appService, router, utilService, dateAdapter) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.propertiesService = propertiesService;
        this.appService = appService;
        this.router = router;
        this.utilService = utilService;
        this.dateAdapter = dateAdapter;
        this.editMode = false;
        this.user = null;
        this.property = null;
        this.propertyTypes = null;
        this.model = {
            id: null,
            email: null,
            type: null,
            propertyTypeData: {},
            address: {},
            askingPrice: null,
            askingPriceUnit: null,
            offerPrice: null,
            offerPriceUnit: null,
            walkAwayPrice: null,
            walkAwayPriceUnit: null,
            salePrice: null,
            salePriceUnit: null,
            dateListed: null,
            reasonForSelling: null,
            marketValue: null,
            marketValueUnit: null,
            renovationCost: null,
            renovationCostUnit: null,
            maintenanceCost: null,
            maintenanceCostUnit: null,
            description: null,
            otherCost: null,
            otherCostUnit: null,
            notes: null
        };
        this.id = null; //property id
        this.type = null; //property type
        //services flags
        this.editPropertyServiceRunning = false;
        this.getPropertyServiceRunning = false;
        this.subscription = new rxjs_1.Subscription();
        this.propertyTypeDataValid = false; //this value is set when property type data form is updated
        this.addressValid = false;
        this.dateAdapter.setLocale('en-GB');
        this.propertyTypes = constants_1.propertyTypes;
    }
    PropertiesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: '/investments', selected: false },
            { displayName: 'Properties', url: '/properties', selected: false }
        ]);
        //generates a user source object from authUser from resolver
        var user$ = this.route.data.map(function (data) { return data.authUser; });
        //generates an property id source from id parameter in url
        var id$ = this.route.paramMap.map(function (params) { return params.get('id'); });
        //combine user$ and id$ sources into one object and start listen to it for changes
        var newSubscription = user$.combineLatest(id$, function (user, id) {
            return { user: user, propertyId: id };
        }).subscribe(function (data) {
            _this.user = data.user;
            _this.model.email = data.user.email;
            _this.model.askingPriceUnit = _this.model.offerPriceUnit = _this.model.walkAwayPriceUnit =
                _this.model.salePriceUnit = _this.model.marketValueUnit = _this.model.renovationCostUnit =
                    _this.model.maintenanceCostUnit = _this.model.otherCostUnit = _this.user.currency;
            _this.model.id = data.propertyId || null;
            _this.editPropertyServiceRunning = false;
            _this.getPropertyServiceRunning = false;
            if (!data.propertyId) {
                //we are creating a new property
                _this.id = null;
                _this.editMode = false;
                _this.mainNavigatorService.appendLink({ displayName: 'Create Property', url: '', selected: true });
            }
            else {
                _this.mainNavigatorService.appendLink({ displayName: 'Edit Property', url: '', selected: true });
                //we are editing an existing property
                _this.id = data.propertyId;
                _this.editMode = true;
                _this.getProperty(data.propertyId); //get data
            }
        });
        this.subscription.add(newSubscription);
        //get TYPE parameter
        this.route.paramMap.map(function (params) { return params.get('type'); }).subscribe(function (type) {
            if (![constants_1.propertyTypes.HOUSE].includes(type)) {
                _this.appService.showResults('You must provide a valid property type to continue.', 'error');
                _this.router.navigate(['welcome']);
            }
            else {
                _this.type = type;
                _this.model.type = type;
                _this.model.propertyTypeData.buildingType = type;
            }
        });
    };
    PropertiesEditComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * Get a property from server based on the id provided
     * @param {string} id
     */
    PropertiesEditComponent.prototype.getProperty = function (id) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getProperty() > "; //for debugging
        if (!id) {
            this.appService.showResults("Invalid property ID", 'error');
            this.appService.consoleLog('error', methodTrace + " ID parameter must be provided, but was: ", id);
            return false;
        }
        this.getPropertyServiceRunning = true;
        var newSubscription = this.propertiesService.getPropertyById(this.user.email, id).subscribe(function (property) {
            _this.property = property;
            //populate the model
            _this.model.address = property.address;
            _this.model.askingPrice = property.askingPrice;
            _this.model.askingPriceUnit = property.askingPriceUnit;
            _this.model.offerPrice = property.offerPrice;
            _this.model.offerPriceUnit = property.offerPriceUnit;
            _this.model.walkAwayPrice = property.walkAwayPrice;
            _this.model.walkAwayPriceUnit = property.walkAwayPriceUnit;
            _this.model.salePrice = property.salePrice;
            _this.model.salePriceUnit = property.salePriceUnit;
            _this.model.dateListed = property.dateListed;
            _this.model.reasonForSelling = property.reasonForSelling;
            _this.model.marketValue = property.marketValue;
            _this.model.marketValueUnit = property.marketValueUnit;
            _this.model.renovationCost = property.renovationCost;
            _this.model.renovationCostUnit = property.renovationCostUnit;
            _this.model.maintenanceCost = property.maintenanceCost;
            _this.model.maintenanceCostUnit = property.maintenanceCostUnit;
            _this.model.description = property.description;
            _this.model.otherCost = property.otherCost;
            _this.model.otherCostUnit = property.otherCostUnit;
            _this.model.notes = property.notes;
            _this.model.type = property.type;
            if (property instanceof house_1.House) {
                _this.model.propertyTypeData = {
                    buildingType: property.buildingType,
                    titleType: property.titleType,
                    landArea: property.landArea,
                    floorArea: property.floorArea,
                    registeredValue: property.registeredValue,
                    registeredValueUnit: property.registeredValueUnit,
                    rates: property.rates,
                    ratesUnit: property.ratesUnit,
                    insurance: property.insurance,
                    insuranceUnit: property.insuranceUnit,
                    capitalGrowth: property.capitalGrowth,
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    parkingSpaces: property.parkingSpaces,
                    fenced: property.fenced,
                    rented: property.rented,
                    rentPrice: property.rentPrice,
                    rentPriceUnit: property.rentPriceUnit,
                    rentPricePeriod: property.rentPricePeriod,
                    rentAppraisalDone: property.rentAppraisalDone,
                    vacancy: property.vacancy,
                    bodyCorporate: property.bodyCorporate,
                    bodyCorporateUnit: property.bodyCorporateUnit,
                    utilitiesCost: property.utilitiesCost,
                    utilitiesCostUnit: property.utilitiesCostUnit,
                    managed: property.managed,
                    managerRate: property.managerRate,
                    agent: property.agent
                };
            }
            _this.getPropertyServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > ", error);
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
            _this.getPropertyServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    PropertiesEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.editPropertyServiceRunning = true;
        this.model.createdOn = new Date(Date.now());
        this.model.updatedOn = new Date(Date.now());
        //call the investment create service
        var newSubscription = this.propertiesService.create(this.model).subscribe(function (data) {
            if (data && data.id && data.type) {
                _this.appService.showResults("Property successfully created!", 'success');
                _this.router.navigate(['/properties/', data.type, 'edit', data.id]);
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.editPropertyServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit property service.", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error with the property services, please try again in a few minutes.", 'error');
            }
            _this.editPropertyServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    PropertiesEditComponent.prototype.onUpdate = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onUpdate() > "; //for debugging
        this.editPropertyServiceRunning = true;
        this.model.updatedOn = new Date(Date.now());
        //call the investment create service
        var newSubscription = this.propertiesService.update(this.model).subscribe(function (data) {
            if (data && data.id && data.type) {
                _this.appService.showResults("Property successfully updated!", 'success');
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.editPropertyServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit property service.", error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error with the property services, please try again in a few minutes.", 'error');
            }
            _this.editPropertyServiceRunning = false;
        });
        this.subscription.add(newSubscription);
    };
    PropertiesEditComponent.prototype.onCurrencyUnitChange = function ($event) {
        this.model[$event.source.id] = $event.value;
    };
    PropertiesEditComponent.prototype.onPropertyTypeDataChange = function ($event) {
        this.model.propertyTypeData = $event.value.model;
        this.propertyTypeDataValid = $event.value.valid;
    };
    PropertiesEditComponent.prototype.onAddressChange = function ($event) {
        this.model.address = $event.value.address;
        this.addressValid = $event.value.valid;
    };
    PropertiesEditComponent.prototype.includedFormsValid = function () {
        return this.propertyTypeDataValid && this.addressValid;
    };
    PropertiesEditComponent = __decorate([
        core_1.Component({
            selector: 'properties-edit',
            template: __webpack_require__("./src/app/modules/properties/components/properties-edit/properties-edit.component.html"),
            styles: [__webpack_require__("./src/app/modules/properties/components/properties-edit/properties-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, properties_service_1.PropertiesService,
            app_service_1.AppService, router_1.Router, util_service_1.UtilService, material_1.DateAdapter])
    ], PropertiesEditComponent);
    return PropertiesEditComponent;
}());
exports.PropertiesEditComponent = PropertiesEditComponent;


/***/ }),

/***/ "./src/app/modules/properties/components/properties-table/properties-table.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__properties-table\">\r\n  <section class=\"table__container\" [fxShow]=\"!getPropertiesServiceRunning && properties.length > 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <div class=\"table__overlay\" *ngIf=\"propertyTableActionRunning\">\r\n        <mat-spinner color=\"warn\"></mat-spinner>\r\n    </div>\r\n\r\n    <!-- Table fliter -->\r\n    <mat-form-field class=\"table-filter__input\">\r\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n    </mat-form-field>\r\n    \r\n    <mat-table #propertiesTable [dataSource]=\"propertiesDataSource\" matSort>\r\n  \r\n      <!-- Position Column -->\r\n      <ng-container matColumnDef=\"address\">\r\n        <mat-header-cell *matHeaderCellDef mat-sort-header>Address</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\" (click)=\"selection.select(element); goToPropertyEdit(element);\">{{element.address.description}}</mat-cell>\r\n      </ng-container>\r\n  \r\n      <ng-container matColumnDef=\"invest\">\r\n        <mat-header-cell *matHeaderCellDef>Invest</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element\">\r\n          <button mat-mini-fab color=\"primary\" \r\n              routerLink=\"/investments/property/create/{{element.id}}\" \r\n              [disabled]=\"user.email !== element.createdBy.email\"\r\n              [matTooltip]=\"user.email !== element.createdBy.email ? 'Only the creator (' + element.createdBy.name + ') can perform this action' : ''\"\r\n              matTooltipPosition=\"left\"\r\n              (click)=\"propertyTableActionRunning = true\">\r\n            <mat-icon aria-label=\"Create investment\">trending_up</mat-icon>\r\n          </button>\r\n        </mat-cell>\r\n      </ng-container>\r\n  \r\n      <ng-container matColumnDef=\"delete\">\r\n        <mat-header-cell *matHeaderCellDef>Delete</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let element; let propertyIndex = index;\">\r\n          <button mat-mini-fab color=\"warn\" \r\n              [disabled]=\"user.email !== element.createdBy.email\"\r\n              [matTooltip]=\"user.email !== element.createdBy.email ? 'Only the creator (' + element.createdBy.name + ') can perform this action' : ''\"\r\n              matTooltipPosition=\"left\"\r\n              (click)=\"openDeleteTeamDialog(propertyIndex, element)\">\r\n            <mat-icon aria-label=\"Delete\">delete</mat-icon>\r\n          </button>\r\n        </mat-cell>\r\n      </ng-container>\r\n      \r\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"\r\n          [ngClass]=\"{ 'selected': selection.isSelected(row)}\"></mat-row>\r\n    </mat-table>\r\n  </section>\r\n  <mat-paginator [fxShow]=\"!getPropertiesServiceRunning && properties.length > 0\" #propertiesPaginator \r\n      [pageSize]=\"25\" \r\n      [showFirstLastButtons]=\"true\"\r\n      [pageSizeOptions]=\"[25, 50, 100]\">\r\n  </mat-paginator>\r\n  \r\n  <section *ngIf=\"!getPropertiesServiceRunning && properties.length == 0\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    <mat-card fxFlex class=\"no-properties__card\">\r\n      <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n          fxLayoutAlign=\"space-around center\">\r\n        <p>You do not have properties yet.</p>\r\n      </mat-card-content>\r\n    </mat-card>\r\n    \r\n  </section>\r\n  \r\n  <mat-progress-bar *ngIf=\"getPropertiesServiceRunning\"\r\n    fxFlexAlign=\"center\"\r\n    class=\"progress-bar progress-bar--get-properties\"\r\n    color=\"primary\"\r\n    mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/properties/components/properties-table/properties-table.component.scss":
/***/ (function(module, exports) {

module.exports = ".table__container .table-filter__input {\n  margin: 0 24px; }\n\n.table__container mat-table mat-row .mat-column-address {\n  cursor: pointer; }\n\n.table__container mat-table .mat-row.selected {\n  background: #69f0ae; }\n\n.table__container mat-table .mat-row.selected .mat-column-address {\n    color: rgba(0, 0, 0, 0.87); }\n\n.no-properties__card {\n  text-align: center; }\n\n.no-properties__card md-card-content p {\n    margin-bottom: 0; }\n\n.progress-bar--get-properties {\n  width: 80%;\n  margin: 0 24px; }\n\n@media screen and (min-width: 600px) {\n  .table-filter__input {\n    margin: 0; }\n  .progress-bar--get-properties {\n    width: 300px;\n    margin: 0; } }\n"

/***/ }),

/***/ "./src/app/modules/properties/components/properties-table/properties-table.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var properties_service_1 = __webpack_require__("./src/app/modules/properties/properties.service.ts");
var yes_no_dialog_component_1 = __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var collections_1 = __webpack_require__("./node_modules/@angular/cdk/esm5/collections.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var PropertiesTableComponent = /** @class */ (function () {
    function PropertiesTableComponent(appService, propertiesService, dialog, router) {
        this.appService = appService;
        this.propertiesService = propertiesService;
        this.dialog = dialog;
        this.router = router;
        this.user = null;
        this.showActions = true; //if false we hide FAB buttons
        this.allowEdition = true; //if false we don't redirect to property edit component when click on adrdresss
        this.loadJustUserProperties = false; //if false when it get properties loads current user properties plus properties of investments where the user has a portion of it.
        this.selectedProperty = new core_1.EventEmitter();
        this.properties = [];
        this.propertiesDataSource = new material_1.MatTableDataSource([]);
        this.selection = new collections_1.SelectionModel(false, []);
        this.subscription = new rxjs_1.Subscription();
        this.getPropertiesServiceRunning = false;
        this.propertyTableActionRunning = false;
        this.displayedColumns = [];
    }
    PropertiesTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.displayedColumns = ['address'];
        if (this.showActions) {
            this.displayedColumns = this.displayedColumns.concat(['invest', 'delete']);
        }
        if (!this.properties.length) {
            this.getProperties();
        }
        // selection changed
        this.selection.onChange.subscribe(function (selectionChange) {
            _this.selectedProperty.emit(_this.selection.selected[0]);
        });
        //set filter predicate function to look just in the address field
        this.propertiesDataSource.filterPredicate = function (data, filter) {
            var address = data.address.description.toLowerCase().trim();
            var filterStr = filter.toLowerCase().trim();
            if (address.indexOf(filterStr) > -1) {
                return true;
            }
            return false;
        };
        //this is needed because for fields where the header does not match the property of the data for sorting as address <> description
        this.propertiesDataSource.sortingDataAccessor = function (data, sortHeaderId) {
            if (sortHeaderId === 'address') {
                return data.address.description;
            }
            return 1;
        };
    };
    PropertiesTableComponent.prototype.ngAfterViewInit = function () {
        this.propertiesDataSource.sort = this.propertiesSort;
    };
    PropertiesTableComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Get my properties from the server
     */
    PropertiesTableComponent.prototype.getProperties = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > getProperties() > "; //for debugging
        this.properties = [];
        this.propertiesDataSource.data = [];
        this.propertiesDataSource.paginator = this.propertiesTablePaginator;
        this.getPropertiesServiceRunning = true;
        var newSubscription = this.propertiesService.getProperties(this.user.email, this.loadJustUserProperties).subscribe(function (properties) {
            _this.properties = properties;
            _this.propertiesDataSource.data = properties;
            _this.propertiesDataSource.paginator = _this.propertiesTablePaginator;
            _this.getPropertiesServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.getPropertiesServiceRunning = false;
        });
    };
    PropertiesTableComponent.prototype.goToPropertyEdit = function (property) {
        if (this.allowEdition) {
            this.propertyTableActionRunning = true;
            this.router.navigate(['/properties', property.type, 'edit', property.id]);
        }
    };
    PropertiesTableComponent.prototype.openDeleteTeamDialog = function (indexInPage, property) {
        var _this = this;
        if (property === void 0) { property = null; }
        var methodTrace = this.constructor.name + " > openDeleteTeamDialog() > "; //for debugging
        if (!property) {
            this.appService.consoleLog('error', methodTrace + " Property is required to delete.");
            return false;
        }
        //map the index in the table to the indes in the properties array
        var index = indexInPage + this.propertiesTablePaginator.pageIndex * this.propertiesTablePaginator.pageSize;
        console.log(index);
        if (this.propertiesSort.direction === 'desc') {
            index = (-1) * (index + 1); //add one to index and invert sign
        }
        this.propertyTableActionRunning = true;
        var yesNoDialogRef = this.dialog.open(yes_no_dialog_component_1.YesNoDialogComponent, {
            width: '250px',
            data: {
                title: 'Delete property',
                message: "Are you sure you want to delete this property forever?"
            }
        });
        var newSubscription = yesNoDialogRef.afterClosed().subscribe(function (result) {
            if (result === 'yes') {
                _this.delete(index, property);
            }
            else {
                _this.propertyTableActionRunning = false;
            }
        });
        this.subscription.add(newSubscription);
        return false;
    };
    PropertiesTableComponent.prototype.delete = function (index, propertyToDelete) {
        var _this = this;
        if (propertyToDelete === void 0) { propertyToDelete = null; }
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        this.propertyTableActionRunning = true;
        var newSuscription = this.propertiesService.delete(propertyToDelete.id, this.user.email).subscribe(function (data) {
            if (data && data.removed > 0) {
                if (!_this.propertiesDataSource.filter.length) {
                    //data is not filtered, proceed with the easy way
                    _this.properties.splice(index, 1);
                }
                else {
                    //filtered data, we need to search for the property in order to removeit from the view
                    var propertyIndex = 0;
                    for (var _i = 0, _a = _this.properties; _i < _a.length; _i++) {
                        var property = _a[_i];
                        if (property.id === propertyToDelete.id) {
                            break;
                        }
                        propertyIndex += 1;
                    }
                    _this.properties.splice(propertyIndex, 1);
                }
                _this.propertiesDataSource.data = _this.properties;
                _this.appService.showResults("Property successfully removed!", 'success');
            }
            else {
                _this.appService.showResults("Property could not be removed, please try again.", 'error');
            }
            _this.propertyTableActionRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error in the server while performing this action > " + error);
            if (error.codeno === 400) {
                _this.appService.showResults("There was an error in the server while performing this action, please try again in a few minutes.", 'error');
            }
            else if (error.codeno === 475) {
                //property associated to an investment
                _this.appService.showResults(error.msg, 'error', 7000);
            }
            else if (error.codeno === 462) {
                _this.appService.showResults("You cannot delete this property because you are not the creator of it. Ask " + error.data.creator.name + " to do it.", 'error');
            }
            else {
                _this.appService.showResults("There was an error with this service and the information provided.", 'error');
            }
            _this.propertyTableActionRunning = false;
        });
        this.subscription.add(newSuscription);
    };
    PropertiesTableComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.propertiesDataSource.filter = filterValue; //apply filter
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", user_1.User)
    ], PropertiesTableComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PropertiesTableComponent.prototype, "showActions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PropertiesTableComponent.prototype, "allowEdition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PropertiesTableComponent.prototype, "loadJustUserProperties", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PropertiesTableComponent.prototype, "selectedProperty", void 0);
    __decorate([
        core_1.ViewChild('propertiesPaginator'),
        __metadata("design:type", material_1.MatPaginator)
    ], PropertiesTableComponent.prototype, "propertiesTablePaginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], PropertiesTableComponent.prototype, "propertiesSort", void 0);
    PropertiesTableComponent = __decorate([
        core_1.Component({
            selector: 'properties-table',
            template: __webpack_require__("./src/app/modules/properties/components/properties-table/properties-table.component.html"),
            styles: [__webpack_require__("./src/app/modules/properties/components/properties-table/properties-table.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, properties_service_1.PropertiesService, material_1.MatDialog, router_1.Router])
    ], PropertiesTableComponent);
    return PropertiesTableComponent;
}());
exports.PropertiesTableComponent = PropertiesTableComponent;


/***/ }),

/***/ "./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Select a property</h2>\r\n\r\n<mat-dialog-content>\r\n  <div fxLayout=\"column\" class=\"container__yes-no-dialog\">\r\n    <properties-table [user]=\"data.user\" \r\n        [showActions]=\"false\" \r\n        [allowEdition]=\"false\"\r\n        [loadJustUserProperties]=\"true\" \r\n        (selectedProperty)=\"onPropertySelected($event)\"></properties-table>\r\n    {{data.message}}\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n  <button mat-mini-fab color=\"warn\" [mat-dialog-close]=\"null\">\r\n    <mat-icon aria-label=\"No\">clear</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = ".mat-dialog-content properties-table {\n  margin: 0 -24px; }\n\n@media screen and (min-width: 600px) {\n  .mat-dialog-content properties-table {\n    margin: 0; } }\n"

/***/ }),

/***/ "./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var PropertySelectorDialogComponent = /** @class */ (function () {
    function PropertySelectorDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    PropertySelectorDialogComponent.prototype.ngOnInit = function () { };
    PropertySelectorDialogComponent.prototype.onPropertySelected = function ($event) {
        this.dialogRef.close($event);
    };
    PropertySelectorDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-property-selector-dialog',
            template: __webpack_require__("./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.html"),
            styles: [__webpack_require__("./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], PropertySelectorDialogComponent);
    return PropertySelectorDialogComponent;
}());
exports.PropertySelectorDialogComponent = PropertySelectorDialogComponent;


/***/ }),

/***/ "./src/app/modules/properties/models/address.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address(description, latitude, longitude, mapsPlaceId) {
        if (description === void 0) { description = null; }
        if (latitude === void 0) { latitude = null; }
        if (longitude === void 0) { longitude = null; }
        if (mapsPlaceId === void 0) { mapsPlaceId = null; }
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mapsPlaceId = mapsPlaceId;
    }
    return Address;
}());
exports.Address = Address;


/***/ }),

/***/ "./src/app/modules/properties/models/house.ts":
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
var property_1 = __webpack_require__("./src/app/modules/properties/models/property.ts");
var House = /** @class */ (function (_super) {
    __extends(House, _super);
    function House(id, type, address, createdBy, landArea, floorArea, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit, walkAwayPrice, walkAwayPriceUnit, salePrice, salePriceUnit, dateListed, reasonForSelling, marketValue, marketValueUnit, registeredValue, registeredValueUnit, rates, ratesUnit, insurance, insuranceUnit, renovationCost, renovationCostUnit, maintenanceCost, maintenanceCostUnit, description, otherCost, otherCostUnit, notes, capitalGrowth, bedrooms, bathrooms, parkingSpaces, fenced, rented, rentPrice, rentPriceUnit, rentPricePeriod, rentAppraisalDone, vacancy, bodyCorporate, bodyCorporateUnit, utilitiesCost, utilitiesCostUnit, agent, managed, managerRate, buildingType, titleType) {
        if (id === void 0) { id = null; }
        if (type === void 0) { type = 'house'; }
        if (address === void 0) { address = null; }
        if (createdBy === void 0) { createdBy = null; }
        if (landArea === void 0) { landArea = null; }
        if (floorArea === void 0) { floorArea = null; }
        if (askingPrice === void 0) { askingPrice = null; }
        if (askingPriceUnit === void 0) { askingPriceUnit = null; }
        if (offerPrice === void 0) { offerPrice = null; }
        if (offerPriceUnit === void 0) { offerPriceUnit = null; }
        if (walkAwayPrice === void 0) { walkAwayPrice = null; }
        if (walkAwayPriceUnit === void 0) { walkAwayPriceUnit = null; }
        if (salePrice === void 0) { salePrice = null; }
        if (salePriceUnit === void 0) { salePriceUnit = null; }
        if (dateListed === void 0) { dateListed = null; }
        if (reasonForSelling === void 0) { reasonForSelling = null; }
        if (marketValue === void 0) { marketValue = null; }
        if (marketValueUnit === void 0) { marketValueUnit = null; }
        if (registeredValue === void 0) { registeredValue = null; }
        if (registeredValueUnit === void 0) { registeredValueUnit = null; }
        if (rates === void 0) { rates = null; }
        if (ratesUnit === void 0) { ratesUnit = null; }
        if (insurance === void 0) { insurance = null; }
        if (insuranceUnit === void 0) { insuranceUnit = null; }
        if (renovationCost === void 0) { renovationCost = null; }
        if (renovationCostUnit === void 0) { renovationCostUnit = null; }
        if (maintenanceCost === void 0) { maintenanceCost = null; }
        if (maintenanceCostUnit === void 0) { maintenanceCostUnit = null; }
        if (description === void 0) { description = null; }
        if (otherCost === void 0) { otherCost = null; }
        if (otherCostUnit === void 0) { otherCostUnit = null; }
        if (notes === void 0) { notes = null; }
        if (capitalGrowth === void 0) { capitalGrowth = null; }
        if (bedrooms === void 0) { bedrooms = null; }
        if (bathrooms === void 0) { bathrooms = null; }
        if (parkingSpaces === void 0) { parkingSpaces = null; }
        if (fenced === void 0) { fenced = false; }
        if (rented === void 0) { rented = false; }
        if (rentPrice === void 0) { rentPrice = null; }
        if (rentPriceUnit === void 0) { rentPriceUnit = null; }
        if (rentPricePeriod === void 0) { rentPricePeriod = 'week'; }
        if (rentAppraisalDone === void 0) { rentAppraisalDone = false; }
        if (vacancy === void 0) { vacancy = null; }
        if (bodyCorporate === void 0) { bodyCorporate = null; }
        if (bodyCorporateUnit === void 0) { bodyCorporateUnit = null; }
        if (utilitiesCost === void 0) { utilitiesCost = null; }
        if (utilitiesCostUnit === void 0) { utilitiesCostUnit = null; }
        if (managed === void 0) { managed = false; }
        if (managerRate === void 0) { managerRate = null; }
        if (buildingType === void 0) { buildingType = 'house'; }
        if (titleType === void 0) { titleType = null; }
        var _this = _super.call(this, id, type, address, createdBy, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit, walkAwayPrice, walkAwayPriceUnit, salePrice, salePriceUnit, dateListed, reasonForSelling, marketValue, marketValueUnit, renovationCost, renovationCostUnit, maintenanceCost, maintenanceCostUnit, description, otherCost, otherCostUnit, notes) || this;
        _this.landArea = landArea;
        _this.floorArea = floorArea;
        _this.registeredValue = registeredValue;
        _this.registeredValueUnit = registeredValueUnit;
        _this.rates = rates;
        _this.ratesUnit = ratesUnit;
        _this.insurance = insurance;
        _this.insuranceUnit = insuranceUnit;
        _this.capitalGrowth = capitalGrowth;
        _this.bedrooms = bedrooms;
        _this.bathrooms = bathrooms;
        _this.parkingSpaces = parkingSpaces;
        _this.fenced = fenced;
        _this.rented = rented;
        _this.rentPrice = rentPrice;
        _this.rentPriceUnit = rentPriceUnit;
        _this.rentPricePeriod = rentPricePeriod;
        _this.rentAppraisalDone = rentAppraisalDone;
        _this.vacancy = vacancy;
        _this.bodyCorporate = bodyCorporate;
        _this.bodyCorporateUnit = bodyCorporateUnit;
        _this.utilitiesCost = utilitiesCost;
        _this.utilitiesCostUnit = utilitiesCostUnit;
        _this.agent = agent;
        _this.managed = managed;
        _this.managerRate = managerRate;
        _this.buildingType = buildingType;
        _this.titleType = titleType;
        return _this;
    }
    return House;
}(property_1.Property));
exports.House = House;


/***/ }),

/***/ "./src/app/modules/properties/models/property.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Property = /** @class */ (function () {
    function Property(id, type, address, createdBy, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit, walkAwayPrice, walkAwayPriceUnit, salePrice, salePriceUnit, dateListed, reasonForSelling, marketValue, marketValueUnit, renovationCost, renovationCostUnit, maintenanceCost, maintenanceCostUnit, description, otherCost, otherCostUnit, notes) {
        if (id === void 0) { id = null; }
        if (type === void 0) { type = 'house'; }
        if (address === void 0) { address = null; }
        if (createdBy === void 0) { createdBy = null; }
        if (askingPrice === void 0) { askingPrice = null; }
        if (askingPriceUnit === void 0) { askingPriceUnit = null; }
        if (offerPrice === void 0) { offerPrice = null; }
        if (offerPriceUnit === void 0) { offerPriceUnit = null; }
        if (walkAwayPrice === void 0) { walkAwayPrice = null; }
        if (walkAwayPriceUnit === void 0) { walkAwayPriceUnit = null; }
        if (salePrice === void 0) { salePrice = null; }
        if (salePriceUnit === void 0) { salePriceUnit = null; }
        if (dateListed === void 0) { dateListed = null; }
        if (reasonForSelling === void 0) { reasonForSelling = null; }
        if (marketValue === void 0) { marketValue = null; }
        if (marketValueUnit === void 0) { marketValueUnit = null; }
        if (renovationCost === void 0) { renovationCost = null; }
        if (renovationCostUnit === void 0) { renovationCostUnit = null; }
        if (maintenanceCost === void 0) { maintenanceCost = null; }
        if (maintenanceCostUnit === void 0) { maintenanceCostUnit = null; }
        if (description === void 0) { description = null; }
        if (otherCost === void 0) { otherCost = null; }
        if (otherCostUnit === void 0) { otherCostUnit = null; }
        if (notes === void 0) { notes = null; }
        this.id = id;
        this.type = type;
        this.address = address;
        this.createdBy = createdBy;
        this.askingPrice = askingPrice;
        this.askingPriceUnit = askingPriceUnit;
        this.offerPrice = offerPrice;
        this.offerPriceUnit = offerPriceUnit;
        this.walkAwayPrice = walkAwayPrice;
        this.walkAwayPriceUnit = walkAwayPriceUnit;
        this.salePrice = salePrice;
        this.salePriceUnit = salePriceUnit;
        this.dateListed = dateListed;
        this.reasonForSelling = reasonForSelling;
        this.marketValue = marketValue;
        this.marketValueUnit = marketValueUnit;
        this.renovationCost = renovationCost;
        this.renovationCostUnit = renovationCostUnit;
        this.maintenanceCost = maintenanceCost;
        this.maintenanceCostUnit = maintenanceCostUnit;
        this.description = description;
        this.otherCost = otherCost;
        this.otherCostUnit = otherCostUnit;
        this.notes = notes;
    }
    return Property;
}());
exports.Property = Property;


/***/ }),

/***/ "./src/app/modules/properties/properties-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var properties_edit_component_1 = __webpack_require__("./src/app/modules/properties/components/properties-edit/properties-edit.component.ts");
var auth_resolver_service_1 = __webpack_require__("./src/app/auth-resolver.service.ts");
var properties_dashboard_component_1 = __webpack_require__("./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.ts");
var routes = [
    {
        path: 'properties',
        children: [
            {
                path: ':type/create',
                component: properties_edit_component_1.PropertiesEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: ':type/edit/:id',
                component: properties_edit_component_1.PropertiesEditComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            },
            {
                path: '',
                pathMatch: 'full',
                component: properties_dashboard_component_1.PropertiesDashboardComponent,
                resolve: {
                    authUser: auth_resolver_service_1.AuthResolver
                }
            }
        ]
    }
];
var PropertiesRoutingModule = /** @class */ (function () {
    function PropertiesRoutingModule() {
    }
    PropertiesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PropertiesRoutingModule);
    return PropertiesRoutingModule;
}());
exports.PropertiesRoutingModule = PropertiesRoutingModule;


/***/ }),

/***/ "./src/app/modules/properties/properties.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var properties_routing_module_1 = __webpack_require__("./src/app/modules/properties/properties-routing.module.ts");
var properties_dashboard_component_1 = __webpack_require__("./src/app/modules/properties/components/properties-dashboard/properties-dashboard.component.ts");
var shared_module_1 = __webpack_require__("./src/app/modules/shared/shared.module.ts");
var properties_service_1 = __webpack_require__("./src/app/modules/properties/properties.service.ts");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var properties_edit_component_1 = __webpack_require__("./src/app/modules/properties/components/properties-edit/properties-edit.component.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var houses_edit_component_1 = __webpack_require__("./src/app/modules/properties/components/houses-edit/houses-edit.component.ts");
var properties_table_component_1 = __webpack_require__("./src/app/modules/properties/components/properties-table/properties-table.component.ts");
var property_selector_dialog_component_1 = __webpack_require__("./src/app/modules/properties/components/property-selector-dialog/property-selector-dialog.component.ts");
var PropertiesModule = /** @class */ (function () {
    function PropertiesModule() {
    }
    PropertiesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                properties_routing_module_1.PropertiesRoutingModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                custom_material_design_module_1.CustomMaterialDesignModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                properties_dashboard_component_1.PropertiesDashboardComponent,
                properties_edit_component_1.PropertiesEditComponent,
                houses_edit_component_1.HousesEditComponent,
                properties_table_component_1.PropertiesTableComponent,
                property_selector_dialog_component_1.PropertySelectorDialogComponent
            ],
            providers: [properties_service_1.PropertiesService],
            entryComponents: [
                property_selector_dialog_component_1.PropertySelectorDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
            ]
        })
    ], PropertiesModule);
    return PropertiesModule;
}());
exports.PropertiesModule = PropertiesModule;


/***/ }),

/***/ "./src/app/modules/properties/properties.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var constants_1 = __webpack_require__("./src/app/constants.ts");
var house_1 = __webpack_require__("./src/app/modules/properties/models/house.ts");
var of_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
var address_1 = __webpack_require__("./src/app/modules/properties/models/address.ts");
var PropertiesService = /** @class */ (function () {
    function PropertiesService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = environment_1.environment.apiHost + '/api/properties';
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    }
    /**
     * Server call to Create a new property in the system
     * @param postData
     */
    PropertiesService.prototype.create = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > create() > "; //for debugging
        return this.http.post(this.serverHost + "/create", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to Update an investment in the system
     * @param postData
     */
    PropertiesService.prototype.update = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > update() > "; //for debugging
        return this.http.post(this.serverHost + "/update", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to Get a property from the server based on its ID
     * @param {string} id . The property id
     */
    PropertiesService.prototype.getPropertyById = function (email, id) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getPropertyById() > "; //for debugging
        if (!id || !email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return of_1.of(null);
        }
        var params = new http_1.HttpParams().set('email', email);
        var data$ = this.http.get(this.serverHost + "/" + id, { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
        return data$.switchMap(function (data) {
            var result = null;
            if (data && data._id) {
                var createdBy = new user_1.User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
                var address = new address_1.Address();
                if (data.location) {
                    address = new address_1.Address(data.location.address, data.location.coordinates[1], data.location.coordinates[0], data.location.mapsPlaceId);
                }
                if (data.propertyType === constants_1.propertyTypes.HOUSE) {
                    result = new house_1.House(data._id, data.propertyType, address, createdBy, data.propertyTypeData.landArea, data.propertyTypeData.floorArea, data.askingPrice, data.askingPriceUnit, data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.salePrice, data.salePriceUnit, data.dateListed, data.reasonForSelling, data.marketValue, data.marketValueUnit, data.propertyTypeData.registeredValue, data.propertyTypeData.registeredValueUnit, data.propertyTypeData.rates, data.propertyTypeData.ratesUnit, data.propertyTypeData.insurance, data.propertyTypeData.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, data.description, data.otherCost, data.otherCostUnit, data.notes, data.propertyTypeData.capitalGrowth, data.propertyTypeData.bedrooms, data.propertyTypeData.bathrooms, data.propertyTypeData.parkingSpaces, data.propertyTypeData.fenced, data.propertyTypeData.rented, data.propertyTypeData.rentPrice, data.propertyTypeData.rentPriceUnit, data.propertyTypeData.rentPricePeriod, data.propertyTypeData.rentAppraisalDone, data.propertyTypeData.vacancy, data.propertyTypeData.bodyCorporate, data.propertyTypeData.bodyCorporateUnit, data.propertyTypeData.utilitiesCost, data.propertyTypeData.utilitiesCostUnit, data.propertyTypeData.agent, data.propertyTypeData.managed, data.propertyTypeData.managerRate, data.propertyTypeData.buildingType, data.propertyTypeData.titleType);
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return Observable_1.Observable.of(result);
        });
    };
    /**
     * Server call to Get all the properties for the current user from the server.
     * This proeprties will be the properties the user created plus the investment properties where she/he has a piece of the cake.
     * @param {string} email . The user email
     * @param {boolean} justUserProperties . If false it get properties created by the user with the email provided plus properties from investments where the user has a portion of it.
     *                                       If true it just bring back the properties created by the user with the email provided.
     */
    PropertiesService.prototype.getProperties = function (email, justUserProperties) {
        var _this = this;
        if (justUserProperties === void 0) { justUserProperties = false; }
        var methodTrace = this.constructor.name + " > getProperties() > "; //for debugging
        if (!email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Observable_1.Observable.from([]);
        }
        var params = new http_1.HttpParams().set('email', email).set('justUserProperties', justUserProperties + '');
        var responseData$ = this.http.get(this.serverHost + "/getAll", { params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
        return responseData$.switchMap(function (responseData) {
            var properties = [];
            if (responseData && responseData instanceof Array) {
                for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                    var data = responseData_1[_i];
                    var createdBy = new user_1.User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
                    var address = new address_1.Address();
                    if (data.location) {
                        address = new address_1.Address(data.location.address, data.location.coordinates[1], data.location.coordinates[0], data.location.mapsPlaceId);
                    }
                    if (data.propertyType === constants_1.propertyTypes.HOUSE) {
                        properties.push(new house_1.House(data._id, data.propertyType, address, createdBy, data.landArea, data.floorArea, data.askingPrice, data.askingPriceUnit, data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.salePrice, data.salePriceUnit, data.dateListed, data.reasonForSelling, data.marketValue, data.marketValueUnit, data.registeredValue, data.registeredValueUnit, data.rates, data.ratesUnit, data.insurance, data.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, data.description, data.otherCost, data.otherCostUnit, data.notes, data.capitalGrowth, data.bedrooms, data.bathrooms, data.parkingSpaces, data.fenced, data.rented, data.rentPrice, data.rentPriceUnit, data.rentPricePeriod, data.rentAppraisalDone, data.vacancy, data.bodyCorporate, data.bodyCorporateUnit, data.utilitiesCost, data.utilitiesCostUnit, data.agent, data.managed, data.managerRate, data.buildingType, data.titleType));
                    }
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            return Observable_1.Observable.of(properties);
        });
    };
    /**
     * Server call to delete a property from the system
     * @param {string} id . The record id
     * @param {string} email . The current user email.
     */
    PropertiesService.prototype.delete = function (id, email) {
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        if (!id || !email) {
            this.appService.consoleLog('error', methodTrace + " Required parameters missing.");
            return Observable_1.Observable.throw(null);
        }
        var params = new http_1.HttpParams().set('email', email);
        return this.http.delete(this.serverHost + "/delete/" + id, { headers: this.headers, params: params })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    PropertiesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], PropertiesService);
    return PropertiesService;
}());
exports.PropertiesService = PropertiesService;


/***/ }),

/***/ "./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__address-autocomplete\" #addressAutocompleteForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n\r\n    <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n      <!-- <h3 class=\"title\">\r\n        <p class=\"header\">Features</p>\r\n      </h3> -->\r\n\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          \r\n          <input matInput type=\"text\" [id]=\"id\" [name]=\"id\" [placeholder]=\"placeHolder\" \r\n              [(ngModel)]=\"model\"\r\n              [matAutocomplete]=\"addressAutocomplete\"\r\n              required\r\n              #addressInput=\"ngModel\">\r\n\r\n          <mat-icon matPrefix>directions</mat-icon>\r\n          <mat-error *ngIf=\"addressInput.invalid && (addressInput.dirty || addressInput.touched) && addressInput.errors.required\">This field is required.</mat-error>\r\n          \r\n          <mat-autocomplete autoActiveFirstOption #addressAutocomplete=\"matAutocomplete\" (optionSelected)=\"onOptionSelected($event)\" [displayWith]=\"autocompleteDisplayFn\">\r\n            <mat-option *ngFor=\"let option of options\" [value]=\"option\">\r\n              {{ option.description }}\r\n            </mat-option>\r\n          </mat-autocomplete>  \r\n          \r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</form>"

/***/ }),

/***/ "./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var core_2 = __webpack_require__("./node_modules/@agm/core/index.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var address_1 = __webpack_require__("./src/app/modules/properties/models/address.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var AddressAutocompleteComponent = /** @class */ (function () {
    function AddressAutocompleteComponent(mapsAPILoader) {
        this.mapsAPILoader = mapsAPILoader;
        this.defaultValues = null; //the default values of the component model
        //@Input() required : boolean = false;
        this.values = new core_1.EventEmitter();
        this.model = {
            description: null,
            latitude: null,
            longitude: null,
            mapsPlaceId: null
        };
        this.options = [];
        this.subscription = new rxjs_1.Subscription();
        this.autocompleteService = null;
        this.placesService = null;
    }
    AddressAutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        Object.assign(this.model, this.defaultValues);
        this.mapsAPILoader.load().then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        });
    };
    AddressAutocompleteComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    AddressAutocompleteComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //send data before touching any value
        this.emitValues();
        //after any event in the form we send updated data
        var newSubscription = this.form.valueChanges.debounceTime(500).subscribe(function (values) {
            if (values.address) {
                if (values.address.description) {
                    if (values.address.mapsPlaceId) {
                        //when the user selected an option from the autocomplete suggestions
                        _this.getPlaceDetails(values.address.mapsPlaceId);
                    }
                    else {
                        //the user save a custom address. She did not picked it from the suggestion list.
                        _this.emitValues(values.address.description);
                    }
                }
                else if (typeof values.address == 'string') {
                    //This happens while the user is writing in the field before selecting an option from suggestion list
                    //retrieve matching places
                    _this.autocompleteService.getQueryPredictions({ input: values.address }, function (data, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            _this.options = data;
                        }
                        else {
                            _this.options = [];
                        }
                    });
                    _this.emitValues(values.address);
                }
                else {
                    _this.options = [];
                    _this.emitValues();
                }
            }
            else {
                _this.options = [];
                _this.emitValues();
            }
        });
        this.subscription.add(newSubscription);
    };
    /**
     * Using this function we can map our selection to the item description intead the whole object
     */
    AddressAutocompleteComponent.prototype.autocompleteDisplayFn = function (place) {
        return place ? place.description : '';
    };
    AddressAutocompleteComponent.prototype.onOptionSelected = function (matAutocompleteSelectedEvent) {
        this.getPlaceDetails(matAutocompleteSelectedEvent.option.value.place_id);
    };
    AddressAutocompleteComponent.prototype.getPlaceDetails = function (mapsPlaceId) {
        var _this = this;
        if (!mapsPlaceId) {
            return false;
        }
        this.placesService.getDetails({ placeId: mapsPlaceId }, function (data, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                _this.model.latitude = data.geometry.location.lat();
                _this.model.longitude = data.geometry.location.lng();
                _this.model.description = data.formatted_address;
                _this.model.mapsPlaceId = mapsPlaceId;
            }
            else {
                _this.model.latitude = null;
                _this.model.longitude = null;
                _this.model.description = null;
                _this.model.place_id = null;
            }
            _this.emitValues();
        });
    };
    AddressAutocompleteComponent.prototype.emitValues = function (description) {
        if (description === void 0) { description = null; }
        var address = null;
        var valid = this.form.valid;
        if (this.model.mapsPlaceId) {
            //the user picked from the suggestion list
            address = new address_1.Address(this.model.description, this.model.latitude, this.model.longitude, this.model.mapsPlaceId);
        }
        else if (description) {
            //the user just type a custom address
            address = new address_1.Address(description, null, null, null);
        }
        else {
            //none of above, return invalid
            valid = false;
        }
        this.values.emit({
            value: {
                address: address,
                valid: valid
            }
        });
    };
    __decorate([
        core_1.ViewChild('addressAutocompleteForm'),
        __metadata("design:type", Object)
    ], AddressAutocompleteComponent.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild("addressInput"),
        __metadata("design:type", forms_1.NgModel)
    ], AddressAutocompleteComponent.prototype, "addressInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AddressAutocompleteComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AddressAutocompleteComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddressAutocompleteComponent.prototype, "defaultValues", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AddressAutocompleteComponent.prototype, "values", void 0);
    AddressAutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'address-autocomplete',
            template: __webpack_require__("./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.scss")]
        }),
        __metadata("design:paramtypes", [core_2.MapsAPILoader])
    ], AddressAutocompleteComponent);
    return AddressAutocompleteComponent;
}());
exports.AddressAutocompleteComponent = AddressAutocompleteComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/currency-unit/currency-unit.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-form-field class=\"form__field\" *ngIf=\"type === 'currency'\">\r\n  <mat-select id=\"{{id}}\" placeholder=\"{{placeHolder}}\" [value]=\"value\" (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option value=\"AUD\">{{view === 'narrow' ? 'AUD' : 'Australian Dollar'}}</mat-option>\r\n    <mat-option value=\"EUR\">{{view === 'narrow' ? 'EUR' : 'Euro'}}</mat-option>\r\n    <mat-option value=\"NZD\">{{view === 'narrow' ? 'NZD' : 'New Zealand Dollar'}}</mat-option>\r\n    <mat-option value=\"USD\">{{view === 'narrow' ? 'USD' : 'US Dollar'}}</mat-option>\r\n  </mat-select>\r\n  \r\n  <mat-hint align=\"start\">{{hint}}</mat-hint>\r\n</mat-form-field>\r\n\r\n<mat-form-field class=\"form__field\" *ngIf=\"type === 'crypto'\">\r\n  <mat-select id=\"{{id}}\" placeholder=\"{{placeHolder}}\" [value]=\"value\" (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option value=\"BTC\">{{view === 'narrow' ? 'BTC' : 'Bitcoin'}}</mat-option>\r\n    <mat-option value=\"XMR\">{{view === 'narrow' ? 'XMR' : 'Monero'}}</mat-option>\r\n  </mat-select>\r\n  \r\n  <mat-hint align=\"start\">{{hint}}</mat-hint>\r\n</mat-form-field>"

/***/ }),

/***/ "./src/app/modules/shared/components/currency-unit/currency-unit.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/shared/components/currency-unit/currency-unit.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
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
            template: __webpack_require__("./src/app/modules/shared/components/currency-unit/currency-unit.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/currency-unit/currency-unit.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CurrencyUnitComponent);
    return CurrencyUnitComponent;
}());
exports.CurrencyUnitComponent = CurrencyUnitComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/dynamic-map/dynamic-map.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- this creates a google map on the page with the given lat/lng from -->\r\n<!-- the component as the initial center of the map: -->\r\n<agm-map *ngIf=\"latitude && longitude\" fxFlex [latitude]=\"latitude\" [longitude]=\"longitude\" [zoom]=\"17\" [ngStyle]=\"{'height' : mapContainerHeight + 'px'}\">\r\n  <agm-marker *ngFor=\"let marker of markers\"  [latitude]=\"marker.latitude\" [longitude]=\"marker.longitude\"></agm-marker>\r\n</agm-map>\r\n"

/***/ }),

/***/ "./src/app/modules/shared/components/dynamic-map/dynamic-map.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/shared/components/dynamic-map/dynamic-map.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var DynamicMapComponent = /** @class */ (function () {
    function DynamicMapComponent() {
        this.latitude = null;
        this.longitude = null;
        this.markers = [];
        this.mapContainerHeight = '300'; //px
    }
    DynamicMapComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicMapComponent.prototype, "latitude", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicMapComponent.prototype, "longitude", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicMapComponent.prototype, "markers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicMapComponent.prototype, "mapContainerHeight", void 0);
    DynamicMapComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-map',
            template: __webpack_require__("./src/app/modules/shared/components/dynamic-map/dynamic-map.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/dynamic-map/dynamic-map.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DynamicMapComponent);
    return DynamicMapComponent;
}());
exports.DynamicMapComponent = DynamicMapComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/info-tooltip/info-tooltip.component.html":
/***/ (function(module, exports) {

module.exports = "<span fxLayout=\"row\" fxLayoutGap=\"5px\" fxLayoutAlign=\"start center\" *ngIf=\"(title && title.length > 0) || (text && text.length > 0)\">\r\n    <label *ngIf=\"title && title.length > 0\">{{title}}</label>\r\n    <mat-icon *ngIf=\"text && text.length > 0\" \r\n        [matTooltip]=\"text\" \r\n        [matTooltipPosition]=\"position\"\r\n        [matTooltipHideDelay]=\"5000\">info_outline</mat-icon>  \r\n</span>"

/***/ }),

/***/ "./src/app/modules/shared/components/info-tooltip/info-tooltip.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/shared/components/info-tooltip/info-tooltip.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
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
            template: __webpack_require__("./src/app/modules/shared/components/info-tooltip/info-tooltip.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/info-tooltip/info-tooltip.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], InfoTooltipComponent);
    return InfoTooltipComponent;
}());
exports.InfoTooltipComponent = InfoTooltipComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/main-navigator/main-navigator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navigation--main\">\r\n  <mat-chip-list fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap>\r\n    <mat-chip class=\"nav--item\" *ngFor=\"let link of links\" [routerLink]=\"link.url\" [selected]=\"link.selected\">{{link.displayName}}</mat-chip>\r\n  </mat-chip-list>      \r\n</nav>"

/***/ }),

/***/ "./src/app/modules/shared/components/main-navigator/main-navigator.component.scss":
/***/ (function(module, exports) {

module.exports = ".navigation--main mat-chip.nav--item {\n  margin: 0 8px 8px 0; }\n"

/***/ }),

/***/ "./src/app/modules/shared/components/main-navigator/main-navigator.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
            template: __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, app_service_1.AppService])
    ], MainNavigatorComponent);
    return MainNavigatorComponent;
}());
exports.MainNavigatorComponent = MainNavigatorComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/main-navigator/main-navigator.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
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

/***/ "./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap fxLayoutAlign=\"space-around center\" class=\"snackbar--simple\">\r\n  <p fxFlex class=\"message\">{{data.message}}</p>\r\n  <mat-icon class=\"icon\" aria-label=\"Close\" (click)=\"actionClicked()\">clear</mat-icon>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.scss":
/***/ (function(module, exports) {

module.exports = ".snackbar--simple {\n  font-size: 12px;\n  cursor: default; }\n  .snackbar--simple .icon {\n    cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
            template: __webpack_require__("./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_SNACK_BAR_DATA)),
        __metadata("design:paramtypes", [material_1.MatSnackBarRef, Object])
    ], SnackbarSimpleComponent);
    return SnackbarSimpleComponent;
}());
exports.SnackbarSimpleComponent = SnackbarSimpleComponent;


/***/ }),

/***/ "./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>{{data.title}}</h2>\r\n\r\n<mat-dialog-content>\r\n  <div fxLayout=\"column\" class=\"container__yes-no-dialog\">\r\n    {{data.message}}\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n  <button mat-mini-fab color=\"warn\" mat-dialog-close=\"no\">\r\n    <mat-icon aria-label=\"No\">clear</mat-icon>\r\n  </button>\r\n  <button mat-mini-fab color=\"accent\" mat-dialog-close=\"yes\">\r\n    <mat-icon aria-label=\"Yes\">done</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
            template: __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.html"),
            styles: [__webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], YesNoDialogComponent);
    return YesNoDialogComponent;
}());
exports.YesNoDialogComponent = YesNoDialogComponent;


/***/ }),

/***/ "./src/app/modules/shared/custom-material-design.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
                material_1.MatSliderModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatAutocompleteModule
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
                material_1.MatSliderModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatAutocompleteModule
            ]
        })
    ], CustomMaterialDesignModule);
    return CustomMaterialDesignModule;
}());
exports.CustomMaterialDesignModule = CustomMaterialDesignModule;


/***/ }),

/***/ "./src/app/modules/shared/directives/equal-validator.directive.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
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

/***/ "./src/app/modules/shared/directives/number-validator.directive.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var NumberValidatorDirective = /** @class */ (function () {
    function NumberValidatorDirective(validationType) {
        this.validationType = validationType;
    }
    NumberValidatorDirective_1 = NumberValidatorDirective;
    NumberValidatorDirective.prototype.validate = function (control) {
        //if the field is empty return valid
        var val = control.value;
        if (!val) {
            return null;
        }
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

/***/ "./src/app/modules/shared/shared.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var main_navigator_component_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.component.ts");
var currency_unit_component_1 = __webpack_require__("./src/app/modules/shared/components/currency-unit/currency-unit.component.ts");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var yes_no_dialog_component_1 = __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var snackbar_simple_component_1 = __webpack_require__("./src/app/modules/shared/components/snackbar-simple/snackbar-simple.component.ts");
var equal_validator_directive_1 = __webpack_require__("./src/app/modules/shared/directives/equal-validator.directive.ts");
var number_validator_directive_1 = __webpack_require__("./src/app/modules/shared/directives/number-validator.directive.ts");
var info_tooltip_component_1 = __webpack_require__("./src/app/modules/shared/components/info-tooltip/info-tooltip.component.ts");
var address_autocomplete_component_1 = __webpack_require__("./src/app/modules/shared/components/address-autocomplete/address-autocomplete.component.ts");
var dynamic_map_component_1 = __webpack_require__("./src/app/modules/shared/components/dynamic-map/dynamic-map.component.ts");
var core_2 = __webpack_require__("./node_modules/@agm/core/index.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
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
                custom_material_design_module_1.CustomMaterialDesignModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: environment_1.environment.mapsApiKey,
                    libraries: ["places"]
                }),
            ],
            declarations: [
                main_navigator_component_1.MainNavigatorComponent,
                currency_unit_component_1.CurrencyUnitComponent,
                yes_no_dialog_component_1.YesNoDialogComponent,
                snackbar_simple_component_1.SnackbarSimpleComponent,
                equal_validator_directive_1.EqualValidatorDirective,
                number_validator_directive_1.NumberValidatorDirective,
                info_tooltip_component_1.InfoTooltipComponent,
                address_autocomplete_component_1.AddressAutocompleteComponent,
                dynamic_map_component_1.DynamicMapComponent
            ],
            exports: [
                main_navigator_component_1.MainNavigatorComponent,
                currency_unit_component_1.CurrencyUnitComponent,
                yes_no_dialog_component_1.YesNoDialogComponent,
                snackbar_simple_component_1.SnackbarSimpleComponent,
                equal_validator_directive_1.EqualValidatorDirective,
                number_validator_directive_1.NumberValidatorDirective,
                info_tooltip_component_1.InfoTooltipComponent,
                address_autocomplete_component_1.AddressAutocompleteComponent,
                dynamic_map_component_1.DynamicMapComponent
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

/***/ "./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<h2 mat-dialog-title>Add team member</h2>\r\n\r\n<mat-dialog-content>\r\n  <div fxLayout=\"column\" class=\"container__add-person-to-team\">\r\n    <form class=\"form__container form__add-person-to-team\" #addPersonToTeamForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n      \r\n      <section fxLayout=\"column\" class=\"form__fields\">\r\n        <div fxLayout=\"column\" class=\"form__fields__row\">\r\n          <!-- Member email -->\r\n          <mat-form-field fxFlex class=\"form__field\">\r\n            <input matInput type=\"tezt\" id=\"email\" name=\"email\" placeholder=\"Member email\" \r\n                [(ngModel)]=\"model.email\"\r\n                required \r\n                email\r\n                #email=\"ngModel\">\r\n            <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n            <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </section>\r\n    </form>\r\n  </div>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"space-around center\">\r\n  <button mat-mini-fab color=\"warn\" mat-dialog-close>\r\n    <mat-icon aria-label=\"Cancel\">clear</mat-icon>\r\n  </button>\r\n  <button mat-mini-fab color=\"accent\" [mat-dialog-close]=\"email.value || null\" [disabled]=\"!addPersonToTeamForm.form.valid\">\r\n    <mat-icon aria-label=\"Add\">done</mat-icon>\r\n  </button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
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
            template: __webpack_require__("./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.html"),
            styles: [__webpack_require__("./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.scss")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], AddPersonToTeamDialogComponent);
    return AddPersonToTeamDialogComponent;
}());
exports.AddPersonToTeamDialogComponent = AddPersonToTeamDialogComponent;


/***/ }),

/***/ "./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__teams\">\r\n  <section fxLayoutWrap \r\n      fxLayout=\"row\" fxLayout.xs=\"column\" \r\n      fxLayoutGap.xs=\"10px\" \r\n      fxLayoutAlign=\"space-around center\" fxLayoutAlign.xs=\"none none\" >\r\n    \r\n    <div *ngIf=\"!teams.length && !getTeamsServiceRunning\" fxFlexAlign=\"center\">You are not member of any team yet.</div>\r\n    <!-- Team Cards -->\r\n    <mat-expansion-panel *ngFor=\"let team of teams; index as teamIndex\"\r\n        fxFlex.sm=\"45\" fxFlex.gt-sm=\"30\" \r\n        class=\"team-card\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-card__content\">\r\n        <section *ngIf=\"team.description\" class=\"description\">\r\n          <p>{{team.description}}</p>\r\n        </section>\r\n\r\n        <section class=\"members\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n          <div *ngFor=\"let member of team.members\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n            <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n              <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n              <p class=\"member__email\">{{member.email}}</p>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <section *ngIf=\"team.admin.email === user.email\" class=\"card__actions\" fxLayout=\"row\" fxLayoutAlign=\"end none\" fxLayoutGap=\"10px\">\r\n          <button *ngIf=\"!teamActionRunning[teamIndex]\" mat-mini-fab routerLink=\"/teams/edit/{{team.slug}}\" color=\"primary\" (click)=\"teamActionRunning[teamIndex] = true\">\r\n            <mat-icon aria-label=\"Edit team\">edit</mat-icon>\r\n          </button>\r\n\r\n          <button *ngIf=\"!teamActionRunning[teamIndex]\" mat-mini-fab color=\"warn\" (click)=\"openDeleteTeamDialog(teamIndex, team)\">\r\n            <mat-icon aria-label=\"Delete team\">delete</mat-icon>\r\n          </button>\r\n\r\n          <mat-progress-spinner *ngIf=\"teamActionRunning[teamIndex]\"\r\n            class=\"progress-spinner progress-spinner--delete-team\"\r\n            color=\"warn\"\r\n            [diameter]=\"40\" [strokeWidth]=\"7\"\r\n            mode=\"indeterminate\">\r\n          </mat-progress-spinner>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team Cards -->\r\n  </section>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamsServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-teams\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\" class=\"actions\">\r\n    <button mat-fab routerLink=\"create\" color=\"accent\" class=\"fab mat-elevation-z10\" matTooltip=\"Create team\" matTooltipPosition=\"left\">\r\n      <mat-icon class=\"mat-24\" aria-label=\"Create team\">group_add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = ".container__teams .team-card {\n  cursor: default; }\n  .container__teams .team-card mat-panel-title {\n    font-size: 18px; }\n  .container__teams .team-card .team-card__content .description {\n    margin-bottom: 20px;\n    font-size: 13px; }\n  .container__teams .team-card .team-card__content .members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    padding: 0 10px 0 0; }\n  .container__teams .team-card .team-card__content .members .member .member__info .admin-icon {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n  .container__teams .team-card .team-card__content .members .member .member__info .member__email {\n    font-size: 11px; }\n  .container__teams .team-card .team-card__content .card__actions {\n    margin: 0 8px 8px 0; }\n  .container__teams .progress-bar--get-teams {\n  width: 100%; }\n  @media screen and (min-width: 600px) {\n  .container__teams .team-card {\n    margin-bottom: 10px; }\n  .container__teams .progress-bar--get-teams {\n    width: 300px; } }\n"

/***/ }),

/***/ "./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var teams_service_1 = __webpack_require__("./src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var yes_no_dialog_component_1 = __webpack_require__("./src/app/modules/shared/components/yes-no-dialog/yes-no-dialog.component.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
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
        this.subscription = new Subscription_1.Subscription();
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
    TeamsDashboardComponent.prototype.ngOnDestroy = function () {
        var methodTrace = this.constructor.name + " > ngOnDestroy() > "; //for debugging
        //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
        this.subscription.unsubscribe();
    };
    /**
     * Get my teams from server
     */
    TeamsDashboardComponent.prototype.getTeams = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        this.teams = [];
        this.getTeamsServiceRunning = true;
        var newSubscription = this.teamsService.getTeams(this.user.email).subscribe(function (teams) {
            //let index = 0;
            _this.teams = teams;
            _this.teamActionRunning = new Array(teams.length).fill(false);
            // for (let item of teams) {
            //   this.teamActionRunning[index] = false;
            //   index += 1;
            // }
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
        var newSubscription = yesNoDialogRef.afterClosed().subscribe(function (result) {
            if (result === 'yes') {
                _this.delete(index, team);
            }
            else {
                _this.teamActionRunning[index] = false;
            }
        });
        this.subscription.add(newSubscription);
        return false;
    };
    TeamsDashboardComponent.prototype.delete = function (index, team) {
        var _this = this;
        if (team === void 0) { team = null; }
        var methodTrace = this.constructor.name + " > delete() > "; //for debugging
        this.teamActionRunning[index] = true;
        var newSubscription = this.teamsService.delete(team.slug, this.user.email).subscribe(function (data) {
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
        this.subscription.add(newSubscription);
    };
    TeamsDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-teams-dashboard',
            template: __webpack_require__("./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html"),
            styles: [__webpack_require__("./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, teams_service_1.TeamsService,
            app_service_1.AppService, router_1.Router, material_1.MatDialog])
    ], TeamsDashboardComponent);
    return TeamsDashboardComponent;
}());
exports.TeamsDashboardComponent = TeamsDashboardComponent;


/***/ }),

/***/ "./src/app/modules/teams/components/teams-edit/teams-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container__edit-team\" fxLayout=\"column\" fxLayoutAlign=\"none none\" fxLayout.gt-xs=\"row\" fxLayoutAlign.gt-xs=\"center none\" fxLayoutGap=\"10px\">\r\n  <form *ngIf=\"!getTeamServiceRunning\" class=\"form__container form__edit-team\" (ngSubmit)=\"editMode ? onUpdate() : onSubmit()\" #editTeamForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    \r\n    <section fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Basic information</p>\r\n        </h3>\r\n        \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <!-- Team name -->\r\n          <mat-form-field fxFlex fxFlex.gt-xs=\"290px\" class=\"form__field\">\r\n            <input matInput type=\"tezt\" id=\"name\" name=\"name\" placeholder=\"Team name\" \r\n                [(ngModel)]=\"model.name\" \r\n                value=\"model.name\"\r\n                required\r\n                minlength=\"4\"\r\n                #name=\"ngModel\">\r\n            <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n            <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Value must be longer than 3 characters</mat-error>\r\n          </mat-form-field>\r\n\r\n          <!-- Description -->\r\n          <mat-form-field fxFlex fxFlex.gt-xs=\"290px\" fxFlex.gt-sm=\"500px\" class=\"form__field\">\r\n            <textarea matInput id=\"description\" name=\"description\" placeholder=\"Description\"\r\n                matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\"\r\n                [(ngModel)]=\"model.description\" \r\n                value=\"model.description\"\r\n                #description=\"ngModel\">\r\n            </textarea>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n\r\n      <div *ngIf=\"editMode\" fxLayout=\"column\" fxLayoutGap=\"20px\" class=\"form__fields__row__container\">\r\n        <h3 class=\"title\">\r\n          <p class=\"header\">Members</p>\r\n          <p class=\"mat-caption\">Add or remove members. If a member(email) is not active on the platform we are going to send him/her an invitation to join AtomiCoconut</p>\r\n        </h3>\r\n        \r\n        <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"start center\" class=\"form__fields__row\">\r\n          <div class=\"members\" fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutWrap>\r\n            <mat-card *ngFor=\"let member of team.members; index as memberIndex\" class=\"member\" [class.not-saved-yet]=\"!member.name && !member.avatar\">\r\n              <mat-card-content fxLayout=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"none center\">\r\n                \r\n                <img *ngIf=\"member.avatar\" class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n                <mat-icon *ngIf=\"!member.avatar\" class=\"member__avatar member__avatar--default\">account_circle</mat-icon>\r\n                \r\n                <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n                  <p *ngIf=\"member.name\" class=\"member__name\">\r\n                    {{member.name}}\r\n                    <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"icon__admin\" aria-label=\"Admin\" >lock</mat-icon>\r\n                  </p>\r\n                  <p class=\"member__email\">{{member.email}}</p>\r\n                </div>\r\n      \r\n                <mat-icon *ngIf=\"member.email !== team.admin.email\" matTooltip=\"Remove\" class=\"icon__remove-member\" (click)=\"removeMember(memberIndex)\">clear</mat-icon>\r\n              </mat-card-content>\r\n            </mat-card>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n\r\n    <section *ngIf=\"editMode\" class=\"add-members\" fxLayout=\"column\" fxLayoutAlign=\"start end\">\r\n      <button mat-fab color=\"accent\" (click)=\"openAddPersonDialog()\">\r\n        <mat-icon aria-label=\"Add new member\">person_add</mat-icon>\r\n      </button>\r\n    </section>\r\n\r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-team\">\r\n      <button *ngIf=\"!editTeamServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!editTeamForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"editTeamServiceRunning\"\r\n          class=\"progress-bar progress-bar--edit-team\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n    \r\n  </form>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-team\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "./src/app/modules/teams/components/teams-edit/teams-edit.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n.progress-bar--get-team {\n  width: 100%; }\n\n.form__edit-team .form__actions--edit-team {\n  margin: 20px 0; }\n\n.members .member {\n  margin-bottom: 10px;\n  padding: 14px;\n  border-radius: 50px;\n  cursor: default; }\n\n.members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px; }\n\n.members .member .member__info .icon__admin {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n\n.members .member .member__info .member__email {\n    font-size: 11px; }\n\n.members .member .icon__remove-member {\n    font-size: 16px;\n    height: auto;\n    width: auto;\n    cursor: pointer; }\n\n.members .member.not-saved-yet .member__avatar--default {\n    font-size: 40px;\n    color: #f44336; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-team {\n    width: 300px; } }\n"

/***/ }),

/***/ "./src/app/modules/teams/components/teams-edit/teams-edit.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var add_person_to_team_dialog_component_1 = __webpack_require__("./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var teams_service_1 = __webpack_require__("./src/app/modules/teams/teams.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var team_1 = __webpack_require__("./src/app/modules/teams/models/team.ts");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
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
            template: __webpack_require__("./src/app/modules/teams/components/teams-edit/teams-edit.component.html"),
            styles: [__webpack_require__("./src/app/modules/teams/components/teams-edit/teams-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, main_navigator_service_1.MainNavigatorService, teams_service_1.TeamsService,
            app_service_1.AppService, router_1.Router, material_1.MatDialog])
    ], TeamsEditComponent);
    return TeamsEditComponent;
}());
exports.TeamsEditComponent = TeamsEditComponent;


/***/ }),

/***/ "./src/app/modules/teams/models/team.ts":
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

/***/ "./src/app/modules/teams/teams-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var teams_dashboard_component_1 = __webpack_require__("./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
var teams_edit_component_1 = __webpack_require__("./src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
var auth_resolver_service_1 = __webpack_require__("./src/app/auth-resolver.service.ts");
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

/***/ "./src/app/modules/teams/teams.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var teams_routing_module_1 = __webpack_require__("./src/app/modules/teams/teams-routing.module.ts");
var teams_dashboard_component_1 = __webpack_require__("./src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var teams_edit_component_1 = __webpack_require__("./src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
var teams_service_1 = __webpack_require__("./src/app/modules/teams/teams.service.ts");
var add_person_to_team_dialog_component_1 = __webpack_require__("./src/app/modules/teams/components/add-person-to-team-dialog/add-person-to-team-dialog.component.ts");
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

/***/ "./src/app/modules/teams/teams.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var team_1 = __webpack_require__("./src/app/modules/teams/models/team.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var of_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/of.js");
var from_1 = __webpack_require__("./node_modules/rxjs/_esm5/observable/from.js");
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
    };
    TeamsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], TeamsService);
    return TeamsService;
}());
exports.TeamsService = TeamsService;


/***/ }),

/***/ "./src/app/modules/users/components/account-finance-info/account-finance-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-finance\" (ngSubmit)=\"onSubmit()\" #financeForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Active income -->\r\n      <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <currency-unit fxFlex=\"50px\"\r\n            [id]=\"'annualIncomeUnit'\" \r\n            [value]=\"model.annualIncomeUnit\"\r\n            [view]=\"'narrow'\"\r\n            (newValue)=\"onCurrencyUnitChange($event)\">\r\n        </currency-unit>\r\n        \r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"annualIncome\" name=\"annualIncome\" placeholder=\"Annual Income\"\r\n              [(ngModel)]=\"model.annualIncome\" \r\n              value=\"model.annualIncome\"\r\n              numberValidator \r\n              #annualIncome=\"ngModel\">\r\n          <mat-hint align=\"start\">Annual income amount pre-tax.</mat-hint>\r\n          <mat-error *ngIf=\"annualIncome.invalid && (annualIncome.dirty || annualIncome.touched) && annualIncome.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n        <!-- <pre>{{annualIncome.errors | json}}</pre> -->\r\n      </div>\r\n\r\n      <!-- Tax rate -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"150px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"incomeTaxRate\" name=\"incomeTaxRate\" placeholder=\"Income tax rate (%)\" \r\n            [(ngModel)]=\"model.incomeTaxRate\" \r\n            value=\"model.incomeTaxRate\"\r\n            numberValidator='{\"min\": 0, \"max\": 100}' \r\n            #incomeTaxRate=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{incomeTaxRate.errors | json}}</pre> -->\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Savings -->\r\n      <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <currency-unit fxFlex=\"50px\"\r\n            [id]=\"'savingsUnit'\" \r\n            [value]=\"model.savingsUnit\"\r\n            [view]=\"'narrow'\"\r\n            (newValue)=\"onCurrencyUnitChange($event)\">\r\n        </currency-unit>\r\n        \r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input matInput type=\"number\" id=\"savings\" name=\"savings\" placeholder=\"Current savings\" \r\n              [(ngModel)]=\"model.savings\" \r\n              value=\"model.savings\"\r\n              numberValidator\r\n              #savings=\"ngModel\">\r\n\r\n          <mat-error *ngIf=\"savings.invalid && (savings.dirty || savings.touched) && savings.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n      <div fxFlex fxFlex.gt-xs=\"150px\" class=\"form__spacer\"></div>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-finance\">\r\n    <button *ngIf=\"!accountFinanceServiceRunning\" \r\n        class=\"form__action mat-raised-button\" \r\n        mat-raised-button \r\n        type=\"submit\" \r\n        color=\"accent\" \r\n        [disabled]=\"!financeForm.form.valid\">Save</button>\r\n    \r\n    <mat-progress-bar *ngIf=\"accountFinanceServiceRunning\"\r\n        class=\"progress-bar progress-bar--account-finance\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/users/components/account-finance-info/account-finance-info.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/account-finance-info/account-finance-info.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var account_finance_1 = __webpack_require__("./src/app/modules/users/models/account-finance.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
            template: __webpack_require__("./src/app/modules/users/components/account-finance-info/account-finance-info.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/account-finance-info/account-finance-info.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService])
    ], AccountFinanceInfoComponent);
    return AccountFinanceInfoComponent;
}());
exports.AccountFinanceInfoComponent = AccountFinanceInfoComponent;


/***/ }),

/***/ "./src/app/modules/users/components/account-personal-info/account-personal-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-personal\" #personalInfoForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n    <section fxLayout=\"column\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n        \r\n        <!-- Birthday -->\r\n        <mat-form-field fxFlex fxFlex.gt-xs=\"300px\" class=\"form__field\">\r\n          <input \r\n              placeholder=\"Day of birth\"\r\n              id=\"birthday\"\r\n              name=\"birthday\"\r\n              readonly\r\n              required\r\n              #birthday=\"ngModel\"\r\n              matInput \r\n              [(ngModel)]=\"model.birthday\" \r\n              [matDatepicker]=\"pickerBirthday\"\r\n              (click)=\"pickerBirthday.open()\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"pickerBirthday\"></mat-datepicker-toggle>\r\n          <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBirthday startView=\"year\" [startAt]=\"startAt\"></mat-datepicker>\r\n          <mat-error *ngIf=\"birthday.invalid && (birthday.dirty || birthday.touched) && birthday.errors.matDatepickerParse\">Day of birth is invalid or not follow the pattern \"mm/dd/yyyy\"</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </section>\r\n    \r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-personal\">\r\n      <button *ngIf=\"!accountPersonalServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!personalInfoForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"accountPersonalServiceRunning\"\r\n          class=\"progress-bar progress-bar--account-personal\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n  </form>"

/***/ }),

/***/ "./src/app/modules/users/components/account-personal-info/account-personal-info.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/account-personal-info/account-personal-info.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var account_personal_1 = __webpack_require__("./src/app/modules/users/models/account-personal.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
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
            template: __webpack_require__("./src/app/modules/users/components/account-personal-info/account-personal-info.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/account-personal-info/account-personal-info.component.scss")]
        }),
        __metadata("design:paramtypes", [material_1.DateAdapter, users_service_1.UsersService, app_service_1.AppService,
            util_service_1.UtilService])
    ], AccountPersonalInfoComponent);
    return AccountPersonalInfoComponent;
}());
exports.AccountPersonalInfoComponent = AccountPersonalInfoComponent;


/***/ }),

/***/ "./src/app/modules/users/components/account-user-info/account-user-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #accountForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            value=\"model.name\"\r\n            #name=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            value=\"model.email\"\r\n            #email=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Preferred currency -->\r\n      <currency-unit fxFlex fxFlex.gt-xs=\"200px\"\r\n          [id]=\"'preferredCurrency'\"\r\n          [hint]=\"'Your preferred currency format to use across the platform'\" \r\n          [placeHolder]=\"'Preferred currency'\" \r\n          [value]=\"model.currency\"\r\n          (newValue)=\"onCurrencyUnitChange($event)\">\r\n      </currency-unit>\r\n    </div>\r\n\r\n    <div fxFlex class=\"form__spacer\"></div>\r\n  </div>\r\n\r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!updateAccountServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!accountForm.form.valid\">Save</button>\r\n\r\n    <mat-progress-bar *ngIf=\"updateAccountServiceRunning\"\r\n        class=\"progress-bar progress-bar--update-account\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/users/components/account-user-info/account-user-info.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/account-user-info/account-user-info.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
            template: __webpack_require__("./src/app/modules/users/components/account-user-info/account-user-info.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/account-user-info/account-user-info.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService])
    ], AccountUserInfoComponent);
    return AccountUserInfoComponent;
}());
exports.AccountUserInfoComponent = AccountUserInfoComponent;


/***/ }),

/***/ "./src/app/modules/users/components/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- SM and higher view -->\r\n<mat-tab-group *ngIf=\"utilService.isGtXs()\">\r\n  <mat-tab label=\"Account info\">\r\n    <account-user-info [user]=\"user\"></account-user-info>\r\n  </mat-tab>\r\n  <mat-tab label=\"Personal info\">\r\n    <account-personal-info [user]=\"user\"></account-personal-info>\r\n  </mat-tab>\r\n  <mat-tab label=\"Financial info\">\r\n    <account-finance-info [user]=\"user\"></account-finance-info>\r\n  </mat-tab>\r\n</mat-tab-group>\r\n\r\n<!-- XS view -->\r\n<mat-accordion *ngIf=\"utilService.isXs()\">  \r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Account info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-user-info [user]=\"user\"></account-user-info>\r\n    </mat-expansion-panel>\r\n  \r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Personal info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-personal-info [user]=\"user\"></account-personal-info>\r\n    </mat-expansion-panel>\r\n\r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        Financial info\r\n      </mat-expansion-panel-header>\r\n\r\n      <account-finance-info [user]=\"user\"></account-finance-info>\r\n    </mat-expansion-panel>\r\n\r\n  </mat-accordion>"

/***/ }),

/***/ "./src/app/modules/users/components/account/account.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/users/components/account/account.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var util_service_1 = __webpack_require__("./src/app/util.service.ts");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
            template: __webpack_require__("./src/app/modules/users/components/account/account.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/account/account.component.scss")]
        }),
        __metadata("design:paramtypes", [main_navigator_service_1.MainNavigatorService, router_1.ActivatedRoute, util_service_1.UtilService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;


/***/ }),

/***/ "./src/app/modules/users/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__login\" (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n\r\n        <mat-icon matPrefix>email</mat-icon>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field field__password\">\r\n        <input matInput [type]=\"showPassword ? 'text' : 'password'\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\"\r\n            #password=\"ngModel\">\r\n        \r\n        <mat-icon matPrefix>vpn_key</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Show password\" *ngIf=\"!showPassword\" (click)=\"showPassword = true\">visibility</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Hide password\" *ngIf=\"showPassword\" (click)=\"showPassword = false\">visibility_off</mat-icon>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--login\">\r\n    <button *ngIf=\"!loginServiceRunning\" class=\"form__action mat-raised-button\" mat-raised-button type=\"submit\" \r\n        color=\"accent\" [disabled]=\"!loginForm.form.valid\">Login</button>\r\n    \r\n    <mat-progress-bar *ngIf=\"loginServiceRunning\"\r\n        class=\"progress-bar progress-bar--login\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n    \r\n    <mat-checkbox fxLayoutAlign.xs=\"center center\" class=\"form__action\" [(ngModel)]=\"forgotModel.forgot\" name=\"forgot\" id=\"forgot\">Forgot my password</mat-checkbox>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign=\"center center\" class=\"form__actions form__actions--create-account\">\r\n    <a mat-button color=\"accent\" class=\"color__almost-white ac__link\" routerLink=\"/users/register\">Create an account</a>\r\n  </section>\r\n\r\n</form>\r\n\r\n<form class=\"form__container form__forgot\" (ngSubmit)=\"onForgotSubmit()\" #forgotForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" *ngIf=\"forgotModel.forgot\">\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        \r\n        <input matInput type=\"email\" id=\"emailForgot\" name=\"emailForgot\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"forgotModel.email\" \r\n            required email\r\n            #emailForgot=\"ngModel\">\r\n\r\n        <mat-icon matPrefix>email</mat-icon>\r\n        <mat-hint align=\"start\">Type your email and we will send you an email to reset your password.</mat-hint>\r\n        <mat-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"emailForgot.invalid && (emailForgot.dirty || emailForgot.touched) && emailForgot.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!forgotServiceRunning\" class=\"form__action mat-raised-button\" \r\n        color=\"accent\" mat-raised-button type=\"submit\" [disabled]=\"!forgotForm.form.valid\">Send</button>\r\n\r\n    <mat-progress-bar *ngIf=\"forgotServiceRunning\"\r\n        class=\"progress-bar progress-bar--forgot\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </section>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/users/components/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n.form__login .field__password .icon__suffix {\n  cursor: pointer; }\n\n.form__login .form__actions--create-account {\n  margin: 20px 0; }\n\n.form__forgot {\n  margin-top: 50px; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/login/login.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
        this.showPassword = false;
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
            template: __webpack_require__("./src/app/modules/users/components/login/login.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService,
            main_navigator_service_1.MainNavigatorService, router_1.Router, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/modules/users/components/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #registerForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            #name=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            #email=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"passwordConfirm\" reverse=\"true\"\r\n            #password=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Password confirm -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"password\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \r\n            [(ngModel)]=\"model['password-confirm']\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"password\"\r\n            #passwordConfirm=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.equalvalidator\">Confirm password must match password</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{passwordConfirm.errors | json}}</pre> -->\r\n    </div>\r\n    \r\n  </div>\r\n  \r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!registerServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!registerForm.form.valid\">Create account</button>\r\n\r\n    <mat-progress-bar *ngIf=\"registerServiceRunning\"\r\n        class=\"progress-bar progress-bar--register\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/users/components/register/register.component.scss":
/***/ (function(module, exports) {

module.exports = "form .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 127px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/register/register.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
            template: __webpack_require__("./src/app/modules/users/components/register/register.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService, app_service_1.AppService, router_1.Router,
            main_navigator_service_1.MainNavigatorService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "./src/app/modules/users/components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #resetForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Password -->\r\n      <mat-form-field fxFlex class=\"form__field field__password\">\r\n        <input matInput [type]=\"showPassword ? 'text' : 'password'\" id=\"password\" name=\"password\" placeholder=\"Password\" \r\n            [(ngModel)]=\"model.password\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"passwordConfirm\" reverse=\"true\"\r\n            #password=\"ngModel\">\r\n\r\n        <mat-icon matPrefix>vpn_key</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Show password\" *ngIf=\"!showPassword\" (click)=\"showPassword = true\">visibility</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Hide password\" *ngIf=\"showPassword\" (click)=\"showPassword = false\">visibility_off</mat-icon>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.required\">Password is required</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.minlength\">Password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"password.invalid && (password.dirty || password.touched) && password.errors.maxlength\">Password must be shorter than 8 characters</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Password confirm -->\r\n      <mat-form-field fxFlex class=\"form__field field__password-confirm\">\r\n        <input matInput [type]=\"showPassword ? 'text' : 'password'\" id=\"passwordConfirm\" name=\"passwordConfirm\" placeholder=\"Confirm password\" \r\n            [(ngModel)]=\"model['password-confirm']\" \r\n            required minlength=\"3\" maxlength=\"8\" equalvalidator=\"password\"\r\n            #passwordConfirm=\"ngModel\">\r\n        \r\n        <mat-icon matPrefix>vpn_key</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Show password\" *ngIf=\"!showPassword\" (click)=\"showPassword = true\">visibility</mat-icon>\r\n        <mat-icon class=\"icon__suffix\" matSuffix matTooltip=\"Hide password\" *ngIf=\"showPassword\" (click)=\"showPassword = false\">visibility_off</mat-icon>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.required\">Confirm password is required</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.minlength\">Confirm password must be longer than 3 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.maxlength\">Confirm password must be shorter than 8 characters</mat-error>\r\n        <mat-error *ngIf=\"passwordConfirm.invalid && (passwordConfirm.dirty || passwordConfirm.touched) && passwordConfirm.errors.equalvalidator\">Confirm password must match password</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n  \r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!resetPasswordServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!resetForm.form.valid\">Reset password</button>\r\n\r\n    <mat-progress-bar *ngIf=\"resetPasswordServiceRunning\"\r\n        class=\"progress-bar progress-bar--reset-password\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

/***/ }),

/***/ "./src/app/modules/users/components/reset-password/reset-password.component.scss":
/***/ (function(module, exports) {

module.exports = "form .field__password .icon__suffix, form .field__password-confirm .icon__suffix {\n  cursor: pointer; }\n\nform .form__actions .progress-bar {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 127px; } }\n"

/***/ }),

/***/ "./src/app/modules/users/components/reset-password/reset-password.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var user_1 = __webpack_require__("./src/app/modules/users/models/user.ts");
var main_navigator_service_1 = __webpack_require__("./src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
        this.showPassword = false;
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
            template: __webpack_require__("./src/app/modules/users/components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__("./src/app/modules/users/components/reset-password/reset-password.component.scss")]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, users_service_1.UsersService, router_1.Router, router_1.ActivatedRoute,
            main_navigator_service_1.MainNavigatorService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;


/***/ }),

/***/ "./src/app/modules/users/models/account-finance.ts":
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

/***/ "./src/app/modules/users/models/account-personal.ts":
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

/***/ "./src/app/modules/users/models/user.ts":
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

/***/ "./src/app/modules/users/users-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var register_component_1 = __webpack_require__("./src/app/modules/users/components/register/register.component.ts");
var login_component_1 = __webpack_require__("./src/app/modules/users/components/login/login.component.ts");
var reset_password_component_1 = __webpack_require__("./src/app/modules/users/components/reset-password/reset-password.component.ts");
var account_component_1 = __webpack_require__("./src/app/modules/users/components/account/account.component.ts");
var auth_resolver_service_1 = __webpack_require__("./src/app/auth-resolver.service.ts");
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

/***/ "./src/app/modules/users/users.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var users_routing_module_1 = __webpack_require__("./src/app/modules/users/users-routing.module.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var flex_layout_1 = __webpack_require__("./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var custom_material_design_module_1 = __webpack_require__("./src/app/modules/shared/custom-material-design.module.ts");
var shared_module_1 = __webpack_require__("./src/app/modules/shared/shared.module.ts");
var register_component_1 = __webpack_require__("./src/app/modules/users/components/register/register.component.ts");
var users_service_1 = __webpack_require__("./src/app/modules/users/users.service.ts");
var login_component_1 = __webpack_require__("./src/app/modules/users/components/login/login.component.ts");
var reset_password_component_1 = __webpack_require__("./src/app/modules/users/components/reset-password/reset-password.component.ts");
var account_component_1 = __webpack_require__("./src/app/modules/users/components/account/account.component.ts");
var account_finance_info_component_1 = __webpack_require__("./src/app/modules/users/components/account-finance-info/account-finance-info.component.ts");
var account_personal_info_component_1 = __webpack_require__("./src/app/modules/users/components/account-personal-info/account-personal-info.component.ts");
var account_user_info_component_1 = __webpack_require__("./src/app/modules/users/components/account-user-info/account-user-info.component.ts");
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

/***/ "./src/app/modules/users/users.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var BehaviorSubject_1 = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
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
            .catch(this.appService.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.login = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > login() > "; //for debugging
        return this.http.post(this.serverHost + "/login", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to forgot with the provided user email.
     */
    UsersService.prototype.forgot = function (postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > forgot() > "; //for debugging
        return this.http.post(this.serverHost + "/account/forgot", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to reset password api with the provided new password.
     */
    UsersService.prototype.reset = function (token, postData) {
        if (postData === void 0) { postData = {}; }
        var methodTrace = this.constructor.name + " > reset() > "; //for debugging
        return this.http.post(this.serverHost + "/account/reset/" + token, postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.logout = function () {
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging
        return this.http.get(this.serverHost + "/logout")
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    UsersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, app_service_1.AppService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;


/***/ }),

/***/ "./src/app/util.service.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
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
     * Capitalize first letter of a string
     *
     * @param word {string} . The string to modify
     * */
    UtilService.prototype.capitalizeFirstLetter = function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
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

/***/ "./src/environments/environment.ts":
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
    showLogs: true,
    mapsApiKey: 'AIzaSyDKc7OEe0rN7hXZx8T-8ngEoK7dLGxyp18'
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
    console.log('ENV: Production');
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map