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
var router_1 = require("@angular/router");
var seance_service_1 = require("../shared/seance.service");
var reservation_service_1 = require("../shared/reservation.service");
var material_1 = require("@angular/material");
var dialog_component_1 = require("./dialog/dialog.component");
var booking_seats_service_1 = require("../shared/booking-seats.service");
var buy_component_1 = require("../buy/buy.component");
var buy_process_service_1 = require("../shared/buy-process.service");
var BuyStep3Component = /** @class */ (function () {
    function BuyStep3Component(route, seanceService, reservationService, router, dialog, booking_service, buyProcessService, parent) {
        this.route = route;
        this.seanceService = seanceService;
        this.reservationService = reservationService;
        this.router = router;
        this.dialog = dialog;
        this.booking_service = booking_service;
        this.buyProcessService = buyProcessService;
        this.parent = parent;
        this.spinner = true;
        this.number_columns = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]];
        this.word_number_rows = ['startValue', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        this.number_rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // seat1: SeatModel = {id: 1, row: 2, num: 2, roomId: 1};
        // seat2: SeatModel = {id: 2, row: 3, num: 3, roomId: 1};
        this.clickedSeatsCount = 0;
        this.listOfBookingSeats = new Array(); // wybrane miejsca do zarezerowania
        this.booking_seats = this.onCreateBooleanSeatArrayRepresentationArray();
        this.clickedSeats = this.onCreateBooleanSeatArrayRepresentationArray();
    }
    BuyStep3Component.prototype.ngOnInit = function () {
        // this.stepper.next();
        this.seanceId = this.route.parent.snapshot.params['seanceId'];
        // this.seanceId = this.seanceService.actualSeance.id;
        this.getSeanceRoomData(this.seanceId);
        this.choosenSeatsCount = this.booking_service.choosenSeats;
    };
    BuyStep3Component.prototype.onClickSeat = function (row, col, ref) {
        // row = row - 1;
        // col = col - 1;
        if (this.clickedSeats[row][col]) {
            this.clickedSeats[row][col] = false;
            this.clickedSeatsCount = this.clickedSeatsCount - 1;
            this.choosenSeatsCount = this.choosenSeatsCount + 1;
        }
        else {
            if (this.choosenSeatsCount < 1) {
                this.openDialog('Wszystkie zadeklarowane miejsca zostaly wybrane!');
                this.clickedSeats[row][col] = false;
                ref.checked = false;
                return;
            }
            this.clickedSeats[row][col] = true;
            this.clickedSeatsCount = this.clickedSeatsCount + 1;
            this.choosenSeatsCount = this.choosenSeatsCount - 1;
        }
    };
    BuyStep3Component.prototype.getSeanceRoomData = function (seanceId) {
        var _this = this;
        this.seanceService.getSeanceRoomData(seanceId).subscribe(function (response) {
            _this.seanceRoomData = response.json();
            _this.setBookedSeats(_this.seanceRoomData.reservedSeats);
            _this.spinner = false;
        }, function (error2) {
            console.log(error2);
        });
    };
    BuyStep3Component.prototype.setBookedSeats = function (reservedSeats) {
        for (var _i = 0, reservedSeats_1 = reservedSeats; _i < reservedSeats_1.length; _i++) {
            var s = reservedSeats_1[_i];
            this.booking_seats[s.row][s.number] = true;
        }
        // this.spinner = false;
    };
    // false - miejsce wolne, true - miejsce zajete
    BuyStep3Component.prototype.onCreateBooleanSeatArrayRepresentationArray = function () {
        var booking;
        booking = new Array();
        for (var i = 0; i <= 10; i++) {
            var row = new Array();
            for (var j = 0; j <= 12; j++) {
                row.push(false);
            }
            booking.push(row);
        }
        return booking;
    };
    BuyStep3Component.prototype.getUserBookingSeatsList = function () {
        for (var i = 0; i <= 10; i++) {
            for (var j = 0; j <= 12; j++) {
                if (this.clickedSeats[i][j]) {
                    var seat = { id: null, row: i, number: j, roomId: null };
                    this.listOfBookingSeats.push(seat);
                }
                if (this.clickedSeatsCount < 1) {
                    break;
                }
            }
        }
    };
    BuyStep3Component.prototype.nextStepBtn = function () {
        if (this.choosenSeatsCount !== 0) {
            this.openDialog('Prosze wybrac jeszcze ' + this.choosenSeatsCount + ' miejsce(a)');
            return;
        }
        this.booking_service.resetBookingSeats();
        this.getUserBookingSeatsList();
        this.booking_service.setBookingSeats(this.listOfBookingSeats);
        this.booking_service.setCurrentyMyBookingModel(this.booking_service.myBookingModel);
        this.buyProcessService.setStep1Flag(true);
        this.goForward();
        // this.router.navigate(['buy', this.seanceId, 'step2']);
    };
    BuyStep3Component.prototype.openDialog = function (data) {
        // const dialogRef = this.dialog.open(DialogComponent, {
        //   height: '210px'
        // });
        var dialogRef = this.dialog.open(dialog_component_1.DialogComponent, {
            data: data,
            minHeight: '210px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    BuyStep3Component.prototype.goForward = function () {
        close();
        this.parent.goForward();
    };
    BuyStep3Component.prototype.goBack = function () {
        close();
        this.router.navigate(['buy', this.seanceId, 'step0']);
    };
    BuyStep3Component = __decorate([
        core_1.Component({
            selector: 'app-buy-step3',
            templateUrl: './buy-step3.component.html',
            styleUrls: ['./buy-step3.component.scss']
        }),
        __param(7, core_1.Inject(buy_component_1.BuyComponent)),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, seance_service_1.SeanceService,
            reservation_service_1.ReservationService, router_1.Router, material_1.MatDialog,
            booking_seats_service_1.BookingSeatsService, buy_process_service_1.BuyProcessService,
            buy_component_1.BuyComponent])
    ], BuyStep3Component);
    return BuyStep3Component;
}());
exports.BuyStep3Component = BuyStep3Component;
//# sourceMappingURL=buy-step3.component.js.map