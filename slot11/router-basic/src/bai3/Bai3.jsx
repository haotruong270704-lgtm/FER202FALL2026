import { Routes, Route } from 'react-router-dom';
import { CourseListPage } from './pages/CourseListPage';
import { CourseDetailPage } from './pages/CourseDetailPage';

export default function Bai3() {
  return (
    <Routes>
      <Route path="/" element={<CourseListPage />} />
      <Route path=":code" element={<CourseDetailPage />} />
    </Routes>
  );
}