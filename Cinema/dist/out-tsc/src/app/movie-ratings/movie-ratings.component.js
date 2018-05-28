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
var material_1 = require("@angular/material");
var rating_dialog_component_1 = require("./rating-dialog/rating-dialog.component");
var ratings_service_1 = require("../shared/ratings.service");
var MovieRatingsComponent = /** @class */ (function () {
    function MovieRatingsComponent(headerOpacityService, dialog, ratingService) {
        this.headerOpacityService = headerOpacityService;
        this.dialog = dialog;
        this.ratingService = ratingService;
        this.isRatingFilterPipeFlag = null;
        this.dropdownTitle = 'WSZYSTKIE';
        this.ratingMovieModel = [
            {
                id: 1,
                userRating: 0,
                movie: {
                    id: null,
                    title: null,
                    description: null,
                    category: null,
                    productionDate: new Date(),
                    trailerPath: 'testet',
                    posterPath: 'fafds',
                    duration: '123',
                    MinimalAge: 13,
                    averageRating: 1
                },
            },
        ];
    }
    MovieRatingsComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
        this.getRatingModel();
    };
    MovieRatingsComponent.prototype.getRating = function (id, movie) {
        this.openDialog([movie, id]);
    };
    MovieRatingsComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    MovieRatingsComponent.prototype.openDialog = function (data) {
        var _this = this;
        var dialogRef = this.dialog.open(rating_dialog_component_1.RatingDialogComponent, {
            data: data,
            minHeight: '210px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.dummySetRating(data[0].id, data[1]);
            }
        });
    };
    MovieRatingsComponent.prototype.setRating = function (movieId, mark) {
        var _this = this;
        this.ratingService.setFilmRatings(movieId, mark).subscribe(function (value) {
            console.log(value);
            _this.ratingMovieModel.filter(function (value1) {
                if (value1.movie.id === movieId) {
                    value1.userRating = +mark;
                }
            });
        }, function (error2) {
            console.log(error2);
        });
    };
    MovieRatingsComponent.prototype.dummySetRating = function (movieId, mark) {
        this.setRating(movieId, mark);
    };
    MovieRatingsComponent.prototype.changeMovieMark = function (id) {
        this.ratingMovieModel.filter(function (value) {
            if (value.movie.id === id) {
                value.userRating = 0;
            }
        });
    };
    MovieRatingsComponent.prototype.changeFilterFlag = function (flag) {
        this.isRatingFilterPipeFlag = flag;
        this.changeNameDropdown(flag);
    };
    MovieRatingsComponent.prototype.changeNameDropdown = function (flag) {
        if (flag == null) {
            this.dropdownTitle = 'WSZYSTKIE';
        }
        else if (flag) {
            this.dropdownTitle = 'OCENIONE';
        }
        else {
            this.dropdownTitle = 'BRAK OCENY';
        }
    };
    MovieRatingsComponent.prototype.getRatingModel = function () {
        var _this = this;
        this.ratingService.getAllViewedMovies().subscribe(function (value) {
            console.log(value.json());
            _this.ratingMovieModel = value.json();
        }, function (error2) {
            console.log(error2);
        });
    };
    MovieRatingsComponent = __decorate([
        core_1.Component({
            selector: 'app-movie-ratings',
            templateUrl: './movie-ratings.component.html',
            styleUrls: ['./movie-ratings.component.scss']
        }),
        __metadata("design:paramtypes", [header_opacity_service_1.HeaderOpacityService, material_1.MatDialog, ratings_service_1.RatingsService])
    ], MovieRatingsComponent);
    return MovieRatingsComponent;
}());
exports.MovieRatingsComponent = MovieRatingsComponent;
//# sourceMappingURL=movie-ratings.component.js.map