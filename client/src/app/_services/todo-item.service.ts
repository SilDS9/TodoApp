import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../_models/todoitem';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  apiUrl: string = environment.apiUrl;
  todoItems: TodoItem[] = [];

  constructor(private http: HttpClient) { }

  // call the API endpoint [api/todoitems] to GET all the todo tasks
  getTodoItems() {
    if (this.todoItems.length > 0) return of(this.todoItems);
    return this.http.get<TodoItem[]>(this.apiUrl + 'todoitems/').pipe(
      map(todos => {
        this.todoItems = todos;
        return todos;
      })
    )
  }

  // call the API endpoint [api/todoitems/:id] to GET specified todo task
  getTodoItem(id: number) {
    const item = this.todoItems.find(x => x.id == id);
    if (item !== undefined) return of(item);
    return this.http.get<TodoItem>(this.apiUrl + 'todoitems/' + id);
  }

  //call the API endpoint [api/todoitems/:id] to PUT (update) the specified todo task
  updateTodoItem(todo: TodoItem) {
    return this.http.put(this.apiUrl + 'todoitems/' + todo.id, todo)
      .pipe(
        map(() => {
          const id = this.todoItems.indexOf(todo);
          this.todoItems[id] = todo;
        })
      );
  }

  //call the API endpoint [api/todoitems] to POST (add) a new todo task
  addTodoItem(todo: TodoItem) {
    return this.http.post(this.apiUrl + 'todoitems/', todo).pipe(
      retry(1)
    )
  }

  //call the API endpoint [api/todoitems/:id] to DELETE a todo task
  removeTodoItem(id: number) {
    console.log(id);
    return this.http.delete(this.apiUrl + 'todoitems/' + id);
  }
}
