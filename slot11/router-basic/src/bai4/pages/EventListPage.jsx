import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EVENTS } from '../data/events';

export const EventListPage = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Sự kiện Sắp diễn ra</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {EVENTS.map((event) => (
          <Col key={event.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg="primary">{event.date}</Badge>
                </div>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  📍 {event.location}
                </Card.Subtitle>
                <Card.Text className="text-secondary small flex-grow-1">
                  {event.description}
                </Card.Text>
                <Card.Text className="small text-dark fw-bold">
                  Diễn giả: {event.speaker}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/events/register?eventId=${event.id}`}
                  variant="success"
                  className="mt-2"
                >
                  Đăng ký tham gia
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};