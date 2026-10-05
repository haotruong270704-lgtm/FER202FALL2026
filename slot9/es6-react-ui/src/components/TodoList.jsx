import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';

const initialTodos = [
  { id: 1, text: 'Học React Hook useState', completed: true },
  { id: 2, text: 'Làm bài tập Slot 9', completed: false },
  { id: 3, text: 'Commit code lên GitHub', completed: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 500 }}>
      <h4 className="mb-3">Danh sách công việc</h4>
      
      <Form onSubmit={addTodo} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Nhập công việc mới..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </InputGroup>
      </Form>

      <ListGroup variant="flush">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex align-items-center justify-content-between gap-2"
          >
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              label={
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
              }
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Xóa
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;