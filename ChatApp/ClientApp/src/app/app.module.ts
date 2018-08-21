import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app/ChatApp/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './Chat/chat.componenet';
import { ChatRoomComponent } from './ChatRoom/ChatRoom.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginService } from './service/login.service';
import {  MessageService } from './service/message.service';
import { combineAll } from 'rxjs/operator/combineAll';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ChatRoomComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent},
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'reg', component: RegistrationComponent }
      
    ], { useHash: true })
  ],
  providers: [LoginService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
