import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private instaService:InstaService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  navigateToCreateUpdatePost(){
    this.router.navigate(['/home/createupdatepost']);
  }
  navigateToMyprofile(){
    this.router.navigate(['/home/myprofile']);
  }
  signoutUser(){
    localStorage.removeItem("user");
    this.instaService.signout().subscribe((res:any)=>{
      this.toastr.success("See you soon :)", "Signed out successfully");
      this.router.navigate(['']);
    },(error)=>{
      alert(error.error.error);
    })
  }

}
