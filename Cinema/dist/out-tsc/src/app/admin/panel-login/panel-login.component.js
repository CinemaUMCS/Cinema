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
var authentication_service_1 = require("../../shared/authentication.service");
var router_1 = require("@angular/router");
var PanelLoginComponent = /** @class */ (function () {
    function PanelLoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.model = {};
    }
    PanelLoginComponent.prototype.ngOnInit = function () {
    };
    PanelLoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.model).subscribe(function (response) {
            console.log('j');
            _this.loggedUserResponse = response.json();
            console.log(_this.loggedUserResponse);
            localStorage.setItem('token', _this.loggedUserResponse.token);
            localStorage.setItem('role', _this.loggedUserResponse.role);
            if (_this.loggedUserResponse.role !== 'admin') {
                _this.authService.logout();
                _this.router.navigate(['../../']);
            }
            else {
                _this.authService.userLogIn();
            }
        }, function (err) {
            console.log(_this.model);
            console.log("NIC BY TO Nie DALO");
            console.log(err);
        });
    };
    PanelLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-panel-login',
            templateUrl: './panel-login.component.html',
            styleUrls: ['./panel-login.component.scss']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
    ], PanelLoginComponent);
    return PanelLoginComponent;
}());
exports.PanelLoginComponent = PanelLoginComponent;
//# sourceMappingURL=panel-login.component.js.map