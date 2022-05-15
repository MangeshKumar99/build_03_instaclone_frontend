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

  constructor(private instaService: InstaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId=params._id;
    })
    this.instaService.getLoggedInUser(this.userId).subscribe((res:any)=>{
      this.userProfileDetails=res;
    },(error)=>{
      alert(error.error.error);
    })
    this.loadPosts();
  }
  loadPosts() {
    this.instaService.getAllPosts().subscribe(
      (res: any) => {
        console.log(res);
        this.postsArray = res.result;
        this.filterPostsArray();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filterPostsArray(){
    for(let i=0;i<this.postsArray.length;i++){
      if(this.postsArray[i].postedBy._id==this.userId){
        this.filteredPostsArray.push(this.postsArray[i]);
      }
    }
  }
}
