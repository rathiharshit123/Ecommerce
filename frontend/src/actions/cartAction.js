import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
    console.log("HORA HU DISPATCH TO")
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