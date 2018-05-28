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
var forms_1 = require("@angular/forms");
var header_opacity_service_1 = require("../shared/header-opacity.service");
var user_api_service_1 = require("../shared/user-api.service");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(headerOpacityService, userApiService) {
        this.headerOpacityService = headerOpacityService;
        this.userApiService = userApiService;
        this.succesFlag = false;
        this.errorFlag = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
    };
    ForgotPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.resetPasswordForm.value.email);
        this.userApiService.forgotPassword(this.resetPasswordForm.value.email).subscribe(function (value) {
            _this.succesFlag = true;
            _this.errorFlag = false;
            _this.resetPasswordForm.onReset();
        }, function (error2) {
            _this.succesFlag = false;
            _this.errorFlag = true;
            console.log(error2);
        });
    };
    ForgotPasswordComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], ForgotPasswordComponent.prototype, "resetPasswordForm", void 0);
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-forgot-password',
            templateUrl: './forgot-password.component.html',
            styleUrls: ['./forgot-password.component.scss']
        }),
        __metadata("design:paramtypes", [header_opacity_service_1.HeaderOpacityService, user_api_service_1.UserApiService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map