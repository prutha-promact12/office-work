"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
        this.Url = 'api/login';
    }
    LoginService.prototype.setSender = function (Name) {
        this.Sender = Name;
    };
    LoginService.prototype.getSender = function () {
        return this.Sender;
    };
    LoginService.prototype.setRecevier = function (Name) {
        this.Recevier = Name;
    };
    LoginService.prototype.getRecevier = function () {
        return this.Recevier;
    };
    LoginService.prototype.getUser = function (Id) {
        return this.http.get(this.Url + '/' + Id);
    };
    LoginService.prototype.addUser = function (user) {
        return this.http.post(this.Url, user);
    };
    LoginService.prototype.getUsers = function () {
        return this.http.get(this.Url);
    };
    LoginService.prototype.Update = function (user) {
        return this.http.put(this.Url + '/' + user.Id, user);
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map