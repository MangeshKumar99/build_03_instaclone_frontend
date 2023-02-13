import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Chat } from 'src/app/shared/interfaces/chat';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  constructor(private fb:FormBuilder,private chatService: ChatService) { }
  chatArray:Chat[] =[];
  messageForm = this.fb.group({
    message:['',Validators.required]
  });
  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((msg:Chat)=>{
      if(msg) this.chatArray.push(msg);
    })
  }

  onSubmit(){
    this.chatService.sendMessage({message:this.messageForm.value.message,name:JSON.parse(localStorage.getItem('user') || '{}').user.name});
    this.messageForm.reset();
  }
  ngOnDestroy(){
  }

}
