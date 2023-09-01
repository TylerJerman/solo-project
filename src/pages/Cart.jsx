import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error("There was an issue fetching the cart data:", error);
      }
    }

    fetchCartItems();
  }, []);

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      const confirmDelete = window.confirm("Do you want to delete this product?");
      if (confirmDelete) {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
        return;
      } else {
        return;
      }
    }

    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const handleIncrement = (item) => {
    const updatedItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const handleDelete = (item) => {
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