import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaService } from 'src/app/insta.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  postsArray: any = [];
  loggedInUser!: string;
  loggedInUserName!: string;

  constructor(private instaService: InstaService, private router: Router, private fb: FormBuilder, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loadPosts();
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    const isEmpty = Object.keys(userObj).length === 0;
    if(!isEmpty){
      this.loggedInUser = userObj.user.email;
      this.loggedInUserName = userObj.user.name;
    }
  }
  commentForm = this.fb.group({
    comments:['',Validators.required]
  });
  onSubmit(post:any){
    if(this.commentForm.value.comments==''){
      this.toastr.info("Comment is empty","Info");
    }
    else{
      const userObj = JSON.parse(localStorage.getItem('user') || '{}');
      this.instaService.postComment(userObj.user._id,post._id,this.commentForm.value).subscribe((res:any)=>{
        this.commentForm.reset();
        this.ngOnInit();
      },(error)=>{
        alert(error.error.error);
      })
    }
  }
  loadPosts() {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    const isEmpty = Object.keys(userObj).length === 0;
    if(isEmpty){
      this.router.navigate(['']);
    }
    if(!isEmpty){
      this.instaService.getAllPosts(userObj.user._id).subscribe(
        (res: any) => {
          this.postsArray = res.result;
        },
        (error) => {
          if(error instanceof HttpErrorResponse){
            if(error.status==401){
              this.router.navigate(['']);
              console.log(error);
            }
          }
        }
      );
    }
  }
  
  navigateToCreateUpdatePost(post:any){
    this.router.navigate(['home/user/createupdatepost',post]);
  }
  deleteMyPost(postId:string){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.deletePost(postId,userObj.user._id).subscribe((res:any)=>{
      this.toastr.success(res.message,"POST");
      this.ngOnInit();
    },(error)=>{
      alert(error.error.error);
    })
  }
  updateLikes(postId:string){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.updateLikeCount(postId,userObj.user._id).subscribe((res)=>{
      this.ngOnInit();
    },(error)=>{
      this.toastr.error(error.error.error,"Error");
    })
  }
  deleteMyComment(commentId:string,postId:string){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    this.instaService.deleteComment(commentId,postId,userObj.user._id).subscribe((res:any)=>{
      this.ngOnInit();
    },(error)=>{
      this.toastr.error(error.error.error,"Error");
    })
  }
  navigateToUserProfile(post:any){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(userObj.user._id==post.postedBy._id){
      this.router.navigate(['home/user/myprofile']);
    }
    else{
      this.router.navigate(['home/user/userprofile',{_id:post.postedBy._id}]);
    }
  }
  navigateToDashboard(data:any){
    const obj={likes:data};
    this.router.navigate(['home/user/dashboard',obj]);
  }
  extractInitials(name:any){
    const matches = name.match(/\b(\w)/g); 
    const acronym = matches.join('');
    return acronym;
  }
}
