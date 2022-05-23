import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.less']
})
export class ResetComponent implements OnInit {

  constructor(private instaService:InstaService, private fb:FormBuilder, private router:Router,private toastr:ToastrService) { }

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
      this.toastr.success(res.message,"Password reset");
      this.router.navigate(['']);
    },(error)=>{
      this.toastr.error(error.error.error,"Error");
    })
  }

}
