import { Routes, Route } from 'react-router-dom';
import { EventListPage } from './pages/EventListPage';
import { EventRegisterPage } from './pages/EventRegisterPage';
import { EventConfirmationPage } from './pages/EventConfirmationPage';

export default function Bai4() {
  return (
    <Routes>
      <Route path="/" element={<EventListPage />} />
      <Route path="register" element={<EventRegisterPage />} />
      <Route path="confirmation" element={<EventConfirmationPage />} />
    </Routes>
  );
}