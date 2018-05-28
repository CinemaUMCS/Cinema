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
var rxjs_1 = require("rxjs");
var DummyServiceService = /** @class */ (function () {
    function DummyServiceService() {
        this.subject = new rxjs_1.Subject();
        this.seances = new rxjs_1.Subject();
        this.seancesData = [];
        this.movies = [];
    }
    DummyServiceService.prototype.getMovies = function () {
        return this.movies.slice();
    };
    DummyServiceService.prototype.getMovie = function (id) {
        return this.movies.find(function (m) { return m.id === id; });
    };
    DummyServiceService.prototype.addMovie = function (movie) {
        this.movies.push(movie);
        console.log(this.movies);
        this.subject.next(this.movies.slice());
    };
    DummyServiceService.prototype.removeMovie = function (id) {
        console.log(id);
        var remove = this.movies.indexOf(this.movies.find(function (n) { return n.id === id; }));
        console.log(remove);
        this.movies.splice(remove, 1);
        console.log(this.movies);
        this.subject.next(this.movies.slice());
    };
    DummyServiceService.prototype.editMove = function (index, movie) {
        this.movies[index] = movie;
        this.subject.next(this.movies.slice());
    };
    DummyServiceService.prototype.getSeances = function (id) {
        return this.seancesData.filter(function (s) { return s.id === id; }).slice();
    };
    DummyServiceService.prototype.addSeance = function (seance) {
        this.seancesData.push(seance);
        this.seances.next(this.seancesData.slice());
    };
    DummyServiceService.prototype.removeSeance = function (id) {
        var seanceId = this.seancesData.indexOf(this.seancesData.find(function (s) { return s.id === id; }));
        this.seancesData.splice(seanceId, 1);
        this.seances.next(this.seancesData.slice());
    };
    DummyServiceService.prototype.updateSeance = function (id, seance) {
        this.seancesData[id].seanceStart = seance.seanceStart;
        this.seancesData[id].normalTicketPrice = seance.normalTicketPrice;
        this.seancesData[id].concessionaryTicketPrice = seance.concessionaryTicketPrice;
        this.seancesData[id].movieId = seance.movieId;
        this.seancesData[id].roomId = seance.roomId;
        this.seancesData[id].duration = seance.duration;
    };
    DummyServiceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DummyServiceService);
    return DummyServiceService;
}());
exports.DummyServiceService = DummyServiceService;
//# sourceMappingURL=dummy-service.service.js.map