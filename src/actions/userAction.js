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
    USER_FORGOT_FAIL,
    USER_FORGOT_SUCCESS,
    USER_FORGOT_REQUEST,
    USER_UPDATE_PASS_FAIL,
    USER_UPDATE_PASS_SUCCESS,
    USER_UPDATE_PASS_REQUEST,
    USER_RESET_PASS_FAIL,
    USER_RESET_PASS_SUCCESS,
    USER_RESET_PASS_REQUEST,
} from '../constants/user'

export const login = (email, password, navigate) => async (dispatch) => {
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
export const loginGoogle = (token, navigate) => async (dispatch) => {
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
    // localStorage.removeItem('shippingAddress')
    // localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    document.location.href = '/login'
}

export const confirmEmail = (name, email, password) => async (dispatch) => {
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
export const enterCode = (code) => async (dispatch) => {
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
    } catch (error) {
        dispatch({
            type: USER_ENTERCODE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}

export const getUserDetails = () => async (dispatch, getState) => {
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
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (userinfo) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await UserApi.updateUserInfo(userInfo._id, userinfo)

        const newobj = { ...userInfo }
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
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })
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

export const deleteUser = (id) => async (dispatch) => {
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
export const forgotPassword = (email, navigate) => async (dispatch) => {
    dispatch({ type: USER_FORGOT_REQUEST })
    try {
        const { data } = await UserApi.fogotPassword(email);
        dispatch({ type: USER_FORGOT_SUCCESS, payload: { email, message: data.status } })
        if (data.status) {
            navigate("/enter-code");
        }
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message : error.message;
        dispatch({ type: USER_FORGOT_FAIL, payload: message })
    }
}
export const enterCodeResetPass = (code, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ENTERCODE_REQUEST,
        })
        const { data } = await UserApi.enterCodeResetPass(code)
        dispatch({
            type: USER_ENTERCODE_SUCCESS,
            payload: data,
        })
        if (data.status) {
            navigate("/resetpassword", { replace: true })
        }
    } catch (error) {
        dispatch({
            type: USER_ENTERCODE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}
export const updatePassword = (email, oldPassword, newPassword, navigate) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_PASS_REQUEST });
    try {
        const { data } = await UserApi.updatePassword(email, oldPassword, newPassword)
        dispatch({ type: USER_UPDATE_PASS_SUCCESS, payload: data })
        if (data.message) {
            setTimeout(() => {
                navigate("/profile", { replace: true });
            }, 2000)
        }
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_UPDATE_PASS_FAIL, payload: message });

    }
}
export const resetPassword = (email, password, navigate) => async (dispatch) => {
    dispatch({ type: USER_RESET_PASS_REQUEST });
    try {
        const { data } = await UserApi.resetPassword(email, password)
        dispatch({ type: USER_RESET_PASS_SUCCESS, payload: data })
        if (data.message) {
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000)
        }
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: USER_RESET_PASS_FAIL, payload: message });
    }
}
// export const updateUser = (user) => async(dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_UPDATE_REQUEST,
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         }

//         const { data } = await axios.put(`/api/users/${user._id}`, user, config)

//         dispatch({ type: USER_UPDATE_SUCCESS })

//         dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

//         dispatch({ type: USER_DETAILS_RESET })
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message ?
//             error.response.data.message :
//             error.message
//         if (message === 'Not authorized, token failed') {
//             dispatch(logout())
//         }
//         dispatch({
//             type: USER_UPDATE_FAIL,
//             payload: message,
//         })
//     }
// }