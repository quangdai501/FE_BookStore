import CategoryApi from "../api/categoryApi";
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
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE_RESET,
    CATEGORY_CREATE_RESET,
    CATEGORY_UPDATE_RESET,
} from "../constants/category";
// import { logout } from './userActions'

export const listCategorys = (props) => async(dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await CategoryApi.getAll(props);

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
        });
    }
};

export const listCategoryDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await CategoryApi.getCategory(id);
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
        });
    }
};

export const deleteCategory = (id) => async(dispatch) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST,
        });

        const data = await CategoryApi.deleteCategory(id);
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        });
        if (data) {
            setTimeout(() => {
                dispatch({ type: CATEGORY_DELETE_RESET })
            }, 2000);
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: message,
        });
    }
};

export const createCategory = (name) => async(dispatch) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST,
        });
        const { data } = await CategoryApi.addCategory(name);
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
        if (data) {
            setTimeout(() => {
                dispatch({ type: CATEGORY_CREATE_RESET })
            }, 2000);
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: message,
        });
    }
};

export const updateCategory = (Category) => async(dispatch) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST,
        });
        const { data } = await CategoryApi.updateCategory(Category);

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
        if (data) {
            setTimeout(() => {
                dispatch({ type: CATEGORY_UPDATE_RESET })
            }, 2000);
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message;
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: message,
        });
    }
};