import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatRoomMessage, Message } from '../Types/message';
import { Observable } from 'rxjs';
import { messageRequest } from '../Types/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  

  // HTTP post new message...
  sendMessage(message: messageRequest) {
    return this.http.post<messageRequest>(`https://app.tysonk.com/api/message/new`,message,{withCredentials:true});
  }

  // GET messages for a chatroom
  getMessages(id: string) {
    return this.http.get<ChatRoomMessage>(`https://app.tysonk.com/api/message/${id}`,{withCredentials:true});
  }


  clearNotifications(id : string, chatRoomId : string){
    return this.http.post(`https://app.tysonk.com/api/message/notif/remove/${id}`, { chatRoomId },{withCredentials:true});
    
  }

}
