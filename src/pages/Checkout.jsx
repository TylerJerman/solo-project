import React, { useState } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  let {response} = axios.get(`/api/cart/${1}`)
  console.log(response)

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
      <div>
        <h3>Shipping Address</h3>
        <input placeholder="Street Address" />
        <input placeholder="City" />
        <input placeholder="State" />
        <input placeholder="Zip Code" />
      </div>
      <div>
        <h3>Payment Details</h3>
        <input placeholder="Card Number" />
        <input placeholder="Expiry Date" />
        <input placeholder="CVV" />
      </div>
      <button onClick={() => {}}>
        Complete Checkout
      </button>
    </div>
  );
}

export default Checkout;