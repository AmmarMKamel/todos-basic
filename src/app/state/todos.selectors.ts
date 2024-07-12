import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITodo } from '../todos.model';

export interface AppState {
  todos: ReadonlyArray<ITodo>;
}

export const selectTodosFeature = createFeatureSelector<
  AppState,
  ReadonlyArray<ITodo>
>('todos');

export const selectTodos = createSelector(
  selectTodosFeature,
  (todos) => todos || []
);

export const selectInProgressTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => !todo.done)
);

export const selectDoneTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.done)
);
