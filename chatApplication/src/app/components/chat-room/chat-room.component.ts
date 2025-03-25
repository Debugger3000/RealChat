import { Component, inject, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { userData } from '../../Types/user';
import { FriendsService } from '../../services/friends.service';
import { ChatRoomMessage } from '../../Types/message';

@Component({
  selector: 'app-chat-room',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnChanges {
  friendService = inject(FriendsService);
  messageService = inject(MessageService);

  messageForm = new FormGroup({
    message: new FormControl('')
  });

  @Input() chatroomFriendInfo: {username: string} = {username: ''};
  @Input() chatRoomMessages: ChatRoomMessage = null;
  // {_id: '',chatroomId: '',userId: '',content: '',timestamp: '',__v: 0,}
  // receive userData from Home component...
  userData = input<userData>();

  // Create state so we can change 
  chatRoomState = input('friend');

  chatRoomID = input('');

  //get user id

  //get chatroomID

  ngOnChanges(changes: SimpleChanges): void {

    // get messages for current chatroom
    this.messageService.getMessages(this.friendService.curChatroomId).subscribe(res => {
      console.log("response recieved from get chatroom messages...");
      //set message array to @Input
      this.chatRoomMessages = res;


    });
    
  }


  // Test POST for a new message in the chatroom...
  onSubmitMessage() {

    const messageRequest = {
      chatRoomId: this.friendService.curChatroomId,
      userId: this.userData()?.user._id,
      message: this.messageForm.value.message,
    }

    console.log("this is message Request: ", messageRequest);



    this.messageService.sendMessage(messageRequest).subscribe(response => {
      console.log("Response from post message...",response);
    });



  }


}
