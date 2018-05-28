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
var router_1 = require("@angular/router");
var seances_service_1 = require("../services/seances.service");
var movie_service_1 = require("../services/movie.service");
var common_1 = require("@angular/common");
var room_service_1 = require("../services/room.service");
var Subject_1 = require("rxjs/Subject");
var forms_1 = require("@angular/forms");
var SeancesComponent = /** @class */ (function () {
    function SeancesComponent(route, seanceService, movieService, pipe, roomService) {
        this.route = route;
        this.seanceService = seanceService;
        this.movieService = movieService;
        this.pipe = pipe;
        this.roomService = roomService;
        this.timeSubject = new Subject_1.Subject();
        this.lock = false;
        this.editMode = false;
        this.loaded = false;
        this.seances = [[], [], [], [], [], [], []];
        this.modelSeance = {};
        this.displayedColumns = ['date', 'normal_price', 'price', 'options'];
        this.date = new Date();
        this.nextDates = [];
    }
    SeancesComponent.prototype.getTime = function () {
        return this.myTime;
    };
    SeancesComponent.prototype.setTime = function (date) {
        this.myTime = date;
    };
    SeancesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lock = true;
        this.myTime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 12, 0);
        this.movieId = +this.route.snapshot.params['id'];
        this.route.params.subscribe(function (params) {
            _this.movieId = +params['id'];
            _this.movieService.getMovie(_this.movieId).subscribe(function (data) {
                _this.movie = data;
            });
        });
        console.log(this.date);
        console.log(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
        console.log(this.pipe.transform(new Date(this.myTime.valueOf() + 60000), 'yyyy-MM-ddTHH:mm:ss'));
        this.roomService.getGetAvailableRooms(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'), this.pipe.transform(new Date(this.myTime.valueOf() + +60000), 'yyyy-MM-ddTHH:mm:ss')).subscribe(function (data) {
            _this.options = data;
            _this.lock = false;
        });
        var _loop_1 = function (i) {
            console.log(i);
            this_1.seanceService.getSeanceByMovieIdAndDate(this_1.movieId, this_1.pipe.transform(this_1.date, 'yyyy-MM-dd')).subscribe(function (data) {
                console.log(data);
                _this.nextDates.push(new Date(_this.date.valueOf()));
                _this.seances[i] = data;
                _this.date.setDate(_this.date.getDate() + 1);
            }, function (err) {
                console.log('NIC BY TO NIE DALO');
            });
        };
        var this_1 = this;
        for (var i = 0; i < 7; ++i) {
            _loop_1(i);
        }
        console.log(this.nextDates);
        this.dataSource = new material_1.MatTableDataSource(this.seances);
        this.initForm();
    };
    SeancesComponent.prototype.onLinkClick = function (event) {
        var _this = this;
        this.index = event.index;
        var currentDate = new Date();
        this.myTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + event.index, 12, 0);
        console.log(this.myTime);
        this.seanceService.getSeanceByMovieIdAndDate(this.movieId, this.pipe.transform(this.nextDates[event.index], 'yyyy-MM-dd')).subscribe(function (data) {
            _this.seances[event.index] = data;
        }, function (err) {
            console.log('NIC BY TO NIE DALO');
        });
    };
    SeancesComponent.prototype.update = function () {
        var _this = this;
        this.lock = true;
        var newDate = new Date(this.myTime.valueOf() + +this.seanceForm.controls['durationInMinutes'].value * 60000);
        this.roomService.getGetAvailableRooms(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'), this.pipe.transform(newDate, 'yyyy-MM-ddTHH:mm:ss')).subscribe(function (data) {
            _this.options = data;
            console.log(_this.pipe.transform(_this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
            console.log(newDate);
            _this.lock = false;
        });
    };
    SeancesComponent.prototype.change = function (event) {
        this.modelSeance.roomId = event.value;
    };
    SeancesComponent.prototype.dodaj = function () {
        this.modelSeance.movieId = this.movieId.toString();
        this.modelSeance.duration = this.modelSeance.duration;
        this.modelSeance.normalTicketPrice = this.modelSeance.normalTicketPrice;
        this.modelSeance.concessionaryTicketPrice = this.modelSeance.concessionaryTicketPrice;
        this.seanceService.addSeance(this.modelSeance);
    };
    SeancesComponent.prototype.initForm = function () {
        var seanceId = '';
        var seanceStart = '';
        var durationInMinutes = '';
        var movieId = this.movieId.toString();
        var roomId = '';
        var normalTicketPrice = '';
        var concessionaryTicketPrice = '';
        console.log('first');
        if (this.editMode) {
            //  id = this.movie.id;
            seanceStart = this.seance.seanceStart;
            console.log(this.movie);
            durationInMinutes = this.seance.duration;
            roomId = this.seance.roomId;
            normalTicketPrice = this.seance.normalTicketPrice;
            concessionaryTicketPrice = this.seance.concessionaryTicketPrice;
            console.log(this.movie);
        }
        console.log(this.movie);
        this.seanceForm = new forms_1.FormGroup({
            'seanceStart': new forms_1.FormControl(seanceStart, forms_1.Validators.required),
            'durationInMinutes': new forms_1.FormControl(durationInMinutes, forms_1.Validators.required),
            'movieId': new forms_1.FormControl(movieId),
            'roomId': new forms_1.FormControl(roomId),
            'normalTicketPrice': new forms_1.FormControl(normalTicketPrice, forms_1.Validators.required),
            'concessionaryTicketPrice': new forms_1.FormControl(concessionaryTicketPrice, forms_1.Validators.required),
        });
        this.loaded = true;
    };
    SeancesComponent.prototype.getCurrentTime = function () {
        return this.pipe.transform(this.myTime, 'yyyy-MM-ddThh:mm');
    };
    SeancesComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log(this.movieForm.value);
        // if (this.editMode) {
        //   this.movieService.updateMovie(this.id, this.movieForm.value).subscribe(
        //     () => {
        //       console.log(this.movieForm.value);
        //       this.movieService.updateMoviesFromDb();
        //       this.rr.navigate(['/admin/panel/filmy']);
        //     }
        //   );
        // } else {
        //   this.movieService.addMovie(this.movieForm.value).subscribe(
        //     (data) => {
        //       this.movieService.updateMoviesFromDb();
        //       this.rr.navigate(['/admin/panel/filmy']);
        //
        //     }
        //   );
        // }
        console.log(this.seanceForm.value);
        this.seanceService.addSeance(this.seanceForm.value).subscribe(function (data) {
            console.log(data);
            _this.seances[_this.index].push(_this.seanceForm.value);
            _this.initForm();
        }, function (err) {
            console.log(err);
        });
    };
    SeancesComponent.prototype.onChange = function (event) {
        this.seanceForm.controls['seanceStart'].setValue(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
    };
    SeancesComponent = __decorate([
        core_1.Component({
            selector: 'app-seances',
            templateUrl: './seances.component.html',
            styleUrls: ['./seances.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, seances_service_1.SeancesService, movie_service_1.MovieService, common_1.DatePipe, room_service_1.RoomService])
    ], SeancesComponent);
    return SeancesComponent;
}());
exports.SeancesComponent = SeancesComponent;
//# sourceMappingURL=seances.component.js.map