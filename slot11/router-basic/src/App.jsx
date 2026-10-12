import { Routes, Route } from 'react-router-dom';
import AppNavbar from './bai1/components/AppNavbar';
import HomePage from './bai1/pages/HomePage';
import SkillsPage from './bai1/pages/SkillsPage';
import ProjectsPage from './bai1/pages/ProjectsPage';
import ContactPage from './bai1/pages/ContactPage';
import NotFoundPage from './bai1/pages/NotFoundPage';
import Bai3 from './bai3/Bai3';

export default function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Route kết nối Bài 3 */}
        <Route path="/courses/*" element={<Bai3 />} />

        {/* Route 404 đặt ở cuối */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}