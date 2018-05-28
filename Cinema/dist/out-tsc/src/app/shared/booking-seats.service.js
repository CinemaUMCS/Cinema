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
var seance_service_1 = require("./seance.service");
var Subject_1 = require("rxjs/Subject");
var BookingSeatsService = /** @class */ (function () {
    function BookingSeatsService(seanceService) {
        this.seanceService = seanceService;
        this.seanceRoomData = new Subject_1.Subject();
        this.currentSeance = this.seanceRoomData.asObservable();
        this.myBookingModelObs = new Subject_1.Subject();
        this.currrentMyBookingModel = this.myBookingModelObs.asObservable();
        this.myBookingModel = {
            seanceId: this.seanceId,
            seatsToReserve: null,
            numberOfConcessionaryTickets: 0,
            numberOfNormalTickets: 0
        };
    }
    BookingSeatsService.prototype.resetBookingSeats = function () {
        this.myBookingModel.seatsToReserve = [];
    };
    BookingSeatsService.prototype.setCurrentyMyBookingModel = function (myBookingModel) {
        this.myBookingModelObs.next(myBookingModel);
    };
    BookingSeatsService.prototype.setCurrentSeanceId = function (seanceId) {
        var _this = this;
        this.seanceService.getSeanceRoomData(seanceId).subscribe(function (response) {
            _this.seanceRoomData.next(response.json());
        }, function (error2) {
            console.log(error2);
        });
    };
    BookingSeatsService.prototype.setBookingSeats = function (bookingSeats) {
        this.myBookingModel.seatsToReserve = bookingSeats;
    };
    BookingSeatsService.prototype.setNumberOfNormalTicket = function (ticket) {
        this.myBookingModel.numberOfNormalTickets = ticket;
    };
    BookingSeatsService.prototype.setNumberOfConsessionaryTicket = function (ticket) {
        this.myBookingModel.numberOfConcessionaryTickets = ticket;
    };
    BookingSeatsService.prototype.setSeanceId = function (id) {
        this.myBookingModel.seanceId = id;
    };
    BookingSeatsService.prototype.setChoosenSeatsCount = function (i) {
        this.choosenSeats = i;
    };
    BookingSeatsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [seance_service_1.SeanceService])
    ], BookingSeatsService);
    return BookingSeatsService;
}());
exports.BookingSeatsService = BookingSeatsService;
//# sourceMappingURL=booking-seats.service.js.map