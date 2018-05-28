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
var material_1 = require("@angular/material");
var movie_service_1 = require("../services/movie.service");
var MoviesComponent = /** @class */ (function () {
    // constructor(private dummyService: DummyServiceService) { }
    function MoviesComponent(movieService) {
        this.movieService = movieService;
        this.displayedColumns = ['ids', 'title', 'category', 'productionDate', 'options'];
    }
    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    MoviesComponent.prototype.ngAfterViewInit = function () {
    };
    MoviesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.subscription = this.dummyService.subject.subscribe(
        //   (movies: MovieModel[]) => {
        //     this.movies = movies;
        //     this.dataSource = new MatTableDataSource(movies);
        //   }
        // );
        this.subscription = this.movieService.movieSubject.subscribe(function (movies) {
            _this.movies = movies;
            console.log(movies);
            _this.dataSource = new material_1.MatTableDataSource(_this.movies);
            _this.dataSource.paginator = _this.paginator;
        });
        this.movieService.updateMoviesFromDb();
        //this.movies = this.movieService.getMovies();
        // this.movieService.getMovies().subscribe(
        //   data => {
        //     this.movies = data;
        //     console.log(this.movies);
        //     this.dataSource = new MatTableDataSource(this.movies);
        //     this.dataSource.paginator = this.paginator;
        //   }
        // );
    };
    MoviesComponent.prototype.remove = function (id) {
        this.movieService.remove(id);
    };
    MoviesComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], MoviesComponent.prototype, "paginator", void 0);
    MoviesComponent = __decorate([
        core_1.Component({
            selector: 'app-movies',
            templateUrl: './movies.component.html',
            styleUrls: ['./movies.component.scss']
        }),
        __metadata("design:paramtypes", [movie_service_1.MovieService])
    ], MoviesComponent);
    return MoviesComponent;
}());
exports.MoviesComponent = MoviesComponent;
//# sourceMappingURL=movies.component.js.map