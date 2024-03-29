import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstaService } from 'src/app/insta.service';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.less']
})
export class ForgotComponent implements OnInit {

  constructor(private fb: FormBuilder, private instaService:InstaService, private router: Router, private toastr:ToastrService) { }

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
    this.instaService.sendResetLink(this.forgotForm.value).subscribe((res)=>{
      localStorage.setItem("email",JSON.stringify(this.forgotForm.value));
      this.forgotForm.reset();
      this.router.navigate(['reset']);
      this.toastr.success(res.message,"Reset email");
    },(error)=>{
      this.toastr.error(error.error.error,"Error");
    })
  }
}
