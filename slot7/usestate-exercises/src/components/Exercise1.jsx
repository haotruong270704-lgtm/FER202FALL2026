import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function Exercise1() {
  const [count, setCount] = useState(0);

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 1: Counter (Tăng - Giảm - Reset)</h3>
      <div className="mb-3">
        <ButtonGroup>
          <Button 
            variant="danger" 
            onClick={() => setCount(prev => prev - 1)}
            className="px-3"
          >
            Decrement
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setCount(0)}
            className="px-3"
          >
            Reset
          </Button>
          <Button 
            variant="success" 
            onClick={() => setCount(prev => prev + 1)}
            className="px-3"
          >
            Increment
          </Button>
        </ButtonGroup>
      </div>
      <h1 className="display-4 fw-normal">Count: {count}</h1>
    </div>
  );
}

export default Exercise1;