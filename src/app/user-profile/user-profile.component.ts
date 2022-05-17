import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InstaService } from '../insta.service';

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

  constructor(private instaService: InstaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
      let userObj = JSON.parse(localStorage.getItem('user') || '{}');
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
  }
  loadPosts() {
    this.instaService.getAllPosts().subscribe(
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
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.updateFollow(userObj.user._id,this.userProfileDetails._id,userObj.token).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    },(error)=>{
      console.log(error);
    })
  }
}
