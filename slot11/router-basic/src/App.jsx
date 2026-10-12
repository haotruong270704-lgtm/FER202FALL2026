// src/App.jsx
import { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';

import Bai1 from './bai1/Bai1';
import Bai2 from './bai2/Bai2';
import Bai3 from './bai3/Bai3';
import Bai4 from './bai4/Bai4';
import Bai5 from './bai5/Bai5';

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
            <Nav.Item><Nav.Link eventKey="bai2">Bài 2 (Thư viện FPT)</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="bai3">Bài 3 (Môn học)</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="bai4">Bài 4 (Đăng ký sự kiện)</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="bai5">Bài 5 (Danh bạ SV)</Nav.Link></Nav.Item>
          </Nav>
        </Container>
      </div>

      {activeTab === 'bai1' && <Bai1 />}
      {activeTab === 'bai2' && <Bai2 />}
      {activeTab === 'bai3' && <Bai3 />}
      {activeTab === 'bai4' && <Bai4 />}
      {activeTab === 'bai5' && <Bai5 />}
    </div>
  );
}