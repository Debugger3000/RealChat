import { Component, inject, OnInit, signal } from '@angular/core';
import { type Todo } from '../../Types/todo.type';
import { ProfileService } from '../../services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  profileService = inject(ProfileService);
  todoItems = signal<Array<Todo>>([]);

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(),
    password: new FormControl(),

    // be blank on register and user can fill in on profile page later...
    bio: new FormControl('')
  });

  

  //on form submit callback...
  onSubmit() {
    //Check database for users with same name or email...

    //POST data if information is good 
    this.profileService.postNewUser(this.userForm.value);
    
    // TODO: Use EventEmitter with form value
    console.warn(this.userForm.value);
  }


  

  //run when component is initiated...
  ngOnInit(): void {
    // this.todoService.getToDoApi().pipe(catchError((err) => {
    //   console.log('Error Caught:',err);
    //   throw err;
    // }))
    // .subscribe((todos) => {
    //   this.todoItems.set(todos);
    // });
    console.log("Profile component has been loaded...")
  }

}
