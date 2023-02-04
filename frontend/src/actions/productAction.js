import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";


export const getProduct = ()=>  async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        
        let response = await axios.get("api/v1/product/getAll")
        if(response?.data?.code!==200){
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: response.data
            })
        } else {
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: response.data
            })
        }

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            // payload: error.response
        })
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



