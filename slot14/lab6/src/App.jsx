import { Container, Row, Col } from 'react-bootstrap';
import PostListCard from './components/http/PostListCard';
import CreatePostCard from './components/http/CreatePostCard';
import UpdatePostCard from './components/http/UpdatePostCard';
import PatchPostCard from './components/http/PatchPostCard';
import DeletePostCard from './components/http/DeletePostCard';
import RequestConfigCard from './components/http/RequestConfigCard';
import AxiosDemoCard from './components/http/AxiosDemoCard';

export default function App() {
  return (
    <Container className="py-4">
      <h1 className="text-center text-primary mb-4">Lab 6 - JSON Server & Axios Demo</h1>
      <Row xs={1} md={2} className="g-4">
        <Col><AxiosDemoCard /></Col>
        <Col><PostListCard /></Col>
        <Col><CreatePostCard /></Col>
        <Col><UpdatePostCard /></Col>
        <Col><PatchPostCard /></Col>
        <Col><DeletePostCard /></Col>
        <Col><RequestConfigCard /></Col>
      </Row>
    </Container>
  );
}