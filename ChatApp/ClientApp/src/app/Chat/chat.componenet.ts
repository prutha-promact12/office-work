import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnectionService } from '../service/hub-connection.service';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { User } from '../ChatApp/User';
import { setInterval } from 'timers';
@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  public Users: Array<User> = [];
  Names: string;
  Sender: string;
  senderUpdate = new User();
  Recevier: string;
  notification: string[] = [];
  interval: any;
  unRead: number = 1;
  countMessage: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, private hubservice: HubConnectionService, private _dataService: LoginService, private messageService: MessageService) {

  }
  messagecount() {
    var message = this.notification.reduce(function (previous, current) {
      previous[current] = (previous[current] || 0) + 1;
      return previous;
    }, {});

    this._dataService.getUsers()
      .subscribe((data: any) => {
        this.Users = data;
        for (let key in message) {
          for (let e of this.Users) {
            if (e.Name == key)
              e.countMessages = message[key];
          }
        }
      });
  }
  ngOnInit() {
    let name = this.route.snapshot.params['name'];
    this._dataService.setSender(name);
    this.Sender = this._dataService.getSender();

    this._dataService.getUsers().subscribe((data: any) => this.Users = data);

    this.interval = setInterval(() => {
      this.notification = [];
      this.Recevier = this._dataService.getRecevier();

      this._dataService.getUsers()
        .subscribe((data: any) => this.Users = data);
      this.messageService.getMessage().subscribe((data: any) => {
        for (let msg of data) {
          if (msg.Recevier === this.Sender && msg.isRead == false) {
            this.notification.push(msg.sender);
          }
        }
        this.messagecount();
      });
    }, 10000);

  }
}



