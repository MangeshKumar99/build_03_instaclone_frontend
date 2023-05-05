import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Chat } from '../shared/interfaces/chat';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  COMMON_URL= environment.COMMON_URL;
  socket = io("http://localhost:1313");
  message$: BehaviorSubject<Chat> = new BehaviorSubject({ message: "", name: "" });
  constructor() {
  }

  sendMessage(message: Chat) {
    this.socket.emit('chat', message);
  }
  getNewMessage() {
    this.socket.on('chat', (message: Chat) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
}

