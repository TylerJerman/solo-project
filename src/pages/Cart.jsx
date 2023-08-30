import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]); // Store cart items

  useEffect(() => {
    // Simulating fetching data from backend.
    // Replace this with your actual API call.
    async function fetchCartItems() {
      try {
        const response = await axios.get('/api/cart'); // Fetch cart items from your API
        setCartItems(response.data); // Set the cart items to state
      } catch (error) {
        console.error("There was an issue fetching the cart data:", error);
      }
    }

    fetchCartItems();
  }, []); // Empty dependency array ensures it runs only once after component mount

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      const confirmDelete = window.confirm("Do you want to delete this product?");
      if (confirmDelete) {
        // Delete item logic here
        // e.g., remove item from cart in backend, and then filter it out in the frontend
        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
        return;
      } else {
        // Set item quantity to 1 or just return
        return;
      }
    }

    // Otherwise, just decrement the item quantity
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const handleIncrement = (item) => {
    // Increase the item quantity here
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const handleDelete = (item) => {
    // Delete item logic here
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.productName} - Quantity: {item.quantity}</p>
          <button onClick={() => handleDecrement(item)}>Decrease</button>
          <button onClick={() => handleIncrement(item)}>Increase</button>
          <button onClick={() => handleDelete(item)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;