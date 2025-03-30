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
    return this.http.post<messageRequest>(`/api/message/new`,message);
  }

  // GET messages for a chatroom
  getMessages(id: string) {
    return this.http.get<ChatRoomMessage>(`/api/message/${id}`);
  }


  clearNotifications(id : string, chatRoomId : string){
    return this.http.post(`/api/message/notif/remove/${id}`, { chatRoomId });
    
  }

}
