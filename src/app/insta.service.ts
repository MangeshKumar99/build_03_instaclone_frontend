import { HttpClient} from '@angular/common/http';
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
  getAllPosts(userId:any){
    return this.http.get(`${this.COMMON_URL}posts/${userId}`);
  }
  createPost(userId:any,payload:any){
    return this.http.post(`${this.COMMON_URL}post/create/${userId}`,payload);
  }
  signout(){
    return this.http.get(`${this.COMMON_URL}signout`);
  }
  updateLikeCount(postId:any,userId:any){
    return this.http.get(`${this.COMMON_URL}post/like/${postId}/${userId}`);
  }
  deletePost(postId:any,userId:any){
    return this.http.delete(`${this.COMMON_URL}post/${postId}/${userId}`)
  }
  updatePost(userId:any,postId:any,payload:any){
    return this.http.put(`${this.COMMON_URL}post/${postId}/${userId}`,payload);
  }
  postComment(userId:any,postId:any,payload:any){
    return this.http.post(`${this.COMMON_URL}comment/create/${postId}/${userId}`,payload);
  }
  deleteComment(commentId:any,postId:any,userId:any){
    return this.http.get(`${this.COMMON_URL}comment/delete/${commentId}/${postId}/${userId}`);
  }
  getUser(loggedInUser:any){
    return this.http.get(`${this.COMMON_URL}user/${loggedInUser}`);
  }
  updateFollow(userId1:any,userId2:any){
    return this.http.get(`${this.COMMON_URL}user/update/follow/${userId1}/${userId2}`);
  }
  loggedIn(){
    return !!localStorage.getItem('user');
  }
  checkUser(userId:any){
    return this.http.get(`${this.COMMON_URL}check/${userId}`);
  }
  searchUsersByName(userId:any,userName:any){
    return this.http.get(`${this.COMMON_URL}/user/search/${userId}/${userName}`);
  }
}
