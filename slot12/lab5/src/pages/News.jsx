import { Container, Row, Col, Card } from 'react-bootstrap';

// Bỏ từ khóa "export" ở đây
const newLists = [
  { id: 1, title: 'Woman bakes expletive-laden pies to ‘get a rise’ out of her grandmother in annual tradition', description: '“What started as a means to get a rise out of my Grammy has snowballed into a weird family tradition,” wrote Jess Lydon.', images: '/images/event-1.jpg' },
  { id: 2, title: 'Martha Stewart shows off her 30 pies after canceled Thanksgiving dinner plans', description: 'Queen of Thanksgiving Martha Stewart may not be hosting a turkey dinner this year but fret not, she will still be celebrating with literally 30 pies.', images: '/images/event-2.jpg' },
  { id: 3, title: 'Burger King is testing a new breakfast sandwich', description: 'This is a win for the flatbread fans.', images: '/images/event-3.jpg' },
  { id: 4, title: 'Popeyes permanently adds chicken wings to its menu', description: 'And you can get ’em in five different flavors.', images: '/images/event-4.jpg' },
  { id: 5, title: 'Top salmon with a sizzling mix of aromatics and spices', description: 'Tadka is a ubiquitous South Asian technique that adds a dramatic last-minute coat of flavor.', images: '/images/event-5.jpg' },
  { id: 6, title: '80 Christmas dinner ideas for the ultimate holiday feast', description: 'Build the perfect Christmas menu with these delicious recipes.', images: '/images/event-6.jpg' },
  { id: 7, title: 'How to make the easiest prime rib roast for the holidays', description: 'Use these tips and tricks to make a juicy and amazingly delicious prime rib roast.', images: '/images/event-7.jpg' },
  { id: 8, title: 'Turn leftover turkey into a flavorful Waldorf salad', description: 'This light, bright turkey salad is the best post-Thanksgiving lunch.', images: '/images/event-8.jpg' },
];

export default function News() {
  return (
    <Container className="my-4">
      <h2 className="text-danger fw-bold mb-4">News Category</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {newLists.map((news) => (
          <Col key={news.id}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={news.images}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold">{news.title}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {news.description}
                </Card.Text>
                <a href={`#news-${news.id}`} className="text-primary text-decoration-underline small">
                  {news.title}
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}