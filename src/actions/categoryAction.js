import CategoryApi from '../api/categoryApi';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
} from '../constants/category'
// import { logout } from './userActions'

export const listCategorys = (props) => async(
    dispatch
) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
        const { data } = await CategoryApi.getAll(props)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const listCategoryDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST })

        const { data } = await CategoryApi.getCategory(id)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

// export const deleteCategory = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: CATEGORY_DELETE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Categoryization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.delete(`/api/Categorys/${id}`, config)

//     dispatch({
//       type: CATEGORY_DELETE_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Categoryized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: CATEGORY_DELETE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createCategory = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: CATEGORY_CREATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Categoryization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.post(`/api/Categorys`, {}, config)

//     dispatch({
//       type: CATEGORY_CREATE_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Categoryized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: CATEGORY_CREATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const updateCategory = (Category) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: CATEGORY_UPDATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Categoryization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.put(
//       `/api/Categorys/${Category._id}`,
//       Category,
//       config
//     )

//     dispatch({
//       type: CATEGORY_UPDATE_SUCCESS,
//       payload: data,
//     })
//     dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Categoryized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: CATEGORY_UPDATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createCategoryReview = (CategoryId, review) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({
//       type: CATEGORY_CREATE_REVIEW_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Categoryization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.post(`/api/Categorys/${CategoryId}/reviews`, review, config)

//     dispatch({
//       type: CATEGORY_CREATE_REVIEW_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Categoryized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: CATEGORY_CREATE_REVIEW_FAIL,
//       payload: message,
//     })
//   }
// }

// export const listTopCategorys = () => async (dispatch) => {
//   try {
//     dispatch({ type: CATEGORY_TOP_REQUEST })

//     const { data } = await axios.get(`/api/Categorys/top`)

//     dispatch({
//       type: CATEGORY_TOP_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: CATEGORY_TOP_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }