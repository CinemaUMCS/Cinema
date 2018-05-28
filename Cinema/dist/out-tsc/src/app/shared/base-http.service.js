"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseHttpService = /** @class */ (function () {
    // BASE_URL = 'https://ocenuczelnie.pl/cinema_api/';
    function BaseHttpService() {
        // BASE_URL = 'http://ocenuczelnie.pl/';
        this.BASE_URL = 'http://localhost:5000/';
    }
    BaseHttpService.prototype.setUrl = function (url) {
        return this.BASE_URL + url;
    };
    return BaseHttpService;
}());
exports.BaseHttpService = BaseHttpService;
//# sourceMappingURL=base-http.service.js.map