import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.less']
})
export class ForgotComponent implements OnInit {

  constructor(private fb: FormBuilder, private instaService:InstaService, private router: Router) { }

  ngOnInit(): void {
  }
  forgotForm = this.fb.group({
    email: ["", Validators.required],
  });
  get forgotFormControl() {
    return this.forgotForm.controls;
  }
  navigateToSignin(){
    this.router.navigate(['']);
  }
  onSubmit() {
    this.instaService.sendResetLink(this.forgotForm.value).subscribe((res:any)=>{
      localStorage.setItem("email",JSON.stringify(this.forgotForm.value));
      console.log(res);
      this.forgotForm.reset();
      this.router.navigate(['reset']);
      alert(res.message);
    },(error)=>{
      alert(error.error.error);
    })
  }
}
