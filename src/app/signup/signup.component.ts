import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder, private instaService:InstaService, private router:Router) { }

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
    this.instaService.signupUser(this.signupForm.value).subscribe((res:any)=>{
      console.log(res);
      this.signupForm.reset();
      alert(res.message);
      this.navigateToSignin();
    },(error)=>{
      alert(error.error.error);
    })
  }
  navigateToSignin(){
    this.router.navigate(['']);
  }

}
