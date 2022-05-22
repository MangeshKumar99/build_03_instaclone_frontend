import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  dashboardArray: any;
  dashboardHeading: any;
 

  constructor(private route:ActivatedRoute,private instaService: InstaService, private router:Router) { }

  ngOnInit(): void {
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    let isEmpty = Object.keys(userObj).length === 0;
    if(isEmpty){
      this.router.navigate(['']);
    }
    if(!isEmpty){
      this.instaService.checkUser(userObj.user._id,userObj.token).subscribe((res)=>{
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
      },(error)=>{
        if(error instanceof HttpErrorResponse){
          if(error.status==401){
            this.router.navigate(['']);
            console.log(error);
          }
        }
      })
    }
   
  }

}
