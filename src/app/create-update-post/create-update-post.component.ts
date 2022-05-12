import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.less']
})
export class CreateUpdatePostComponent implements OnInit {
  photo: any;
  postId: any;
  constructor(private fb: FormBuilder, private instaService: InstaService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.params.subscribe((params: Params) => {
      this.postId=params._id
      this.createPostForm.patchValue({
        title: params.title, 
        description: params.description
      });
    })
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
    let formData = new FormData();
    formData.append("title", this.createPostForm.value.title);
    formData.append("description", this.createPostForm.value.description);
    formData.append("photo", this.photo);
    let userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(this.postId){
      //update
      this.instaService.updatePost(userObj.user._id,this.postId,userObj.token,formData).subscribe((res:any)=>{
        alert(res.message);
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      },(error)=>{
        alert(error.error.error);
      })
    }
    else{
      //create
      this.instaService.createPost(userObj.user._id, userObj.token, formData).subscribe((res: any) => {
        this.createPostForm.reset();
        alert(res.message);
        this.navigateToHome();
      }, (error) => {
         alert(error.error.error);
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
