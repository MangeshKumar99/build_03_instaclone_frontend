import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {
  myProfileDetails: any;
  filteredUsersPostsArray:any =[];

  constructor(private instaService:InstaService, private router:Router) { }

  ngOnInit(): void {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    const isEmpty = Object.keys(userObj).length === 0;
    if(isEmpty){
      this.router.navigate(['']);
    }
    if(!isEmpty){
      this.instaService.checkUser(userObj.user._id,userObj.token).subscribe((res)=>{
        this.instaService.getUser(userObj.user._id).subscribe((res:any)=>{
          this.myProfileDetails=res;
          this.getPosts();
        },(error)=>{
          alert(error.error.error);
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
  getPosts(){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.getAllPosts(userObj.user._id,userObj.token).subscribe(
      (res: any) => {
        const userPosts = res.result;
        this.filterUsersPosts(userPosts);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterUsersPosts(userPosts:any){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    for(let i=0;i<userPosts.length;i++){
      if(userPosts[i].postedBy._id==userObj.user._id){
        this.filteredUsersPostsArray.push(userPosts[i]);
      }
    }
    console.log(this.filteredUsersPostsArray);
  }
  navigateToDashboard(data:any){
    this.router.navigate(['/home/dashboard',data]);
  }
  extractInitials(name:any){
    if(name){
      const matches = name.match(/\b(\w)/g); 
      const acronym = matches.join('');
      return acronym;
    }
  }
}
