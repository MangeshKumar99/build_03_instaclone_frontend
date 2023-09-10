import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Chat } from 'src/app/shared/interfaces/chat';
import { ChatService } from '../chat.service';
import { InstaService } from 'src/app/insta.service';
import { BehaviorSubject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  constructor(private fb: FormBuilder, private chatService: ChatService, private toastr: ToastrService, private instaService: InstaService) { }
  chatArray: Chat[] = [];
  groupName: string = '';
  typingMessage: string = '';
  loggedInUser: string = JSON.parse(localStorage.getItem('user') || '{}').user.name;
  usersArray: any = [];
  chatHistory: Chat[] =[];
  currentChatId!: string;
  messageForm = this.fb.group({
    message: ['', Validators.required]
  });
  joinForm = this.fb.group({
    group: ['', Validators.required]
  });
  ngOnInit(): void {
    this.chatService.getAllUsers(JSON.parse(localStorage.getItem('user') || '{}').user._id).subscribe((data:any) => {
      this.usersArray = data.filter((user: any) => user._id !== JSON.parse(localStorage.getItem('user') || '{}').user._id && user.verified !== false);
    })
    this.chatService.socket.connect();
    this.chatService.getNewMessage().pipe(debounceTime(1000)).subscribe((msg: Chat) => {
      if (msg.message !== "") {
        this.chatHistory.push(msg);
      }
    })
    // this.chatService.getNotification().subscribe((alert: string) => {
    //   if (alert !== "") this.toastr.info(alert);
    // })
    this.chatService.getTypingNotification().subscribe((data: any) => {
      if (data.message !== "") this.typingMessage = data;
      setTimeout(() => {
        this.typingMessage = '';
      }, 3000)
    })
  }

  onSubmit() {
    this.chatService.sendMessage({ message: this.messageForm.value.message, name: JSON.parse(localStorage.getItem('user') || '{}').user.name });
    this.chatService.saveMessage(JSON.parse(localStorage.getItem('user') || '{}').user._id,this.currentChatId,{ message: this.messageForm.value.message, name: JSON.parse(localStorage.getItem('user') || '{}').user.name }).subscribe(data=>{
    });
    this.messageForm.reset();
  }
  joinGroup(groupId: string) {
    this.groupName = groupId;
    this.chatService.socket.emit('create', groupId);
    // this.chatService.sendNotification(`${JSON.parse(localStorage.getItem('user') || '{}').user.name} joined ${this.groupName}`);
  }
  ngOnDestroy() {
    this.chatService.socket.disconnect();
    this.chatService.message$ = new BehaviorSubject({ message: "", name: "" });
  }
  leaveGroup() {
    this.chatService.socket.emit('destroy', this.groupName);
    // this.chatService.sendNotification(`${JSON.parse(localStorage.getItem('user') || '{}').user.name} left ${this.groupName}`);
    this.groupName = '';
  }
  onChange(e: any) {
    this.chatService.sendTypingNotification({ room: this.groupName, message: `${JSON.parse(localStorage.getItem('user') || '{}').user.name} is typing` })
  }
  extract(name: any) {
    return this.instaService.extractInitials(name);
  }
  onUserRowClick(selectedUser: string) {
    this.chatService.isChatExists(JSON.parse(localStorage.getItem('user') || '{}').user._id, selectedUser).subscribe((data:any) => {
      if (!data) {
        this.createChat(selectedUser);
      }
      else{
        this.joinGroup(data._id);
        this.currentChatId = data._id;
        this.chatHistory = data.messages;
      }
    })
  }
  createChat(selectedUser: string) {
    // if chat is not present
    this.chatService.createChat(JSON.parse(localStorage.getItem('user') || '{}').user._id, selectedUser).subscribe((data: any) => {
      this.currentChatId = data._id;
      this.joinGroup(data._id);
    })
  }
}
