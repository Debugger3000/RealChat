import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {


  // call this to chat the state of home component
  // changeHome() {
    
  //   this.chatRoomStatePass.set('friends');
  // }

  toggleFriendRequests() {

    console.log("friend requets button clicked...");

  }

}
