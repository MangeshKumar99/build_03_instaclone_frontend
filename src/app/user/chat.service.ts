import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io("http://localhost:1313");
  message$: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() {}

  sendMessage(message: any) {
    this.socket.emit('chat', message);
  }
   getNewMessage(){
    this.socket.on('chat', (message:any) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}
