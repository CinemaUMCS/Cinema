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
var base_http_service_1 = require("./base-http.service");
var Subject_1 = require("rxjs/Subject");
var SeanceService = /** @class */ (function (_super) {
    __extends(SeanceService, _super);
    function SeanceService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.seanceSubject = new Subject_1.Subject();
        _this.movieSubject = new Subject_1.Subject();
        _this.seanceMessage = _this.seanceSubject.asObservable();
        _this.movieMessage = _this.movieSubject.asObservable();
        return _this;
    }
    SeanceService.prototype.getALlMovies = function () {
        return this.http.get(_super.prototype.setUrl.call(this, 'movie'));
    };
    SeanceService.prototype.getAllMovieByDay = function (date) {
        return this.http.get(_super.prototype.setUrl.call(this, 'movie/GetMoviesPlayingAtDate/?date=') + date);
    };
    SeanceService.prototype.getAllCategories = function () {
        return this.http.get(_super.prototype.setUrl.call(this, 'movie/getCategories'));
    };
    SeanceService.prototype.getSeanceByMovieIdAndDate = function (id, date) {
        return this.http.get(_super.prototype.setUrl.call(this, 'getByDateAndMovieId?movieId=') + id + '&date=' + date);
    };
    SeanceService.prototype.getSeanceByDate = function (date) {
        return this.http.get(_super.prototype.setUrl.call(this, 'seance/getByDate/?date=') + date);
    };
    SeanceService.prototype.getSeanceRoomData = function (seanceId) {
        return this.http.get(_super.prototype.setUrl.call(this, 'seance/getSeanceRoomData/' + seanceId));
    };
    SeanceService.prototype.getSeanceById = function (seanceId) {
        return this.http.get(_super.prototype.setUrl.call(this, 'seance/' + seanceId));
    };
    SeanceService.prototype.getMovieById = function (movieId) {
        return this.http.get(_super.prototype.setUrl.call(this, 'movie/' + movieId));
    };
    SeanceService.prototype.setActualSeance = function (seance) {
        this.actualSeance = seance;
    };
    SeanceService.prototype.setActualSeanceObservable = function (seance) {
        this.seanceSubject.next(seance);
    };
    SeanceService.prototype.setActualMovie = function (movie) {
        this.actualMovie = movie;
    };
    SeanceService.prototype.setActualMovieObservable = function (movie) {
        this.movieSubject.next(movie);
    };
    SeanceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SeanceService);
    return SeanceService;
}(base_http_service_1.BaseHttpService));
exports.SeanceService = SeanceService;
//# sourceMappingURL=seance.service.js.map