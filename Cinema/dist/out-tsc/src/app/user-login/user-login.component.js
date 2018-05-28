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
var user_api_service_1 = require("../shared/user-api.service");
var forms_1 = require("@angular/forms");
var codeStatus_1 = require("../shared/utils/codeStatus");
var UserLoginComponent = /** @class */ (function () {
    function UserLoginComponent(userService, router, activatedRoute, authService, headerOpacityService, userApiService) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.headerOpacityService = headerOpacityService;
        this.userApiService = userApiService;
        this.progressBarFlag = false;
        this.errorFlag = false;
        this.myCredent = {
            email: null,
            password: null
        };
        this.credentialisError = false;
        this.disableLogInBtn = false;
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
    };
    UserLoginComponent.prototype.onSubmit = function () {
        if (this.registerForm.invalid) {
            this.errorText = 'Błąd, niepoprawne dane!';
            this.errorFlag = true;
            return;
        }
        this.onLogin();
    };
    UserLoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.progressBarFlag = true;
        this.disableLogInBtn = true;
        setTimeout(function () {
            _this.setCredentialisModelFromForm();
            _this.authService.login(_this.myCredent).subscribe(function (response) {
                _this.loggedUserResponse = response.json();
                localStorage.setItem('token', _this.loggedUserResponse.token);
                _this.authService.userLogIn();
                _this.progressBarFlag = false;
                _this.disableLogInBtn = false;
                _this.router.navigate(['/']);
            }, function (error) {
                console.log(error.json());
                _this.progressBarFlag = false;
                _this.disableLogInBtn = false;
                _this.onErrorLogin(error.json());
            });
        }, 1000);
    };
    UserLoginComponent.prototype.onErrorLogin = function (errorModel) {
        if (errorModel.errorCode === codeStatus_1.CodeStatus.invalidCredentials) {
            this.errorText = 'Niepoprawny login lub hasło';
        }
        else if (errorModel.errorCode === codeStatus_1.CodeStatus.notActivated) {
            this.errorText = 'Adres email nie został potwierdzony';
        }
        else {
            this.errorText = 'Błąd z serwerem';
        }
        this.errorFlag = true;
    };
    UserLoginComponent.prototype.setCredentialisModelFromForm = function () {
        this.myCredent.email = this.registerForm.value.email;
        this.myCredent.password = this.registerForm.value.password;
    };
    UserLoginComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], UserLoginComponent.prototype, "registerForm", void 0);
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-user-login',
            templateUrl: './user-login.component.html',
            styleUrls: ['./user-login.component.scss'],
            providers: [user_service_1.UserService, config_service_1.ConfigService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router,
            router_1.ActivatedRoute, authentication_service_1.AuthenticationService,
            header_opacity_service_1.HeaderOpacityService, user_api_service_1.UserApiService])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login.component.js.map