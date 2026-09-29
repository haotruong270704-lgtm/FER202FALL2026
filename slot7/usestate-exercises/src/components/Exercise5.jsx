import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function Exercise5() {
  const [color, setColor] = useState('');

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 5: Color Switcher</h3>
      
      {/* Dropdown danh sách chọn màu */}
      <div className="d-flex justify-content-center mb-3">
        <Form.Select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ maxWidth: '250px' }}
          className="fs-5"
        >
          <option value="">Select a color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </Form.Select>
      </div>

      {/* Thẻ div đổi màu nền khi chọn */}
      {color && (
        <div className="d-flex justify-content-center">
          <div
            style={{
              backgroundColor: color,
              width: '200px',
              height: '200px',
              transition: 'background-color 0.3s ease',
            }}
            className="rounded border border-light"
          ></div>
        </div>
      )}
    </div>
  );
}

export default Exercise5;