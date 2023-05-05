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
  userConnected: any;
  messageForm = this.fb.group({
    message: ['', Validators.required]
  });
  joinForm = this.fb.group({
    group: ['', Validators.required]
  });
  ngOnInit(): void {
    this.chatService.socket.connect();
    this.chatService.getNewMessage().subscribe((msg: Chat) => {
      if (msg.message != "") this.chatArray.push(msg);
    })
  }

  onSubmit() {
    this.chatService.sendMessage({ message: this.messageForm.value.message, name: JSON.parse(localStorage.getItem('user') || '{}').user.name });
    this.messageForm.reset();
  }
  joinGroup(){
    this.chatService.socket.emit('create',this.joinForm.value.group);
    this.joinForm.reset();
  }
  ngOnDestroy(){
    this.chatService.socket.disconnect();
  }

}
