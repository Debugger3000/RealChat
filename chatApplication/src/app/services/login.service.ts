import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUser } from '../Types/todo.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  // API request to login user...
  http = inject(HttpClient);
      postLoginUser(e: any) {
        // const url = 'https://jsonplaceholder.typicode.com/todos';
        
        // return this.http.get<Array<Todo>>(url);
  
        // POST to '/api/user/' to log a user in. 
        this.http.post<loginUser>('/api/user/', e).subscribe(e => {
          console.log('User created:', e);
        });
      }

  constructor() { }
}
