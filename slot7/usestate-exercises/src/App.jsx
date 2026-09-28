import React from 'react';
import { Container } from 'react-bootstrap';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';
import Exercise4 from './components/Exercise4';

function App() {
  return (
    <div className="bg-secondary min-vh-100 py-5">
      <Container style={{ maxWidth: '900px' }}>
        <h1 className="text-center text-white mb-5 fw-bold">
          SLOT 7: USESTATE EXERCISES (1 - 4)
        </h1>
        <Exercise1 />
        <Exercise2 />
        <Exercise3 />
        <Exercise4 />
      </Container>
    </div>
  );
}

export default App;