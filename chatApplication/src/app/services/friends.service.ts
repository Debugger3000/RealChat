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

    curChatroomId: string = '';
    curChatFriend: {id:string,username:string} | null = null;

    
   
    getFriends(){
      return this.http.get<userDataArray>(`https://realchatwebapp.onrender.com/api/friend/getList` ,{withCredentials:true});
    }

    sendFriendRequest(username : string){
      return this.http.post(`/api/friend/request/${username}`, {});
    }

    getFriendRequest(){
      return this.http.get<userDataArray>(`https://realchatwebapp.onrender.com/api/friend/request`,{withCredentials:true});
    }

    declineFriendRequest(id : string){
      // return this.http.post(`/api/user/friend/reject`, {});
      return this.http.post(`/api/friend/reject/${id}`, {});
    }

    acceptFriendRequest(id: string){
      return this.http.post(`/api/friend/accept/${id}`, {});
    }

    // Create chatroom
    createChatRoom(id1: string, id2: string) {
      console.log("Create chatroom for new friends REQ inside...");
      return this.http.post(`/api/chatroom/new`,{users: [id1,id2]});
    }

    //set Chatroom by clicking on friend tab in friends list
    setChatRoom(id: string) {
      return this.http.get<{id: string}>(`/api/chatroom/${id}`);
    }

    setCurChatId(id: string){
      this.curChatroomId = id;
    }

    removeFriendApi(id: string){
      return this.http.post(`/api/friend/remove/${id}`,{});
    }

}