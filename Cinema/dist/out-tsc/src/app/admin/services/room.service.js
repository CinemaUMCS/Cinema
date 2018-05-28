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
// http://localhost:5000/room/availableRooms?seanceStart=2018-12-03T12:35&seanceEnd=2018-12-03T16:35
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
var url = 'http://localhost:5000/';
var RoomService = /** @class */ (function () {
    function RoomService(http) {
        this.http = http;
        this.roomSubject = new Subject_1.Subject();
        this.updateRoomsFromDb();
    }
    RoomService.prototype.getRooms = function () {
        return this.rooms;
    };
    RoomService.prototype.getRoom = function (id) {
        return this.http.get(url + 'room/' + id, { responseType: 'json' });
    };
    RoomService.prototype.updateRoom = function (id, model) {
        console.log(model);
        return this.http.put(url + 'room/' + id, model);
    };
    RoomService.prototype.addRoom = function (model) {
        console.log("posting model: ");
        console.log(model);
        return this.http.post(url + 'room', model);
    };
    RoomService.prototype.updateRoomsFromDb = function () {
        var _this = this;
        this.http.get(url + 'room', { responseType: 'json' }).subscribe(function (data) {
            _this.rooms = data;
            console.log(data);
            _this.roomSubject.next(_this.rooms);
        });
    };
    RoomService.prototype.remove = function (id) {
        var _this = this;
        console.log(id);
        this.http.delete(url + 'room/' + id).subscribe(function (data) {
            _this.updateRoomsFromDb();
        });
    };
    RoomService.prototype.getGetAvailableRooms = function (startDate, endDate) {
        return this.http.get(url + 'room/availableRooms?seanceStart=' + startDate + '&seanceEnd=' + endDate);
    };
    RoomService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map