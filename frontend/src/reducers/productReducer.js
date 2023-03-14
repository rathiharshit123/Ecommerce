import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,
     NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET,
    ADMIN_PRODUCTS_SUCCESS,ADMIN_PRODUCTS_FAIL,ADMIN_PRODUCTS_REQUEST,
NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_RESET,NEW_PRODUCT_SUCCESS,
DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAIL,DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_RESET,
UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_RESET,UPDATE_PRODUCT_SUCCESS,
DELETE_REVIEW_FAIL,DELETE_REVIEW_REQUEST,DELETE_REVIEW_SUCCESS,
ALL_REVIEW_FAIL,ALL_REVIEW_REQUEST,ALL_REVIEW_SUCCESS, DELETE_REVIEW_RESET } from "../constants/productConstants";


export const productsReducer = (state = {products: []},action) => {
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
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCCESS: 
            return {
                loading: false,
                success: action.payload.code === 200,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
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

export const productReducer = (state = {},action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_SUCCESS: 
            return {
                loading: false,
                isDeleted: action.payload.code === 200,
            }
        case UPDATE_PRODUCT_SUCCESS: 
            return {
                loading: false,
                isUpdated: action.payload.code === 200,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            }
        case DELETE_PRODUCT_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PRODUCT_RESET: 
            return {
                ...state,
                isUpdated: false
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

export const newProductReducer = (state = {product:{}},action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_PRODUCT_SUCCESS: 
            return {
                loading: false,
                success: action.payload.code === 200,
                product: action.payload.data,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            }
        case NEW_PRODUCT_RESET: 
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

export const productReviewsReducer = (state = {reviews: []},action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_REVIEW_SUCCESS: 
            return {
                loading: false,
                reviews: action.payload.data.reviews,
            }
        case ALL_REVIEW_FAIL:
            return {
                ...state,
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

export const reviewReducer = (state = {},action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_REVIEW_SUCCESS: 
            return {
                loading: false,
                isDeleted: action.payload.code === 200,
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
            }
        case DELETE_REVIEW_RESET: 
            return {
                ...state,
                isDeleted: false
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