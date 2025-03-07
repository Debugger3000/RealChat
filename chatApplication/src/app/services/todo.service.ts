import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { type Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  http = inject(HttpClient);
  getToDoApi() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    
    return this.http.get<Array<Todo>>(url);
  }

}
