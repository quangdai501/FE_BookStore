import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_NEW,
    PRODUCT_SALE,
    PRODUCT_VOTE,
} from '../constants/product'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.product,
                pages: action.payload.totalPages,
                page: action.payload.currentpage,
                total: action.payload.totalItems
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_DELETE_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DELETE_SUCCESS:
            const newProducts = state.products.filter(product => product._id !== action.payload.id)
            return { ...state, loading: false, products: newProducts, success: true }
        case PRODUCT_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (
    state = { product: {} },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

// export const productDeleteReducer = (state = {}, action) => {
//     switch (action.type) {

//         default:
//             return state
//     }
// }

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_NEW:
            return { products: action.payload.product }
        case PRODUCT_SALE:
            return { products: action.payload.product }
        case PRODUCT_VOTE:
            return { products: action.payload.product }
        case PRODUCT_LIST_FAIL:
            return { error: action.payload }
        default:
            return state
    }
}