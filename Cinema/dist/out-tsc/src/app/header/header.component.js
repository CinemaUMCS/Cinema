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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../user.service");
var config_service_1 = require("../config.service");
var authentication_service_1 = require("../shared/authentication.service");
var header_opacity_service_1 = require("../shared/header-opacity.service");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, router, authenticationService, activatedRoute, headerOpacityService) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.activatedRoute = activatedRoute;
        this.headerOpacityService = headerOpacityService;
        this.divToChange = document.getElementById('customNav');
        this.backgroundNavbarColor = '#fff';
        this.loggedSubscription = this.authenticationService.getMessage().subscribe(function (value) { return _this.isLogged = value; });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDashboardComponent();
        this.isLogged = this.authenticationService.isLogged();
        this.headerOpacityService.dashboardToolbarColor.subscribe(function (value) { return _this.backgroundNavbarColor = value; });
    };
    HeaderComponent.prototype.loginIn = function () {
        return this.authenticationService.logged;
    };
    HeaderComponent.prototype.onLogout = function () {
        this.isLogged = false;
        this.authenticationService.logout();
        this.router.navigate(['/']);
    };
    HeaderComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(true);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss'],
            providers: [user_service_1.UserService, config_service_1.ConfigService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router, authentication_service_1.AuthenticationService,
            router_1.ActivatedRoute, header_opacity_service_1.HeaderOpacityService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map