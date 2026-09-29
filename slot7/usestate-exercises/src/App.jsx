import React from 'react';
import { Container } from 'react-bootstrap';

// 7 Bài tập Exercise 12
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';
import Exercise4 from './components/Exercise4';
import Exercise5 from './components/Exercise5';
import Exercise6 from './components/Exercise6';
import Exercise7 from './components/Exercise7';

// 5 Bài tập Advanced usestate_Exercises_2
import FaqAccordion from './usestate/FaqAccordion';
import ReviewForm from './usestate/ReviewForm';
import BmiCalculator from './usestate/BmiCalculator';
import StudentManager from './usestate/StudentManager';
import QuizApp from './usestate/QuizApp';

function App() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container style={{ maxWidth: '900px' }}>
        <h1 className="text-center text-primary mb-5 fw-bold">
          SLOT 7: HOÀN THÀNH TẤT CẢ BÀI TẬP USESTATE
        </h1>
        
        {/* Khối 5 bài tập Advanced */}
        <h2 className="mb-4 text-secondary border-bottom pb-2">PHẦN 1: BÀI TẬP NÂNG CAO (src/usestate)</h2>
        <FaqAccordion />
        <ReviewForm />
        <BmiCalculator />
        <StudentManager />
        <QuizApp />

        {/* Khối 7 bài tập cũ */}
        <h2 className="my-5 text-secondary border-bottom pb-2">PHẦN 2: BÀI TẬP CƠ BẢN (src/components)</h2>
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
        <Exercise4 />
        <Exercise5 />
        <Exercise6 />
        <Exercise7 />
      </Container>
    </div>
  );
}

export default App;