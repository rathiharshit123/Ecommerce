import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";


export const getAllProduct = (keyword = '')=>  async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        
        let url = `/api/v1/product/getAll?keyword=${keyword}`

        let response = await axios.get(url)
        if(response?.data?.code!==200){
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: response.data.message
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
            payload: error
        })
    }
}

export const getProduct = (id)=> async (dispatch) => {
    try {
        console.log("INSIDE ACTION")
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        let response = await axios.get(`/api/v1/product/get/${id}`);
        console.log(response,"RESPONSE FROM APII")
        if(response?.data?.code!==200){
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: response.data.message
            })
        } else {
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: response.data
            })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error
        })
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



