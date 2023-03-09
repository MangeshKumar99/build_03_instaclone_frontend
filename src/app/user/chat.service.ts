import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Chat } from '../shared/interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
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
