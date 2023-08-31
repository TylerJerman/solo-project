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

  const addToCart = async (item_Id) => {
    console.log(item_Id)
    let details = {userId: 1, productId: item_Id}
    let {response} = await axios.post('/api/cart', details)
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.item_Id}>
            {product.item_Name} - ${product.price}
            <button onClick={() => addToCart(product.item_Id)}>add to cart</button>
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
      <h1>Welcome to the Shop</h1>
      <Products />
    </div>
  );
}

let cartItems = []


export function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [myCart, setMyCart] = useState([])
  let price = 0
  const [finalPrice, setFinalPrice] = useState(0)

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, cartItem) => {
      return acc + (cartItem.price * cartItem.amount);
    }, 0);
  };

  const getCart = async () => {
    let cart = []
    await axios.post(`/api/cart/${1}`).then(response => {
      cartItems = response.data
    })
    console.log(cartItems)
    
    for (let i = 0; i < cartItems.length; i++) {
      const id = {id: cartItems[i].product_Id}
      console.log(id)
      await axios.post(`/api/cart/items`, id ).then(response => {
        cart.push(response.data)
        price += Number(response.data.price)

        setFinalPrice(price.toFixed(2))
      })
    }
    console.log(cart)

    setMyCart(cart)
    console.log(myCart)
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={getCart}>show cart items</button>
      { myCart.length > 1 &&
        <ul>
          {myCart.map((item) => (
            <li>
            {item.item_Name} - ${item.price}
            </li>
          ))}
        </ul>
      }
      <h2>Checkout</h2>
      { finalPrice > 0 &&
        <p>Total: ${finalPrice}</p>
      }
    </div>
  );
}