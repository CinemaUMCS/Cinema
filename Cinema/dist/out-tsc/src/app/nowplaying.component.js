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
var common_1 = require("@angular/common");
var seance_service_1 = require("./shared/seance.service");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var authentication_service_1 = require("./shared/authentication.service");
var header_opacity_service_1 = require("./shared/header-opacity.service");
var description_dialog_component_1 = require("./description-dialog/description-dialog.component");
var platform_browser_1 = require("@angular/platform-browser");
var NowPlayingComponent = /** @class */ (function () {
    function NowPlayingComponent(datePipe, seanceService, router, authenticationService, headerOpacityService, dialog, sanitizer) {
        this.datePipe = datePipe;
        this.seanceService = seanceService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.headerOpacityService = headerOpacityService;
        this.dialog = dialog;
        this.sanitizer = sanitizer;
        this.position = 'below';
        this.title = 'app';
        this.list = [1, 2, 3, 3, 3, 33, 3, 3, 3, 3, 3, 3];
        this.date = new Date();
        this.minDate = new Date();
        this.buttonDates = new Array();
        this.selectedMovie = null;
        this.selectedMovieTitle = null;
    }
    NowPlayingComponent.prototype.ngOnInit = function () {
        this.isDashboardComponent();
        this.actualDayOfWeek = new Date().getDay();
        this.getAllMovies();
        this.containDateWithButton();
        this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
        // this.getRepartioryByDate('2018-12-01');
    };
    NowPlayingComponent.prototype.clickWeekBtnEvent = function (event) {
        var id = event.srcElement.id;
        this.date = this.buttonDates[id];
        this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    };
    NowPlayingComponent.prototype.setDateFromDataPicker = function () {
        this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    };
    NowPlayingComponent.prototype.getRepartioryByDate = function (date) {
        console.log(date);
        this.getMovieByDate(date);
        this.getSeanceByDate(date);
    };
    NowPlayingComponent.prototype.addDaysToActualDate = function (numberOfDay) {
        return new Date(this.date.getTime() + numberOfDay * (60 * 60 * 24 * 1000));
    };
    NowPlayingComponent.prototype.containDateWithButton = function () {
        var day = this.actualDayOfWeek;
        for (var i = 0; i < 7; i++) {
            console.log((day + i) % 7);
            this.buttonDates[(day + i) % 7] = this.addDaysToActualDate(i);
        }
    };
    NowPlayingComponent.prototype.getMovieByDate = function (date) {
        var _this = this;
        date = this.datePipe.transform(date, 'yyyy-MM-dd');
        this.seanceService.getAllMovieByDay(date).subscribe(function (response) {
            _this.movieAtDay = response.json();
            if (_this.movieAtDay.length > 0) {
                _this.emptyPage = false;
            }
            else {
                _this.emptyPage = true;
            }
        }, function (error) {
            console.log(error);
            _this.emptyPage = true;
        });
    };
    NowPlayingComponent.prototype.getAllCategories = function () {
        var _this = this;
        this.seanceService.getAllCategories().subscribe(function (response) { return _this.categories = response.json(); }, function (error2) { return console.log(error2); });
    };
    NowPlayingComponent.prototype.getSeanceByDate = function (date) {
        var _this = this;
        this.seanceService.getSeanceByDate(date).subscribe(function (response) {
            _this.seances = response.json();
            console.log(_this.seances);
        }, function (error) { return console.log(error); });
    };
    NowPlayingComponent.prototype.showYoutube = function (id) {
        // document.getElementById(id).style.display = 'block';
        // document.getElementById(id).style.display = 'block';
        id.style.display = 'block';
    };
    NowPlayingComponent.prototype.hideYoutube = function (id, frame) {
        // var src = document.getElementById(frame).getAttribute('src');
        var src = frame.getAttribute('src');
        frame.setAttribute('src', src);
        id.style.display = 'none';
        // document.getElementById(/id).style.display = 'none';
        // document.getElementById('hideYoutubeVid').style.display = 'none';
    };
    NowPlayingComponent.prototype.showInfo = function (id) {
        document.getElementById(id).style.display = 'block';
        document.getElementById('hideYoutubeVid').style.display = 'block';
    };
    NowPlayingComponent.prototype.closeInfo = function (id) {
        document.getElementById(id).style.display = 'none';
        document.getElementById('hideYoutubeVid').style.display = 'none';
    };
    NowPlayingComponent.prototype.chooseSeance = function (id, toolTip) {
        if (this.authenticationService.isLogged()) {
            this.router.navigate(['buy', id, 'step0']);
            return;
        }
        toolTip.show();
    };
    NowPlayingComponent.prototype.getAllMovies = function () {
        var _this = this;
        this.seanceService.getALlMovies().subscribe(function (value) {
            _this.allMoviesModel = value.json();
            console.log(_this.allMoviesModel);
        }, function (error2) {
            console.log(error2);
        });
    };
    NowPlayingComponent.prototype.filterMovie = function (movie) {
        this.selectedMovie = movie;
        console.log('MOVIE:', movie);
    };
    NowPlayingComponent.prototype.openDialog = function (data) {
        var dialogRef = this.dialog.open(description_dialog_component_1.DescriptionDialogComponent, {
            data: data,
            width: '600px',
            minHeight: '300px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    NowPlayingComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    __decorate([
        core_1.ViewChild('tooltip'),
        __metadata("design:type", material_1.MatTooltip)
    ], NowPlayingComponent.prototype, "tooltip", void 0);
    NowPlayingComponent = __decorate([
        core_1.Component({
            selector: 'app-nowplaying',
            templateUrl: './nowplaying.component.html',
            styleUrls: ['./nowplaying.component.scss']
        }),
        __metadata("design:paramtypes", [common_1.DatePipe, seance_service_1.SeanceService, router_1.Router, authentication_service_1.AuthenticationService,
            header_opacity_service_1.HeaderOpacityService, material_1.MatDialog, platform_browser_1.DomSanitizer])
    ], NowPlayingComponent);
    return NowPlayingComponent;
}());
exports.NowPlayingComponent = NowPlayingComponent;
//# sourceMappingURL=nowplaying.component.js.map