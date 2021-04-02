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
  Id: number;
  todoUpdate: TodoItem;
  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }


  constructor(private todoService: TodoItemService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    const idParam = 'id';
    if (this.activatedRoute.snapshot.params[idParam]) {
      this.Id = this.activatedRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.todoService.getTodoItem(this.Id).subscribe(todo => {
      this.todoUpdate = todo;
    });
  }

  updateItem() {
    console.log(this.todoUpdate.id);
    this.todoService.updateTodoItem(this.todoUpdate).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
