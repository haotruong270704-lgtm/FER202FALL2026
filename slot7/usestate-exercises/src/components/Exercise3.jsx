import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Exercise3() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 3: Toggle Visibility</h3>
      <div className="mb-3">
        <Button 
          variant="light" 
          onClick={() => setIsVisible(!isVisible)}
          className="px-4"
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isVisible && <h1 className="display-4 fw-normal">Toggle me!</h1>}
    </div>
  );
}

export default Exercise3;