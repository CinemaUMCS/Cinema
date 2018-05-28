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
var authentication_service_1 = require("./authentication.service");
var base_http_service_1 = require("./base-http.service");
var RatingsService = /** @class */ (function (_super) {
    __extends(RatingsService, _super);
    function RatingsService(http, authenticationService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.authenticationService = authenticationService;
        return _this;
    }
    RatingsService.prototype.getUnratedMovies = function () {
        var header = new http_1.Headers({ 'authorization': this.authenticationService.getToken() });
        return this.http.get(_super.prototype.setUrl.call(this, 'rating/UnratedMovies'));
    };
    RatingsService.prototype.setFilmRatings = function (movieId, mark) {
        var header = new http_1.Headers({ 'authorization': this.authenticationService.getToken() });
        // let body = new HttpParams();
        // body = body.set('rating', mark);
        return this.http.post(_super.prototype.setUrl.call(this, 'rating/') + movieId + '?rating=' + mark, null, { headers: header });
    };
    RatingsService.prototype.getAllViewedMovies = function () {
        var header = new http_1.Headers({ 'authorization': this.authenticationService.getToken() });
        return this.http.get(_super.prototype.setUrl.call(this, 'rating/WatchedMoviesWithRatings'), { headers: header });
    };
    RatingsService.prototype.getTopRatingMovies = function (count) {
        return this.http.get(_super.prototype.setUrl.call(this, "movie/GetTopRated?numberOfMovies=" + count));
    };
    RatingsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
    ], RatingsService);
    return RatingsService;
}(base_http_service_1.BaseHttpService));
exports.RatingsService = RatingsService;
//# sourceMappingURL=ratings.service.js.map