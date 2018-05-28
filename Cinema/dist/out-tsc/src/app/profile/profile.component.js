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
var config_service_1 = require("../config.service");
var user_service_1 = require("../user.service");
var header_opacity_service_1 = require("../shared/header-opacity.service");
var user_api_service_1 = require("../shared/user-api.service");
var forms_1 = require("@angular/forms");
var codeStatus_1 = require("../shared/utils/codeStatus");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(headerOpacityService, userApiService) {
        this.headerOpacityService = headerOpacityService;
        this.userApiService = userApiService;
        this.editFlag = false;
        this.isInputChange = true;
        this.succesEditFlag = false;
        this.emailExistFlag = false;
        this.errorFlag = false;
        this.changePasswordSuccesFlag = false;
        this.incorrectPasswordFlag = false;
        this.actualUser = {
            email: 'test@gmail.com',
            firstName: 'pawel',
            lastName: 'sos',
            role: 'user',
            id: 1,
            phoneNumber: '123123123',
            backgroundPath: 'asd'
        };
        this.baseUser = {
            email: 'test@gmail.com',
            firstName: 'pawel',
            lastName: 'sos',
            role: 'user',
            id: 1,
            phoneNumber: null,
            backgroundPath: 'asd'
        };
        this.changePasswordModel = {
            newPassword: null,
            oldPassword: null,
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
        this.getActualUser();
    };
    ProfileComponent.prototype.getActualUser = function () {
        var _this = this;
        this.userApiService.getActualUser().subscribe(function (value) {
            _this.actualUser = value.json();
            _this.baseUser = value.json();
            console.log('Response', value.json());
            console.log('actual_user', _this.actualUser);
        }, function (error2) {
            console.log(error2);
        });
    };
    ProfileComponent.prototype.onEdit = function () {
        this.editFlag = true;
    };
    ProfileComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    ProfileComponent.prototype.onChange = function () {
        this.isInputChange = false;
    };
    ProfileComponent.prototype.onSave = function () {
        this.editFlag = true;
        console.log(this.actualUser);
    };
    ProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        this.baseUser.firstName = this.singupForm.value.firstName;
        this.baseUser.lastName = this.singupForm.value.lastName;
        this.baseUser.email = this.singupForm.value.email;
        this.baseUser.phoneNumber = this.singupForm.value.phoneNumber;
        this.actualUser = this.baseUser;
        console.log(this.actualUser);
        this.userApiService.updateUser(this.baseUser).subscribe(function (value) {
            console.log('succes');
            _this.succesEditFlag = true;
            _this.errorFlag = false;
            _this.emailExistFlag = false;
        }, function (error2) {
            console.log(error2);
            _this.succesEditFlag = false;
            _this.errorResponse(error2.json());
        });
    };
    ProfileComponent.prototype.errorResponse = function (errorModel) {
        if (errorModel.message === codeStatus_1.CodeStatus.occupiedEmail) {
            this.emailExistFlag = true;
        }
        else {
            this.errorFlag = true;
        }
    };
    ProfileComponent.prototype.onReset = function () {
        this.actualUser.email = this.baseUser.email;
        this.actualUser.firstName = this.baseUser.firstName;
        this.actualUser.lastName = this.baseUser.lastName;
    };
    ProfileComponent.prototype.changePasswordSubmit = function () {
        this.changePasswordModel.newPassword = this.changePasswordForm.value.newPassword;
        this.changePasswordModel.oldPassword = this.changePasswordForm.value.password;
        // console.log('form',this.changePasswordForm);
        // console.log(this.changePasswordModel);
        this.onChangePasswordRequest(this.changePasswordModel);
    };
    ProfileComponent.prototype.onChangePasswordRequest = function (changePassword) {
        var _this = this;
        this.userApiService.changePassword(changePassword).subscribe(function (value) {
            _this.changePasswordSuccesFlag = true;
            console.log('zmiana');
            _this.incorrectPasswordFlag = false;
            _this.changePasswordForm.onReset();
        }, function (error2) {
            console.log(error2);
            _this.incorrectPasswordFlag = true;
        });
        {
        }
    };
    __decorate([
        core_1.ViewChild('f'),
        __metadata("design:type", forms_1.NgForm)
    ], ProfileComponent.prototype, "singupForm", void 0);
    __decorate([
        core_1.ViewChild('changePassword'),
        __metadata("design:type", forms_1.NgForm)
    ], ProfileComponent.prototype, "changePasswordForm", void 0);
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss'],
            providers: [user_service_1.UserService, config_service_1.ConfigService]
        }),
        __metadata("design:paramtypes", [header_opacity_service_1.HeaderOpacityService, user_api_service_1.UserApiService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map