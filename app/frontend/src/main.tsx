import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StrictMode } from 'react';
import './styles/main.scss';
import '../public/css/app.css';
import {
  HashRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>
  </StrictMode>
)
