// Import packages
import express from 'express';
import { User, Item, Cart } from './server/model.js';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import ViteExpress from 'vite-express';

// Set up app instance
const app = express();
const port = 5173;

console.log("hello")

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

// Logging middleware for debugging
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.path}`);
//   next(); 
// });
ViteExpress.config({printViteDevServerHost: true});

//routes go here
  //this will fetch all products from my database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Item.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

app.post('/api/cart/items', async (req, res) => {
  const {id} = req.body
  console.log(id)
  try {
    const cartItems = await  Item.findOne({ where: { item_Id: id}})
    res.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: 'Failed to fetch cart items.' });
  }
})

//fetch the cart from the user
app.post('/api/cart/:user_Id', async (req, res) => {
  const { user_Id } = req.params;
  console.log(user_Id + " here")
  try {
    const cartItems = await Cart.findAll({ where: { user_Id: user_Id } });
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: 'Failed to fetch cart items.' });
  }
});

//this will fetch all users from my database
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});
// Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // hashing the password
  try {
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    console.log(user)
    if (!user) return res.status(400).json({ error: "Invalid username or password." });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid username or password." });
    res.status(200).json({ message: "Logged in successfully!", id: user.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in." });
  }
});

// User Creation
app.post('/api/users', express.json(), async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const newUser = await User.create({ username, password });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

//when I want to add a product to a cart
app.post('/api/cart', async (req, res) => {
  const { userId, productId } = req.body;

  console.log("yeayuhhhhhhhhhh")
  
  if (!userId || !productId) {
    return res.status(400).json({ error: 'Missing the needed fields.' });
  }
  
  try {
    const cartItem = await Cart.create({ user_Id: userId, product_Id: productId });
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: 'Failed to add to cart.' });
    }
  });
  
  //this will remove an item from the cart
  app.delete('/api/cart/:cartId', async (req, res) => {
    const { cartId } = req.params;
    
    try {
      await Cart.destroy({ where: { cartId } });
      res.json({ success: true });
    } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: 'Failed to remove cart item.' });
  }
});

ViteExpress.listen(app, port, () => console.log('running on port ' + port))
//serving static files
// app.use(express.static('public'));

// //error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something has fetching broken why why why why why why why why why why why why why why why why why why why');
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });