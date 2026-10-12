import { Container, ListGroup } from 'react-bootstrap';

export default function SkillsPage() {
  return (
    <Container className="py-4">
      <h2>Kỹ năng cá nhân</h2>
      <ListGroup className="mt-3">
        <ListGroup.Item>ReactJS & React Router</ListGroup.Item>
        <ListGroup.Item>HTML5, CSS3, JavaScript (ES6+)</ListGroup.Item>
        <ListGroup.Item>Bootstrap / React-Bootstrap</ListGroup.Item>
        <ListGroup.Item>Git & GitHub Workflow</ListGroup.Item>
      </ListGroup>
    </Container>
  );
}