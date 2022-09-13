import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'createupdatepost',component:CreateUpdatePostComponent, canActivate:[AuthGuard]},
  {path:'myprofile',component:MyProfileComponent,canActivate:[AuthGuard]},
  {path:'userprofile',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
}
