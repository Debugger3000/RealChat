import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { LoginUser, Test } from '../Types/todo.type';
import { catchError, Observable, tap } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  webSocketService = inject(WebSocketService);

  isUserAuthenticated = false;

  // options = new Option({ headers: headers, withCredentials: true });

  // API request to login user...
  // http = inject(HttpClient);
      postLoginUser(e: any): Observable<any> {
        // const url = 'https://jsonplaceholder.typicode.com/todos';
        // const headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // headers.append('Content-Type', 'text/plain; charset=utf-8');
        // return this.http.get<Array<Todo>>(url);


        // const headers = new HttpHeaders({
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*',
        //   'Allow-Origin-With-Credentials': true,
        //   'Access-Control-Allow-Methods': 'POST',
        //   'Access-Control-Allow-Headers': 'Content-Type',});


        
  
  

        // POST to '/api/user/' to log a user in. 
        return this.http.post<LoginUser>(`https://realchatclient.onrender.com/api/user/login`, e, {withCredentials:true});
        // .subscribe(e => {
        //   console.log('Message from the backend on LOGIN POST:', e);
        // }
      
      }


      postLogoutUser(){
        const message = {message: "trying to log the user out..."};
        let data = {};
        console.log("logout request posted ????");
        this.http.post<Test>(`https://realchatclient.onrender.com/api/user/logout`, message, {withCredentials:true}).subscribe(message => {
          console.log('Updated config:', message);
          data = message;

          // call disconnect socket
          this.webSocketService.clientDisconnect();

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
        return this.http.post<Test>(`https://realchatclient.onrender.com/api/user/isGood`,message, {withCredentials:true});
      }

      
        

  
}
