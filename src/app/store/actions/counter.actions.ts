import { createAction, props } from '@ngrx/store';

export const increment = createAction(
  '[Counter Component] Increment',
  // Action now accepts a custom 'value' payload
  props<{ payload: number }>()
);

export const decrement = createAction(
  '[Counter Component] Decrement',
  // Action now accepts a custom 'value' payload
  props<{ payload: number }>()
);

export const reset = createAction('[Counter Component] Reset');
