import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.less']
})
export class ResetComponent implements OnInit {

  constructor(private instaService:InstaService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  resetForm = this.fb.group({
    password: ["", Validators.required],
  });
  get resetFormControl() {
    return this.resetForm.controls;
  }
  onSubmit() {
    let email = JSON.parse(localStorage.getItem('email') || '{}');
    this.instaService.resetPassword(email.email,this.resetForm.value).subscribe((res:any)=>{
      console.log(res);
      this.resetForm.reset();
      alert(res.message);
      this.router.navigate(['']);
    },(error)=>{
      alert(error.error.error);
    })
  }

}
