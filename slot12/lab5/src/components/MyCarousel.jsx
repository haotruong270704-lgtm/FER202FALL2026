import { Carousel, Container } from 'react-bootstrap';
import { banners } from '../data/banners';

export default function MyCarousel() {
  return (
    <Container className="mb-4">
      <Carousel interval={3000} controls indicators fade>
        {banners.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 rounded"
              src={item.image}
              alt={item.title}
              style={{ height: '350px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}