import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/todo.type';

@Injectable({
  providedIn: 'root'
})

// This service will perform API operations for user 
// GET - self (grab own user data, to display over the page...)
// POST - when a new user creates an account...
export class ProfileService {

  http = inject(HttpClient);
    postNewUser(e: any) {
      // const url = 'https://jsonplaceholder.typicode.com/todos';
      
      // return this.http.get<Array<Todo>>(url);

      this.http.post<User>('/api/user', e).subscribe(e => {
        console.log('User created:', e);
      });
    }
}
