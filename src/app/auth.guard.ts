import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
