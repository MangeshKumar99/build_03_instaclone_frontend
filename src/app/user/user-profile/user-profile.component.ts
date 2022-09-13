import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstaService } from 'src/app/insta.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  userId:any;
  postsArray:any=[];
  filteredPostsArray:any=[];
  userProfileDetails: any;
  flag:any

  constructor(private instaService: InstaService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    const isEmpty = Object.keys(userObj).length === 0;
    if(isEmpty){
      this.router.navigate(['']);
    }
    if(!isEmpty){
      this.instaService.checkUser(userObj.user._id,userObj.token).subscribe((res)=>{
        this.route.params.subscribe((params: Params) => {
          this.userId=params._id;
        })
        this.instaService.getUser(this.userId).subscribe((res:any)=>{
          this.userProfileDetails=res;
        },(error)=>{
          alert(error.error.error);
        })
        //logged in user details
        setTimeout(()=>{
          const userObj = JSON.parse(localStorage.getItem('user') || '{}');
          this.instaService.getUser(userObj.user._id).subscribe((res:any)=>{
            if(res.following.includes(this.userProfileDetails?.email)){
              this.flag=true;
            }
            else{
              this.flag=false;
            }
          },(error)=>{
            alert(error.error.error);
          })
        },100)
        this.loadPosts();
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
  loadPosts(){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.getAllPosts(userObj.user._id,userObj.token).subscribe(
      (res: any) => {
        this.postsArray = res.result;
        this.filterPostsArray();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterPostsArray(){
    this.filteredPostsArray=[];
    for(let i=0;i<this.postsArray.length;i++){
      if(this.postsArray[i].postedBy._id==this.userId){
        this.filteredPostsArray.push(this.postsArray[i]);
      }
    }
  }
  updateFollow(){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.updateFollow(userObj.user._id,this.userProfileDetails._id,userObj.token).subscribe((res)=>{
      this.ngOnInit();
    },(error)=>{
      console.log(error);
    })
  }
  navigateToDashboard(data:any){
    this.router.navigate(['home/user/dashboard',data]);
  }
  extractInitials(name:any){
    if(name){
      const matches = name.match(/\b(\w)/g); 
      const acronym = matches.join('');
      return acronym;
    }
  }
}
