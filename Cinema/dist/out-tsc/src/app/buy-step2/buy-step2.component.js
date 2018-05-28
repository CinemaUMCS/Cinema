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
var reservation_service_1 = require("../shared/reservation.service");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var booking_seats_service_1 = require("../shared/booking-seats.service");
var BuyStep2Component = /** @class */ (function () {
    function BuyStep2Component(reservationService, bookingSeatsService) {
        this.reservationService = reservationService;
        this.bookingSeatsService = bookingSeatsService;
        this.animalControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.animals = [
            { name: 'Normalny', sound: '18PLN' },
            { name: 'Ulgowy', sound: '12PLN' },
        ];
        // this.createFormControl();
    }
    BuyStep2Component.prototype.ngOnInit = function () {
        this.myBooking = this.bookingSeatsService.myBookingModel;
        console.log(this.myBooking);
    };
    BuyStep2Component.prototype.click = function () {
    };
    __decorate([
        core_1.ViewChild(material_1.MatMenuTrigger),
        __metadata("design:type", material_1.MatMenuTrigger)
    ], BuyStep2Component.prototype, "trigger", void 0);
    BuyStep2Component = __decorate([
        core_1.Component({
            selector: 'app-buy-step2',
            templateUrl: './buy-step2.component.html',
            styleUrls: ['./buy-step2.component.scss']
        }),
        __metadata("design:paramtypes", [reservation_service_1.ReservationService, booking_seats_service_1.BookingSeatsService])
    ], BuyStep2Component);
    return BuyStep2Component;
}());
exports.BuyStep2Component = BuyStep2Component;
//# sourceMappingURL=buy-step2.component.js.map