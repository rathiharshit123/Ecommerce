import { CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CLEAR_ERRORS } from "../constants/orderConstants";


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
                order: action.payload.data,
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