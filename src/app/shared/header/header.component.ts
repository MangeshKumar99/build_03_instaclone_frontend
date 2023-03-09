import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {debounceTime} from 'rxjs/operators'
import { InstaService } from 'src/app/insta.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  filteredOptions:User[]=[];
  constructor(private router:Router, private instaService:InstaService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  navigateToCreateUpdatePost(){
    this.router.navigate(['/home/user/createupdatepost']);
  }
  navigateToMyprofile(){
    this.router.navigate(['/home/user/myprofile']);
  }
  signoutUser(){
    localStorage.removeItem("user");
    this.instaService.signout().subscribe((res)=>{
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
      this.instaService.searchUsersByName(userObj.user._id,searchText).pipe(debounceTime(500)).subscribe((res:User[])=>{
        this.filteredOptions=res;
      },(error)=>{
        this.toastr.error(error.error.error,"Error");
      })
    }
  }
  navigateToProfile(user:User){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if(userObj.user._id==user._id){
      this.router.navigate(['/home/user/myprofile']);
    }
    else{
      this.router.navigate(['/home/user/userprofile',{_id:user._id}]);
    }
  }
  navigateToChat(){
    this.router.navigate(['/home/user/chat']);
  }
  navigateToHome(){
    this.router.navigate(['home']);
  }
  extractInitials(){
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    const matches = userObj.user.name.match(/\b(\w)/g); 
    const acronym = matches?.join('');
    return acronym;
  }
}


