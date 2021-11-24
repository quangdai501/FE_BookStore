import PublisherApi from '../api/publisherApi';
import {
    PUBLISHER_LIST_REQUEST,
    PUBLISHER_LIST_SUCCESS,
    PUBLISHER_LIST_FAIL,
    PUBLISHER_DETAILS_REQUEST,
    PUBLISHER_DETAILS_SUCCESS,
    PUBLISHER_DETAILS_FAIL,
    PUBLISHER_DELETE_REQUEST,
    PUBLISHER_DELETE_SUCCESS,
    PUBLISHER_DELETE_FAIL,
    PUBLISHER_CREATE_RESET,
    PUBLISHER_CREATE_FAIL,
    PUBLISHER_CREATE_SUCCESS,
    PUBLISHER_CREATE_REQUEST,
    PUBLISHER_UPDATE_REQUEST,
    PUBLISHER_UPDATE_SUCCESS,
    PUBLISHER_UPDATE_FAIL,
    PUBLISHER_UPDATE_RESET,
} from '../constants/publisher'
// import { logout } from './userActions'

export const listPublishers = (props) => async(
    dispatch
) => {
    try {
        dispatch({ type: PUBLISHER_LIST_REQUEST })
        const { data } = await PublisherApi.getAll(props)

        dispatch({
            type: PUBLISHER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PUBLISHER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const listPublisherDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PUBLISHER_DETAILS_REQUEST })

        const { data } = await PublisherApi.getPublisher(id)
        dispatch({
            type: PUBLISHER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PUBLISHER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

// export const deletePublisher = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PUBLISHER_DELETE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Publisherization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.delete(`/api/Publishers/${id}`, config)

//     dispatch({
//       type: PUBLISHER_DELETE_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Publisherized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PUBLISHER_DELETE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createPublisher = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PUBLISHER_CREATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Publisherization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.post(`/api/Publishers`, {}, config)

//     dispatch({
//       type: PUBLISHER_CREATE_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Publisherized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PUBLISHER_CREATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const updatePublisher = (Publisher) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PUBLISHER_UPDATE_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Publisherization: `Bearer ${userInfo.token}`,
//       },
//     }

//     const { data } = await axios.put(
//       `/api/Publishers/${Publisher._id}`,
//       Publisher,
//       config
//     )

//     dispatch({
//       type: PUBLISHER_UPDATE_SUCCESS,
//       payload: data,
//     })
//     dispatch({ type: PUBLISHER_DETAILS_SUCCESS, payload: data })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Publisherized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PUBLISHER_UPDATE_FAIL,
//       payload: message,
//     })
//   }
// }

// export const createPublisherReview = (PublisherId, review) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({
//       type: PUBLISHER_CREATE_REVIEW_REQUEST,
//     })

//     const {
//       userLogin: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Publisherization: `Bearer ${userInfo.token}`,
//       },
//     }

//     await axios.post(`/api/Publishers/${PublisherId}/reviews`, review, config)

//     dispatch({
//       type: PUBLISHER_CREATE_REVIEW_SUCCESS,
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not Publisherized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: PUBLISHER_CREATE_REVIEW_FAIL,
//       payload: message,
//     })
//   }
// }

// export const listTopPublishers = () => async (dispatch) => {
//   try {
//     dispatch({ type: PUBLISHER_TOP_REQUEST })

//     const { data } = await axios.get(`/api/Publishers/top`)

//     dispatch({
//       type: PUBLISHER_TOP_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: PUBLISHER_TOP_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }