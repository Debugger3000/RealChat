import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { userData } from '../../Types/user';

@Component({
  selector: 'app-chat-room',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {

  messageService = inject(MessageService);

  messageForm = new FormGroup({
    message: new FormControl('')
  });

  // receive userData from Home component...
  userData = input<userData>();

  // Create state so we can change 
  chatRoomState = input('friend');

  chatRoomID = input('');

  //get user id

  //get chatroomID


  // Test POST for a new message in the chatroom...
  onSubmitMessage() {

    const messageRequest = {
      chatRoomId: this.chatRoomID(),
      userId: this.userData()?.user._id,
      message: this.messageForm.value.message,
    }



    this.messageService.sendMessage(this.messageForm.value.message).subscribe(response => {
      console.log("Response from post message...",response);
    });



  }


}
