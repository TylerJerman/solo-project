import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls

function Checkout() {
  const [cartItems, setCartItems] = useState([]); // Store cart items

  useEffect(() => {
    // Fetch cart items from the backend
    async function fetchCartItems() {
      try {
        const response = await axios.get('/api/cart'); // Replace this with your actual API endpoint
        setCartItems(response.data); // Update the cart items in the state
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }

    fetchCartItems();
  }, []);

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through each cart item and display its details */}
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total</td>
            <td>${calculateTotal().toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      {/* Additional Checkout Forms */}
      <div>
        <h3>Shipping Address</h3>
        {/* Replace these with your actual form components */}
        <input placeholder="Street Address" />
        <input placeholder="City" />
        <input placeholder="State" />
        <input placeholder="Zip Code" />
      </div>
      <div>
        <h3>Payment Details</h3>
        {/* Replace these with your actual form components */}
        <input placeholder="Card Number" />
        <input placeholder="Expiry Date" />
        <input placeholder="CVV" />
      </div>
      <button onClick={() => {/* Implement your checkout logic here */}}>
        Complete Checkout
      </button>
    </div>
  );
}

export default Checkout;