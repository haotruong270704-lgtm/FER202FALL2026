'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  completedCleared,
  filterChanged,
  searchChanged,
  selectFilter,
  selectFilteredTodos,
  selectSearch,
  selectTodoStats,
  todoAdded,
  todoDeleted,
  todoToggled,
  type Filter,
} from '@/lib/features/todos/todoSlice';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Đang làm' },
  { key: 'completed', label: 'Hoàn thành' },
];

export default function TodoList() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const filter = useAppSelector(selectFilter);
  const search = useAppSelector(selectSearch);
  const stats = useAppSelector(selectTodoStats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(todoAdded(text));
    setText('');
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Thêm công việc mới..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Thêm
        </button>
      </form>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(searchChanged(e.target.value))}
          placeholder="🔍 Tìm kiếm..."
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />

        <div className="flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => dispatch(filterChanged(f.key))}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                filter === f.key ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {todos.length === 0 ? (
        <p className="py-8 text-center text-gray-500">Không tìm thấy công việc nào.</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between py-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(todoToggled(todo.id))}
                  className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={todo.completed ? 'text-gray-400 line-through' : 'font-medium'}>
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => dispatch(todoDeleted(todo.id))}
                className="text-sm font-semibold text-red-500 hover:text-red-700"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-800">
        <span>
          Còn <strong>{stats.active}</strong> công việc ({stats.completed}/{stats.total} hoàn thành)
        </span>
        {stats.completed > 0 && (
          <button
            onClick={() => dispatch(completedCleared())}
            className="text-red-500 hover:underline"
          >
            Xóa việc đã xong
          </button>
        )}
      </div>
    </div>
  );
}