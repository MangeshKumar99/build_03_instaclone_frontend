import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin', component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'reset',component:ResetComponent},
  { path: 'home', loadChildren: () => import('../core/core.module').then(m => m.CoreModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
  constructor(){
  }
 }
