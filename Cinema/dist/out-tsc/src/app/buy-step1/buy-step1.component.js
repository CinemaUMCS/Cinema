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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var booking_seats_service_1 = require("../shared/booking-seats.service");
var seance_service_1 = require("../shared/seance.service");
var reservation_service_1 = require("../shared/reservation.service");
var buy_component_1 = require("../buy/buy.component");
var material_1 = require("@angular/material");
var BuyStep1Component = /** @class */ (function () {
    function BuyStep1Component(bookingSeatService, seanceService, reservationService, parent) {
        this.bookingSeatService = bookingSeatService;
        this.seanceService = seanceService;
        this.reservationService = reservationService;
        this.parent = parent;
        this.ticketsTotalSum = 0;
    }
    BuyStep1Component.prototype.ngOnInit = function () {
        this.getAllNessesaryModels();
        this.setTotalTicketSum();
    };
    BuyStep1Component.prototype.getAllNessesaryModels = function () {
        var _this = this;
        this.bookingSeatService.currrentMyBookingModel.subscribe(function (value) {
            console.log(_this.myBookingModel = value);
        });
        this.myBookingModel = this.bookingSeatService.myBookingModel;
        this.actualSeance = this.seanceService.actualSeance;
        this.actualMovie = this.seanceService.actualMovie;
    };
    BuyStep1Component.prototype.setTotalTicketSum = function () {
        // cena za bilety normalne
        this.ticketsTotalSum += this.myBookingModel.numberOfNormalTickets * (+this.actualSeance.normalTicketPrice);
        // cena za bilety ulgowe
        this.ticketsTotalSum += this.myBookingModel.numberOfConcessionaryTickets * (+this.actualSeance.concessionaryTicketPrice);
    };
    BuyStep1Component.prototype.onSeatReservation = function () {
        var _this = this;
        console.log(this.myBookingModel);
        this.reservationService.onSeatsReservation(this.myBookingModel).subscribe(function (value) {
            console.log('succes-reservation');
            _this.parent.goForward();
        }, function (error2) {
            console.log(error2);
        });
    };
    BuyStep1Component.prototype.onClickPrevBtn = function () {
        close();
        this.bookingSeatService.resetBookingSeats();
        this.parent.goBack();
    };
    __decorate([
        core_1.ViewChild('btn_id'),
        __metadata("design:type", material_1.MatButton)
    ], BuyStep1Component.prototype, "btnId", void 0);
    BuyStep1Component = __decorate([
        core_1.Component({
            selector: 'app-buy-step1',
            templateUrl: './buy-step1.component.html',
            styleUrls: ['./buy-step1.component.scss']
        }),
        __param(3, core_1.Inject(buy_component_1.BuyComponent)),
        __metadata("design:paramtypes", [booking_seats_service_1.BookingSeatsService, seance_service_1.SeanceService,
            reservation_service_1.ReservationService, buy_component_1.BuyComponent])
    ], BuyStep1Component);
    return BuyStep1Component;
}());
exports.BuyStep1Component = BuyStep1Component;
//# sourceMappingURL=buy-step1.component.js.map