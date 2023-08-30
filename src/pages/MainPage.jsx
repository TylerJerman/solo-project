// Importing necessary modules and functions
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';

// Import Redux actions and selectors
import { setProducts, selectProducts, setUsers, selectUsers, setCart, selectCart, login, addToCart, removeFromCart } from './reduxStore.jsx';

// LoginComponent for handling user login
export function LoginComponent() {
  // Local state management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(''); // For displaying login status messages
  
  const dispatch = useDispatch(); // Hook for dispatching Redux actions

  // Handles user login
  const handleLogin = async () => {
    // Hashing the user password
    const hashedPassword = bcrypt.hashSync(password, 10); 

    try {
      // Making POST request to server to login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: hashedPassword })
      });

      const data = await response.json();
      
      // Dispatching login action if successful
      if (data.success) {
        dispatch(login(data.user));
        setFeedback('Logged in successfully!');
      } else {
        setFeedback('Failed to login.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setFeedback('An error occurred during login.');
    }
  };
  
  return (
    <div>
      {/* Display login feedback if any */}
      {feedback && <div>{feedback}</div>}
      {/* Input fields for username and password */}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// Displays a list of products
export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts); // Fetch products from Redux state
  
  useEffect(() => {
    // Fetch products from API when component mounts
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((error) => console.log("Error fetching products:", error));
  }, [dispatch]);

  return (
    <div>
      <h1>Product List</h1>
      {/* Mapping through products to display */}
      <ul>
        {products.map((product) => (
          <li key={product.item_Id}>
            {product.item_Name} - ${product.Price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Home page
export function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const users = useSelector(selectUsers);
  const cart = useSelector(selectCart);
  
  // Function to handle adding products to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Function to handle removing products from cart
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div>
      <h1>Welcome to Gumbo Shop</h1>
      {/* Product listing */}
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.item_Id}>
            {product.item_Name} - ${product.Price}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      
      {/* User listing */}
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.user_Id}>
            {user.first_Name} {user.last_Name}
          </li>
        ))}
      </ul>

      {/* Cart listing for User 1 */}
      <h2>Cart for User 1</h2>
      <ul>
        {cart.map(cartItem => (
          <li key={cartItem.cart_Id}>
            Product ID: {cartItem.product_Id} | Amount: {cartItem.amount}
            <button onClick={() => handleRemoveFromCart(cartItem)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Checkout component
export function Checkout() {
  const cart = useSelector(selectCart);
  
  // Function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + (cartItem.price * cartItem.amount);
    }, 0);
  };

  return (
    <div>
      <h2>Checkout</h2>
      {/* Cart listing for checkout */}
      <ul>
        {cart.map(cartItem => (
          <li key={cartItem.cart_Id}>
            Product ID: {cartItem.product_Id} | Amount: {cartItem.amount} | Price: {cartItem.price}
          </li>
        ))}
      </ul>
      {/* Total cost calculation */}
      <strong>Total: ${calculateTotal()}</strong>
    </div>
  );
}