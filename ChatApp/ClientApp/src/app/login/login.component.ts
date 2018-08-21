import { Component, OnInit } from '@angular/core';
import { User } from '../ChatApp/User';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HubConnectionService } from '../service/hub-connection.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  Password: string;
  users: any;
  updateIndex: number;

  constructor(private loginService : LoginService, private hubConnectionService: HubConnectionService, private router: Router) { }

  onSubmit() {
    this.loginService.getUser(this.user.Name).subscribe(
      (data: User) => {
        if (!data) {
          alert("Id is not Found");
        }
        else {
          if (this.user.Password === data.Password) {
            this.hubConnectionService.setConnctionId(this.user.Name);
            this.hubConnectionService.setStatus(this.user.Name);
            this.router.navigate(['/list', this.user.Name]);
          }
          else {
            alert("Password Does not Match ..")
          }
        }
      }
    );
  }
  ngOnInit() {
    this.loginService.getUsers().subscribe((data: any) => this.users = data);
  }

}
