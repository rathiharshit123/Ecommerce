import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL } from "../constants/productConstants";


export const getAllProduct = (keyword = '', currentPage = 1, price = [0,25000], category, ratings = 0)=>  async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        
        let url = `/api/v1/product/getAll?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category){
            url += `&category=${category}`
        }
        let response = await axios.get(url)
        if(response?.data?.code === 200){
            dispatch({type: ALL_PRODUCT_SUCCESS,payload:response.data})
        } else {
            dispatch({type: ALL_PRODUCT_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ALL_PRODUCT_FAIL,payload: data})
    }
}

export const getProduct = (id)=> async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        let response = await axios.get(`/api/v1/product/get/${id}`);
        if(response?.data?.code === 200){
            dispatch({type: PRODUCT_DETAILS_SUCCESS,payload:response.data})
        } else {
            dispatch({type: PRODUCT_DETAILS_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: PRODUCT_DETAILS_FAIL,payload: data})
    }
}

export const newReviewSubmit = (data)=> async (dispatch) => {
    try {
        dispatch({type: NEW_REVIEW_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}}
        let response = await axios.post(`/api/v1/product/create/review`,data,config);
        if(response?.data?.code === 200){
            dispatch({type: NEW_REVIEW_SUCCESS,payload:response.data})
        } else {
            dispatch({type: NEW_REVIEW_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: NEW_REVIEW_FAIL,payload: data})
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



