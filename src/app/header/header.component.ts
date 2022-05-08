import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private instaService:InstaService) { }

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
      alert(res.message);
      this.router.navigate(['']);
    },(error)=>{
      alert(error.error.error);
    })
  }

}
