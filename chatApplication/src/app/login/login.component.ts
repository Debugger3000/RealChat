import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {



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
    // change route once response is received and is good
    this.router.navigate([`${this.responseLogin.url}`]);
    });
    
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginForm.value);
  }


}
