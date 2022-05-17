import { Component, OnInit } from '@angular/core';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {
  myProfileDetails: any;
  filteredUsersPostsArray:any =[];

  constructor(private instaService:InstaService) { }

  ngOnInit(): void {
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.getUser(userObj.user._id).subscribe((res:any)=>{
      this.myProfileDetails=res;
      this.getPosts();
    },(error)=>{
      alert(error.error.error);
    })
  }
  getPosts(){
    this.instaService.getAllPosts().subscribe(
      (res: any) => {
        let userPosts = res.result;
        this.filterUsersPosts(userPosts);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterUsersPosts(userPosts:any){
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    for(let i=0;i<userPosts.length;i++){
      if(userPosts[i].postedBy._id==userObj.user._id){
        this.filteredUsersPostsArray.push(userPosts[i]);
      }
    }
    console.log(this.filteredUsersPostsArray);
  }

}
