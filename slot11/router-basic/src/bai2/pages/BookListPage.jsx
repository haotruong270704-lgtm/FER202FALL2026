import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { BOOKS, CATEGORIES } from '../data/books';

export const BookListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'Tất cả';
  const searchQuery = searchParams.get('q') || '';

  // Logic lọc sách theo danh mục và từ khóa
  const filteredBooks = BOOKS.filter((book) => {
    const matchCategory = selectedCategory === 'Tất cả' || book.category === selectedCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'Tất cả') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set('q', value);
    else params.delete('q');
    setSearchParams(params);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Thư viện Sách FPT</h2>

      {/* Thanh tìm kiếm & lọc danh mục */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col md={6} className="d-flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Danh sách sách */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Col key={book.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="info">{book.category}</Badge>
                    <Badge bg={book.status === 'Sẵn có' ? 'success' : 'warning'}>
                      {book.status}
                    </Badge>
                  </div>
                  <Card.Title className="h5">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Tác giả: {book.author}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary small flex-grow-1">
                    {book.description.substring(0, 80)}...
                  </Card.Text>
                  <Button as={Link} to={`/books/${book.id}`} variant="outline-primary" className="mt-2">
                    Xem chi tiết
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className="text-muted italic">Không tìm thấy sách phù hợp.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};