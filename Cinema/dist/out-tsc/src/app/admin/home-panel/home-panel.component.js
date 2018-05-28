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
var movie_service_1 = require("../services/movie.service");
var seances_service_1 = require("../services/seances.service");
var room_service_1 = require("../services/room.service");
var HomePanelComponent = /** @class */ (function () {
    function HomePanelComponent() {
        this.mode = new forms_1.FormControl('side');
    }
    HomePanelComponent.prototype.ngOnInit = function () {
    };
    HomePanelComponent = __decorate([
        core_1.Component({
            selector: 'app-home-panel',
            templateUrl: './home-panel.component.html',
            styleUrls: ['./home-panel.component.scss'],
            providers: [movie_service_1.MovieService, seances_service_1.SeancesService, room_service_1.RoomService]
        }),
        __metadata("design:paramtypes", [])
    ], HomePanelComponent);
    return HomePanelComponent;
}());
exports.HomePanelComponent = HomePanelComponent;
//# sourceMappingURL=home-panel.component.js.map