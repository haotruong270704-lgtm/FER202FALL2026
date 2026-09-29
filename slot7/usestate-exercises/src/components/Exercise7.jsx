import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function Exercise7() {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);
  const [draggingItem, setDraggingItem] = useState(null);

  // 1. Bắt đầu kéo
  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  // 2. Kéo đè lên vị trí khác -> đổi vị trí bằng splice
  const handleDragOver = (e, index) => {
    e.preventDefault(); // Cần thiết để cho phép Drop
    if (draggingItem === null || draggingItem === index) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggingItem, 1);
    newItems.splice(index, 0, draggedItem);

    setDraggingItem(index);
    setItems(newItems);
  };

  // 3. Kết thúc kéo
  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div className="card bg-dark text-white p-4 mb-4 text-center">
      <h3 className="mb-3">Bài 7: Drag and Drop List</h3>
      <p className="text-secondary mb-3">Kéo và thả các mục để sắp xếp lại thứ tự</p>

      <div className="d-flex justify-content-center">
        <ListGroup style={{ width: '300px' }} className="text-start">
          {items.map((item, index) => (
            <ListGroup.Item
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="py-3 px-4 fw-semibold border-secondary"
              style={{
                cursor: 'grab',
                opacity: draggingItem === index ? 0.4 : 1,
                backgroundColor: draggingItem === index ? '#495057' : '',
                transition: 'opacity 0.2s ease',
              }}
            >
              • {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Exercise7;