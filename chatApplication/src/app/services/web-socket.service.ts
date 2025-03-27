import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ProfileService } from './profile.service';
import { HomeComponent } from '../home/home.component';
import { FriendsService } from './friends.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  profileService = inject(ProfileService);
  friendService = inject(FriendsService);

  local_DEV = "http://localhost:8080/";

  //update cur chatroom
  newData: boolean = false;

  // Create a BehaviorSubject to hold the variable value
  private _myVariableSubject = new BehaviorSubject<boolean>(false);
  
  // Expose the observable to other parts of the app
  myVariable$ = this._myVariableSubject.asObservable();

  // Method to change the value of the variable
  changeMyVariable(newValue: boolean) {
    console.log("change value called, and old value was ", !newValue);
    this._myVariableSubject.next(newValue); // This emits the new value
  }



  // Store current websocket id here
  curSocketId = '';

  // store current socket connection here
  curSocket: any = null;

  


  establishSocket() {
    console.log("establish socket function called...");
    const socket = io(this.local_DEV);
    this.curSocket = socket;


    // client-side
  // socket.on("connection", (data) => {
  //   console.log(data); 
  // });

  // client-side receiving connect response from server socket...
  socket.on("connect", () => {
    console.log("Socket Connect ID: ", socket.id); // x8WIv7-mJelg7on_ALbx
    console.log("Socket Status:", socket.connected);

    setTimeout(() => {
      socket.emit('credentials-pass', this.profileService.userData);

    },5000);
  });

  // disconnect emit from server side...
  socket.on("disconnect", (reason, details) => {
    console.log("Socket Disconnect ID:",socket.id);
    console.log("Reason for Socket Disconnect: ",reason);
    console.log("Details of Socket Disconnect: ",details)
  });

  socket.on("initial-connect", (message, socketId) => {
    console.log("received test socket message: ",message);
    this.curSocketId = socketId;
  });


  // Receive chatroom updates from server via socket for own messages or other user messages...
    // Will want to either store notifications for that chatroom for this user, or update the chatroom via GET
  socket.on("message-update", (chatRoomId) => {
      console.log("message-update has been received: ",chatRoomId);

      // Want to let chatroom component to update and GET all messages
      // If chatroom id matches
      if(chatRoomId == this.friendService.curChatroomId) {
        this.changeMyVariable(true);
      }
      else{
        console.log("In callback of message-update...");
      }


      // if chatroom id does not match then update that users notifications for their stored chatroom...
  });

  



  }


  // disonnect client to server socket connection when logout is pressed...
  clientDisconnect() {
    console.log("client disconnect function called...");

    //disconnect
    this.curSocket.disconnect();

    this.curSocket.on("disconnect", () => {
      console.log("ClientDisconnect Function - Socket Disconnect ID:",this.curSocket.id); // undefined
    });

  }

  // emit data from client for message just sent...
  emitMessage(payload : {chatRoomId: string, userId: string | undefined, message: string | null | undefined}) {
    console.log("within emit message");

    this.curSocket.emit("message-form", payload);
  }

  

}
