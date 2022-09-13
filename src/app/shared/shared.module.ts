import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    ToastrModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    ToastrModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeaderComponent,
  ]
})
export class SharedModule { }
