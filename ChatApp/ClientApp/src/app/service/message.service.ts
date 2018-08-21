import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Messages } from '../ChatApp/User';

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
