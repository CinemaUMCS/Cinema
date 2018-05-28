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
var SeancesService = /** @class */ (function () {
    function SeancesService(http) {
        this.http = http;
        this.seanceSubject = new Subject_1.Subject();
        this.updateMoviesFromDb();
    }
    SeancesService.prototype.getSeances = function () {
        return this.seances;
    };
    SeancesService.prototype.getSeance = function (id) {
        return this.http.get(url + 'seance/' + id, { responseType: 'json' });
    };
    SeancesService.prototype.updateSeance = function (id, model) {
        console.log(model);
        return this.http.put(url + 'seance/' + id, model);
    };
    SeancesService.prototype.addSeance = function (model) {
        console.log("posting model: ");
        console.log(model);
        return this.http.post(url + 'seance', model);
    };
    SeancesService.prototype.updateMoviesFromDb = function () {
        var _this = this;
        this.http.get(url + 'seance', { responseType: 'json' }).subscribe(function (data) {
            _this.seances = data;
            console.log(data);
            _this.seanceSubject.next(_this.seances);
        });
    };
    SeancesService.prototype.remove = function (id) {
        var _this = this;
        console.log(id);
        this.http.delete(url + 'movie/' + id).subscribe(function (data) {
            _this.updateMoviesFromDb();
        });
    };
    SeancesService.prototype.getSeanceByMovieIdAndDate = function (id, date) {
        return this.http.get(url + 'seance/getByDateAndMovieId?movieId=' + id + '&date=' + date);
    };
    SeancesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SeancesService);
    return SeancesService;
}());
exports.SeancesService = SeancesService;
//# sourceMappingURL=seances.service.js.map