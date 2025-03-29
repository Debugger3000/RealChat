import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserRegister } from '../Types/todo.type';
import { userData } from '../Types/user';
import { type Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

// This service will perform API operations for user 
// GET - self (grab own user data, to display over the page...)
// POST - when a new user creates an account...
export class ProfileService {

  userData: string | undefined = undefined;

  // This code was a template for how to API request from front end....
  // -----
  http = inject(HttpClient);
    postNewUser(e: any) {
      // const url = 'https://jsonplaceholder.typicode.com/todos';
      
      // return this.http.get<Array<Todo>>(url);

      this.http.post<UserRegister>(`${environment.apiUrl}/api/user`, e).subscribe(e => {
        console.log('User created:', e);
      });
    }


    getMe() {
      console.log("Getting me data...");
      return this.http.get<userData>(`${environment.apiUrl}/api/user/me`);

    }

    setUserData(userData: string | undefined ) {
      this.userData = userData;
    }

}
