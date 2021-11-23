import AuthorApi from '../api/authorApi';
import {
    AUTHOR_LIST_REQUEST,
    AUTHOR_LIST_SUCCESS,
    AUTHOR_LIST_FAIL,
    AUTHOR_DETAILS_REQUEST,
    AUTHOR_DETAILS_SUCCESS,
    AUTHOR_DETAILS_FAIL,
    AUTHOR_DELETE_REQUEST,
    AUTHOR_DELETE_SUCCESS,
    AUTHOR_DELETE_FAIL,
    AUTHOR_CREATE_RESET,
    AUTHOR_CREATE_FAIL,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_UPDATE_RESET,
} from '../constants/author'
// import { logout } from './userActions'

export const listAuthors = (props) => async(
    dispatch
) => {
    try {
        dispatch({ type: AUTHOR_LIST_REQUEST })
        const { data } = await AuthorApi.getAll(props)

        dispatch({
            type: AUTHOR_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const listAuthorDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: AUTHOR_DETAILS_REQUEST })

        const { data } = await AuthorApi.getAuthor(id)
        dispatch({
            type: AUTHOR_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

// export const deleteAuthor = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: AUTHOR_DELETE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.delete(`/api/Authors/${id}`, config)

//     dispatch({
//       type: AUTHOR_DELETE_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: AUTHOR_DELETE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createAuthor = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: AUTHOR_CREATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.post(`/api/Authors`, {}, config)

//     dispatch({
//       type: AUTHOR_CREATE_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: AUTHOR_CREATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const updateAuthor = (Author) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: AUTHOR_UPDATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.put(
//       `/api/Authors/${Author._id}`,
//       Author,
//       config
//     )

//     dispatch({
//       type: AUTHOR_UPDATE_SUCCESS,
//       payload: data,
//     })
//     dispatch({ type: AUTHOR_DETAILS_SUCCESS, payload: data })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: AUTHOR_UPDATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createAuthorReview = (AuthorId, review) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({
//       type: AUTHOR_CREATE_REVIEW_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.post(`/api/Authors/${AuthorId}/reviews`, review, config)

//     dispatch({
//       type: AUTHOR_CREATE_REVIEW_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: AUTHOR_CREATE_REVIEW_FAIL,
//       payload: message,
//     })
//   }
// }

// export const listTopAuthors = () => async (dispatch) => {
//   try {
//     dispatch({ type: AUTHOR_TOP_REQUEST })

//     const { data } = await axios.get(`/api/Authors/top`)

//     dispatch({
//       type: AUTHOR_TOP_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: AUTHOR_TOP_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }