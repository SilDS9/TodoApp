import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../_models/todoitem';
import { TodoItemService } from '../_services/todo-item.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  todoItems$: Observable<TodoItem[]>;

  constructor(private todoService: TodoItemService) { }

  ngOnInit(): void {
    this.todoItems$ = this.todoService.getTodoItems();
  }

}
