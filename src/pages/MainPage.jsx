import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts, selectProducts, addToCart, removeFromCart, selectCart, login, selectUsers } from './reduxStore';

export function LoginComponent() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await axios.post('/api/login', { username, password });
    if (response.data.success) {
      dispatch(login(response.data.user));
    } else {
      console.log('Login failed.');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const products = useSelector(selectProducts);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.item_Id}>
            {product.item_Name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Home() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Products />
    </div>
  );
}

export function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + (cartItem.price * cartItem.amount);
    }, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((cartItem, index) => (
          <li key={index}>
            {cartItem.item_Name} - ${cartItem.price} x {cartItem.amount}
            <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Checkout</h2>
      <p>Total: ${calculateTotal().toFixed(2)}</p>
    </div>
  );
}