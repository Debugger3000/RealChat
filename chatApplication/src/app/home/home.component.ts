import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChatRoomComponent } from '../components/chat-room/chat-room.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { userData } from '../Types/user';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ProfileComponent, FriendsComponent, ProfileComponent, ChatRoomComponent], //profile component on the right of home 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  loginService= inject(LoginService);
  profileService = inject(ProfileService);

  // Store cur user data to be able to pass to children
  public userData = signal<userData>(null);

  //store chatRoomID
  //somehow someway we need to GET a list of friends and their main info, display it
  //then pass the common CHATROOM ID down to this signal to go to Chatroom Component
  //public chatRoomId = signal('');

  //chatroomState
  public chatRoomStatePass = signal('friend');

  //current users ID
  public curUserData = signal<userData>(null);

  //callback to set user

  public responseLogin:any;

  // we should move login form HTML code to register page.
  loginClosed = true; //if the login popup is visible or not. 
  showLogin(){
    this.loginClosed = false;
  }
  closeLogin(){
    this.loginClosed = true;
  }


  userLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(),
  })

  //on form submit callback... to login a user...
  onSubmit() {
    //Check database for users with same name or email...

    //POST data if information is good 
    this.loginService.postLoginUser(this.userLoginForm.value).subscribe(e => {
      this.responseLogin = e;
      //route to certain page on good response
    // console.log("response from register: ", e);
    console.log("printing response after subscribe received response...:",this.responseLogin);
    this.router.navigate([`${this.responseLogin.url}`]);
    });;

    
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginForm.value);
  }

  //run when component is initiated...
  ngOnInit(): void {
    this.profileService.getMe().subscribe((data) => {
      console.log('Your data of yourself',data);
      // set user data
      this.userData.set(data);
    });
    console.log("Profile component has been loaded...")
  }

}
