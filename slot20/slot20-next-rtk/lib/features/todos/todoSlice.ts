import { createSelector, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

export type Filter = 'all' | 'active' | 'completed';

type TodoState = {
  items: Todo[];
  filter: Filter;
  search: string;
};

const initialState: TodoState = {
  items: [
    { id: '1', text: 'Học Next.js App Router', completed: true, createdAt: new Date().toISOString() },
    { id: '2', text: 'Thực hành Redux Toolkit (RTK)', completed: false, createdAt: new Date().toISOString() },
  ],
  filter: 'all',
  search: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload);
      },
      prepare(text: string) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    todoDeleted(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    completedCleared(state) {
      state.items = state.items.filter((t) => !t.completed);
    },
    filterChanged(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    searchChanged(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const {
  todoAdded,
  todoToggled,
  todoDeleted,
  completedCleared,
  filterChanged,
  searchChanged,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectSearch = (state: RootState) => state.todos.search;

// Selector tối ưu hiệu năng lọc danh sách bằng createSelector
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter, selectSearch],
  (todos, filter, search) => {
    const q = search.toLowerCase().trim();
    return todos.filter((t) => {
      const matchFilter =
        filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true;
      const matchSearch = q === '' || t.text.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }
);

export const selectTodoStats = createSelector([selectTodos], (todos) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  return { total, completed, active: total - completed };
});

export default todoSlice.reducer;