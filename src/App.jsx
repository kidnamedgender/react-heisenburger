import * as React from 'react';
import Header from './components/Header';
import './scss/App.scss';
import Home from './pages/Home';
import CardPage from './pages/CardPage/CardPage';
import Cart from './pages/Cart';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="wrapper">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<CardPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
