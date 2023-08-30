import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Checkout, LoginComponent, Products } from './pages/MainPage.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './pages/reduxStore.jsx';

function App() {
    const isLoggedIn = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false); // New state for the login

    const handleSuccessfulLogin = (user) => {
        dispatch(login(user));
    };

    return (
        <BrowserRouter>
            <ol>
                <button><Link to="/">Home</Link></button>
                <button><Link to="/products">Products</Link></button>
                <button><Link to="/checkout">Checkout</Link></button>
                <button><Link to="/login">Log In</Link></button>
                {!isLoggedIn && <button onClick={() => setShowLogin(true)}>Login</button>}
            </ol>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<LoginComponent />} /> 
                <Route path="/products" element={<Products />} />
            </Routes>
            {showLogin && <LoginComponent onClose={() => setShowLogin(false)} onSuccessfulLogin={handleSuccessfulLogin} />} {/* TODO: Update as per your login component's API */}
        </BrowserRouter>
    );
}

export default App;