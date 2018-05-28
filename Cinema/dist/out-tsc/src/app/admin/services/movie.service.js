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
var http_1 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
var url = 'http://localhost:5000/';
var MovieService = /** @class */ (function () {
    function MovieService(http) {
        this.http = http;
        this.movieSubject = new Subject_1.Subject();
        this.updateMoviesFromDb();
    }
    MovieService.prototype.getMovies = function () {
        return this.movies;
    };
    MovieService.prototype.getMovie = function (id) {
        return this.http.get(url + 'movie/' + id, { responseType: 'json' });
    };
    MovieService.prototype.updateMovie = function (id, model) {
        console.log(model);
        return this.http.put(url + 'movie/' + id, model);
    };
    MovieService.prototype.addMovie = function (model) {
        console.log("posting model: ");
        console.log(model);
        return this.http.post(url + 'movie', model);
    };
    MovieService.prototype.updateMoviesFromDb = function () {
        var _this = this;
        this.http.get(url + 'movie', { responseType: 'json' }).subscribe(function (data) {
            _this.movies = data;
            console.log(data);
            _this.movieSubject.next(_this.movies);
        });
    };
    MovieService.prototype.remove = function (id) {
        var _this = this;
        console.log(id);
        this.http.delete(url + 'movie/' + id).subscribe(function (data) {
            _this.updateMoviesFromDb();
        });
    };
    MovieService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MovieService);
    return MovieService;
}());
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map