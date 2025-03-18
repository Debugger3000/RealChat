import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ProfileComponent], //profile component on the right of home 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}
  loginService= inject(LoginService);

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

    // .subscribe({
    //   next: (response) => {
    //     // if response is good, then redirect user...
    //     // this.router.navigate(['/profile'])
    //     console.log("successful LOGIN POST from component...");
    //   },
    //   error: (error) => {
    //     // Error is handled here
    //     console.error('An error occurred during the LOGIN POST request:', error);
    //   },
    // });
    
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginForm.value);
  }

}
