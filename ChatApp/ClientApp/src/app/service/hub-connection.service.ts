import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable()
export class HubConnectionService {

  messages: string[] = [];
  message: string;
  text: string;
  unread: number = 1;
  private _hubconnction: HubConnection;

  constructor() {

    this.init();
  }

  setConnctionId(sender) {
    this._hubconnction.invoke('setConncetionId', sender);
  }
  setStatus(sender) {
    this._hubconnction.invoke('setStatus', sender);
  }
  sendDirectMessage(senderId, recevierId, Message, Sender) {
    this._hubconnction.invoke('Send', Sender, recevierId, Message, senderId);
    return this.message;
  }
  private init() {

    this._hubconnction = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chat')
      .configureLogging(signalR.LogLevel.Information).build();

    this._hubconnction.start().then(() => console.log('Connction Strated !')).catch(err => console.log('Error while establishing connection'));

    this._hubconnction.on('setConnectionID', (sender: string) => { });

    this._hubconnction.on('setStatus', (sender: string) => { });

    this._hubconnction.on('send', (receivedMessage: string, sender: string) => {
      this.text = `${sender}:${receivedMessage}`;
      this.messages.push(this.text);
    });
  }

}
