import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { 

}
