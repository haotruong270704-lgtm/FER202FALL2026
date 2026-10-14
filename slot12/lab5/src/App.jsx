import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import MyCarousel from './components/MyCarousel';
import Home from './pages/home';
import About from './pages/About';
import News from './pages/News';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <h1 className="text-center my-3 fw-bold">Lab5</h1>
      <AppNavbar />
      <MyCarousel />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}