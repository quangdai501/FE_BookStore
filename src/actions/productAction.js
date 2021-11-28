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

} from '../constants/product'
// import { logout } from './userActions'

export const listProducts = (props) => async (
    dispatch
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        // console.log(props.category)
        const { data } = await ProductApi.getAll(props)
        // const query = new URLSearchParams(props).toString();
        // const { data } = await axios.get(`http://localhost:5000/api/products?${query}`)

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
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
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

        // const { data } = await axios.post(`/api/products`, {}, config)
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
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
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
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const createProductReview = (productId, review) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })
        // const config = {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${userInfo.token}`,
        //   },
        // }

        // await axios.post(`/api/products/${productId}/reviews`, review, config)
        await ProductApi.createReview(review, productId)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
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