import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS[cite: 2]
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS cho Carousel/Dropdown
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);