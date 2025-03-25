import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { LoginUser, Test } from '../Types/todo.type';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  isUserAuthenticated = false;

  // API request to login user...
  // http = inject(HttpClient);
      postLoginUser(e: any): Observable<any> {
        // const url = 'https://jsonplaceholder.typicode.com/todos';
        // const headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Content-Type', 'text/plain; charset=utf-8');
        // return this.http.get<Array<Todo>>(url);
        // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        // POST to '/api/user/' to log a user in. 
        return this.http.post<LoginUser>('/api/user/login', e);
        // .subscribe(e => {
        //   console.log('Message from the backend on LOGIN POST:', e);
        // }
      
      }


      postLogoutUser(){
        const message = {message: "trying to log the user out..."};
        let data = {};
        console.log("logout request posted ????");
        this.http.post<Test>('/api/user/logout', message).subscribe(message => {
          console.log('Updated config:', message);
          data = message;
        }

        )
        return data;
      };

      setUserAuthenticated(state: boolean){
        this.isUserAuthenticated = state;
      }

      isAuthenticated(): Observable<any>{
        console.log("message was sent hehehehehehe");
        const message = {message: "auth req was sent"};
        return this.http.post<Test>('/api/user/isGood',message);
      }

      
        

  
}
