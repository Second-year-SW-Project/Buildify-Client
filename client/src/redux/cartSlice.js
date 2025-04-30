import { createSlice } from "@reduxjs/toolkit";

// Try to load from localStorage first
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cartState");
    return storedCart ? JSON.parse(storedCart) : { cartItems: [], totalPrice: 0 };
  } catch (e) {
    return { cartItems: [], totalPrice: 0 };
  }
};

// Save to localStorage
const saveCartToStorage = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Ensure cartItems exists and is an array
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }

      const existingItem = state.cartItems.find((i) => i._id === item._id); //there was a problem in fetching id from itempage add to cart button.ifit comes again use the name instead of the id.only for itempage add to card button
       


      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item }); 
      }

      // Recalculate total price
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;

      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;

      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      saveCartToStorage(state);
    }






  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
