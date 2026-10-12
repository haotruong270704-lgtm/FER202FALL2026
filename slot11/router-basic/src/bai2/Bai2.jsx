import { Routes, Route } from 'react-router-dom';
import { BookListPage } from './pages/BookListPage';
import { BookDetailPage } from './pages/BookDetailPage';

export default function Bai2() {
  return (
    <Routes>
      <Route path="/" element={<BookListPage />} />
      <Route path=":id" element={<BookDetailPage />} />
    </Routes>
  );
}