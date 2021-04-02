import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../_models/todoitem';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  apiUrl: string = environment.apiUrl;
  todoItems: TodoItem[] = [];

  constructor(private http: HttpClient) { }

  getTodoItems() {
    if (this.todoItems.length > 0) return of(this.todoItems);
    return this.http.get<TodoItem[]>(this.apiUrl + '/todoitems').pipe(
      map(todos => {
        this.todoItems = todos;
        return todos;
      })
    )
  }
}
