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
var user_registration_service_1 = require("../shared/user-registration.service");
var router_1 = require("@angular/router");
var ConfirmEmailComponent = /** @class */ (function () {
    function ConfirmEmailComponent(userRegistrationService, router, route) {
        this.userRegistrationService = userRegistrationService;
        this.router = router;
        this.route = route;
        this.waitingForServerFlag = true;
        this.errorFlag = false;
        this.spinnerFlag = true;
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        this.onEmailConfirm(this.getUserId(), this.getUserToken());
        // this.onLoginPageRedirect();
    };
    ConfirmEmailComponent.prototype.getUserId = function () {
        return this.router.params['id'];
    };
    ConfirmEmailComponent.prototype.getUserToken = function () {
        return this.router.params['token'];
    };
    ConfirmEmailComponent.prototype.onEmailConfirm = function (id, token) {
        var _this = this;
        this.userRegistrationService.confirmEmail(id, token).subscribe(function (value) {
            console.log(value.statusText);
            _this.waitingForServerFlag = false;
            // this.onLoginPageRedirect();
        }, function (error2) {
            _this.errorFlag = true;
            _this.waitingForServerFlag = false;
            console.log(error2);
            // this.onDashboardPageRedirect();
        });
    };
    ConfirmEmailComponent.prototype.onLoginPageRedirect = function () {
        var _this = this;
        setTimeout(function (value) {
            _this.route.navigate(['/login']);
        }, 4000);
    };
    ConfirmEmailComponent.prototype.onDashboardPageRedirect = function () {
        var _this = this;
        setTimeout(function (value) {
            _this.route.navigate(['/']);
        }, 4000);
    };
    ConfirmEmailComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm-email',
            templateUrl: './confirm-email.component.html',
            styleUrls: ['./confirm-email.component.scss']
        }),
        __metadata("design:paramtypes", [user_registration_service_1.UserRegistrationService, router_1.ActivatedRoute, router_1.Router])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
exports.ConfirmEmailComponent = ConfirmEmailComponent;
//# sourceMappingURL=confirm-email.component.js.map