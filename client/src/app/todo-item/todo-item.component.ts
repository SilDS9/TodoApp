import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoItem } from '../_models/todoitem';
import { TodoItemService } from '../_services/todo-item.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  todo$: Observable<TodoItem>;
  Id: number;
  todoUpdate: TodoItem = new TodoItem;
  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }


  constructor(private todoService: TodoItemService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    const idParam = 'id';
    if (this.activatedRoute.snapshot.params[idParam]) {
      this.Id = this.activatedRoute.snapshot.params[idParam];
      this.todoUpdate.Id = this.Id;
      this.todoUpdate.isComplete = false;
    }
  }

  ngOnInit(): void {
    this.todo$ = this.todoService.getTodoItem(this.Id);
  }

  updateItem() {
    console.log(this.todoUpdate.isComplete);
    this.todoService.updateTodoItem(this.todoUpdate).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
