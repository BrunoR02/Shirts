import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/store/auth-context';
import { CartContextProvider } from './components/store/cart-context';
import { Provider } from 'react-redux';
import store from './components/store/alert-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <CartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </Provider>
  </AuthContextProvider>
);

