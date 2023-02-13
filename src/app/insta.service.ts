import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstaService {
  COMMON_URL= environment.COMMON_URL;
  constructor(private http:HttpClient) { }

  signinUser(payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}signin`,payload);
  }
  signupUser(payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}signup`,payload);
  }
  sendResetLink(payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}forgotpassword`,payload);
  }
  resetPassword(email:string,payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}resetpassword/${email}`,payload);
  }
  getAllPosts(userId:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}posts/${userId}`);
  }
  createPost(userId:string,payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}post/create/${userId}`,payload);
  }
  signout():Observable<any>{
    return this.http.get(`${this.COMMON_URL}signout`);
  }
  updateLikeCount(postId:string,userId:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}post/like/${postId}/${userId}`);
  }
  deletePost(postId:string,userId:string):Observable<any>{
    return this.http.delete(`${this.COMMON_URL}post/${postId}/${userId}`)
  }
  updatePost(userId:string,postId:string,payload:any):Observable<any>{
    return this.http.put(`${this.COMMON_URL}post/${postId}/${userId}`,payload);
  }
  postComment(userId:string,postId:string,payload:any):Observable<any>{
    return this.http.post(`${this.COMMON_URL}comment/create/${postId}/${userId}`,payload);
  }
  deleteComment(commentId:string,postId:string,userId:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}comment/delete/${commentId}/${postId}/${userId}`);
  }
  getUser(loggedInUser:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}user/${loggedInUser}`);
  }
  updateFollow(userId1:string,userId2:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}user/update/follow/${userId1}/${userId2}`);
  }
  loggedIn(){
    return !!localStorage.getItem('user');
  }
  checkUser(userId:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}check/${userId}`);
  }
  searchUsersByName(userId:string,userName:string):Observable<any>{
    return this.http.get(`${this.COMMON_URL}/user/search/${userId}/${userName}`);
  }
}
