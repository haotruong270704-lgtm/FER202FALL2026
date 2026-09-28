import React, { useState } from 'react';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

function Exercise4() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học lập trình .NET' },
    { id: 2, text: 'Học lập trình Java' }
  ]);
  const [inputTask, setInputTask] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputTask.trim() }]);
    setInputTask('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="card bg-dark text-white p-4 mb-4">
      <h3 className="text-center mb-4">Bài 4: Todo List</h3>
      <div className="row g-4 align-items-start">
        {/* Khối nhập Todo bên trái */}
        <div className="col-12 col-md-6">
          <Form onSubmit={handleAddTodo} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Please input a Task"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
            <Button type="submit" variant="danger" className="text-nowrap">
              Add Todo
            </Button>
          </Form>
        </div>

        {/* Khối danh sách Todo bên phải */}
        <div className="col-12 col-md-6">
          <Card className="text-dark">
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Todo List</Card.Title>
              <ListGroup variant="flush">
                {todos.map(todo => (
                  <ListGroup.Item 
                    key={todo.id} 
                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-2"
                  >
                    <span className="fs-5">{todo.text}</span>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Exercise4;