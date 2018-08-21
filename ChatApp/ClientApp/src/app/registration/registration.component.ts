import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { User } from '../ChatApp/User';
import { selector } from 'rxjs/operator/publish';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  users: User[];
  confrim: string;

  constructor(private router: Router, private loginService: LoginService) { }

  onSubmit() {
    this.loginService.getUser(this.user.Name).subscribe(
      (data: User) => {
        if (data) {
          alert("UserName Already Exits Please use Another Name ...")
        }
        else {
          if (this.confrim == this.user.Password) {
            this.loginService.addUser(this.user).subscribe((data: any) => this.users.push(data))
            this.router.navigate(['/login']);
          }
          else {
            alert("Password Does not Match");
          }
        }
      }
    )
  }
  ngOnInit() {
  }

}
