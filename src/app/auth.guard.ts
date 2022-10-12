import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { InstaService } from './insta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private instaService:InstaService, private router:Router){}
  canActivate():boolean {
    if(this.instaService.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
  
}
