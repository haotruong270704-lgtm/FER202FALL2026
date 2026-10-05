import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';

const initialTodos = [
  { id: 1, text: 'Học React Hook useState', completed: true },
  { id: 2, text: 'Làm bài tập Slot 9', completed: false },
  { id: 3, text: 'Commit code lên GitHub', completed: false },
];

const TodoFilterList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), completed: false },
    ]);
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

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Derived State: Lọc danh sách theo filter hiện tại
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 550 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Quản lý công việc</h4>
        <Badge bg="primary">{activeCount} việc cần làm</Badge>
      </div>

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

      {/* Bộ lọc Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <ButtonGroup size="sm">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline-secondary'}
            onClick={() => setFilter('all')}
          >
            Tất cả ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'outline-secondary'}
            onClick={() => setFilter('active')}
          >
            Đang làm ({activeCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline-secondary'}
            onClick={() => setFilter('completed')}
          >
            Đã xong ({completedCount})
          </Button>
        </ButtonGroup>

        {completedCount > 0 && (
          <Button variant="outline-danger" size="sm" onClick={clearCompleted}>
            Xóa việc đã xong
          </Button>
        )}
      </div>

      {/* Danh sách */}
      <ListGroup variant="flush">
        {filteredTodos.length === 0 ? (
          <ListGroup.Item className="text-center text-muted py-3">
            Không có công việc nào
          </ListGroup.Item>
        ) : (
          filteredTodos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              className="d-flex align-items-center justify-content-between gap-2"
            >
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                label={
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#6c757d' : 'inherit',
                    }}
                  >
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
          ))
        )}
      </ListGroup>
    </div>
  );
};

export default TodoFilterList;