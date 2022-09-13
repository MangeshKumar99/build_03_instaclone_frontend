import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
  HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule {

 }
