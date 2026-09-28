import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Exercise1() {
  const [count, setCount] = useState(0);

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 1: Counter</h3>
      <div className="mb-3">
        <Button 
          variant="light" 
          onClick={() => setCount(prev => prev + 1)}
          className="px-4 py-2"
        >
          Increment
        </Button>
      </div>
      <h1 className="display-4 fw-normal">Count: {count}</h1>
    </div>
  );
}

export default Exercise1;