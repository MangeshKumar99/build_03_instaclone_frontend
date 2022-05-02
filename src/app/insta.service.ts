import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstaService {
  COMMON_URL= environment.COMMON_URL;
  constructor(private http:HttpClient) { }

  signinUser(payload:any){
    return this.http.post(`${this.COMMON_URL}signin`,payload);
  }
  signupUser(payload:any){
    return this.http.post(`${this.COMMON_URL}signup`,payload);
  }
  sendResetLink(payload:any){
    return this.http.post(`${this.COMMON_URL}forgotpassword`,payload);
  }
  resetPassword(email:any,payload:any){
    return this.http.post(`${this.COMMON_URL}resetpassword/${email}`,payload);
  }
  getAllPosts(){
    return this.http.get(`${this.COMMON_URL}posts`);
  }
}
