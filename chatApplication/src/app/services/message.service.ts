import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../Types/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  // HTTP post new message...
  sendMessage(message: any) {
    return this.http.post<Message>('api/message/new',message);
  }




}
