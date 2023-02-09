import { ADD_TO_CART,REMOVE_ITEM_FROM_CART } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []},action) => {
    switch (action.type){
        case ADD_TO_CART:
            const item = action.payload;

            const productExist = state.cartItems.find((i)=>{
                return i?.product===item.product
            }) 
            if(productExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i)=> i?.product=== productExist.product ? item: i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }
        case REMOVE_ITEM_FROM_CART: 
            return {
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload)
            }

        default:
            return state;
    }
}