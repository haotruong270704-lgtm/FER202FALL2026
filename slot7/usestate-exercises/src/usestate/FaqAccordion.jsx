import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const faqs = [
  { id: 1, question: 'React là gì?', answer: 'Thư viện JavaScript để xây dựng giao diện người dùng theo component.' },
  { id: 2, question: 'State khác props thế nào?', answer: 'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.' },
  { id: 3, question: 'Vì sao phải dùng setState?', answer: 'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.' },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <Card className="mb-2 shadow-sm border-0">
      <Card.Header 
        role="button" 
        onClick={onToggle} 
        className="d-flex justify-content-between align-items-center bg-white border-0 fw-bold py-3"
      >
        <span>{question}</span>
        <span className="fs-5">{isOpen ? '−' : '+'}</span>
      </Card.Header>
      {isOpen && (
        <Card.Body className="pt-0 text-secondary">
          {answer}
        </Card.Body>
      )}
    </Card>
  );
}

function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [openIds, setOpenIds] = useState([]); // Dùng cho mode mở nhiều câu

  const handleToggle = (id) => {
    if (singleMode) {
      setOpenId((current) => (current === id ? null : id));
    } else {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    }
  };

  const handleSwitchMode = (checked) => {
    setSingleMode(checked);
    setOpenId(null);
    setOpenIds([]);
  };

  const handleCloseAll = () => {
    setOpenId(null);
    setOpenIds([]);
  };

  const isAnyOpen = singleMode ? openId !== null : openIds.length > 0;

  return (
    <Card className="mb-4 shadow">
      <Card.Header as="h4" className="bg-primary text-white">
        Adv 1: FAQ Accordion
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Check 
            type="switch"
            id="single-mode-switch"
            label="Chỉ mở một câu tại một thời điểm"
            checked={singleMode}
            onChange={(e) => handleSwitchMode(e.target.checked)}
          />
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={handleCloseAll} 
            disabled={!isAnyOpen}
          >
            Đóng tất cả
          </Button>
        </div>

        {faqs.map((faq) => {
          const isOpen = singleMode ? openId === faq.id : openIds.includes(faq.id);
          return (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={isOpen}
              onToggle={() => handleToggle(faq.id)}
            />
          );
        })}
      </Card.Body>
    </Card>
  );
}

export default FaqAccordion;