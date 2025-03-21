import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
requestSuccess: any; 

  
  // call this to chat the state of home component
  // changeHome() {
    
  //   this.chatRoomStatePass.set('friends');
  // }

  //logic idea: 
    //start with requestSuccess as null - so the message isn't visible
    //on either success or fail set bool to either true or false - to assign the styling & message
    //for either success or fail have a timeout, which once done sets requestSuccess to null again (to hide the message, so it's not always visible)
  

  toggleFriendRequests() {

    console.log("friend request button clicked...");

  }

}
