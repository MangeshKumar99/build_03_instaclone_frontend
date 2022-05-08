import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  postsArray: any = [];
  loggedInUser: any;

  constructor(private instaService: InstaService, private router: Router) {}

  ngOnInit(): void {
    console.log("hi");
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.loggedInUser = userObj.user.email;
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
  navigateToCreateUpdatePost(post:any){
    this.router.navigate(['/home/createupdatepost',post]);
  }
  deleteMyPost(postId:any){
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.deletePost(postId,userObj.user._id,userObj.token).subscribe((res:any)=>{
      alert(res.message);
      this.ngOnInit();
    },(error)=>{
      alert(error.error.error);
    })
  }
  updateLikes(postId:any){
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.updateLikeCount(postId,userObj.user._id,userObj.token).subscribe((res)=>{
      this.ngOnInit();
    },(error)=>{
      alert(error.error.error);
    })
  }
}
