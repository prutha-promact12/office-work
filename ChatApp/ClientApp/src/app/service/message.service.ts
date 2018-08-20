import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Messages } from '../ChatApp/User';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable()
export class MessageService {

  private Url: string = 'api/messages';
  constructor(private http: HttpClient) { }

  addMessage(message: Messages) {
    return this.http.post(this.Url, message);
  }
  getMessage() {
    return this.http.get(this.Url);
  }
  Update(message: Messages) {
    return this.http.put(this.Url + '/' + message.Id, message);
  }
}
