import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  dashboardArray: any;
  dashboardHeading: any;
 

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params.likes){
        this.dashboardHeading='Likes';
        this.dashboardArray=params.likes.split(",");
      }
      else if(params.followers){
        this.dashboardHeading='Followers';
        this.dashboardArray=params.followers.split(",");
      }
      else if(params.following){
        this.dashboardHeading='Following';
        this.dashboardArray=params.following.split(",");
      }
      else{
        this.dashboardHeading="NO DATA FOUND";
      }
    })
  }

}
