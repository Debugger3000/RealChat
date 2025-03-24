import { Component, inject,  signal } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { FriendsService } from '../../services/friends.service';
import { ProfileService } from '../../services/profile.service';
import { catchError } from 'rxjs';
import { userData, userDataArray, friend } from '../../Types/user';
@Component({
  selector: 'app-friends',
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
requestSuccess: any; 
friends : friend = [];
friendRequests : userDataArray = [];
friendService = inject(FriendsService);
profileService = inject(ProfileService);
response : any;
isFriendRequestOn : boolean = false;
  // call this to chat the state of home component
  // changeHome() {
    
  //   this.chatRoomStatePass.set('friends');
  // }

  
  ngOnInit() : void{
    this.friendService.getFriendRequest().subscribe(e =>{

      this.friendRequests = e;
     
    });


    this.friendService.getFriends().subscribe(e =>{

      this.friends = e;
      console.log(e);
    });

  }


  //logic idea: 
    //start with requestSuccess as null - so the message isn't visible
    //on either success or fail set bool to either true or false - to assign the styling & message
    //for either success or fail have a timeout, which once done sets requestSuccess to null again (to hide the message, so it's not always visible)
  toggleFriendRequests() {

    console.log("friend request button clicked...");
    this.isFriendRequestOn = !this.isFriendRequestOn;


  }

  sendFriendRequest(value:string){
    this.friendService.sendFriendRequest(value).subscribe({
      next: (data) => {
      console.log('Data:', data);
      this.requestSuccess = true;
    },
    error: (error) => {
      console.error('Error:', error);
      this.requestSuccess = false;
    }
  })
 
  }


  acceptFriend(num : number){
    const id = this.friendRequests[num]._id;
    this.friendService.acceptFriendRequest(id).subscribe(e => {
    });
  }

  declineFriend(num : number){
    const id = this.friendRequests[num]._id;
    console.log(id);
    this.friendService.declineFriendRequest(id).subscribe(e => {
    });
    

  }

}
