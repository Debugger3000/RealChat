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

    // headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': 'https://realchatclient.onrender.com',
    //   'Access-Control-Allow-Methods': 'POST',
    //   'Access-Control-Allow-Headers': 'Content-Type',});
   
    getFriends(){
      return this.http.get<userDataArray>(`https://app.tysonk.com/api/friend/getList` ,{withCredentials:true});
    }

    sendFriendRequest(username : string){
      return this.http.post(`https://app.tysonk.com/api/friend/request/${username}`, {},{withCredentials:true});
    }

    getFriendRequest(){
      return this.http.get<userDataArray>(`https://app.tysonk.com/api/friend/request`,{withCredentials:true});
    }

    declineFriendRequest(id : string){
      // return this.http.post(`/api/user/friend/reject`, {});
      return this.http.post(`https://app.tysonk.com/api/friend/reject/${id}`, {},{withCredentials:true});
    }

    acceptFriendRequest(id: string){
      return this.http.post(`https://app.tysonk.com/api/friend/accept/${id}`, {},{withCredentials:true});
    }

    // Create chatroom
    createChatRoom(id1: string, id2: string) {
      console.log("Create chatroom for new friends REQ inside...");
      return this.http.post(`https://app.tysonk.com/api/chatroom/new`,{users: [id1,id2]},{withCredentials:true});
    }

    //set Chatroom by clicking on friend tab in friends list
    setChatRoom(id: string) {
      return this.http.get<{id: string}>(`https://app.tysonk.com/api/chatroom/${id}`,{withCredentials:true});
    }

    setCurChatId(id: string){
      this.curChatroomId = id;
    }

    removeFriendApi(id: string){
      return this.http.post(`https://app.tysonk.com/api/friend/remove/${id}`,{},{withCredentials:true});
    }

}