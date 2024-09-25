import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from '../actions/counter.actions';
import { initialState } from '../states/counter';

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, { payload }) => state + payload),
  on(decrement, (state, { payload }) => state - payload),
  on(reset, (state) => 0)
);
