import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getAllPosts(userId:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}posts/${userId}`,{headers: headers});
  }
  createPost(userId:any,token:any,payload:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.COMMON_URL}post/create/${userId}`,payload,{headers: headers});
  }
  signout(){
    return this.http.get(`${this.COMMON_URL}signout`);
  }
  updateLikeCount(postId:any,userId:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}post/like/${postId}/${userId}`,{headers: headers});
  }
  deletePost(postId:any,userId:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.delete(`${this.COMMON_URL}post/${postId}/${userId}`,{headers: headers})
  }
  updatePost(userId:any,postId:any,token:any,payload:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.COMMON_URL}post/${postId}/${userId}`,payload,{headers: headers});
  }
  postComment(userId:any,postId:any,token:any,payload:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.post(`${this.COMMON_URL}comment/create/${postId}/${userId}`,payload,{headers: headers});
  }
  deleteComment(commentId:any,postId:any,userId:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}comment/delete/${commentId}/${postId}/${userId}`,{headers: headers});
  }
  getUser(loggedInUser:any){
    return this.http.get(`${this.COMMON_URL}user/${loggedInUser}`);
  }
  updateFollow(userId1:any,userId2:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}user/update/follow/${userId1}/${userId2}`,{headers: headers});
  }
  loggedIn(){
    return !!localStorage.getItem('user');
  }
  checkUser(userId:any,token:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}check/${userId}`,{headers: headers});
  }
  searchUsersByName(userId:any,token:any,userName:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('content-type','application/json');
    return this.http.get(`${this.COMMON_URL}/user/search/${userId}/${userName}`,{headers: headers});
  }
}
