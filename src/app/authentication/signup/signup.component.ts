import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaService } from 'src/app/insta.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder, private instaService:InstaService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  signupForm = this.fb.group({
    name:["", Validators.required],
    email: ["", Validators.required],
    password:["", Validators.required]
  });
  get signupFormControl() {
    return this.signupForm.controls;
  }
  onSubmit() {
    this.instaService.signupUser(this.signupForm.value).subscribe((res)=>{
      this.signupForm.reset();
      this.toastr.success(res.message,"User registered");
      this.navigateToSignin();
    },(error)=>{
      this.toastr.error(error.error.error);
    })
  }
  navigateToSignin(){
    this.router.navigate(['']);
  }

}
