import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { Chat } from '../shared/interfaces/chat';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  COMMON_URL = environment.COMMON_URL;
  socket = io("http://localhost:1313");
  message$: BehaviorSubject<Chat> = new BehaviorSubject({ message: "", name: "" });
  notification$: BehaviorSubject<string> = new BehaviorSubject('');
  typing$: BehaviorSubject<any> = new BehaviorSubject({room:"",message:""});
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
  }

  getNotification() {
    this.socket.on('join or left', (alert) => {
      this.notification$.next(alert);
    })
    return this.notification$.asObservable();
  }

  sendNotification(alert: string) {
    this.socket.emit('join or left', alert);
  }

  getTypingNotification() {
    this.socket.on('typing', (alert) => {
      this.typing$.next(alert);
    })
    return this.typing$.asObservable();
  }
  sendTypingNotification(alert: any) {
    this.socket.emit('typing', alert);
  }

}

