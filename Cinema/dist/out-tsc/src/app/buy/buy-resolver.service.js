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
var seance_service_1 = require("../shared/seance.service");
var BuyResolverService = /** @class */ (function () {
    function BuyResolverService(seance_service) {
        this.seance_service = seance_service;
    }
    BuyResolverService.prototype.resolve = function (route, state) {
        this.seanceId = route.params['seanceId'];
        return this.seance_service.getSeanceById(this.seanceId);
    };
    BuyResolverService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [seance_service_1.SeanceService])
    ], BuyResolverService);
    return BuyResolverService;
}());
exports.BuyResolverService = BuyResolverService;
//# sourceMappingURL=buy-resolver.service.js.map