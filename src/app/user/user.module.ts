import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    CreateUpdatePostComponent,
    MyProfileComponent,
    UserProfileComponent,
    DashboardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
