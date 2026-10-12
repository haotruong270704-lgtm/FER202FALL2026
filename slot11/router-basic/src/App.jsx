import { Routes, Route } from 'react-router-dom';
import AppNavbar from './bai1/components/AppNavbar';
import HomePage from './bai1/pages/HomePage';
import SkillsPage from './bai1/pages/SkillsPage';
import ProjectsPage from './bai1/pages/ProjectsPage';
import ContactPage from './bai1/pages/ContactPage';
import NotFoundPage from './bai1/pages/NotFoundPage';

export default function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}