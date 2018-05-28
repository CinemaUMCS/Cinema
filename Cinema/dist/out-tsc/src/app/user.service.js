"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_2 = require("@angular/common/http");
var config_service_1 = require("./config.service");
var base_service_1 = require("./base.service");
var Rx_1 = require("rxjs/Rx");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
require("./rxjs-operators");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, configService, httpClient) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.httpClient = httpClient;
        _this.baseUrl = '';
        _this.userStream = new ReplaySubject_1.ReplaySubject();
        // Observable navItem source
        _this._authNavStatusSource = new Rx_1.BehaviorSubject(false);
        // Observable navItem stream
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        _this.loggedIn = false;
        _this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        _this._authNavStatusSource.next(_this.loggedIn);
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    UserService.prototype.userRx$ = function () {
        return this.userStream.asObservable();
    };
    UserService.prototype.register = function (email, password, firstName, lastName) {
        var body = JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/account/register', body, options)
            .map(function (res) { return true; })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (email, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.baseUrl + '/account/login', JSON.stringify({ email: email, password: password }), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            localStorage.setItem('auth_token', res.token);
            _this.loggedIn = true;
            _this._authNavStatusSource.next(true);
            return true;
        })
            .catch(this.handleError);
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    Object.defineProperty(UserService.prototype, "isLoggedIn", {
        get: function () {
            if (localStorage.getItem('auth_token') == undefined) {
                this.loggedIn = false;
                return this.loggedIn;
            }
            else {
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.userDto = function () {
        var token = 'Bearer ' + localStorage.getItem('auth_token');
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };
        // let options = new RequestOptions({ headers: headers });
        this.baseUrl = this.configService.getApiURI();
        return this.httpClient.get(this.baseUrl + '/account/details', httpOptions);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService, http_2.HttpClient])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map