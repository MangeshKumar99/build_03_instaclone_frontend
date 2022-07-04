import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private titleService:Title){
    this.titleService.setTitle("Instagram Clone");
  }
  title = 'instaclonefrontend';
}
