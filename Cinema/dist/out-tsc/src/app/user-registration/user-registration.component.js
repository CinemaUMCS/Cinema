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
var header_opacity_service_1 = require("../shared/header-opacity.service");
var forms_1 = require("@angular/forms");
var user_registration_service_1 = require("../shared/user-registration.service");
var UserRegistrationComponent = /** @class */ (function () {
    function UserRegistrationComponent(userService, router, headerOpacityService, userRegistrationService) {
        this.userService = userService;
        this.router = router;
        this.headerOpacityService = headerOpacityService;
        this.userRegistrationService = userRegistrationService;
        this.succesRegistrationFlag = false;
        this.errorRegistrationFlag = false;
        // submitted: boolean = false;
        this.progressBarFlag = false;
        this.createUser = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            phoneNumber: null
        };
    }
    UserRegistrationComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
    };
    UserRegistrationComponent.prototype.onSubmit = function () {
        this.setCreateUserValue();
        this.progressBarFlag = true;
        this.onRegister(this.createUser);
    };
    UserRegistrationComponent.prototype.setCreateUserValue = function () {
        this.createUser.email = this.singupForm.value.email;
        this.createUser.firstName = this.singupForm.value.firstName;
        this.createUser.lastName = this.singupForm.value.lastName;
        this.createUser.phoneNumber = this.singupForm.value.phoneNumber;
        this.createUser.password = this.singupForm.value.password;
        this.createUser.phoneNumber = this.singupForm.value.phoneNumber;
    };
    UserRegistrationComponent.prototype.onRegister = function (user) {
        var _this = this;
        setTimeout(function () {
            _this.userRegistrationService.onRegister(user).subscribe(function (value) {
                _this.progressBarFlag = false;
                _this.succesRegister();
            }, function (error2) {
                _this.progressBarFlag = false;
                _this.errorRegister();
                console.log(error2);
            });
        }, 1000);
    };
    UserRegistrationComponent.prototype.succesRegister = function () {
        var _this = this;
        this.succesRegistrationFlag = true;
        this.errorRegistrationFlag = false;
        this.scroll('errorTest');
        setTimeout(function () {
            _this.router.navigate(['']);
        }, 6000);
    };
    UserRegistrationComponent.prototype.scroll = function (id) {
        var el = document.getElementById(id);
        el.scrollIntoView();
    };
    UserRegistrationComponent.prototype.errorRegister = function () {
        this.errorRegistrationFlag = true;
        this.scroll('errorTest');
    };
    UserRegistrationComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], UserRegistrationComponent.prototype, "singupForm", void 0);
    UserRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-user-registration',
            templateUrl: './user-registration.component.html',
            styleUrls: ['./user-registration.component.scss'],
            providers: [user_service_1.UserService, config_service_1.ConfigService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, header_opacity_service_1.HeaderOpacityService,
            user_registration_service_1.UserRegistrationService])
    ], UserRegistrationComponent);
    return UserRegistrationComponent;
}());
exports.UserRegistrationComponent = UserRegistrationComponent;
//# sourceMappingURL=user-registration.component.js.map