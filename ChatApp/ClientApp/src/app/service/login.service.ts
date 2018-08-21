import { Injectable } from '@angular/core';
import { User } from '../ChatApp/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logging } from 'protractor';
import { map } from 'rxjs/operators';
@Injectable()
export class LoginService {
  private Url: string = 'api/login';

  constructor(private http: HttpClient) { }

  public Sender: string;
  public Recevier: string;
  setSender(Name) {
    this.Sender = Name;
  }
  getSender() {
    return this.Sender;
  }
  setRecevier(Name) {
    this.Recevier = Name;
  }
  getRecevier() {
    return this.Recevier;
  }
  getUser(Id) {
    return this.http.get(this.Url + '/' + Id);
  }
  addUser(user: User) {
    return this.http.post(this.Url, user);
  }
  getUsers() {
    return this.http.get(this.Url);
  }
  Update(user: User) {
    return this.http.put(this.Url + '/' + user.Id, user)
  }

}
