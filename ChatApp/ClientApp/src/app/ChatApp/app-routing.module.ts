import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../Chat/chat.componenet';
import { ChatRoomComponent } from '../ChatRoom/ChatRoom.component';
import { HubConnectionService } from '../service/hub-connection.service';
import { MessageService } from '../service/message.service';

const appRoutes: Routes = [{
  path: 'list/:Name',
  component: ChatComponent,
  children: [
    { path: 'room/:Name', component: ChatRoomComponent }]
}];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    ChatComponent,
    ChatRoomComponent],
  providers: [
    HubConnectionService,
    MessageService
  ]
})
export class AppRoutingModule { }
