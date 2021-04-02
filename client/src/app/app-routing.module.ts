import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

const routes: Routes = [
  { path: '', component: TodoItemsComponent},
  { path: 'todos/:id', component: TodoItemComponent},
  { path: 'add', component: AddTodoComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
