import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { userDataArray } from '../Types/user';
import { friend} from '../Types/user';




@Injectable({
    providedIn: 'root'
  })
  export class FriendsService {
    constructor(private http: HttpClient) { } 
   
    getFriends(){
      return this.http.get<friend>("/api/user/friend/getList" ,{});
    }



    sendFriendRequest(username : string){
      return this.http.post(`/api/user/friend/request/${username}`, {});
    }


    getFriendRequest(){
      return this.http.get<userDataArray>("/api/user/friend/request");
    }


    declineFriendRequest(id : string){
      // return this.http.post(`/api/user/friend/reject`, {});
      return this.http.post(`/api/user/friend/reject/${id}`, {});
    }

    acceptFriendRequest(id: string){
      return this.http.post(`/api/user/friend/accept/${id}`, {})
    }



}