import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Checkout, Products } from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const isLoggedIn = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(true); // New state for the login

  return (
    <BrowserRouter>
      <ol>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/checkout">Checkout</Link></button>
        {!isLoggedIn && <button onClick={() => setShowLogin(true)}>Login</button>}
      </ol>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      {showLogin && (
        <div>
          <Login />
          <button onClick={() => setShowLogin(false)}>Close Login</button>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;