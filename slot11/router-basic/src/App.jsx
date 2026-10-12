// src/App.jsx
import { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';

import Bai1 from './bai1/Bai1';


export default function App() {
  const [activeTab, setActiveTab] = useState('bai1');

  return (
    <div>
      <div className="bg-light border-bottom py-2 mb-3">
        <Container>
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
            className="justify-content-center gap-2"
          >
            <Nav.Item><Nav.Link eventKey="bai1">Bài 1 (Portfolio)</Nav.Link></Nav.Item>
            
          </Nav>
        </Container>
      </div>

      {activeTab === 'bai1' && <Bai1 />}
      
    </div>
  );
}