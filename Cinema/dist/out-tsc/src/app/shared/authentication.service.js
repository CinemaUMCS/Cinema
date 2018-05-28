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
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.BASE_URL = 'https://ocenuczelnie.pl/cinema_api/';
        this.loggedSubject = new Subject_1.Subject();
        this.isLogged();
    }
    AuthenticationService.prototype.getUrl = function (url) {
        return this.BASE_URL + url;
    };
    AuthenticationService.prototype.login = function (credentialis) {
        return this.http.post(this.getUrl('account/login'), credentialis);
    };
    AuthenticationService.prototype.userLogIn = function () {
        this.loggedSubject.next(true);
    };
    AuthenticationService.prototype.isLogged = function () {
        if (localStorage.getItem('token')) {
            this.loggedSubject.next(true);
            return true;
        }
        this.loggedSubject.next(false);
        return false;
    };
    AuthenticationService.prototype.logout = function () {
        this.loggedSubject.next(false);
        localStorage.removeItem('token');
    };
    AuthenticationService.prototype.getMessage = function () {
        return this.loggedSubject.asObservable();
    };
    AuthenticationService.prototype.getToken = function () {
        return 'Bearer ' + localStorage.getItem('token');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map