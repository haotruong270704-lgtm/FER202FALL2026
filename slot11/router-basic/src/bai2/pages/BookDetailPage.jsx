import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Alert, Badge } from 'react-bootstrap';
import { findBookById } from '../data/books';

export const BookDetailPage = () => {
  const { id } = useParams();
  const book = findBookById(id);
  const [borrowed, setBorrowed] = useState(false);

  if (!book) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Không tìm thấy sách có mã ID: {id}</Alert>
        <Button as={Link} to="/books" variant="secondary">
          Quay lại danh sách sách
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {borrowed && (
        <Alert variant="success" dismissible onClose={() => setBorrowed(false)}>
          Chúc mừng! Bạn đã yêu cầu mượn thành công cuốn <strong>{book.title}</strong>.
        </Alert>
      )}

      <Card style={{ maxWidth: '700px' }} className="shadow-sm mx-auto">
        <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
          <h5 className="mb-0">Thông tin chi tiết sách</h5>
          <Badge bg={book.status === 'Sẵn có' ? 'success' : 'warning'}>
            {book.status}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Card.Title className="h3 mb-3">{book.title}</Card.Title>
          <Card.Text><strong>Tác giả:</strong> {book.author}</Card.Text>
          <Card.Text><strong>Thể loại:</strong> {book.category}</Card.Text>
          <Card.Text><strong>Nhà xuất bản:</strong> {book.publisher} ({book.year})</Card.Text>
          <Card.Text><strong>Mô tả nội dung:</strong> {book.description}</Card.Text>

          <div className="d-flex gap-2 mt-4">
            <Button as={Link} to="/books" variant="outline-secondary">
              ← Quay lại thư viện
            </Button>
            <Button
              variant="primary"
              disabled={book.status !== 'Sẵn có' || borrowed}
              onClick={() => setBorrowed(true)}
            >
              {borrowed ? 'Đã gởi yêu cầu' : 'Mượn sách này'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};