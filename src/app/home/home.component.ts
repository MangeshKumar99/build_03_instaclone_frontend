import { Component, OnInit } from '@angular/core';
import { InstaService } from '../insta.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  postsArray: any = [];

  constructor(private instaService: InstaService) {}

  ngOnInit(): void {
    this.loadPosts();
    
  }
  loadPosts() {
    this.instaService.getAllPosts().subscribe(
      (res: any) => {
        console.log(res);
        this.postsArray = res.result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
