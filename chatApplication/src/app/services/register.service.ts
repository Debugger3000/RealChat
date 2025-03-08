import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserRegister } from '../Types/todo.type';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  // HTTP client to create requests to server....
  http = inject(HttpClient);
    postNewUser(e: any) {
      // const url = 'https://jsonplaceholder.typicode.com/todos';
      
      // return this.http.get<Array<Todo>>(url);

      // POST to '/api/user/new' to create a new user in database
      this.http.post<UserRegister>('/api/user/new', e).subscribe(e => {
        console.log('User created:', e);
      });
    }





  constructor() { }
}
