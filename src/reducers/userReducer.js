import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_ENTERCODE_FAIL,
    USER_ENTERCODE_REQUEST,
    USER_ENTERCODE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_PASS_REQUEST,
    USER_UPDATE_PASS_SUCCESS,
    USER_UPDATE_PASS_FAIL,
    USER_FORGOT_REQUEST,
    USER_FORGOT_SUCCESS,
    USER_FORGOT_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_RESET_PASS_FAIL,
    USER_RESET_PASS_SUCCESS,
    USER_RESET_PASS_REQUEST,

} from '../constants/user'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
export const userEnterCodeReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ENTERCODE_REQUEST:
            return { loading: true }
        case USER_ENTERCODE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_ENTERCODE_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userResetPassReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASS_REQUEST:
            return { loading: true }
        case USER_RESET_PASS_SUCCESS:
            return { loading: false, success: true }
        case USER_RESET_PASS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const userUpdatePassReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PASS_REQUEST:
            return { loading: true }
        case USER_UPDATE_PASS_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_PASS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userForgotPasswordReducer = (state = { emailInfo: {} }, action) => {
    switch (action.type) {
        case USER_FORGOT_REQUEST:
            return { loading: true }
        case USER_FORGOT_SUCCESS:
            return { loading: false, emailInfo: action.payload }
        case USER_FORGOT_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}