import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,
     NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET,
    ADMIN_PRODUCTS_SUCCESS,ADMIN_PRODUCTS_FAIL,ADMIN_PRODUCTS_REQUEST } from "../constants/productConstants";


export const productReducer = (state = {products: []},action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS: 
            return {
                loading: false,
                products: action.payload.data.list,
                productsCount: action.payload.data.totalProducts,
                resultPerPage: action.payload.data.resultPerPage,
                filteredProductsCount: action.payload.data.filteredProductsCount
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.data
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload.message
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

export const productDetailReducer = (state = {product: {}},action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS: 
            return {
                loading: false,
                product: action.payload.data,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload.message,
                product: {}
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

export const newReviewReducer = (state = {},action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case NEW_REVIEW_SUCCESS: 
            return {
                loading: false,
                success: action.payload.code === 200,
            }
        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload.message,
                ...state
            }
        case NEW_REVIEW_RESET: 
            return {
                ...state,
                success: false
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