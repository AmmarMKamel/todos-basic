import { createReducer, on } from '@ngrx/store';

import { TodosActions } from './todos.actions';

import { ITodo } from '../todos.model';

export const initialState: ReadonlyArray<ITodo> = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos') || '[]')
  : [];

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.addTodo, (state, { todoText }) => {
    const newTodo: ITodo = {
      id: state.length + 1,
      text: todoText,
      done: false,
    };
    const newState = [...state, newTodo];
    localStorage.setItem('todos', JSON.stringify(newState));
    return newState;
  }),
  on(TodosActions.removeTodo, (state, { todoId }) => {
    const newState = state.filter((todo) => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(newState));
    return newState;
  }),
  on(TodosActions.completeTodo, (state, { todoId }) => {
    const newState = state.map((todo) =>
      todo.id === todoId ? { ...todo, done: true } : todo
    );
    localStorage.setItem('todos', JSON.stringify(newState));
    return newState;
  })
);
