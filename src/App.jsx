import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Checkout, Products } from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const isLoggedIn = useSelector((state) => state.user);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <BrowserRouter>
      <ol>
        <button><Link to="/"><img src="https://cdn-icons-png.flaticon.com/128/2550/2550264.png"></img></Link></button>
        <button><Link to="/checkout"><img src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png"></img></Link></button>
        {!isLoggedIn && <button onClick={() => setShowLogin(true)}>Login</button>}
      </ol>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      
      <Login/>
      

      {/* {showLogin && (
        <div>
          <Login />
          <button onClick={() => setShowLogin(false)}>Close Login</button>
        </div>
      )}
      { !showLogin &&
        <button onClick={() => setShowLogin(true)}>Open Log In</button>
      } */}
    </BrowserRouter>
  );
}

export default App;