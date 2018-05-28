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
var dialog_component_1 = require("../buy-step3/dialog/dialog.component");
var router_1 = require("@angular/router");
var booking_seats_service_1 = require("../shared/booking-seats.service");
var regulations_component_1 = require("../regulations/regulations.component");
var seance_service_1 = require("../shared/seance.service");
var BuyStep0Component = /** @class */ (function () {
    function BuyStep0Component(dialog, router, route, booking_service, seance_serivce) {
        this.dialog = dialog;
        this.router = router;
        this.route = route;
        this.booking_service = booking_service;
        this.seance_serivce = seance_serivce;
        this.spinner_flag = true; // odpowiada za wyswietlanie spinnera
        this.ticket_normal = '0';
        this.ticket_concession = '0';
        // seance: SeanceModel;
        this.allSeats = 120; // wszystkie miejsca na 1 sali
        this.seanceId = this.route.parent.snapshot.params['seanceId'];
        this.booking_service.setCurrentSeanceId(this.seanceId); //musi zostac
    }
    BuyStep0Component.prototype.ngOnInit = function () {
        this.openRegulationsDialog();
        this.getSeanceRoomData();
        this.getActualSeanse();
    };
    BuyStep0Component.prototype.nextStep = function () {
        this.ticketSum = (+this.ticket_normal) + (+this.ticket_concession);
        console.log(this.ticketSum);
        if (this.ticketSum < 1) {
            this.openDialog('Musisz wybrac co najmniej 1 bilet');
            return;
        }
        else if (this.ticketSum > 10) {
            console.log(this.ticketSum);
            this.openDialog('Możesz zarezerowac maksymalnie 10 miejsc');
            return;
        }
        if (this.allSeats < this.seanceRoomData.reservedSeats.length + this.ticketSum) {
            var free_seats = this.allSeats - this.seanceRoomData.reservedSeats.length;
            this.openDialog('Brak wolnych miejsc, maksymalna ilość dostępnych miejsc wynosi: ' + free_seats);
            return;
        }
        this.setBookingProperties();
        this.router.navigate(['buy', this.seanceId, 'step1']);
    };
    BuyStep0Component.prototype.setBookingProperties = function () {
        this.booking_service.setNumberOfConsessionaryTicket(+this.ticket_concession);
        this.booking_service.setNumberOfNormalTicket(+this.ticket_normal);
        this.booking_service.setChoosenSeatsCount(this.ticketSum);
        this.booking_service.setSeanceId(this.seanceId);
    };
    // potrzebne do wyciagniecia ilosci wolnych miejsc
    BuyStep0Component.prototype.getSeanceRoomData = function () {
        var _this = this;
        this.booking_service.currentSeance.subscribe(function (message) {
            _this.seanceRoomData = message;
            _this.spinner_flag = false;
        });
    };
    BuyStep0Component.prototype.getActualSeanse = function () {
        this.seance = this.seance_serivce.actualSeance;
        this.ticket_concession_price = this.seance.concessionaryTicketPrice;
        this.ticket_normal_price = this.seance.normalTicketPrice;
    };
    // getSeanceFromParentResolver() {
    //   this.route.parent.data.subscribe(value => {
    //     this.seance = value['data'].json();
    //   });
    // }
    BuyStep0Component.prototype.openDialog = function (data) {
        var dialogRef = this.dialog.open(dialog_component_1.DialogComponent, {
            data: data,
            minHeight: '210px'
        });
        dialogRef.afterClosed()
            .subscribe(function (result) {
            console.log("Dialog result: $ {result}");
        });
    };
    BuyStep0Component.prototype.openRegulationsDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(regulations_component_1.RegulationsComponent, {
            height: '300px',
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // console.log(`Dialog result: ${result}`);
            if (!result) {
                _this.router.navigate(['/nowplaying']);
            }
        });
    };
    BuyStep0Component = __decorate([
        core_1.Component({
            selector: 'app-buy-step-0',
            templateUrl: './buy-step-0.component.html',
            styleUrls: ['./buy-step-0.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog, router_1.Router, router_1.ActivatedRoute, booking_seats_service_1.BookingSeatsService,
            seance_service_1.SeanceService])
    ], BuyStep0Component);
    return BuyStep0Component;
}());
exports.BuyStep0Component = BuyStep0Component;
//# sourceMappingURL=buy-step-0.component.js.map