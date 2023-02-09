import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS,
REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,
LOAD_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS, LOGOUT_FAIL,LOGOUT_SUCCESS,
UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,
UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS } from "../constants/userConstants"
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

export const clearErrors = ()=> async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}