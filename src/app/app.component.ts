import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import {
  AppState,
  selectDoneTodos,
  selectInProgressTodos,
} from './state/todos.selectors';

import { ITodo } from './todos.model';
import { TodosActions } from './state/todos.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, AsyncPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  inProgressTodos$: Observable<ReadonlyArray<ITodo>>;
  doneTodos$: Observable<ReadonlyArray<ITodo>>;

  todoText: string = '';

  constructor(private store: Store<AppState>) {
    this.inProgressTodos$ = this.store.select(selectInProgressTodos);
    this.doneTodos$ = this.store.select(selectDoneTodos);
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.todoText.trim().length < 3) {
      return;
    }

    this.store.dispatch(TodosActions.addTodo({ todoText: this.todoText }));
    this.todoText = '';
    form.resetForm();
  }

  todoCompleteHandler(idx: number) {
    this.store.dispatch(TodosActions.completeTodo({ todoId: idx }));
  }

  todoDeleteHandler(idx: number) {
    this.store.dispatch(TodosActions.removeTodo({ todoId: idx }));
  }
}
