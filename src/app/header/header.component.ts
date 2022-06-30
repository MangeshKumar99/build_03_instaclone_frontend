import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstaService } from '../insta.service';
import { ToastrService } from 'ngx-toastr';
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  filteredOptions:any=[];
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
      this.toastr.error(error.error.error,"Error");
    })
  }
  handleChange(event:any){
    const searchText = event.target.value;
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(searchText.length >=2 && searchText.length <=5){
      this.instaService.searchUsersByName(userObj.user._id,userObj.token,searchText).pipe(debounceTime(500)).subscribe((res:any)=>{
        this.filteredOptions=res;
      },(error)=>{
        this.toastr.error(error.error.error,"Error");
      })
    }
  }
  navigateToProfile(user:any){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(userObj.user._id==user._id){
      this.router.navigate(['/home/myprofile']);
    }
    else{
      this.router.navigate(['/home/userprofile',{_id:user._id}]);
    }
  }

}


