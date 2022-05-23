import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InstaService } from '../insta.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private router:Router, private instaService: InstaService, private toastr:ToastrService) { }

  ngOnInit(): void {

  }
  signinForm = this.fb.group({
    email: ["", Validators.required],
    password:["", Validators.required]
  });
  get signinFormControl() {
    return this.signinForm.controls;
  }
  onSubmit() {
    this.instaService.signinUser(this.signinForm.value).subscribe((res)=>{
      localStorage.setItem("user",JSON.stringify(res));
      this.signinForm.reset();
      this.toastr.success("Welcome back :)", "Signed in successfully");
      this.router.navigate(['home']);
    },(error)=>{
      this.toastr.error(error.error.error,"Error");
    })
  }
  navigateToSignup(){
    this.router.navigate(['signup']);
  }
  navigateToForgot(){
    this.router.navigate(['forgot']);
  }

}
