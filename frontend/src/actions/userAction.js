import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS,
REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,
LOAD_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS, LOGOUT_FAIL,LOGOUT_SUCCESS,
UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,
UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,
RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,
ALL_USER_FAIL,ALL_USER_REQUEST,ALL_USER_SUCCESS,
USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,
UPDATE_USER_FAIL,UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,
DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS } from "../constants/userConstants"
import axios from "axios"


export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})

        const config = {headers: {"Content-Type": "application/json"}}
        const response = await axios.post('/api/v1/user/login',{email,password},config)
        if(response.data.code === 200){
            dispatch({type: LOGIN_SUCCESS,payload: response.data})
        } else {
            dispatch({type: LOGIN_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: LOGIN_FAIL,payload: data})
    }
}

export const registerUser = (registerData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});
        const config = {headers: {"Content-Type": "multipart/form-data"}};
        const response = await axios.post("/api/v1/user/register",registerData,config);
        if (response.data.code === 200){
            dispatch({type: REGISTER_USER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: REGISTER_USER_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: LOGIN_FAIL,payload: data})
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});
        const response = await axios.get("/api/v1/user/me");
        if (response.data.code === 200){
            dispatch({type: LOAD_USER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: LOAD_USER_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: LOAD_USER_FAIL,payload: data})
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/v1/user/logout")
        if(response.data.code === 201){
            dispatch({type: LOGOUT_SUCCESS})
        } else {
            dispatch({type: LOGOUT_FAIL,payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: LOGOUT_FAIL,payload: data})
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const config = {headers: {"Content-Type": "multipart/form-data"}};
        const response = await axios.put("/api/v1/user/update/profile",userData,config);
        if (response.data.code === 200){
            dispatch({type: UPDATE_PROFILE_SUCCESS, payload: response.data})
        } else {
            dispatch({type: UPDATE_PROFILE_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: UPDATE_PROFILE_FAIL,payload: data})
    }
}

export const updatePassword = (userPasswords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.put("/api/v1/user/update/password",userPasswords,config);
        if (response.data.code === 200){
            dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: response.data})
        } else {
            dispatch({type: UPDATE_PASSWORD_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: UPDATE_PASSWORD_FAIL,payload: data})
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.post("/api/v1/user/forgot/password",data,config);
        if(response?.data?.code === 202){
            dispatch({type: FORGOT_PASSWORD_SUCCESS,payload: response.data})
        } else {
            dispatch({type: FORGOT_PASSWORD_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: FORGOT_PASSWORD_FAIL,payload: data})
    }
}

export const resetPassword = (token,data) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.put(`/api/v1/user/reset/password/${token}`,data,config);
        if(response?.data?.code === 200){
            dispatch({type: RESET_PASSWORD_SUCCESS,payload: response.data})
        } else {
            dispatch({type: RESET_PASSWORD_FAIL, payload: response.data})
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: RESET_PASSWORD_FAIL,payload: data})
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USER_REQUEST});
        const response = await axios.get("/api/v1/admin/get/users");
        if (response.data.code === 200){
            dispatch({type: ALL_USER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: ALL_USER_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: ALL_USER_FAIL,payload: data})
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});
        const response = await axios.get(`/api/v1/admin/get/user/${id}`);
        if (response.data.code === 200){
            dispatch({type: USER_DETAILS_SUCCESS, payload: response.data})
        } else {
            dispatch({type: USER_DETAILS_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: USER_DETAILS_FAIL,payload: data})
    }
}

export const updateUser = (id,data) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const response = await axios.put(`/api/v1/admin/update/user/${id}`,data,config);
        if (response.data.code === 200){
            dispatch({type: UPDATE_USER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: UPDATE_USER_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: UPDATE_USER_FAIL,payload: data})
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST});
        const response = await axios.delete(`/api/v1/admin/delete/user/${id}`);
        if (response.data.code === 200){
            dispatch({type: DELETE_USER_SUCCESS, payload: response.data})
        } else {
            dispatch({type: DELETE_USER_FAIL,payload: response.data});
        }
    } catch (error) {
        let message = "Internal server Error"
        let data = {message};
        dispatch({type: DELETE_USER_FAIL,payload: data})
    }
}

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}