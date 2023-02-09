import axios from "axios";
import { ADD_TO_CART,REMOVE_ITEM_FROM_CART } from "../constants/cartConstants";

export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
    const response = await axios.get(`/api/v1/product/get/${id}`)
    let productDetails = response.data.data;
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: productDetails._id,
            name: productDetails.name,
            price: productDetails.price,
            image: productDetails.images[0].url,
            stock: productDetails.stock,
            quantity,
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeItemsFromCart = (id) => async (dispatch,getState) => {
    dispatch({type: REMOVE_ITEM_FROM_CART,payload: id})

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}