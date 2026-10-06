// src/components/TodoList.jsx
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const initialTodos = [
  { id: 1, text: 'Học React Hook useState', completed: true },
  { id: 2, text: 'Làm bài tập Todo List', completed: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: text.trim(), completed: false }]);
    setText('');
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: editText.trim() } : todo))
    );
    setEditingId(null);
  };

  return (
    <Card className="shadow-sm mx-auto my-4" style={{ maxWidth: '600px' }}>
      <Card.Header as="h5" className="bg-primary text-white d-flex justify-content-between align-items-center">
        <span>Bài 6: Todo List (Array State)</span>
        <Badge bg="light" text="dark">
          Chưa xong: {todos.filter((t) => !t.completed).length}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleAddTodo} className="d-flex gap-2 mb-3">
          <Form.Control
            type="text"
            placeholder="Nhập công việc mới..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="primary">Thêm</Button>
        </Form>

        <ListGroup variant="flush">
          {todos.map((todo) => (
            <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
              {editingId === todo.id ? (
                <div className="d-flex gap-2 w-100 me-2">
                  <Form.Control
                    size="sm"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(todo.id)}
                  />
                  <Button size="sm" variant="success" onClick={() => handleSaveEdit(todo.id)}>Lưu</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Hủy</Button>
                </div>
              ) : (
                <>
                  <Form.Check
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    label={<span className={todo.completed ? 'text-decoration-line-through text-muted' : ''}>{todo.text}</span>}
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <div>
                    <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleStartEdit(todo)}>Sửa</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(todo.id)}>Xóa</Button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default TodoList;