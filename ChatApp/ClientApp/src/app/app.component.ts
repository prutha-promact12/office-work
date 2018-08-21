import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../app/service/login.service';
import { RootData } from '@angular/core/src/view';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _router: Router, private loginService: LoginService) {

  }
  logOut() {
    var Sender = this.loginService.getSender();
    this.loginService.getUser(Sender).subscribe((data: any) => {
      data.isConnect = "0";
      this.loginService.Update(data).subscribe((db: any) => console.log(db));
      this._router.navigate(['/home']);
    });
  }
  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

}
