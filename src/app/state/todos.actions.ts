import { createActionGroup, props } from '@ngrx/store';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Add Todo': props<{ todoText: string }>(),
    'Remove Todo': props<{ todoId: number }>(),
    'Complete Todo': props<{ todoId: number }>(),
  },
});
