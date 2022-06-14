import ProductApi from '../api/productApi';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

} from '../constants/product';
import sortByDate from '../common/sortByDate';
// import { logout } from './userActions'

export const listProducts = (props) => async (
    dispatch
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await ProductApi.getAll(props)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await ProductApi.getProduct(id)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        await ProductApi.deleteProductByID(id)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: {id}
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const { data } = await ProductApi.addProduct(product)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const { data } = await ProductApi.updateProductByID(product)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const createProductReview = (productId, review) => async (
    dispatch,
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        await ProductApi.createReview(review, productId)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}

// export const listTopProducts = (props, type) => async(dispatch) => {
//     try {
//         const { data } = await ProductApi.getAll(props)
//         dispatch({
//             type: type,
//             payload: data,
//         })
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_LIST_FAIL,
//             payload: error.response && error.response.data.message ?
//                 error.response.data.message : error.message,
//         })
//     }
// }