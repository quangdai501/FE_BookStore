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
    PUBLISHER_DELETE_RESET,
    PUBLISHER_CREATE_SUCCESS,
    PUBLISHER_CREATE_REQUEST,
    PUBLISHER_UPDATE_REQUEST,
    PUBLISHER_UPDATE_SUCCESS,
    PUBLISHER_UPDATE_FAIL,
    PUBLISHER_UPDATE_RESET,
    PUBLISHER_RESET
} from '../constants/publisher'
import {
    FETCH_DATA,
    CREATE,
    UPDATE,
    DELETE
} from '../constants/common';

export const publisherListReducer = (state = { publishers: [] }, action) => {
    switch (action.type) {
        case PUBLISHER_LIST_REQUEST:
            return { loading: true, publishers: [], type: FETCH_DATA }
        case PUBLISHER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                publishers: action.payload
            }
        case PUBLISHER_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }


        case PUBLISHER_CREATE_REQUEST: return {
            ...state, loading: true, type: CREATE
        }
        case PUBLISHER_CREATE_SUCCESS:
            const newPublishers = [...state.publishers, action.payload.data];
            return {
                ...state, loading: false, publishers: newPublishers, success: true
            }
        case PUBLISHER_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }


        case PUBLISHER_UPDATE_REQUEST: return {
            ...state, loading: true, type: UPDATE
        }
        case PUBLISHER_UPDATE_SUCCESS:
            const publisher = action.payload.publisher;
            const publishersUpdated = state.publishers.map(item => item._id === publisher._id ? publisher : item)
            return {
                ...state, loading: false, publishers: publishersUpdated, success: true
            }
        case PUBLISHER_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }


        case PUBLISHER_DELETE_REQUEST: return {
            ...state, loading: true, type: DELETE
        }
        case PUBLISHER_DELETE_SUCCESS:
            const publishers = state.publishers.filter(item => item._id !== action.payload.id)
            return {
                ...state, loading: false, publishers: publishers, success: true
            }
        case PUBLISHER_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case PUBLISHER_RESET: return { ...state, success: false, error: '' }
        default:
            return state
    }
}

export const publisherDetailsReducer = (
    state = { publisher: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PUBLISHER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PUBLISHER_DETAILS_SUCCESS:
            return { loading: false, publisher: action.payload }
        case PUBLISHER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
