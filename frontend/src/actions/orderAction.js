import axios from "axios";
import { CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CLEAR_ERRORS } from "../constants/orderConstants";


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST})
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.post('/api/v1/orders/create',order,config)
        if(response.data?.code === 200){
            dispatch({type: CREATE_ORDER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: CREATE_ORDER_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: CREATE_ORDER_FAIL,payload: data})
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}