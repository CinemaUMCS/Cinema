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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var movie_service_1 = require("../../services/movie.service");
var EditMovieComponent = /** @class */ (function () {
    function EditMovieComponent(rr, route, movieService) {
        this.rr = rr;
        this.route = route;
        this.movieService = movieService;
        this.editMode = false;
        this.loaded = false;
        this.categories = [
            ' Undefined',
            'Horror',
            'Comedy',
            'Thriller',
            'Action'
        ];
    }
    EditMovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.editMode = params['id'] != null;
            console.log(_this.editMode);
            _this.id = +params['id'];
            if (_this.editMode) {
                _this.movieService.getMovie(_this.id).subscribe(function (data) {
                    _this.movie = data;
                    console.log(_this.movie);
                    _this.initForm();
                });
            }
            else {
                _this.initForm();
            }
        });
    };
    EditMovieComponent.prototype.initForm = function () {
        var id = '';
        var title = '';
        var description = '';
        var category = '';
        var productionDate = new Date();
        var posterPath = '';
        var trailerPath = '';
        console.log('first');
        if (this.editMode) {
            //  id = this.movie.id;
            title = this.movie.title;
            console.log(this.movie);
            description = this.movie.description;
            category = this.movie.category;
            productionDate = this.movie.productionDate;
            posterPath = this.movie.posterPath;
            trailerPath = this.movie.trailerPath;
            console.log(this.movie);
        }
        console.log(this.movie);
        this.movieForm = new forms_1.FormGroup({
            'title': new forms_1.FormControl(title, forms_1.Validators.required),
            'description': new forms_1.FormControl(description, forms_1.Validators.required),
            'category': new forms_1.FormControl(category, forms_1.Validators.required),
            'productionDate': new forms_1.FormControl(productionDate, forms_1.Validators.required),
            'posterPath': new forms_1.FormControl(posterPath, forms_1.Validators.required),
            'trailerPath': new forms_1.FormControl(trailerPath, forms_1.Validators.required),
        });
        this.loaded = true;
        console.log(this.id);
    };
    EditMovieComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log(this.movieForm.value);
        if (this.editMode) {
            this.movieService.updateMovie(this.id, this.movieForm.value).subscribe(function () {
                console.log(_this.movieForm.value);
                _this.movieService.updateMoviesFromDb();
                _this.rr.navigate(['/admin/panel/filmy']);
            });
        }
        else {
            this.movieService.addMovie(this.movieForm.value).subscribe(function (data) {
                _this.movieService.updateMoviesFromDb();
                _this.rr.navigate(['/admin/panel/filmy']);
            });
        }
        this.onCancel();
    };
    EditMovieComponent.prototype.onCancel = function () {
        this.rr.navigate(['../../'], { relativeTo: this.route });
    };
    EditMovieComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-movie',
            templateUrl: './edit-movie.component.html',
            styleUrls: ['./edit-movie.component.scss'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, movie_service_1.MovieService])
    ], EditMovieComponent);
    return EditMovieComponent;
}());
exports.EditMovieComponent = EditMovieComponent;
//# sourceMappingURL=edit-movie.component.js.map