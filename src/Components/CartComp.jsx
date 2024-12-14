import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = JSON.parse(localStorage.getItem("cart")) || [];



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {


    addToCart: (state, action) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state)); 
    },






    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); 
      return updatedCart;
    },




    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify([])); 
      return [];
    },

    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state)); 
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state)); 
      }
    },
  },
});


export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});





export default store;





