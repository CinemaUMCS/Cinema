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
var header_opacity_service_1 = require("../shared/header-opacity.service");
var ratings_service_1 = require("../shared/ratings.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(headerOpacityService, ratingsService) {
        this.headerOpacityService = headerOpacityService;
        this.ratingsService = ratingsService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.headerOpacityService.isDashboardComponentLoad(true);
        this.getTopRatedMovies();
    };
    DashboardComponent.prototype.getTopRatedMovies = function () {
        var _this = this;
        this.ratingsService.getTopRatingMovies(5).subscribe(function (value) {
            console.log('test', value);
            _this.movieList = value.json();
        }, function (error2) {
            console.log(error2);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss'],
        }),
        __metadata("design:paramtypes", [header_opacity_service_1.HeaderOpacityService, ratings_service_1.RatingsService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map