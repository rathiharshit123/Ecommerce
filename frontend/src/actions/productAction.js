import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,
     NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL,
     ADMIN_PRODUCTS_SUCCESS,ADMIN_PRODUCTS_FAIL,ADMIN_PRODUCTS_REQUEST,
     NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,
     DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from "../constants/productConstants";


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

export const getAllProductsAdmin = () => async (dispatch) =>{
    try {
        dispatch({type:ADMIN_PRODUCTS_REQUEST});
        let response = await axios.get('/api/v1/admin/get/products');
        if(response?.data?.code === 200){
            dispatch({type: ADMIN_PRODUCTS_SUCCESS,payload:response.data})
        } else {
            dispatch({type: ADMIN_PRODUCTS_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ADMIN_PRODUCTS_FAIL,payload: data})
    }
}

export const createNewProduct = (data)=> async (dispatch) => {
    try {
        dispatch({type: NEW_PRODUCT_REQUEST});

        const config = {headers: {"Content-Type": "multiform/form-data"}}
        let response = await axios.post(`/api/v1/product/admin/add`,data,config);
        if(response?.data?.code === 200){
            dispatch({type: NEW_PRODUCT_SUCCESS,payload:response.data})
        } else {
            dispatch({type: NEW_PRODUCT_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: NEW_REVIEW_FAIL,payload: data})
    }
}

export const deleteProduct = (id)=> async (dispatch) => {
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST});
        let response = await axios.delete(`/api/v1/product/admin/delete/${id}`);
        if(response?.data?.code === 200){
            dispatch({type: DELETE_PRODUCT_SUCCESS,payload:response.data})
        } else {
            dispatch({type: DELETE_PRODUCT_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: DELETE_PRODUCT_FAIL,payload: data})
    }
}

export const updateProduct = (productData,id)=> async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST});
        const config = {headers: {"Content-Type": "multiform/form-data"}}

        let response = await axios.put(`/api/v1/product/admin/update/${id}`,productData,config);
        if(response?.data?.code === 200){
            dispatch({type: UPDATE_PRODUCT_SUCCESS,payload:response.data})
        } else {
            dispatch({type: UPDATE_PRODUCT_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: UPDATE_PRODUCT_FAIL,payload: data})
    }
}

export const getAllReviews = (id) => async (dispatch) =>{
    try {
        dispatch({type:ALL_REVIEW_REQUEST});
        let response = await axios.get(`/api/v1/product/reviews?productId=${id}`);
        if(response?.data?.code === 200){
            dispatch({type: ALL_REVIEW_SUCCESS,payload:response.data})
        } else {
            dispatch({type: ALL_REVIEW_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ALL_REVIEW_FAIL,payload: data})
    }
}

export const deleteReview = (reviewId,productId) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST});
        let response = await axios.delete(`/api/v1/product/delete/review?productId=${productId}&reviewId=${reviewId}`);
        if(response?.data?.code === 200){
            dispatch({type: DELETE_REVIEW_SUCCESS,payload:response.data})
        } else {
            dispatch({type: DELETE_REVIEW_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: DELETE_REVIEW_FAIL,payload: data})
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}



