import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function Exercise2() {
  const [text, setText] = useState('');

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 2: Controlled Input Field</h3>
      <div className="d-flex justify-content-center mb-3">
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={{ maxWidth: '350px' }}
        />
      </div>
      <h2 className="fw-normal">Input text: {text}</h2>
    </div>
  );
}

export default Exercise2;