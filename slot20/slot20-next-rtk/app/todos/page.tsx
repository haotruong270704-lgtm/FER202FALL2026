import type { Metadata } from 'next';
import TodoList from './TodoList';

export const metadata: Metadata = { title: 'Quản lý Todo' };

export default function TodosPage() {
  return (
    <main className="py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">📝 Quản lý công việc</h1>
      <TodoList />
    </main>
  );
}