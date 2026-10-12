import { Routes, Route } from 'react-router-dom';
import AppNavbar from './bai1/components/AppNavbar';
import HomePage from './bai1/pages/HomePage';
import SkillsPage from './bai1/pages/SkillsPage';
import ProjectsPage from './bai1/pages/ProjectsPage';
import ContactPage from './bai1/pages/ContactPage';
import NotFoundPage from './bai1/pages/NotFoundPage';
import Bai2 from './bai2/Bai2';
import Bai3 from './bai3/Bai3';
import Bai4 from './bai4/Bai4';
import Bai5 from './bai5/Bai5';
import { AuthProvider } from './bai5/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Route Bài 2 - Thư viện */}
        <Route path="/books/*" element={<Bai2 />} />

        {/* Route Bài 3 - Môn học */}
        <Route path="/courses/*" element={<Bai3 />} />

        {/* Route Bài 4 - Đăng ký sự kiện */}
        <Route path="/events/*" element={<Bai4 />} />

        {/* Route Bài 5 - Đăng nhập & Trang cá nhân */}
        <Route path="/*" element={<Bai5 />} />

        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}