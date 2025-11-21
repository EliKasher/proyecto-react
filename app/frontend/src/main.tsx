import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StrictMode } from 'react';
import './styles/main.scss';
import '../public/css/app.css';
import {
  HashRouter as Router,
} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
        <App />
    </Router>
  </StrictMode>
)
