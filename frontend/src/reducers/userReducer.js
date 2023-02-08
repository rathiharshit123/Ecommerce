import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS,
     REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS,
LOGOUT_FAIL,LOGOUT_SUCCESS } from "../constants/userConstants"


export const userReducer = (state = {user:{} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS: 
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data
            }
        case LOGIN_FAIL: 
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload.message
            }

        case LOGOUT_SUCCESS: 
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload.message
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}