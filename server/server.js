// Import packages
import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'viteExpress';
import { Cart, Item, User, EmailSignup } from './model.js';
import bcrypt from 'bcrypt';

// Set up app instance
const app = express();
const port = 5173;
let myId = 1;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
ViteExpress.config({printViteDevServerHost: true});

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next(); 
});

//routes go here
  //this will fetch all products from my database
app.get('/api/products', async (req, res) => {
  try {
    const products = await Item.findAll();
    console.log("hey");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

//fetch the cart from the user
app.get('/api/cart/:userId', async (req, res) => {
  const { user_Id } = req.params;
  
  try {
    const cartItems = await Cart.findAll({ where: { user_Id } });
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
//login
app.post('/register', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user to the database with the hashed password
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
      res.status(500).send({ error: "Failed to register user." });
  }
});

//password checker
app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(400).send({ error: "Invalid username or password." });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(400).send({ error: "Invalid username or password." });
      }

      // Here you'd typically issue a token or start a session for the logged-in user
      res.status(200).send({ message: "Logged in successfully!" });
  } catch (error) {
      res.status(500).send({ error: "Failed to log in." });
  }
});

//this route is gonna handle the user creation
app.post('/api/users', express.json(), async (req, res) => {
  const { email, firstName, lastName } = req.body;
  
  try {
    const newUser = await User.create({ 
      email_Id: email, 
      first_Name: firstName, 
      last_Name: lastName 
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

//when I want to add a product to a cart
app.post('/api/cart', express.json(), async (req, res) => {
  const { userId, productId, amount } = req.body;
  
  if (!userId || !productId || !amount) {
    return res.status(400).json({ error: 'Missing the needed fields.' });
  }
  
  try {
    const cartItem = await Cart.create({ user_Id: userId, 
      product_Id: productId, amount });
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

//serving static files
app.use(express.static('public'));

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//start server
ViteExpress.listen(app, port, () => console.log(`All the homies meeting at http:/localhost:${port}`));