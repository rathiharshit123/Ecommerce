import axios from "axios";
import { CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CLEAR_ERRORS,
MY_ORDERS_SUCCESS, MY_ORDERS_REQUEST, MY_ORDERS_FAIL,
 ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
ALL_ORDER_FAIL,ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,
UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,
DELETE_ORDER_FAIL,DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS } from "../constants/orderConstants";


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

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDERS_REQUEST})
        const response = await axios.get('/api/v1/orders/me')
        if(response.data?.code === 200){
            dispatch({type: MY_ORDERS_SUCCESS, payload: response.data})
        } else {
            dispatch({type: MY_ORDERS_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: MY_ORDERS_FAIL,payload: data})
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})
        const response = await axios.get(`/api/v1/orders/get/${id}`)
        if(response.data?.code === 200){
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: response.data})
        } else {
            dispatch({type: ORDER_DETAILS_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ORDER_DETAILS_FAIL,payload: data})
    }
}

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({type: ALL_ORDER_REQUEST})
        const response = await axios.get('/api/v1/orders/admin/getAll')
        if(response.data?.code === 200){
            dispatch({type: ALL_ORDER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: ALL_ORDER_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ALL_ORDER_FAIL,payload: data})
    }
}

export const updateOrder = (order,id) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_ORDER_REQUEST})
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.put(`/api/v1/orders/admin/update/${id}`,order,config)
        if(response.data?.code === 200){
            dispatch({type: UPDATE_ORDER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: UPDATE_ORDER_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: UPDATE_ORDER_FAIL,payload: data})
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_ORDER_REQUEST})
        const response = await axios.delete(`/api/v1/orders/admin/delete/${id}`)
        if(response.data?.code === 200){
            dispatch({type: DELETE_ORDER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: DELETE_ORDER_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: DELETE_ORDER_FAIL,payload: data})
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}