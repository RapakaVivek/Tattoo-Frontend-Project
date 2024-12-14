import { configureStore, createReducer, createSlice } from '@reduxjs/toolkit';
import cartReducer from './reduxapis'
// const initialState = JSON.parse(localStorage.getItem("cart")) || [];


const initialUserState = {
  _id: "",
  name: "",
  email: "",
  token: "",
  phonenumber:"",
};




const userslice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
      setuser: (state, action) => {
          state._id = action.payload._id;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.phonenumber=action.payload.phonenumber;  
      },
      settoken: (state, action) => {
          state.token = action.payload;
      }
      // ,
      // setcart: (state, action) => {
      //     state.cart = action.payload.token;
      // },
  },
});



export const {setuser , settoken ,setcart} = userslice.actions



const store = configureStore({
  reducer: {
    carts: cartReducer,
    users: userslice.reducer
  },
});





export default store;





