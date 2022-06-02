import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/store/auth-context';
import { AlertContextProvider } from './components/store/alert-context';
import { CartContextProvider } from './components/store/cart-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <AlertContextProvider>
  <CartContextProvider>
    <BrowserRouter>
      <App />
      </BrowserRouter>
  </CartContextProvider>
  </AlertContextProvider>
  </AuthContextProvider>
);

