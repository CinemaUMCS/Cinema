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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var seance_service_1 = require("../shared/seance.service");
var material_1 = require("@angular/material");
var buy_process_service_1 = require("../shared/buy-process.service");
var header_opacity_service_1 = require("../shared/header-opacity.service");
var BuyComponent = /** @class */ (function () {
    function BuyComponent(_formBuilder, route, seance_service, dialog, buyProcessService, headerOpacityService) {
        this._formBuilder = _formBuilder;
        this.route = route;
        this.seance_service = seance_service;
        this.dialog = dialog;
        this.buyProcessService = buyProcessService;
        this.headerOpacityService = headerOpacityService;
        this.startFlag = true;
    }
    BuyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDashboardComponent();
        this.buyProcessService.step1flag.subscribe(function (value) { return _this.step2Flag = value; });
        this.route.data.subscribe(function (value) {
            _this.seance = value['data'].json();
            _this.getMovie(+_this.seance.movieId);
            // this.seance_service.setActualSeanceObservable(this.seance);
            _this.seance_service.setActualSeance(_this.seance);
        });
        this.validate();
        console.log('MOVIE:', this.movie);
    };
    BuyComponent.prototype.validate = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', forms_1.Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
    };
    BuyComponent.prototype.getMovie = function (movieId) {
        var _this = this;
        this.seance_service.getMovieById(movieId).subscribe(function (value) {
            _this.movie = value.json();
            _this.seance_service.setActualMovieObservable(_this.movie);
            _this.seance_service.setActualMovie(_this.movie);
            console.log('MOVIE:', _this.movie);
            _this.startFlag = false;
        }, function (error2) {
            console.log(error2);
        });
    };
    BuyComponent.prototype.goForward = function () {
        this.stepper.next();
    };
    BuyComponent.prototype.goBack = function () {
        this.stepper.previous();
    };
    BuyComponent.prototype.isDashboardComponent = function () {
        this.headerOpacityService.isDashboardComponentLoad(false);
    };
    __decorate([
        core_1.ViewChild('stepper'),
        __metadata("design:type", material_1.MatHorizontalStepper)
    ], BuyComponent.prototype, "stepper", void 0);
    BuyComponent = __decorate([
        core_1.Component({
            selector: 'app-buy',
            templateUrl: './buy.component.html',
            styleUrls: ['./buy.component.scss'],
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, seance_service_1.SeanceService,
            material_1.MatDialog, buy_process_service_1.BuyProcessService, header_opacity_service_1.HeaderOpacityService])
    ], BuyComponent);
    return BuyComponent;
}());
exports.BuyComponent = BuyComponent;
//# sourceMappingURL=buy.component.js.map