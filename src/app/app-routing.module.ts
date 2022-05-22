import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ResetComponent } from './reset/reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'forgot',component:ForgotComponent},
  {path:'reset',component:ResetComponent},
  {path:'home/createupdatepost',component:CreateUpdatePostComponent, canActivate:[AuthGuard]},
  {path:'home/myprofile',component:MyProfileComponent,canActivate:[AuthGuard]},
  {path:'home/userprofile',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'home/dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
