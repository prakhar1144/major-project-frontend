import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SmartContractProvider from './Context/SmartContract';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SmartContractProvider>
        <App />
      </SmartContractProvider>
    </BrowserRouter>
  </React.StrictMode>
);
