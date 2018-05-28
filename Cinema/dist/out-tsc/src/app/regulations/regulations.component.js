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
var RegulationsComponent = /** @class */ (function () {
    function RegulationsComponent(router) {
        this.router = router;
    }
    RegulationsComponent.prototype.ngOnInit = function () {
    };
    RegulationsComponent = __decorate([
        core_1.Component({
            selector: 'app-regulations',
            templateUrl: './regulations.component.html',
            styleUrls: ['./regulations.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], RegulationsComponent);
    return RegulationsComponent;
}());
exports.RegulationsComponent = RegulationsComponent;
//# sourceMappingURL=regulations.component.js.map