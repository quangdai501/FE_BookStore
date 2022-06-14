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
    CATEGORY_DELETE_RESET,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
    CATEGORY_RESET,
} from '../constants/category'
import {
    FETCH_DATA,
    CREATE,
    UPDATE,
    DELETE
} from '../constants/common';
export const categoryListReducer = (state = { categorys: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categorys: [], type: FETCH_DATA }
        case CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                categorys: action.payload
            }
        case CATEGORY_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }

        case CATEGORY_CREATE_REQUEST: return {
            ...state, loading: true, type: CREATE
        }
        case CATEGORY_CREATE_SUCCESS:
            const newcategorys = [action.payload.data, ...state.categorys];
            return {
                ...state, loading: false, categorys: newcategorys, success: true
            }
        case CATEGORY_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }

        case CATEGORY_UPDATE_REQUEST: return {
            ...state, loading: true, type: UPDATE
        }
        case CATEGORY_UPDATE_SUCCESS:
            const category = action.payload.category;
            const categorysUpdated = state.categorys.map(item => item._id === category._id ? category : item)
            return {
                ...state, loading: false, categorys: categorysUpdated, success: true
            }
        case CATEGORY_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case CATEGORY_DELETE_REQUEST: return {
            ...state, loading: true, type: DELETE
        }
        case CATEGORY_DELETE_SUCCESS:
            const categorys = state.categorys.filter(item => item._id !== action.payload.id)
            return {
                ...state, loading: false, categorys: categorys, success: true
            }
        case CATEGORY_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload }
            
        case CATEGORY_RESET: return { ...state, success: false, error: '' }

        default:
            return state
    }
}

export const categoryDetailsReducer = (
    state = { category: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return {...state, loading: true }
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload }
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// export const categoryDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//         case CATEGORY_DELETE_REQUEST:
//             return { loading: true }
//         case CATEGORY_DELETE_SUCCESS:
//             return { loading: false, success: true }
//         case CATEGORY_DELETE_FAIL:
//             return { loading: false, error: action.payload }
//         case CATEGORY_DELETE_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const categoryCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//         case CATEGORY_CREATE_REQUEST:
//             return { loading: true }
//         case CATEGORY_CREATE_SUCCESS:
//             return { loading: false, success: true, category: action.payload }
//         case CATEGORY_CREATE_FAIL:
//             return { loading: false, error: action.payload }
//         case CATEGORY_CREATE_RESET:
//             return {}
//         default:
//             return state
//     }
// }

// export const categoryUpdateReducer = (state = { category: {} }, action) => {
//     switch (action.type) {
//         case CATEGORY_UPDATE_REQUEST:
//             return { loading: true }
//         case CATEGORY_UPDATE_SUCCESS:
//             return { loading: false, success: true, category: action.payload }
//         case CATEGORY_UPDATE_FAIL:
//             return { loading: false, error: action.payload }
//         case CATEGORY_UPDATE_RESET:
//             return { category: {} }
//         default:
//             return state
//     }
// }