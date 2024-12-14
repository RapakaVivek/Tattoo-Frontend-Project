
import { clearCart, setCart } from "./reduxapis";

import axios from "axios";

export const fetchCart = () => async (dispatch) => {
    let user_id = "675891db1853d9f7ae96b8ff"
    try {
        console.log('fetchcart')
      // Assuming the API endpoint is '/api/cart'
      const response = await axios.get(`http://localhost:5000/cart/${user_id}`);
      dispatch(setCart(response.data.cart)); // Dispatch setCart with fetched data
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };



  export const incrementItemQuantity = (itemId,quantity) => async (dispatch, getState) => {
    let user_id = "675891db1853d9f7ae96b8ff"; // Replace with dynamic user_id if available
    console.log(itemId,quantity);
    
    try {
      const body = {
        user_id: user_id,
        designId: itemId,
        quantity: quantity++, // Increment quantity by 1
      };
  
      const response = await axios.post(`http://localhost:5000/cart/update/cart`, body);
  
      // Assuming response.data.cart contains the updated cart
      dispatch(setCart(response.data.cart));
    } catch (error) {
      console.error("Error incrementing item quantity:", error);
    }
  };
  


  export const deleteItemFromCart = (itemId) => async (dispatch, getState) => {
    let user_id = "675891db1853d9f7ae96b8ff"; // Replace with dynamic user_id if available
    try {
      const body = {
        user_id: user_id,
        design_id: itemId,
      };
      console.log(body)

      // Sending data in the request body with DELETE method using `config.data`
      const response = await axios.delete('http://localhost:5000/cart/delete', { data: body });
  
      // Assuming response.data.cart contains the updated cart
      dispatch(setCart(response.data.cart));
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };


  
  export const clearCartFromRedux = (itemId) => async (dispatch, getState) => {
    let user_id = "675891db1853d9f7ae96b8ff"; // Replace with dynamic user_id if available
 
      // Sending data in the request body with DELETE method using `config.data`
      const response = await axios.get(`http://localhost:5000/cart/clear/${user_id}`)
      if(response.status == 200){
        console.log(response)
         dispatch(clearCart());
      }

      console.log(response)
      // dispatch(clearCart());
    } 
    
  