import { configureStore, createSlice } from '@reduxjs/toolkit';

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.item_Id === action.payload.item_Id
      );

      if (itemIndex >= 0) {
        state[itemIndex].amount += 1;  // Increase the amount
      } else {
        state.push({ ...action.payload, amount: 1 });  // Add the new item with amount 1
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.item_Id !== action.payload.item_Id);
    },
    decrementItem: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.Item_Id === action.payload.item_Id
      );

      if (itemIndex >= 0) {
        state[itemIndex].amount -= 1;  // Decrease the amount
      }
    },
    clearCart: (state) => {
      return [];
    },
    setCart: (state, action) => {
      return action.payload;  // sets the entire cart to new data
    }
  },
});

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

// Users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

// Store configuration
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    users: usersSlice.reducer,
  },
});

// Exporting user actions and selector
export const { login, logout } = userSlice.actions; // export actions
export const selectUser = (state) => state.user.value;

// Exporting cart actions and selector
export const { addToCart, removeFromCart, decrementItem, clearCart, setCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;

// Exporting products actions and selector
export const { setProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products;

// Exporting users actions and selector
export const { setUsers } = usersSlice.actions;
export const selectUsers = (state) => state.users;