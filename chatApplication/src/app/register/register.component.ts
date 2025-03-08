import { Component, inject, OnInit, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerService = inject(RegisterService);

 
  // todoItems = signal<Array<Todo>>([]);

  userRegisterForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(),
    password: new FormControl(),
    country: new FormControl(),
    gender: new FormControl(),
    // be blank on register and user can fill in on profile page later...
    bio: new FormControl('')
  })

  //on form submit callback...
  onSubmit() {
    //Check database for users with same name or email...

    //POST data if information is good 
    this.registerService.postNewUser(this.userRegisterForm.value);
    
    // TODO: Use EventEmitter with form value
    console.warn(this.userRegisterForm.value);
  }




}
