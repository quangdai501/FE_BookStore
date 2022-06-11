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
    AUTHOR_DELETE_RESET,
    AUTHOR_CREATE_RESET,
    AUTHOR_CREATE_FAIL,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_UPDATE_RESET,
    AUTHOR_RESET,

} from '../constants/author';
import {
    FETCH_DATA,
    CREATE,
    UPDATE,
    DELETE
} from '../constants/common';

export const authorListReducer = (state = { authors: [] }, action) => {
    switch (action.type) {
        case AUTHOR_LIST_REQUEST:
            return { loading: true, authors: [], type: FETCH_DATA }
        case AUTHOR_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                authors: action.payload
            }
        case AUTHOR_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case AUTHOR_CREATE_REQUEST: return {
            ...state, loading: true, type: CREATE
        }
        case AUTHOR_CREATE_SUCCESS:
            const newAuthors = [...state.authors, action.payload.data];
            return {
                ...state, loading: false, authors: newAuthors, success: true
            }
        case AUTHOR_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case AUTHOR_UPDATE_REQUEST: return {
            ...state, loading: true, type: UPDATE
        }
        case AUTHOR_UPDATE_SUCCESS:
            const author = action.payload.author;
            const authorsUpdated = state.authors.map(item => item._id === author._id ? author : item)
            return {
                ...state, loading: false, authors: authorsUpdated, success: true
            }
        case AUTHOR_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case AUTHOR_DELETE_REQUEST: return {
            ...state, loading: true, type: DELETE
        }
        case AUTHOR_DELETE_SUCCESS:
            const authors = state.authors.filter(item => item._id !== action.payload.id)
            return {
                ...state, loading: false, authors: authors, success: true
            }
        case AUTHOR_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case AUTHOR_RESET: return { ...state, success: false, error: '' }

        default:
            return state
    }
}

export const authorDetailsReducer = (
    state = { author: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case AUTHOR_DETAILS_REQUEST:
            return { ...state, loading: true }
        case AUTHOR_DETAILS_SUCCESS:
            return { loading: false, author: action.payload }
        case AUTHOR_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// export const authorDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//         case AUTHOR_DELETE_REQUEST:
//             return { loading: true }
//         case AUTHOR_DELETE_SUCCESS:
//             return { loading: false, success: true }
//         case AUTHOR_DELETE_FAIL:
//             return { loading: false, error: action.payload }
//         case AUTHOR_DELETE_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const authorCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//         case AUTHOR_CREATE_REQUEST:
//             return { loading: true }
//         case AUTHOR_CREATE_SUCCESS:
//             return { loading: false, success: true, author: action.payload }
//         case AUTHOR_CREATE_FAIL:
//             return { loading: false, error: action.payload }
//         case AUTHOR_CREATE_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const authorUpdateReducer = (state = { author: {} }, action) => {
//     switch (action.type) {
//         case AUTHOR_UPDATE_REQUEST:
//             return { loading: true }
//         case AUTHOR_UPDATE_SUCCESS:
//             return { loading: false, success: true, author: action.payload }
//         case AUTHOR_UPDATE_FAIL:
//             return { loading: false, error: action.payload }
//         case AUTHOR_UPDATE_RESET:
//             return { author: {} }
//         default:
//             return state
//     }
// }