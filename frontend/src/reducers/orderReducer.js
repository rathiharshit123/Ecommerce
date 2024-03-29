import { CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CLEAR_ERRORS,
MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,
ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,
ALL_ORDER_FAIL,ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,
UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_RESET,UPDATE_ORDER_SUCCESS,
DELETE_ORDER_FAIL,DELETE_ORDER_REQUEST,DELETE_ORDER_RESET,DELETE_ORDER_SUCCESS} from "../constants/orderConstants";


export const newOrderReducer = (state = {},action) => {
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading : false,
                order: action.payload.data.orderDetails,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload.message,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const getOrderReducer = (state = {orders: []},action) => {
    switch (action.type){
        case MY_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case MY_ORDERS_SUCCESS:
            return {
                loading : false,
                orders: action.payload.data.orderList,
            }
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload.message,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {},action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading : false,
                order: action.payload.data.orderDetails,
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload.message,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const allOrderReducer = (state = {orders: []},action) => {
    switch (action.type){
        case ALL_ORDER_REQUEST:
            return {
                loading: true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                loading : false,
                orders: action.payload.data.orderList,
            }
        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload.message,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const orderReducer = (state = {},action) => {
    switch (action.type){
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading : false,
                isUpdated: action.payload.code === 200,
            }
        case DELETE_ORDER_SUCCESS: 
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.code === 200,
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            }
        case UPDATE_ORDER_RESET: 
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_ORDER_RESET: 
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}