"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var User_1 = require("../ChatApp/User");
var timers_1 = require("timers");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(router, route, hubservice, _dataService, messageService) {
        this.router = router;
        this.route = route;
        this.hubservice = hubservice;
        this._dataService = _dataService;
        this.messageService = messageService;
        this.Users = [];
        this.senderUpdate = new User_1.User();
        this.notification = [];
        this.unRead = 1;
        this.countMessage = 1;
    }
    ChatComponent.prototype.messagecount = function () {
        var _this = this;
        var message = this.notification.reduce(function (previous, current) {
            previous[current] = (previous[current] || 0) + 1;
            return previous;
        }, {});
        this._dataService.getUsers()
            .subscribe(function (data) {
            _this.Users = data;
            for (var key in message) {
                for (var _i = 0, _a = _this.Users; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (e.Name == key)
                        e.countMessages = message[key];
                }
            }
        });
    };
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var name = this.route.snapshot.params['name'];
        this._dataService.setSender(name);
        this.Sender = this._dataService.getSender();
        this._dataService.getUsers().subscribe(function (data) { return _this.Users = data; });
        this.interval = timers_1.setInterval(function () {
            _this.notification = [];
            _this.Recevier = _this._dataService.getRecevier();
            _this._dataService.getUsers()
                .subscribe(function (data) { return _this.Users = data; });
            _this.messageService.getMessage().subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var msg = data_1[_i];
                    if (msg.Recevier === _this.Sender && msg.isRead == false) {
                        _this.notification.push(msg.sender);
                    }
                }
                _this.messagecount();
            });
        }, 10000);
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-component',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.componenet.js.map