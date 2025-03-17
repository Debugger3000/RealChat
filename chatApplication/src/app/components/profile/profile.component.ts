import { Component, inject, OnInit, signal } from '@angular/core';
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
  // todoItems = signal<Array<Todo>>([]);

  editing = false; //if the user is in the edit(form) view - by default it's not in edit, so false

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(),
    password: new FormControl(),

    // be blank on register and user can fill in on profile page later...
    bio: new FormControl('')
  }); //will want to have the gender and country (note that those are optional fields)

  edit(){//edit button
    this.editing = true;//this will toggle the edit view
  }

  cancelEditing(){
    this.editing = false;//switch back to default/non edit view
    //may want to add a form rest/clearing
  }

  //on form submit callback...
  onSubmit() {
    //Check database for users with same name or email...

    //POST data if information is good 
    this.profileService.postNewUser(this.userForm.value);
    
    // TODO: Use EventEmitter with form value
    console.warn(this.userForm.value);

    this.editing = false;//switch back to default/non edit view
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

/* based on the ngOnInit above - just a concept for the profile editing/handling that should be reviewed/replaced
ngOnInit(): void {
  //this.todoService.getToDoApi().pipe(catchError((err) => {
    //   console.log('Error Caught:',err);
    //   throw err;
    // }))
    // .subscribe((todos) => {
    //   this.todoItems.set(todos);
    // });
 
  this.userForm.setValue({ //will need to finished with todos
    username: todos.username,
    bio: todos.bio,
    email: todos.email,
    //password - not an editable field in profile but can add it needed
    age: todos.age,
    //__v 

    country: todos.country,
    gender: todos.gender

    //bio, gender, country should be optional fields
  })
  console.log("Profile component has been loaded...")
}
  */

}
