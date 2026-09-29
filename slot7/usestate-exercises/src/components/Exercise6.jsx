import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

function Exercise6() {
  const [query, setQuery] = useState('');

  // Danh sách các mục tìm kiếm mẫu
  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Watermelon',
    'Strawberry',
  ];

  // Lọc danh sách thời gian thực theo từ khóa nhập vào (không phân biệt chữ hoa/thường)
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 6: Search Filter</h3>

      {/* Ô nhập từ khóa tìm kiếm */}
      <div className="d-flex justify-content-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: '350px' }}
        />
      </div>

      {/* Danh sách các mục đã lọc */}
      <div className="d-flex justify-content-center">
        <ListGroup style={{ width: '350px' }} className="text-start">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ListGroup.Item key={index} active={false}>
                {item}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-muted text-center">
              No items found
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default Exercise6;