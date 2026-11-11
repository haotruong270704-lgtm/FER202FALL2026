import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import uiReducer from './features/ui/uiSlice';
import todoReducer from './features/todos/todoSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      ui: uiReducer,
      todos: todoReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];