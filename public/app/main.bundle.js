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
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"inner mat-typography\">\r\n\r\n  <mat-toolbar class=\"toolbar\" color=\"primary\">\r\n    <a class=\"toolbar__brand-name color__almost-white\" routerLink=\"/\"><span>AtomiCoconut</span></a>\r\n    <span class=\"example-spacer\"></span>\r\n    \r\n    <span *ngIf=\"!usersService.user\" fxLayoutAlign=\" center\">\r\n      <mat-icon routerLink=\"/users/login\" class=\"toolbar__icon\">account_circle</mat-icon>\r\n    </span>\r\n    <span *ngIf=\"usersService.user\" fxLayoutAlign=\" center\">\r\n      <img *ngIf=\"usersService.user.avatar\" \r\n          [matMenuTriggerFor]=\"userMenu\" \r\n          class=\"toolbar__icon user__avatar\" \r\n          [src]=\"usersService.user.avatar\" \r\n      />\r\n      <mat-icon *ngIf=\"!usersService.user.avatar\"\r\n          class=\"toolbar__icon user__icon--logged-in\" \r\n          [matMenuTriggerFor]=\"userMenu\">\r\n        account_circle\r\n      </mat-icon>\r\n      \r\n      <mat-menu class=\"user__menu--logged-in\" #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <button mat-menu-item routerLink=\"/users/account\">\r\n          <mat-icon>settings</mat-icon>\r\n          <span>My account</span>\r\n        </button>\r\n        <button mat-menu-item routerLink=\"/teams\">\r\n          <mat-icon>group</mat-icon>\r\n          <span>Teams</span>\r\n        </button>\r\n        <button mat-menu-item (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n          <span>Logout</span>\r\n        </button>\r\n      </mat-menu>\r\n    </span>\r\n    \r\n  </mat-toolbar>\r\n  \r\n  <!-- Main navigator (chips) -->\r\n  <main-navigator></main-navigator>\r\n\r\n  <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar {\n  margin-bottom: 10px; }\n  .toolbar .toolbar__brand-name {\n    text-decoration: none; }\n  .toolbar .toolbar__icon {\n    padding: 0 10px;\n    cursor: pointer; }\n  .toolbar .example-spacer {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto; }\n  .toolbar .user__avatar {\n    border-radius: 50%;\n    width: 30px;\n    padding: 0 10px; }\n  .toolbar .user__icon--logged-in {\n    color: #28FE7C; }\n\n::ng-deep nav.navigation--main {\n  margin-bottom: 20px; }\n", ""]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_users_models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
    function AppComponent(router, appService, usersService, mainNavigatorService) {
        this.router = router;
        this.appService = appService;
        this.usersService = usersService;
        this.mainNavigatorService = mainNavigatorService;
        this.title = 'app';
        this.defaultGravatarUrl = __WEBPACK_IMPORTED_MODULE_3__configuration__["a" /* configuration */].defaultGravatarUrl;
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
        this.usersService.getAuthenticatedUser().subscribe(function (data) {
            if (data && data.email) {
                var user = new __WEBPACK_IMPORTED_MODULE_4__modules_users_models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments);
                _this.usersService.user = user;
            }
            else {
                _this.appService.consoleLog('info', methodTrace + " User not logged in.", data);
                _this.usersService.user = null;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.usersService.user = null;
        });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > logout() > "; //for debugging  
        this.usersService.logout().subscribe(function (data) {
            _this.usersService.user = null;
            _this.router.navigate(['/']);
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the logout service.", error);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_6__modules_shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__modules_shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__modules_shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_service__ = __webpack_require__("../../../../../src/app/util.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_resolver_service__ = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_guard__ = __webpack_require__("../../../../../src/app/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_users_users_module__ = __webpack_require__("../../../../../src/app/modules/users/users.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_teams_teams_module__ = __webpack_require__("../../../../../src/app/modules/teams/teams.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_investments_investments_module__ = __webpack_require__("../../../../../src/app/modules/investments/investments.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modules_calculators_calculators_module__ = __webpack_require__("../../../../../src/app/modules/calculators/calculators.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_welcome_welcome_component__ = __webpack_require__("../../../../../src/app/components/welcome/welcome.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modules_shared_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
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
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_12__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_13__modules_users_users_module__["a" /* UsersModule */],
            __WEBPACK_IMPORTED_MODULE_14__modules_teams_teams_module__["a" /* TeamsModule */],
            __WEBPACK_IMPORTED_MODULE_15__modules_investments_investments_module__["a" /* InvestmentsModule */],
            __WEBPACK_IMPORTED_MODULE_16__modules_calculators_calculators_module__["a" /* CalculatorsModule */],
            __WEBPACK_IMPORTED_MODULE_18__modules_shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_welcome_welcome_component__["a" /* WelcomeComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_9__util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_10__auth_resolver_service__["a" /* AuthResolver */], __WEBPACK_IMPORTED_MODULE_11__auth_guard__["a" /* AuthGuard */]],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_welcome_welcome_component__ = __webpack_require__("../../../../../src/app/components/welcome/welcome.component.ts");
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
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: __WEBPACK_IMPORTED_MODULE_2__components_welcome_welcome_component__["a" /* WelcomeComponent */]
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
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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
    function AppService(http, snackBar) {
        this.http = http;
        this.snackBar = snackBar;
    }
    /**
     * Receives and object of paramameters and returns it in a querystring format
     * @param {*} parameters . Object of parameters
     * @return {string} result as querystring
     */
    AppService.prototype.getParamsAsQuerystring = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        var strParams = '';
        if (parameters && Object.keys(parameters).length) {
            for (var _i = 0, _a = Object.keys(parameters); _i < _a.length; _i++) {
                var key = _a[_i];
                strParams += "&" + key + "=" + parameters[key];
            }
        }
        return strParams.substring(1);
    };
    /**
     * Extract data from a server response
     * @param res
     */
    AppService.prototype.extractData = function (res) {
        var body = res.json();
        if (body.codeno === 200 && body.status === 'success') {
            return body.data;
        }
        else {
            throw body;
        }
    };
    /**
     * Handle server service errors and parse the result in an object
     * @param error
     */
    AppService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errObj = {};
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            errObj = error.json() || {};
        }
        else {
            errObj = error || {};
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(errObj);
    };
    /**
     * Shows messages in snackbar component
     * @param message . The text to show
     * @param duration . The duration in milliseconds . Optional
     * @param actionName . An action name to close the message on click. Optional
     */
    AppService.prototype.showResults = function (message, duration, actionName) {
        if (duration === void 0) { duration = 5000; }
        if (actionName === void 0) { actionName = ''; }
        var snackBarRef = this.snackBar.open(message, actionName ? actionName : null, {
            duration: duration,
            extraClasses: ['snack-bar--simple']
        });
        snackBarRef.onAction().subscribe(function () {
            snackBarRef.dismiss();
        });
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
        if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].showLogs) {
            console[type](message, params);
        }
    };
    return AppService;
}());
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["n" /* MatSnackBar */]) === "function" && _b || Object])
], AppService);

var _a, _b;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth-resolver.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_users_models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_users_models_account_personal__ = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_users_models_account_finance__ = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_users_users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthResolver = (function () {
    function AuthResolver(appService, usersService, router) {
        this.appService = appService;
        this.usersService = usersService;
        this.router = router;
    }
    AuthResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var methodTrace = this.constructor.name + " > resolve() > "; //for debugging  
        var urlsForCompleteUserData = ['/investments', '/users/account'];
        var params = null;
        if (urlsForCompleteUserData.includes(state.url)) {
            params = { personalInfo: true, financialInfo: true };
        }
        return this.usersService.getAuthenticatedUser(params).map(function (data) {
            if (data && data.email) {
                var personalInfo = null;
                if (data.personalInfo) {
                    personalInfo = new __WEBPACK_IMPORTED_MODULE_3__modules_users_models_account_personal__["a" /* AccountPersonal */](data.personalInfo.birthday);
                }
                var financialInfo = null;
                if (data.financialInfo) {
                    financialInfo = new __WEBPACK_IMPORTED_MODULE_4__modules_users_models_account_finance__["a" /* AccountFinance */](data.financialInfo.annualIncome, data.financialInfo.netWorth, data.financialInfo.incomeTaxRate);
                }
                var user = new __WEBPACK_IMPORTED_MODULE_2__modules_users_models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments, financialInfo, personalInfo);
                _this.usersService.user = user;
                return user;
            }
            else {
                _this.appService.consoleLog('info', methodTrace + " User not logged in.", data);
                _this.usersService.user = null;
                _this.router.navigate(['/users/login']);
                return null;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the getAuthenticatedUser service.", error);
            _this.usersService.user = null;
            _this.router.navigate(['/users/login']);
            return null;
        });
    };
    return AuthResolver;
}());
AuthResolver = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__modules_users_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__modules_users_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AuthResolver);

var _a, _b, _c;
//# sourceMappingURL=auth-resolver.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = (function () {
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
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modules_users_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AuthGuard);

var _a, _b, _c;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/welcome/welcome.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WelcomeComponent = (function () {
    function WelcomeComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: null, selected: true },
            { displayName: 'Investments', url: '/investments', selected: false },
            { displayName: 'Calculators', url: '/calculators', selected: false }
        ]);
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-welcome',
        template: __webpack_require__("../../../../../src/app/components/welcome/welcome.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/welcome/welcome.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__modules_shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _a || Object])
], WelcomeComponent);

var _a;
//# sourceMappingURL=welcome.component.js.map

/***/ }),

/***/ "../../../../../src/app/directives/equal-validator.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EqualValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
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
    function EqualValidatorDirective(equalFormControlName, reverse) {
        this.equalFormControlName = equalFormControlName;
        this.reverse = reverse;
    }
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
    return EqualValidatorDirective;
}());
EqualValidatorDirective = EqualValidatorDirective_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[equalvalidator]',
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NG_VALIDATORS */], useExisting: EqualValidatorDirective_1, multi: true }]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Attribute */])('equalvalidator')),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Attribute */])('reverse')),
    __metadata("design:paramtypes", [String, String])
], EqualValidatorDirective);

var EqualValidatorDirective_1;
//# sourceMappingURL=equal-validator.directive.js.map

/***/ }),

/***/ "../../../../../src/app/directives/number-validator.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
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


var NumberValidatorDirective = NumberValidatorDirective_1 = (function () {
    function NumberValidatorDirective(validationType) {
        this.validationType = validationType;
        this.numberRegExp = new RegExp('^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$');
    }
    NumberValidatorDirective.prototype.validate = function (control) {
        var validationObj = {};
        if (this.validationType) {
            validationObj = JSON.parse(this.validationType);
        }
        var val = control.value;
        if (!this.numberRegExp.test(val + '')) {
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
    return NumberValidatorDirective;
}());
NumberValidatorDirective = NumberValidatorDirective_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[numberValidator]',
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NG_VALIDATORS */], useExisting: NumberValidatorDirective_1, multi: true }]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Attribute */])('numberValidator')),
    __metadata("design:paramtypes", [String])
], NumberValidatorDirective);

var NumberValidatorDirective_1;
//# sourceMappingURL=number-validator.directive.js.map

/***/ }),

/***/ "../../../../../src/app/modules/calculators/calculators-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_equity_equity_component__ = __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_calculators_dashboard_calculators_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [{
        path: 'calculators',
        children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_3__components_calculators_dashboard_calculators_dashboard_component__["a" /* CalculatorsDashboardComponent */] },
            { path: 'equity', component: __WEBPACK_IMPORTED_MODULE_2__components_equity_equity_component__["a" /* EquityComponent */] }
        ]
    }];
var CalculatorsRoutingModule = (function () {
    function CalculatorsRoutingModule() {
    }
    return CalculatorsRoutingModule;
}());
CalculatorsRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], CalculatorsRoutingModule);

//# sourceMappingURL=calculators-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/calculators/calculators.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_shared_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__calculators_routing_module__ = __webpack_require__("../../../../../src/app/modules/calculators/calculators-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_equity_equity_component__ = __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_calculators_dashboard_calculators_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var CalculatorsModule = (function () {
    function CalculatorsModule() {
    }
    return CalculatorsModule;
}());
CalculatorsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_6__calculators_routing_module__["a" /* CalculatorsRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_4__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_5__modules_shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__components_equity_equity_component__["a" /* EquityComponent */], __WEBPACK_IMPORTED_MODULE_8__components_calculators_dashboard_calculators_dashboard_component__["a" /* CalculatorsDashboardComponent */]]
    })
], CalculatorsModule);

//# sourceMappingURL=calculators.module.js.map

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatorsDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CalculatorsDashboardComponent = (function () {
    function CalculatorsDashboardComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
    }
    CalculatorsDashboardComponent.prototype.ngOnInit = function () {
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Calculators', url: null, selected: true },
            { displayName: 'Equity', url: '/calculators/equity', selected: false }
        ]);
    };
    return CalculatorsDashboardComponent;
}());
CalculatorsDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-calculators-dashboard',
        template: __webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/calculators/components/calculators-dashboard/calculators-dashboard.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _a || Object])
], CalculatorsDashboardComponent);

var _a;
//# sourceMappingURL=calculators-dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/calculators/components/equity/equity.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__equity-calc\" #equityForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Purchase price -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"purchasePrice\" name=\"purchasePrice\" placeholder=\"Purchase price\" \r\n            [(ngModel)]=\"model.purchasePrice\" \r\n            required\r\n            value=\"model.purchasePrice\"\r\n            #purchasePrice=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"purchasePrice.invalid && (purchasePrice.dirty || purchasePrice.touched) && purchasePrice.errors.required\">Purchase price is required</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Market value -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"marketValue\" name=\"marketValue\" placeholder=\"Market value\" \r\n            [(ngModel)]=\"model.marketValue\" \r\n            required\r\n            value=\"model.marketValue\"\r\n            #marketValue=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"marketValue.invalid && (marketValue.dirty || marketValue.touched) && marketValue.errors.required\">Market value is required</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Loan coverage -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"loanCoverage\" name=\"loanCoverage\" placeholder=\"Loan coverage %\" \r\n            [(ngModel)]=\"model.loanCoverage\" \r\n            required loanCoverage\r\n            value=\"model.loanCoverage\"\r\n            #loanCoverage=\"ngModel\">\r\n  \r\n        <mat-error *ngIf=\"loanCoverage.invalid && (loanCoverage.dirty || loanCoverage.touched) && loanCoverage.errors.required\">Loan coverage is required</mat-error>\r\n      </mat-form-field>\r\n\r\n      <!-- Savings -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"savings\" name=\"savings\" placeholder=\"Current savings\" \r\n            [(ngModel)]=\"model.savings\" \r\n            value=\"model.savings\"\r\n            #savings=\"ngModel\">\r\n      </mat-form-field>\r\n\r\n      <!-- Add renovations checkbox -->\r\n      <mat-slide-toggle color=\"accent\" class=\"form__field form__field__toogle form__field__toogle--add-reno\"\r\n          [(ngModel)]=\"model.addRenovations\" name=\"addRenovations\" id=\"addRenovations\">\r\n        \r\n        Add renovations data\r\n      </mat-slide-toggle>\r\n      <!-- <mat-checkbox fxFlex fxFlex.gt-xs=\"200px\" class=\"form__action\" [(ngModel)]=\"model.addRenovations\" name=\"addRenovations\" id=\"addRenovations\">Add renovations data</mat-checkbox> -->\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" class=\"form__fields\" *ngIf=\"model.addRenovations\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Renovation cost -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"renovationCost\" name=\"renovationCost\" placeholder=\"Renovation cost\" \r\n            [(ngModel)]=\"model.renovationCost\" \r\n            value=\"model.renovationCost\"\r\n            #renovationCost=\"ngModel\">\r\n      </mat-form-field>\r\n      \r\n      <!-- New market value -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"newMarketValue\" name=\"newMarketValue\" placeholder=\"After renovations market value\" \r\n            [(ngModel)]=\"model.newMarketValue\" \r\n            value=\"model.newMarketValue\"\r\n            #newMarketValue=\"ngModel\">\r\n      </mat-form-field>\r\n      \r\n      <!-- First year repayment -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"200px\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"firstYearRepayment\" name=\"firstYearRepayment\" placeholder=\"First year loan repayments\" \r\n            [(ngModel)]=\"model.firstYearRepayment\" \r\n            value=\"model.firstYearRepayment\"\r\n            #firstYearRepayment=\"ngModel\">\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n</form>\r\n\r\n<section  class=\"\">\r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxFlex fxFlex.gt-xs=\"620px\">\r\n    <mat-card fxFlex>\r\n      <mat-card-title class=\"mat-card-title--ac\">Initial figures</mat-card-title>\r\n      <mat-card-content>\r\n        <div><label>Loan amount: </label><span>{{loanAmount}}</span></div>\r\n        <div><label>Deposit amount: </label><span>{{depositAmount}}</span></div>\r\n        <div><label>Discount: </label><span>{{discount}}</span></div>\r\n        <div><label>Equity: </label><span>{{equity}}</span></div>\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n    <mat-card fxFlex *ngIf=\"model.addRenovations\">\r\n      <mat-card-title class=\"mat-card-title--ac\">After renovations figures</mat-card-title>\r\n      <mat-card-content>\r\n        <div><label>Usable equity: </label><span>{{usableEquityAfterReno}}</span></div>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </div>\r\n</section>"

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EquityComponent = (function () {
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
            { displayName: 'Equity', url: null, selected: true }
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
    return EquityComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('equityForm'),
    __metadata("design:type", Object)
], EquityComponent.prototype, "form", void 0);
EquityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-equity',
        template: __webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/calculators/components/equity/equity.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _a || Object])
], EquityComponent);

var _a;
//# sourceMappingURL=equity.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"currency-card\">\r\n  <mat-card-header>\r\n    <div mat-card-avatar \r\n        class=\"header-image\"\r\n        [class.header-image__xmr]=\"cryptoCurrency === 'xmr'\"\r\n        [class.header-image__btc]=\"cryptoCurrency === 'btc'\">\r\n    </div>\r\n    <mat-card-title>{{cryptoCurrency === 'xmr' ? 'Monero' : 'Bitcoin' }} ({{cryptoCurrencyCount}})</mat-card-title>\r\n    <mat-card-subtitle>\r\n      today at <strong>{{cryptoCurrencyCurrentPrice | currency}}</strong>\r\n    </mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    Investment: <strong>{{usdFromCryptoCurrencyWhenBought | currency }}</strong> \r\n    <br>\r\n\r\n    on {{cryptoCurrencyBuyDate | date}} at {{cryptoCurrencyBuyPrice | currency}}\r\n\r\n    <div [class.color__accent]=\"usdFromCryptoCurrency >= usdFromCryptoCurrencyWhenBought\" \r\n        [class.color__red]=\"usdFromCryptoCurrency < usdFromCryptoCurrencyWhenBought\">\r\n      <br>\r\n      ROI: <strong>{{ usdFromCryptoCurrency | currency }}</strong> ({{usdFromCryptoCurrency / usdFromCryptoCurrencyWhenBought * 100 | number : '1.1-2'}}%)\r\n    </div>\r\n  </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".currency-card {\n  text-align: center; }\n  .currency-card .header-image {\n    background-size: cover; }\n    .currency-card .header-image.header-image__xmr {\n      background-image: url(\"/assets/images/xmr.png\"); }\n    .currency-card .header-image.header-image__btc {\n      background-image: url(\"/assets/images/btc.png\"); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoCurrencyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__ = __webpack_require__("../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
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
        this.cryptoCurrency$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
], CryptoCurrencyComponent.prototype, "totalReturns", void 0);
CryptoCurrencyComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'crypto-currency',
        template: __webpack_require__("../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__["a" /* CrytoCurrencyService */]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__["a" /* CrytoCurrencyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__crypto_currency_service__["a" /* CrytoCurrencyService */]) === "function" && _b || Object])
], CryptoCurrencyComponent);

var _a, _b;
//# sourceMappingURL=crypto-currency.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrytoCurrencyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
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
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(errMsg);
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

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container__net-worth\">\r\n  <!-- Net Worth Card -->\r\n  <mat-card *ngIf=\"user.financialInfo.annualIncome !== null && user.personalInfo.birthday\"\r\n      fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p class=\"accent\">\r\n        Your expected Net Worth at your age ({{user.personalInfo.age}}) is <strong>{{ user.personalInfo.age * (user.financialInfo.annualIncome || 0) / 10 }}</strong>\r\n      </p>\r\n      <p *ngIf=\"user.financialInfo.netWorth !== null\"\r\n          [class.color__accent]=\"user.financialInfo.netWorth >= user.financialInfo.annualIncome\" \r\n          [class.color__red]=\"user.financialInfo.netWorth < user.financialInfo.annualIncome\">\r\n        Your current net worth is <strong>{{ user.financialInfo.netWorth || 0 }}</strong>\r\n      </p>\r\n      <p *ngIf=\"user.financialInfo.netWorth === null\">\r\n        <a class=\"color__almost-white\" routerLink=\"/users/account\">\r\n          <mat-icon class=\"icon--arrow_forward\">arrow_forward</mat-icon>\r\n          Go to your account and complete Financial Info to see your current state\r\n          \r\n        </a>\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n    <!-- EOF Net Worth Card -->\r\n\r\n  <!-- Net Worth Card when Personal and Financial info is incomplete -->\r\n  <mat-card *ngIf=\"user.financialInfo.annualIncome === null || !user.personalInfo.birthday\"\r\n      fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>\r\n        <a class=\"color__almost-white\" routerLink=\"/users/account\">\r\n          <mat-icon class=\"icon--arrow_forward\">arrow_forward</mat-icon>\r\n          Go to your account and complete your Personal and Financial Info to see expected and current Net Worth\r\n        </a>\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <!-- EOF Net Worth Card when Personal and Financial info is incomplete -->\r\n</div>\r\n\r\n<div *ngIf=\"showInvestments\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n\r\n  <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\">\r\n    <crypto-currency fxFlex \r\n      [cryptoCurrency]=\"'xmr'\"\r\n      [cryptoCurrencyCount]=\"218.85627651\"\r\n      [cryptoCurrencyBuyPrice]=\"50\"\r\n      [cryptoCurrencyBuyDate]=\"xmrBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </crypto-currency>\r\n\r\n    <crypto-currency fxFlex\r\n      [cryptoCurrency]=\"'btc'\"\r\n      [cryptoCurrencyCount]=\"1.28129356\"\r\n      [cryptoCurrencyBuyPrice]=\"2359.99\"\r\n      [cryptoCurrencyBuyDate]=\"btcBuyDate\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </crypto-currency>\r\n  </div>\r\n\r\n  <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\">\r\n    <crypto-currency fxFlex \r\n      [cryptoCurrency]=\"'xmr'\"\r\n      [cryptoCurrencyCount]=\"5.94093753\"\r\n      [cryptoCurrencyBuyPrice]=\"87.5282\"\r\n      [cryptoCurrencyBuyDate]=\"xmrBuyDate2\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </crypto-currency>\r\n\r\n    <crypto-currency fxFlex \r\n      [cryptoCurrency]=\"'xmr'\"\r\n      [cryptoCurrencyCount]=\"5.72806551\"\r\n      [cryptoCurrencyBuyPrice]=\"90.9556\"\r\n      [cryptoCurrencyBuyDate]=\"xmrBuyDate3\"\r\n      (totalReturns)=\"setTotals($event)\">\r\n    </crypto-currency>\r\n  </div>\r\n\r\n  <mat-card fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>Total Investments: <strong>{{totalInvestment | currency }}</strong></p>\r\n      <p [class.color__accent]=\"totalReturn >= totalInvestment\" \r\n          [class.color__red]=\"totalReturn < totalInvestment\">\r\n        Total ROI: <strong>{{ totalReturn | currency }}</strong> ({{totalReturn / totalInvestment * 100 | number : '1.1-2'}}%)\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  \r\n</div>\r\n\r\n<div *ngIf=\"!showInvestments\" fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <mat-card fxFlex class=\"totals-card\">\r\n    <mat-card-content fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"10px\"\r\n        fxLayoutAlign=\"space-around center\">\r\n      <p>\r\n        You do not have any investment to show.\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container__net-worth {\n  margin-bottom: 10px; }\n  .container__net-worth .icon--arrow_forward {\n    float: left; }\n\n.totals-card {\n  text-align: center; }\n  .totals-card md-card-content p {\n    margin-bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InvestmentsDashboardComponent = (function () {
    function InvestmentsDashboardComponent(route, mainNavigatorService, usersService) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.usersService = usersService;
        this.xmrBuyDate = new Date(2017, 5, 23); //month minus 1, 5 = june
        this.xmrBuyDate2 = new Date(2017, 8, 23);
        this.xmrBuyDate3 = new Date(2017, 8, 25);
        this.btcBuyDate = new Date(2017, 6, 19);
        this.totalInvestment = 0;
        this.totalReturn = 0;
        this.showInvestments = false;
        this.user = null;
    }
    InvestmentsDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Investments', url: null, selected: true }
        ]);
        //get authUser from resolver
        this.route.data.subscribe(function (data) {
            _this.user = data.authUser;
            _this.showInvestments = data.authUser.accessToInvestments;
        });
    };
    InvestmentsDashboardComponent.prototype.setTotals = function (totalReturns) {
        this.totalReturn += totalReturns.usdFromCryptoCurrency;
        this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
    };
    return InvestmentsDashboardComponent;
}());
InvestmentsDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'investments-dashboard',
        template: __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__users_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__users_users_service__["a" /* UsersService */]) === "function" && _c || Object])
], InvestmentsDashboardComponent);

var _a, _b, _c;
//# sourceMappingURL=investments-dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/investments/investments-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_investments_dashboard_investments_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_guard__ = __webpack_require__("../../../../../src/app/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__ = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: 'investments',
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth_guard__["a" /* AuthGuard */]],
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_2__components_investments_dashboard_investments_dashboard_component__["a" /* InvestmentsDashboardComponent */],
                resolve: {
                    authUser: __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__["a" /* AuthResolver */]
                }
            }
        ]
    }
];
var InvestmentsRoutingModule = (function () {
    function InvestmentsRoutingModule() {
    }
    return InvestmentsRoutingModule;
}());
InvestmentsRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], InvestmentsRoutingModule);

//# sourceMappingURL=investments-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/investments/investments.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__investments_routing_module__ = __webpack_require__("../../../../../src/app/modules/investments/investments-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_shared_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_investments_dashboard_investments_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/investments/components/investments-dashboard/investments-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_crypto_currency_crypto_currency_component__ = __webpack_require__("../../../../../src/app/modules/investments/components/crypto-currency/crypto-currency.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var InvestmentsModule = (function () {
    function InvestmentsModule() {
    }
    return InvestmentsModule;
}());
InvestmentsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__investments_routing_module__["a" /* InvestmentsRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_5__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_6__modules_shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__components_crypto_currency_crypto_currency_component__["a" /* CryptoCurrencyComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_investments_dashboard_investments_dashboard_component__["a" /* InvestmentsDashboardComponent */]
        ],
        providers: []
    })
], InvestmentsModule);

//# sourceMappingURL=investments.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navigation--main\">\r\n  <mat-chip-list>\r\n    <mat-chip *ngFor=\"let link of links\" [routerLink]=\"link.url\" [selected]=\"link.selected\">{{link.displayName}}</mat-chip>\r\n  </mat-chip-list>      \r\n</nav>"

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainNavigatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainNavigatorComponent = (function () {
    function MainNavigatorComponent(mainNavigatorService) {
        this.mainNavigatorService = mainNavigatorService;
    }
    MainNavigatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainNavigatorService.links$.subscribe(function (links) { return _this.links = links; });
    };
    return MainNavigatorComponent;
}());
MainNavigatorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'main-navigator',
        template: __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _a || Object])
], MainNavigatorComponent);

var _a;
//# sourceMappingURL=main-navigator.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainNavigatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MainNavigatorService = (function () {
    function MainNavigatorService() {
        this.linksSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](null);
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
    return MainNavigatorService;
}());
MainNavigatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MainNavigatorService);

//# sourceMappingURL=main-navigator.service.js.map

/***/ }),

/***/ "../../../../../src/app/modules/shared/custom-material-design.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomMaterialDesignModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
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
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatChipsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["k" /* MatNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatTabsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatTooltipModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatChipsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["q" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["k" /* MatNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatTabsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["r" /* MatTooltipModule */]
        ]
    })
], CustomMaterialDesignModule);

//# sourceMappingURL=custom-material-design.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_main_navigator_main_navigator_component__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_4__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__components_main_navigator_main_navigator_component__["a" /* MainNavigatorComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__components_main_navigator_main_navigator_component__["a" /* MainNavigatorComponent */]]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__teams\">\r\n  <section fxLayoutWrap \r\n      fxLayout=\"row\" fxLayout.xs=\"column\" \r\n      fxLayoutGap.xs=\"10px\" \r\n      fxLayoutAlign=\"space-around center\" fxLayoutAlign.xs=\"none none\" >\r\n    \r\n    <div *ngIf=\"!teams.length && !getTeamsServiceRunning\" fxFlexAlign=\"center\">You are not member of any team yet.</div>\r\n    <!-- Team Cards -->\r\n    <mat-expansion-panel *ngFor=\"let team of teams\"\r\n        fxFlex.sm=\"45\" fxFlex.gt-sm=\"30\" \r\n        class=\"team-card\">\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          {{team.name}}\r\n        </mat-panel-title>\r\n        <mat-panel-description>\r\n          \r\n        </mat-panel-description>\r\n      </mat-expansion-panel-header>\r\n      \r\n      <div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"team-card__content\">\r\n        <section *ngIf=\"team.description\" class=\"description\">\r\n          <p>{{team.description}}</p>\r\n        </section>\r\n\r\n        <section class=\"members\">\r\n          <div *ngFor=\"let member of team.members\" fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"member\">\r\n            <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n            <div class=\"member__info\" fxLayout=\"column\" matTooltip=\"Administrator\" matTooltipPosition=\"right\">\r\n              <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n              <p class=\"member__email\">{{member.email}}</p>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <section *ngIf=\"team.admin.email === user.email\" class=\"edit\" fxLayout=\"column\" fxLayoutAlign=\"start end\">\r\n          <button mat-mini-fab routerLink=\"/teams/edit/{{team.slug}}\" color=\"primary\">\r\n            <mat-icon aria-label=\"Edit team\">edit</mat-icon>\r\n          </button>\r\n        </section>\r\n      </div>\r\n      \r\n    </mat-expansion-panel>\r\n    <!-- EOF Team Cards -->\r\n  </section>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamsServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-teams\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n\r\n  <section fxLayout=\"column\" fxLayoutAlign=\"start end\">\r\n    <button mat-fab routerLink=\"create\">\r\n      <mat-icon class=\"mat-24\" aria-label=\"Create team\">group_add</mat-icon>\r\n    </button>\r\n  </section>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container__teams .team-card {\n  cursor: default; }\n  .container__teams .team-card mat-panel-title {\n    font-size: 18px; }\n  .container__teams .team-card .team-card__content .description {\n    margin-bottom: 20px;\n    font-size: 13px; }\n  .container__teams .team-card .team-card__content .members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    padding: 0 10px 0 0; }\n  .container__teams .team-card .team-card__content .members .member .member__info .admin-icon {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n  .container__teams .team-card .team-card__content .members .member .member__info .member__email {\n    font-size: 11px; }\n\n.container__teams .progress-bar--get-teams {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  .container__teams .team-card {\n    margin-bottom: 10px; }\n  .container__teams .progress-bar--get-teams {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__teams_service__ = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_team__ = __webpack_require__("../../../../../src/app/modules/teams/models/team.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TeamsDashboardComponent = (function () {
    function TeamsDashboardComponent(route, mainNavigatorService, teamsService, appService, router) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.teamsService = teamsService;
        this.appService = appService;
        this.router = router;
        this.user = null;
        this.getTeamsServiceRunning = false;
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
        this.teamsService.getTeams(this.user.email).subscribe(function (data) {
            if (data && data instanceof Array) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    var admin = null;
                    var members = [];
                    for (var _a = 0, _b = item.members; _a < _b.length; _a++) {
                        var member = _b[_a];
                        var newMember = new __WEBPACK_IMPORTED_MODULE_3__users_models_user__["a" /* User */](member.name, member.email, member.gravatar);
                        members.push(newMember);
                        if (member.isAdmin) {
                            admin = newMember;
                        }
                    }
                    _this.teams.push(new __WEBPACK_IMPORTED_MODULE_6__models_team__["a" /* Team */](item.name, item.description || null, item.slug, admin, members));
                }
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.getTeamsServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the get team service.", error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the team services, please try again in a few minutes.");
            }
            _this.getTeamsServiceRunning = false;
        });
    };
    return TeamsDashboardComponent;
}());
TeamsDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-teams-dashboard',
        template: __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__teams_service__["a" /* TeamsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__teams_service__["a" /* TeamsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _e || Object])
], TeamsDashboardComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=teams-dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"10px\" class=\"container__edit-team\">\r\n  <form *ngIf=\"!getTeamServiceRunning\" \r\n      class=\"form__container form__edit-team\" (ngSubmit)=\"onSubmit()\" #editTeamForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n    \r\n    <section fxLayout=\"column\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" fxLayoutAlign.gt-xs=\"none end\" class=\"form__fields__row\">\r\n        <!-- Team name -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <input matInput type=\"tezt\" id=\"name\" name=\"name\" placeholder=\"Team name\" \r\n              [(ngModel)]=\"model.name\" \r\n              value=\"model.name\"\r\n              required\r\n              minlength=\"4\"\r\n              #name=\"ngModel\">\r\n          <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n          <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Value must be longer than 3 characters</mat-error>\r\n        </mat-form-field>\r\n\r\n        <!-- Description -->\r\n        <mat-form-field fxFlex class=\"form__field\">\r\n          <textarea matInput id=\"description\" name=\"description\" placeholder=\"Description\"\r\n              [(ngModel)]=\"model.description\" \r\n              value=\"model.description\"\r\n              #description=\"ngModel\"></textarea>\r\n        </mat-form-field>\r\n      </div>\r\n    </section>\r\n\r\n    <section class=\"members\" fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-card *ngFor=\"let member of team.members\" class=\"member\">\r\n        <mat-card-content fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n          <img class=\"member__avatar\" [src]=\"member.avatar\"/>\r\n          <div class=\"member__info\" fxLayout=\"column\" [matTooltip]=\"member.email === team.admin.email ? 'Administrator' : ''\" matTooltipPosition=\"right\">\r\n            <p class=\"member__name\">{{member.name}} <mat-icon *ngIf=\"member.email === team.admin.email\" class=\"admin-icon\" aria-label=\"Admin\" >lock</mat-icon></p>\r\n            <p class=\"member__email\">{{member.email}}</p>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </section>\r\n\r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--edit-team\">\r\n      <button *ngIf=\"!editTeamServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!editTeamForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"editTeamServiceRunning\"\r\n          class=\"progress-bar progress-bar--edit-team\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n    \r\n  </form>\r\n\r\n  <mat-progress-bar *ngIf=\"getTeamServiceRunning\"\r\n      fxFlexAlign=\"center\"\r\n      class=\"progress-bar progress-bar--get-team\"\r\n      color=\"primary\"\r\n      mode=\"indeterminate\">\r\n  </mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "form .form__actions .progress-bar {\n  width: 100%; }\n\n.form__edit-team .form__actions--edit-team {\n  margin: 20px 0; }\n\n.members .member {\n  padding: 14px;\n  border-radius: 50px; }\n  .members .member .member__avatar {\n    border-radius: 50%;\n    width: 40px;\n    height: 40px; }\n  .members .member .member__info .admin-icon {\n    font-size: 14px;\n    height: auto;\n    width: auto; }\n  .members .member .member__info .member__email {\n    font-size: 11px; }\n\n.progress-bar--get-team {\n  width: 100%; }\n\n@media screen and (min-width: 600px) {\n  form .form__actions .progress-bar {\n    width: 88px; }\n  .progress-bar--get-team {\n    width: 300px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__teams_service__ = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_team__ = __webpack_require__("../../../../../src/app/modules/teams/models/team.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TeamsEditComponent = (function () {
    function TeamsEditComponent(route, mainNavigatorService, teamsService, appService, router) {
        this.route = route;
        this.mainNavigatorService = mainNavigatorService;
        this.teamsService = teamsService;
        this.appService = appService;
        this.router = router;
        this.user = null;
        this.team = null;
        this.editTeamServiceRunning = false;
        this.getTeamServiceRunning = false;
        this.model = {
            name: null,
            description: null,
            email: null //user email for api check
        };
    }
    TeamsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        this.mainNavigatorService.setLinks([
            { displayName: 'Welcome', url: '/welcome', selected: false },
            { displayName: 'Teams', url: '/teams', selected: false }
        ]);
        //get authUser from resolver
        this.route.data.subscribe(function (data) {
            _this.user = data.authUser;
            _this.model.email = _this.user.email;
        });
        this.route.paramMap.map(function (params) { return params.get('slug'); })
            .subscribe(function (slug) {
            if (!slug) {
                //we are creating a team
                _this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected: true });
            }
            else {
                //we are editing a team
                _this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected: true });
                _this.getTeam(slug);
            }
        });
    };
    TeamsEditComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.editTeamServiceRunning = true;
        //call the account service
        this.teamsService.create(this.model).subscribe(function (data) {
            if (data && data.slug) {
                _this.appService.showResults("Team " + data.name + " successfully created!");
                _this.router.navigate(['/teams/edit', data.slug]);
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
                _this.editTeamServiceRunning = false;
            }
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the create/edit team service.", error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the team services, please try again in a few minutes.");
            }
            _this.editTeamServiceRunning = false;
        });
    };
    /**
     * Get a team from server based on the slug provided
     * @param {string} slug
     */
    TeamsEditComponent.prototype.getTeam = function (slug) {
        var _this = this;
        var methodTrace = this.constructor.name + " > getTeam() > "; //for debugging
        if (!slug) {
            this.appService.consoleLog('error', methodTrace + " Slug parameter must be provided, but was: ", slug);
            return false;
        }
        this.getTeamServiceRunning = true;
        this.teamsService.getTeamBySlug(this.user.email, slug).subscribe(function (data) {
            if (data && data.slug) {
                var admin = new __WEBPACK_IMPORTED_MODULE_3__users_models_user__["a" /* User */](data.admin.name, data.admin.email, data.admin.gravatar);
                var members = [];
                for (var _i = 0, _a = data.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    var newMember = new __WEBPACK_IMPORTED_MODULE_3__users_models_user__["a" /* User */](member.name, member.email, member.gravatar);
                    members.push(newMember);
                }
                _this.team = new __WEBPACK_IMPORTED_MODULE_6__models_team__["a" /* Team */](data.name, data.description || null, data.slug, admin, members);
                console.log(_this.team);
                _this.model.name = _this.team.name;
                _this.model.description = _this.team.description;
            }
            else {
                _this.appService.consoleLog('error', methodTrace + " Unexpected data format.");
            }
            _this.getTeamServiceRunning = false;
        }, function (error) {
            _this.appService.consoleLog('error', methodTrace + " There was an error with the get team service.", error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the team services, please try again in a few minutes.");
            }
            _this.getTeamServiceRunning = false;
        });
    };
    return TeamsEditComponent;
}());
TeamsEditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-teams-edit',
        template: __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__teams_service__["a" /* TeamsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__teams_service__["a" /* TeamsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _e || Object])
], TeamsEditComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=teams-edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/models/team.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Team; });
var Team = (function () {
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

//# sourceMappingURL=team.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/teams-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_teams_dashboard_teams_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_teams_edit_teams_edit_component__ = __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__ = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: 'teams',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: __WEBPACK_IMPORTED_MODULE_2__components_teams_dashboard_teams_dashboard_component__["a" /* TeamsDashboardComponent */],
                resolve: {
                    authUser: __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__["a" /* AuthResolver */]
                }
            },
            {
                path: 'create',
                component: __WEBPACK_IMPORTED_MODULE_3__components_teams_edit_teams_edit_component__["a" /* TeamsEditComponent */],
                resolve: {
                    authUser: __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__["a" /* AuthResolver */]
                }
            },
            {
                path: 'edit/:slug',
                component: __WEBPACK_IMPORTED_MODULE_3__components_teams_edit_teams_edit_component__["a" /* TeamsEditComponent */],
                resolve: {
                    authUser: __WEBPACK_IMPORTED_MODULE_4__auth_resolver_service__["a" /* AuthResolver */]
                }
            }
        ]
    }
];
var TeamsRoutingModule = (function () {
    function TeamsRoutingModule() {
    }
    return TeamsRoutingModule;
}());
TeamsRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], TeamsRoutingModule);

//# sourceMappingURL=teams-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/teams.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__teams_routing_module__ = __webpack_require__("../../../../../src/app/modules/teams/teams-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_teams_dashboard_teams_dashboard_component__ = __webpack_require__("../../../../../src/app/modules/teams/components/teams-dashboard/teams-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_teams_edit_teams_edit_component__ = __webpack_require__("../../../../../src/app/modules/teams/components/teams-edit/teams-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__teams_service__ = __webpack_require__("../../../../../src/app/modules/teams/teams.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var TeamsModule = (function () {
    function TeamsModule() {
    }
    return TeamsModule;
}());
TeamsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__teams_routing_module__["a" /* TeamsRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["FlexLayoutModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__components_teams_dashboard_teams_dashboard_component__["a" /* TeamsDashboardComponent */], __WEBPACK_IMPORTED_MODULE_7__components_teams_edit_teams_edit_component__["a" /* TeamsEditComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_8__teams_service__["a" /* TeamsService */]]
    })
], TeamsModule);

//# sourceMappingURL=teams.module.js.map

/***/ }),

/***/ "../../../../../src/app/modules/teams/teams.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamsService = (function () {
    function TeamsService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiHost + '/api/teams';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    /**
     * Server call to Create a new team in the system
     * @param postData
     */
    TeamsService.prototype.create = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/create", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to Get a team from the server based on its slug
     * @param {string} slug . The team slug
     */
    TeamsService.prototype.getTeamBySlug = function (email, slug) {
        var methodTrace = this.constructor.name + " > getTeamBySlug() > "; //for debugging
        if (!slug) {
            this.appService.consoleLog('error', methodTrace + " Slug parameter must be provided, but was: ", slug);
            return null;
        }
        return this.http.get(this.serverHost + "/getbySlug?" + this.appService.getParamsAsQuerystring({ slug: slug, email: email }))
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to Get all the teams for the current user from the server
     * @param {string} slug . The team slug
     */
    TeamsService.prototype.getTeams = function (email) {
        var methodTrace = this.constructor.name + " > getTeams() > "; //for debugging
        return this.http.get(this.serverHost + "/getAll?" + this.appService.getParamsAsQuerystring({ email: email }))
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    return TeamsService;
}());
TeamsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _b || Object])
], TeamsService);

var _a, _b;
//# sourceMappingURL=teams.service.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-finance\" (ngSubmit)=\"onSubmit()\" #financeForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n\r\n  <section fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n      <!-- Active income -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"33%\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"annualIncome\" name=\"annualIncome\" placeholder=\"Annual Income\" \r\n            [(ngModel)]=\"model.annualIncome\" \r\n            value=\"model.annualIncome\"\r\n            numberValidator \r\n            #annualIncome=\"ngModel\">\r\n        <mat-hint align=\"start\">Annual income amount pre-tax.</mat-hint>\r\n        <mat-error *ngIf=\"annualIncome.invalid && (annualIncome.dirty || annualIncome.touched) && annualIncome.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{annualIncome.errors | json}}</pre> -->\r\n\r\n      <!-- Tax rate -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"33%\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"incomeTaxRate\" name=\"incomeTaxRate\" placeholder=\"Active income tax rate\" \r\n            [(ngModel)]=\"model.incomeTaxRate\" \r\n            value=\"model.incomeTaxRate\"\r\n            numberValidator='{\"min\": 0, \"max\": 100}' \r\n            #incomeTaxRate=\"ngModel\">\r\n\r\n        <mat-hint align=\"start\">Income tax rate (%).</mat-hint>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMin\">Min value must be greater or equal than 0</mat-error>\r\n        <mat-error *ngIf=\"incomeTaxRate.invalid && (incomeTaxRate.dirty || incomeTaxRate.touched) && incomeTaxRate.errors.numberValidatorMax\">Max value must be less or equal than 100</mat-error>\r\n      </mat-form-field>\r\n      <!-- <pre>{{incomeTaxRate.errors | json}}</pre> -->\r\n\r\n      <!-- Net worth -->\r\n      <mat-form-field fxFlex fxFlex.gt-xs=\"33%\" class=\"form__field\">\r\n        <input matInput type=\"number\" id=\"netWorth\" name=\"netWorth\" placeholder=\"Savings\" \r\n            [(ngModel)]=\"model.netWorth\" \r\n            value=\"model.netWorth\"\r\n            numberValidator\r\n            #netWorth=\"ngModel\">\r\n\r\n            <mat-error *ngIf=\"netWorth.invalid && (netWorth.dirty || netWorth.touched) && netWorth.errors.numberValidator\">Value must be numeric, with no more than two decimal digits</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </section>\r\n\r\n  <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-finance\">\r\n    <button *ngIf=\"!accountFinanceServiceRunning\" \r\n        class=\"form__action mat-raised-button\" \r\n        mat-raised-button \r\n        type=\"submit\" \r\n        color=\"accent\" \r\n        [disabled]=\"!financeForm.form.valid\">Save</button>\r\n    \r\n    <mat-progress-bar *ngIf=\"accountFinanceServiceRunning\"\r\n        class=\"progress-bar progress-bar--account-finance\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </section>\r\n\r\n</form>"

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountFinanceInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_account_finance__ = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AccountFinanceInfoComponent = (function () {
    function AccountFinanceInfoComponent(usersService, appService) {
        this.usersService = usersService;
        this.appService = appService;
        this.model = {
            email: null,
            annualIncome: null,
            incomeTaxRate: null,
            netWorth: null
        };
        this.accountFinanceServiceRunning = false;
    }
    AccountFinanceInfoComponent.prototype.ngOnInit = function () {
        var methodTrace = this.constructor.name + " > ngOnInit() > "; //for debugging
        if (this.user.financialInfo) {
            this.model = {
                annualIncome: this.user.financialInfo.annualIncome,
                incomeTaxRate: this.user.financialInfo.incomeTaxRate,
                netWorth: this.user.financialInfo.netWorth
            };
        }
        this.model.email = this.user.email;
    };
    AccountFinanceInfoComponent.prototype.onSubmit = function () {
        var _this = this;
        var methodTrace = this.constructor.name + " > onSubmit() > "; //for debugging
        this.accountFinanceServiceRunning = true;
        //call the account service
        this.usersService.updateFinancialInfo(this.model).subscribe(function (data) {
            if (data === null) {
                _this.usersService.user.financialInfo = new __WEBPACK_IMPORTED_MODULE_2__models_account_finance__["a" /* AccountFinance */](_this.model.annualIncome, _this.model.incomeTaxRate, _this.model.netWorth);
                _this.appService.showResults("Your personal information was successfully updated!.");
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
            _this.accountFinanceServiceRunning = false;
        }, function (error) {
            console.error(methodTrace + " There was an error with the update personal info service > " + error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the personal info service, please try again in a few minutes.");
            }
            _this.accountFinanceServiceRunning = false;
        });
    };
    return AccountFinanceInfoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]) === "function" && _a || Object)
], AccountFinanceInfoComponent.prototype, "user", void 0);
AccountFinanceInfoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'account-finance-info',
        template: __webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AppService */]) === "function" && _c || Object])
], AccountFinanceInfoComponent);

var _a, _b, _c;
//# sourceMappingURL=account-finance-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container form__account-personal\" #personalInfoForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n    <section fxLayout=\"column\" class=\"form__fields\">\r\n      <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\">\r\n        \r\n        <!-- Birthday -->\r\n        <mat-form-field class=\"form__field\">\r\n          <input \r\n              placeholder=\"Day of birth\"\r\n              id=\"birthday\"\r\n              name=\"birthday\"\r\n              readonly\r\n              required\r\n              #birthday=\"ngModel\"\r\n              matInput \r\n              [(ngModel)]=\"model.birthday\" \r\n              [matDatepicker]=\"pickerBirthday\"\r\n              (click)=\"pickerBirthday.open()\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"pickerBirthday\"></mat-datepicker-toggle>\r\n          <mat-datepicker [touchUi]=\"utilService.isGtSm() ? false : true\" #pickerBirthday startView=\"year\" [startAt]=\"startAt\"></mat-datepicker>\r\n          <mat-error *ngIf=\"birthday.invalid && (birthday.dirty || birthday.touched) && birthday.errors.matDatepickerParse\">Day of birth is invalid or not follow the pattern \"mm/dd/yyyy\"</mat-error>\r\n        </mat-form-field>\r\n      </div>\r\n    </section>\r\n    \r\n    <section fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center center\" class=\"form__actions form__actions--account-personal\">\r\n      <button *ngIf=\"!accountPersonalServiceRunning\" \r\n          class=\"form__action mat-raised-button\" \r\n          mat-raised-button \r\n          type=\"submit\" \r\n          color=\"accent\" \r\n          [disabled]=\"!personalInfoForm.form.valid\">Save</button>\r\n      \r\n      <mat-progress-bar *ngIf=\"accountPersonalServiceRunning\"\r\n          class=\"progress-bar progress-bar--account-personal\"\r\n          color=\"primary\"\r\n          mode=\"indeterminate\">\r\n      </mat-progress-bar>\r\n    </section>\r\n  </form>"

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPersonalInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_account_personal__ = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_service__ = __webpack_require__("../../../../../src/app/util.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AccountPersonalInfoComponent = (function () {
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
                _this.usersService.user.personalInfo = new __WEBPACK_IMPORTED_MODULE_3__models_account_personal__["a" /* AccountPersonal */](_this.model.birthday);
                _this.appService.showResults("Your personal information was successfully updated!.");
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
            _this.accountPersonalServiceRunning = false;
        }, function (error) {
            console.error(methodTrace + " There was an error with the update personal info service > " + error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the personal info service, please try again in a few minutes.");
            }
            _this.accountPersonalServiceRunning = false;
        });
    };
    return AccountPersonalInfoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]) === "function" && _a || Object)
], AccountPersonalInfoComponent.prototype, "user", void 0);
AccountPersonalInfoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'account-personal-info',
        template: __webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* DateAdapter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* DateAdapter */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__util_service__["a" /* UtilService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__util_service__["a" /* UtilService */]) === "function" && _e || Object])
], AccountPersonalInfoComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=account-personal-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form__container\" (ngSubmit)=\"onSubmit()\" #accountForm=\"ngForm\" novalidate fxLayout=\"column\" fxLayoutGap=\"10px\" >\r\n  \r\n  <div fxLayout=\"column\" class=\"form__fields\">\r\n    <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap.gt-xs=\"10px\" class=\"form__fields__row\" >\r\n      <!-- Name -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" \r\n            [(ngModel)]=\"model.name\" \r\n            required minlength=\"4\"\r\n            value=\"model.name\"\r\n            #name=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.required\">Name is required</mat-error>\r\n        <mat-error *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors.minlength\">Name must contains more than 4 characters</mat-error>\r\n      </mat-form-field>\r\n      \r\n      <!-- Email -->\r\n      <mat-form-field fxFlex class=\"form__field\">\r\n        <input matInput type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \r\n            [(ngModel)]=\"model.email\" \r\n            required email\r\n            value=\"model.email\"\r\n            #email=\"ngModel\">\r\n\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.required\">Email is required</mat-error>\r\n        <mat-error *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors.email\">Email must be a valid email address</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n\r\n  <div fxLayout=\"column\" fxLayout.gt-xs=\"row\" fxLayoutGap=\"10px\" fxLayoutAlign.gt-xs=\"center none\" class=\"form__actions\">\r\n    <button *ngIf=\"!updateAccountServiceRunning\" class=\"form__action mat-raised-button\" color=\"accent\" mat-raised-button type=\"submit\" \r\n        [disabled]=\"!accountForm.form.valid\">Save</button>\r\n\r\n    <mat-progress-bar *ngIf=\"updateAccountServiceRunning\"\r\n        class=\"progress-bar progress-bar--update-account\"\r\n        color=\"primary\"\r\n        mode=\"indeterminate\">\r\n    </mat-progress-bar>\r\n  </div>\r\n\r\n</form>"

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountUserInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountUserInfoComponent = (function () {
    function AccountUserInfoComponent(usersService, appService) {
        this.usersService = usersService;
        this.appService = appService;
        this.model = { name: '', email: '' };
        this.user = null;
        this.updateAccountServiceRunning = false;
    }
    AccountUserInfoComponent.prototype.ngOnInit = function () {
        this.model = { name: this.user.name, email: this.user.email };
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
                var user = new __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments);
                _this.usersService.user = user;
                _this.appService.showResults("Your profile was successfully updated!.");
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
            _this.updateAccountServiceRunning = false;
        }, function (error) {
            console.error(methodTrace + " There was an error with the update account service > " + error);
            if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an error with the update account service, please try again in a few minutes.");
            }
            _this.updateAccountServiceRunning = false;
        });
    };
    return AccountUserInfoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_user__["a" /* User */]) === "function" && _a || Object)
], AccountUserInfoComponent.prototype, "user", void 0);
AccountUserInfoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'account-user-info',
        template: __webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _c || Object])
], AccountUserInfoComponent);

var _a, _b, _c;
//# sourceMappingURL=account-user-info.component.js.map

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_service__ = __webpack_require__("../../../../../src/app/util.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountComponent = (function () {
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
    return AccountComponent;
}());
AccountComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-account',
        template: __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/account/account.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__util_service__["a" /* UtilService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__util_service__["a" /* UtilService */]) === "function" && _c || Object])
], AccountComponent);

var _a, _b, _c;
//# sourceMappingURL=account.component.js.map

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
                _this.appService.showResults('Reset password url has expired or is invalid. Please go to Forgot my password again to create a new one.', 5000);
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
        this.usersService.user = null; //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.login(this.model).subscribe(function (data) {
            if (data && data.email) {
                var user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments);
                _this.usersService.user = user;
                var redirectUrl = _this.usersService.routerRedirectUrl ? _this.usersService.routerRedirectUrl : '/';
                _this.usersService.routerRedirectUrl = null;
                _this.router.navigate([redirectUrl]); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
                _this.loginServiceRunning = false;
            }
        }, function (error) {
            console.error(methodTrace + " There was an error with the login service: ", error);
            if (error.codeno === 451) {
                _this.appService.showResults(error.msg, 60000, 'Close');
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
            _this.appService.showResults("You have been emailed a password reset link.");
        }, function (error) {
            console.error(methodTrace + " There was an error with the forgot password service: ", error);
            _this.forgotServiceRunning = false;
            if (error.codeno === 455) {
                //invalid email
                _this.appService.showResults(error.msg, 3000);
            }
            else if (error.codeno === 400) {
                //the mail system failed for external reasons
                _this.appService.showResults("There was an issue sending the reset password email, please try again in a few minutes.");
            }
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object])
], LoginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
            console.error(methodTrace + " Confirm password must match password.");
            this.registerServiceRunning = false;
            return false;
        }
        this.usersService.user = null; //reset authenticated user. Register automatically authenticates the registered user.
        //call the register service
        this.usersService.register(this.model).subscribe(function (data) {
            if (data && data.email) {
                var user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments);
                _this.usersService.user = user;
                _this.router.navigate(['/']); //go home
                _this.appService.showResults(user.name + " welcome to AtomiCoconut!");
            }
            else {
                console.error(methodTrace + " Unexpected data format.", data);
            }
            _this.registerServiceRunning = false;
        }, function (error) {
            console.error(methodTrace + " There was an error with the register service.", error);
            if (error.codeno === 400) {
                if (error.data && error.data.name === 'UserExistsError')
                    //the mail system failed for external reasons
                    _this.appService.showResults("The submitted email was already use by another person, pick a different one please.");
            }
            _this.registerServiceRunning = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'users-register',
        template: __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/register/register.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=register.component.js.map

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user__ = __webpack_require__("../../../../../src/app/modules/users/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_components_main_navigator_main_navigator_service__ = __webpack_require__("../../../../../src/app/modules/shared/components/main-navigator/main-navigator.service.ts");
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
    function ResetPasswordComponent(usersService, router, route, mainNavigatorService) {
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
                console.error(methodTrace + " Token must be set to reset a password.");
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
            console.error(methodTrace + " Confirm password must match password.");
            this.resetPasswordServiceRunning = false;
            return false;
        }
        //call the reset password service.
        this.usersService.user = null; //reset authenticated user. Reset automatically authenticates the registered user.
        this.usersService.reset(this.token, this.model).subscribe(function (data) {
            if (data) {
                var user = new __WEBPACK_IMPORTED_MODULE_3__models_user__["a" /* User */](data.name, data.email, data.avatar, data.accessToInvestments);
                _this.usersService.user = user;
                _this.router.navigate(['/']); //go home
            }
            else {
                console.error(methodTrace + " Unexpected data format.");
            }
            _this.resetPasswordServiceRunning = false;
        }, function (error) {
            console.error(methodTrace + " There was an error with the reset password service > " + error);
            _this.resetPasswordServiceRunning = false;
        });
    };
    return ResetPasswordComponent;
}());
ResetPasswordComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-reset-password',
        template: __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_components_main_navigator_main_navigator_service__["a" /* MainNavigatorService */]) === "function" && _d || Object])
], ResetPasswordComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=reset-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/models/account-finance.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountFinance; });
var AccountFinance = (function () {
    function AccountFinance(annualIncome, netWorth, incomeTaxRate) {
        if (annualIncome === void 0) { annualIncome = null; }
        if (netWorth === void 0) { netWorth = null; }
        if (incomeTaxRate === void 0) { incomeTaxRate = null; }
        this.annualIncome = null; //annual pre tax
        this.netWorth = null;
        this.incomeTaxRate = null; //percentage value
        this.annualIncome = annualIncome;
        this.netWorth = netWorth;
        this.incomeTaxRate = incomeTaxRate;
    }
    return AccountFinance;
}());

//# sourceMappingURL=account-finance.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/models/account-personal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPersonal; });
var AccountPersonal = (function () {
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

//# sourceMappingURL=account-personal.js.map

/***/ }),

/***/ "../../../../../src/app/modules/users/models/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account_finance__ = __webpack_require__("../../../../../src/app/modules/users/models/account-finance.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__account_personal__ = __webpack_require__("../../../../../src/app/modules/users/models/account-personal.ts");


var User = (function () {
    function User(name, email, avatar, accessToInvestments, financialInfo, personalInfo) {
        if (name === void 0) { name = ''; }
        if (email === void 0) { email = ''; }
        if (avatar === void 0) { avatar = ''; }
        if (accessToInvestments === void 0) { accessToInvestments = false; }
        if (financialInfo === void 0) { financialInfo = null; }
        if (personalInfo === void 0) { personalInfo = null; }
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.accessToInvestments = accessToInvestments;
        if (financialInfo) {
            this.financialInfo = financialInfo;
        }
        else {
            this.financialInfo = new __WEBPACK_IMPORTED_MODULE_0__account_finance__["a" /* AccountFinance */]();
        }
        if (personalInfo) {
            this.personalInfo = personalInfo;
        }
        else {
            this.personalInfo = new __WEBPACK_IMPORTED_MODULE_1__account_personal__["a" /* AccountPersonal */]();
        }
    }
    return User;
}());

//# sourceMappingURL=user.js.map

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_account_account_component__ = __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_resolver_service__ = __webpack_require__("../../../../../src/app/auth-resolver.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'users',
        children: [
            { path: 'register', component: __WEBPACK_IMPORTED_MODULE_2__components_register_register_component__["a" /* RegisterComponent */] },
            { path: 'login/:state', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] },
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__components_login_login_component__["a" /* LoginComponent */] },
            {
                path: 'account',
                component: __WEBPACK_IMPORTED_MODULE_5__components_account_account_component__["a" /* AccountComponent */],
                resolve: {
                    authUser: __WEBPACK_IMPORTED_MODULE_6__auth_resolver_service__["a" /* AuthResolver */]
                }
            },
            {
                path: 'account/reset/expired',
                redirectTo: 'login/reset-password-token-expired',
                pathMatch: 'full'
            },
            { path: 'account/reset/:token', component: __WEBPACK_IMPORTED_MODULE_4__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */] }
        ]
    }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    return UsersRoutingModule;
}());
UsersRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_shared_custom_material_design_module__ = __webpack_require__("../../../../../src/app/modules/shared/custom-material-design.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_shared_shared_module__ = __webpack_require__("../../../../../src/app/modules/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_register_register_component__ = __webpack_require__("../../../../../src/app/modules/users/components/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__users_service__ = __webpack_require__("../../../../../src/app/modules/users/users.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__("../../../../../src/app/modules/users/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_reset_password_reset_password_component__ = __webpack_require__("../../../../../src/app/modules/users/components/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_equal_validator_directive__ = __webpack_require__("../../../../../src/app/directives/equal-validator.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_number_validator_directive__ = __webpack_require__("../../../../../src/app/directives/number-validator.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_account_account_component__ = __webpack_require__("../../../../../src/app/modules/users/components/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_account_finance_info_account_finance_info_component__ = __webpack_require__("../../../../../src/app/modules/users/components/account-finance-info/account-finance-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_account_personal_info_account_personal_info_component__ = __webpack_require__("../../../../../src/app/modules/users/components/account-personal-info/account-personal-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_account_user_info_account_user_info_component__ = __webpack_require__("../../../../../src/app/modules/users/components/account-user-info/account-user-info.component.ts");
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
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_flex_layout__["FlexLayoutModule"],
            __WEBPACK_IMPORTED_MODULE_5__modules_shared_custom_material_design_module__["a" /* CustomMaterialDesignModule */],
            __WEBPACK_IMPORTED_MODULE_6__modules_shared_shared_module__["a" /* SharedModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_11__directives_equal_validator_directive__["a" /* EqualValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_12__directives_number_validator_directive__["a" /* NumberValidatorDirective */],
            __WEBPACK_IMPORTED_MODULE_13__components_account_account_component__["a" /* AccountComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_account_finance_info_account_finance_info_component__["a" /* AccountFinanceInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_account_personal_info_account_personal_info_component__["a" /* AccountPersonalInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_account_user_info_account_user_info_component__["a" /* AccountUserInfoComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__users_service__["a" /* UsersService */]]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
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
    function UsersService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.serverHost = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiHost + '/api/users';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.routerRedirectUrl = null; //a route to redirect the user to when login is successfull
        this._user = null;
    }
    /**
     * Server call to Register a new user in the system
     * @param postData
     */
    UsersService.prototype.register = function (postData) {
        if (postData === void 0) { postData = {}; }
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
        return this.http.get(this.serverHost + "/getUser?" + this.appService.getParamsAsQuerystring(parameters))
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.login = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/login", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to forgot with the provided user email.
     */
    UsersService.prototype.forgot = function (postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/account/forgot", postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to reset password api with the provided new password.
     */
    UsersService.prototype.reset = function (token, postData) {
        if (postData === void 0) { postData = {}; }
        return this.http.post(this.serverHost + "/account/reset/" + token, postData, { headers: this.headers })
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Server call to login the provided user email and pass.
     */
    UsersService.prototype.logout = function () {
        return this.http.get(this.serverHost + "/logout")
            .map(this.appService.extractData)
            .catch(this.appService.handleError);
    };
    /**
     * Tells whether the user is logged in in the system. Checks the local user variable
     */
    UsersService.prototype.isLoggedIn = function () {
        return this.user && this.user.email ? true : false;
    };
    Object.defineProperty(UsersService.prototype, "user", {
        get: function () {
            return this._user;
        },
        /**
         * Sets the local user variable with the user provided as param
         * @param user (User). The user to set
         */
        set: function (user) {
            this._user = user;
        },
        enumerable: true,
        configurable: true
    });
    return UsersService;
}());
UsersService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _b || Object])
], UsersService);

var _a, _b;
//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ "../../../../../src/app/util.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilService = (function () {
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
        if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].showLogs) {
            console[type](message, params);
        }
    };
    return UtilService;
}());
UtilService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilService);

//# sourceMappingURL=util.service.js.map

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
    production: true,
    apiHost: '',
    showLogs: true
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
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