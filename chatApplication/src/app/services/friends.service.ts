import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { userDataArray } from '../Types/user';
import { friend} from '../Types/user';
import { environment } from '../../environments/environment';




@Injectable({
    providedIn: 'root'
  })
  export class FriendsService {
    constructor(private http: HttpClient) { } 

    curChatroomId: string = '';
    curChatFriend: {id:string,username:string} | null = null;
   
    getFriends(){
      return this.http.get<userDataArray>(`${environment.apiUrl}/api/friend/getList` ,{});
    }

    sendFriendRequest(username : string){
      return this.http.post(`${environment.apiUrl}/api/friend/request/${username}`, {});
    }

    getFriendRequest(){
      return this.http.get<userDataArray>(`${environment.apiUrl}/api/friend/request`);
    }

    declineFriendRequest(id : string){
      // return this.http.post(`/api/user/friend/reject`, {});
      return this.http.post(`${environment.apiUrl}/api/friend/reject/${id}`, {});
    }

    acceptFriendRequest(id: string){
      return this.http.post(`${environment.apiUrl}/api/friend/accept/${id}`, {});
    }

    // Create chatroom
    createChatRoom(id1: string, id2: string) {
      console.log("Create chatroom for new friends REQ inside...");
      return this.http.post(`${environment.apiUrl}/api/chatroom/new`,{users: [id1,id2]});
    }

    //set Chatroom by clicking on friend tab in friends list
    setChatRoom(id: string) {
      return this.http.get<{id: string}>(`${environment.apiUrl}/api/chatroom/${id}`);
    }

    setCurChatId(id: string){
      this.curChatroomId = id;
    }

    removeFriendApi(id: string){
      return this.http.post(`${environment.apiUrl}/api/friend/remove/${id}`,{});
    }

}