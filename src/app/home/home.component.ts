import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  loggedInUserName: any;

  constructor(private instaService: InstaService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadPosts();
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.loggedInUser = userObj.user.email;
    this.loggedInUserName = userObj.user.name;
  }
  commentForm = this.fb.group({
    comments:['',Validators.required]
  });
  onSubmit(post:any){
    if(this.commentForm.value.comments==''){
      alert('Comment is empty, type something and then post!')
    }
    else{
      let userObj = JSON.parse(localStorage.getItem('user') || '{}');
      this.instaService.postComment(userObj.user._id,post._id,userObj.token,this.commentForm.value).subscribe((res:any)=>{
        this.commentForm.reset();
        this.ngOnInit();
      },(error)=>{
        alert(error.error.error);
      })
    }
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
  deleteMyComment(commentId:any,postId:any){
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(commentId,postId);
    this.instaService.deleteComment(commentId,postId,userObj.user._id,userObj.token).subscribe((res:any)=>{
      alert(res.message);
      this.ngOnInit();
    },(error)=>{
      alert(error.error.error);
    })
  }
}
