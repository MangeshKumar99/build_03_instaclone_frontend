import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaService } from 'src/app/insta.service';


@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.less']
})
export class CreateUpdatePostComponent implements OnInit {
  photo: any;
  postId: any;
  constructor(private fb: FormBuilder, private instaService: InstaService , private router: Router,private route: ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    
    const isEmpty = Object.keys(userObj).length === 0;
    //Restricting the user from accessing this screen if he/she has not been authorized
    //Thus navigating the user back to signin page
    if(isEmpty){
      this.router.navigate(['']);
    }
    if(!isEmpty){
      this.instaService.checkUser(userObj.user._id,userObj.token).subscribe((res)=>{
        this.route.params.subscribe((params: Params) => {
          this.postId=params._id
          this.createPostForm.patchValue({
            title: params.title, 
            description: params.description
          });
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
  createPostForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    photo: ["", Validators.required]
  });
  get createPostFormControl() {
    return this.createPostForm.controls;
  }
  onSubmit() {
    const formData = new FormData();
    formData.append("title", this.createPostForm.value.title);
    formData.append("description", this.createPostForm.value.description);
    formData.append("photo", this.photo);
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.postId){
      //update
      this.instaService.updatePost(userObj.user._id,this.postId,userObj.token,formData).subscribe((res:any)=>{
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      },(error)=>{
        this.toastr.error(error.error.error,"Error");
      })
    }
    else{
      //create
      this.instaService.createPost(userObj.user._id, userObj.token, formData).subscribe((res: any) => {
        this.createPostForm.reset();
        this.toastr.success(res.message,"POST");
        this.navigateToHome();
      }, (error) => {
        this.toastr.error(error.error.error,"Error");
      })
    }

  }
  handleFileInput(e: any) {
    this.photo = e.target.files[0];
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
}
