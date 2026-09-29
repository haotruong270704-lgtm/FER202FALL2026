import React, { useState } from 'react';
import { Card, Button, ListGroup, ProgressBar, Badge } from 'react-bootstrap';

const QUESTIONS = [
  { id: 'q1', text: 'Hook nào dùng để lưu trạng thái cục bộ?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
  { id: 'q2', text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?', options: ['1', '2', '3', '0'], answer: 0 },
  { id: 'q3', text: 'Cách đúng để thêm phần tử vào mảng state?', options: ['list.push(x)', 'setList(list.push(x))', 'setList([...list, x])', 'list[list.length] = x'], answer: 2 },
  { id: 'q4', text: 'Checkbox có điều khiển dùng prop nào?', options: ['value', 'checked', 'selected', 'defaultValue'], answer: 1 },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Quiz({ onRestart, attempt }) {
  const [questions] = useState(() => shuffle(QUESTIONS));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;

  const score = questions.filter((q) => answers[q.id] === q.answer).length;

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  if (finished) {
    return (
      <div>
        <h4 className="text-center text-success mb-3">
          Bạn đúng {score}/{questions.length} câu!
        </h4>
        <ListGroup className="mb-3">
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.answer;
            return (
              <ListGroup.Item key={q.id} className="py-3">
                <div className="fw-bold mb-1">
                  Câu {idx + 1}: {q.text}
                </div>
                <div>
                  Đáp án của bạn:{' '}
                  <Badge bg={isCorrect ? 'success' : 'danger'}>
                    {userAns !== undefined ? q.options[userAns] : 'Chưa trả lời'}
                  </Badge>
                </div>
                {!isCorrect && (
                  <div className="text-muted small">
                    Đáp án đúng: {q.options[q.answer]}
                  </div>
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Button variant="primary" className="w-100" onClick={onRestart}>
          Làm lại bài khác
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <span>Tiến độ: {answeredCount}/{questions.length}</span>
        <Badge bg="info">Lượt thứ {attempt}</Badge>
      </div>
      <ProgressBar now={(answeredCount / questions.length) * 100} className="mb-4" />

      <h5 className="mb-3">
        Câu {index + 1}: {current.text}
      </h5>

      <ListGroup className="mb-4">
        {current.options.map((opt, i) => (
          <ListGroup.Item
            key={i}
            action
            active={selected === i}
            onClick={() => handleSelect(i)}
            className="py-3"
          >
            {opt}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          ← Trước
        </Button>

        {index < questions.length - 1 ? (
          <Button
            variant="primary"
            disabled={selected === undefined}
            onClick={() => setIndex((i) => i + 1)}
          >
            Tiếp →
          </Button>
        ) : (
          <Button
            variant="success"
            disabled={answeredCount < questions.length}
            onClick={() => setFinished(true)}
          >
            Nộp bài
          </Button>
        )}
      </div>
    </div>
  );
}

function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <Card className="mb-4 shadow">
      <Card.Header as="h4" className="bg-dark text-white">
        Adv 5: Quiz Trắc Nghiệm Banyak Bước
      </Card.Header>
      <Card.Body>
        <Quiz key={attempt} attempt={attempt} onRestart={() => setAttempt((a) => a + 1)} />
      </Card.Body>
    </Card>
  );
}

export default QuizApp;