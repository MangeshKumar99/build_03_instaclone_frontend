import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Chat } from 'src/app/shared/interfaces/chat';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  constructor(private fb: FormBuilder, private chatService: ChatService, private toastr: ToastrService) { }
  chatArray: Chat[] = [];
  groupName: string = '';
  typingMessage: string = '';
  loggedInUser: string = JSON.parse(localStorage.getItem('user') || '{}').user.name;
  messageForm = this.fb.group({
    message: ['', Validators.required]
  });
  joinForm = this.fb.group({
    group: ['', Validators.required]
  });
  ngOnInit(): void {
    this.chatService.socket.connect();
    this.chatService.getNewMessage().subscribe((msg: Chat) => {
      if (msg.message !=="") this.chatArray.push(msg);
    })
    this.chatService.getNotification().subscribe((alert:string)=>{
      if(alert !== "") this.toastr.info(alert);
    })
    this.chatService.getTypingNotification().subscribe((data: any)=>{
      if(data.message !== "") this.typingMessage = data;
      setTimeout(()=>{
        this.typingMessage = '';
      },3000)
    })
  }

  onSubmit() {
    this.chatService.sendMessage({ message: this.messageForm.value.message, name: JSON.parse(localStorage.getItem('user') || '{}').user.name });
    this.messageForm.reset();
  }
  joinGroup(){
    this.groupName = this.joinForm.value.group;
    this.chatService.socket.emit('create',this.joinForm.value.group);
    this.chatService.sendNotification(`${JSON.parse(localStorage.getItem('user') || '{}').user.name} joined ${this.groupName}`);
    this.joinForm.reset();
  }
  ngOnDestroy(){
    this.chatService.sendMessage({message:"",name:""});
    this.chatService
    this.chatService.socket.disconnect();
  }
  leaveGroup(){
    this.chatService.socket.emit('destroy',this.groupName);
    this.chatService.sendNotification(`${JSON.parse(localStorage.getItem('user') || '{}').user.name} left ${this.groupName}`);
    this.groupName = '';
  }
  onChange(e:any){
    this.chatService.sendTypingNotification({room:this.groupName,message:`${JSON.parse(localStorage.getItem('user') || '{}').user.name} is typing`})
  }
}
