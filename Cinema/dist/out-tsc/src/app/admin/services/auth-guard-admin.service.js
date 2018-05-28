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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var authentication_service_1 = require("../../shared/authentication.service");
var AuthGuardAdmin = /** @class */ (function () {
    function AuthGuardAdmin(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuardAdmin.prototype.canActivate = function (route, state) {
        var isAuthenticated = this.authService.isLogged();
        if (isAuthenticated) {
            if (localStorage.getItem('role') !== 'admin') {
                this.authService.logout();
                this.router.navigate(['/admin/login']);
                return false;
            }
        }
        else {
            this.router.navigate(['/admin/login']);
            return false;
        }
        return true;
    };
    AuthGuardAdmin = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
    ], AuthGuardAdmin);
    return AuthGuardAdmin;
}());
exports.AuthGuardAdmin = AuthGuardAdmin;
//# sourceMappingURL=auth-guard-admin.service.js.map