import UserApi from '../api/userApi'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
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
    USER_DETAILS_RESET,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL
} from '../constants/user'
// import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password, navigate) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const { data } = await UserApi.login(email, password)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        if (data) {
            navigate("/shop");
        }

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}
export const loginGoogle = (token, navigate) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const { data } = await UserApi.loginGoogle(token)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        if (data) {
            navigate("/shop");
        }

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
        // localStorage.removeItem('cartItems')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
}

export const confirmEmail = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const { data } = await UserApi.confirmEmail(name, email, password)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
            // payload: error,
        })
    }
}
export const enterCode = (code) => async(dispatch) => {
    try {
        dispatch({
            type: USER_ENTERCODE_REQUEST,
        })

        const { data } = await UserApi.addUser(code)

        dispatch({
            type: USER_ENTERCODE_SUCCESS,
            payload: data,
        })

        if (data) {
            setTimeout(() => {
                document.location.href = '/login'
            }, 2000);
        }
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_ENTERCODE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
            // payload: error,
        })
    }
}

export const getUserDetails = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })


        const { data } = await UserApi.getUserInfoByID()

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
            // if (message === 'Not authorized, token failed') {
            //     dispatch(logout())
            // }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (userinfo) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await UserApi.updateUserInfo(userInfo._id, userinfo)
            // console.log(userInfo)
        const newobj = {...userInfo }
        newobj['name'] = data.name
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: newobj,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: newobj,
        })
        localStorage.setItem('userInfo', JSON.stringify(newobj))
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
            // if (message === 'Not authorized, token failed') {
            //     dispatch(logout())
            // }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const listUsers = () => async(dispatch) => {
    try {
        dispatch({
                type: USER_LIST_REQUEST,
            })
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${userInfo.token}`,
            //     },
            // }

        const { data } = await UserApi.getAllUsers()
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })
        await UserApi.deleteUser(id)
        dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updatePassword = (newPassword, oldPassword) => async(dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_PASSWORD_REQUEST,
        })


        const { data } = await UserApi.updatePassword(newPassword, oldPassword)
        dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data })
        setTimeout(() => {
            dispatch(logout())
        }, 2000)
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({
            type: USER_UPDATE_PASSWORD_FAIL,
            payload: message,
        })
    }
}