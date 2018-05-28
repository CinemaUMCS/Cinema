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
var booking_seats_service_1 = require("./booking-seats.service");
var Step1GuardService = /** @class */ (function () {
    function Step1GuardService(booking_service, router) {
        this.booking_service = booking_service;
        this.router = router;
    }
    Step1GuardService.prototype.canActivate = function (route, state) {
        if (this.booking_service.choosenSeats == null) {
            this.router.navigate(['/nowplaying']);
            return false;
        }
        return true;
    };
    Step1GuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [booking_seats_service_1.BookingSeatsService, router_1.Router])
    ], Step1GuardService);
    return Step1GuardService;
}());
exports.Step1GuardService = Step1GuardService;
//# sourceMappingURL=step1-guard.service.js.map