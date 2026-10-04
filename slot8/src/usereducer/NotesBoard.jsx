import { useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { undoable, createHistory } from './undoable';
import { notesReducer, initialNotes, COLORS } from './notesReducer';

const notesWithHistory = undoable(notesReducer);

export default function NotesBoard() {
  const [history, dispatch] = useReducer(notesWithHistory, initialNotes, createHistory);
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const { past, present, future } = history;

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', payload: { text, color } });
    setText('');
  };

  return (
    <div className="mb-5">
      <h5>Bài 5: Bảng Ghi chú (Undo/Redo)</h5>
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Form onSubmit={handleAdd} className="flex-grow-1">
          <InputGroup>
            <Form.Control placeholder="Nội dung ghi chú" value={text} onChange={(e) => setText(e.target.value)} />
            <Form.Select style={{ maxWidth: 120 }} value={color} onChange={(e) => setColor(e.target.value)}>
              {COLORS.map((c, i) => (
                <option key={c} value={c}>{`Màu ${i + 1}`}</option>
              ))}
            </Form.Select>
            <Button type="submit" disabled={!text.trim()}>Thêm</Button>
          </InputGroup>
        </Form>
        <ButtonGroup>
          <Button variant="outline-dark" disabled={past.length === 0} onClick={() => dispatch({ type: 'UNDO' })}>
            {`↶ Hoàn tác (${past.length})`}
          </Button>
          <Button variant="outline-dark" disabled={future.length === 0} onClick={() => dispatch({ type: 'REDO' })}>
            {`↷ Làm lại (${future.length})`}
          </Button>
        </ButtonGroup>
        <Button variant="outline-danger" onClick={() => dispatch({ type: 'CLEAR_ALL' })}>Xóa hết</Button>
      </div>

      <Row xs={1} md={3} className="g-3">
        {present.items.map(({ id, text: noteText, color: noteColor, pinned }) => (
          <Col key={id}>
            <Card style={{ background: noteColor }} className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Text className="flex-grow-1">{pinned && '📌 '}{noteText}</Card.Text>
                <div className="d-flex gap-1 align-items-center">
                  <Button size="sm" variant="link" className="p-0 text-dark" onClick={() => dispatch({ type: 'TOGGLE_PIN', payload: id })}>
                    {pinned ? 'Bỏ ghim' : 'Ghim'}
                  </Button>
                  <Button size="sm" variant="link" className="text-danger p-0 ms-auto" onClick={() => dispatch({ type: 'DELETE', payload: id })}>
                    Xóa
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}