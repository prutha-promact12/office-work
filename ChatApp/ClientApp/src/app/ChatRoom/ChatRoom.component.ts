import { Component, OnInit, Input } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { LoginService } from '../service/login.service';
import { MessageService } from '../service/message.service';
import { HubConnectionService } from '../service/hub-connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Messages } from '../ChatApp/User';
@Component({
  selector: 'app-chatroom',
  templateUrl: './ChatRoom.component.html',
  styleUrls: ['./ChatRoom.component.css']
})
export class ChatRoomComponent implements OnInit {
  @Input() Sender: string;
  SenderId: string;
  SenderUpdate: User;
  Recevier: string;
  RecevierId: string;
  message: string = '';
  messages: string[] = [];
  notify: string;
  public unRead: number;
  Name: string;
  store: any;
  private _hubConnection: HubConnection;
  msgs: string[] = [];
  msg: string;
  text: string;
  dateTime: any;
  addMessage = new Messages();
  ID: any;

  constructor(private route: ActivatedRoute, private _dataService: LoginService, private _messageService: MessageService, private _hubService: HubConnectionService) {
    _hubService.messages = [];
  }

  onSubmit() {
    this.dateTime = new Date().toLocaleDateString();
    this.Sender = this._dataService.getSender();
    this._dataService.getUser(this.Recevier).subscribe((data: any) => {
      this.RecevierId = data.ConnectionId,
        this._dataService.getUser(this.Sender)
        .subscribe((db: any) => {
          this.SenderId = db.ConnectionID,
            this.msg = this.message + ":" + this.dateTime;
          this.message = this._hubService. sendDirectMessage(this.RecevierId, this.SenderId, this.msg, this.Sender);
        })
    });
    this.addMessage.message = this.message;
    this.addMessage.sender = this.Sender;
    this.addMessage.recevier = this.Recevier;
    this.addMessage.time = this.dateTime;
    this.addMessage.IsRead = false;
    this._messageService.addMessage(this.addMessage).subscribe((data: any) => console.log(data));
  }
  ngOnInit() {
    console.log(this.dateTime);
    this.Sender = this._dataService.getSender();
    this.Name = this.route.snapshot.params['Name'];
    this._dataService.setRecevier(this.Name);
    this.Recevier = this._dataService.getRecevier();
    console.log("Sender:" + this.Sender);
    console.log("Receviver:" + this.Recevier);
    this._messageService.getMessage().subscribe((data: any) => {
      for (let msg of data) {
        if (msg.recevier === this.Recevier && msg.sender === this.Sender || msg.recevier === this.Sender && msg.sender === this.Recevier) {
          var text = msg.sender + ":" + msg.message + ":" + msg.time;
          this.msgs.push(text);
          msg.IsRead = true;
          this._messageService.Update(msg).subscribe((data: any) => console.log(data));
        }
      }
    })
             
            
            }

}
