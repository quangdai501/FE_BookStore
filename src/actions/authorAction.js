import AuthorApi from "../api/authorApi";
import sortByDate from "../common/sortByDate";
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
    AUTHOR_CREATE_FAIL,
    AUTHOR_CREATE_SUCCESS,
    AUTHOR_CREATE_REQUEST,
    AUTHOR_UPDATE_REQUEST,
    AUTHOR_UPDATE_SUCCESS,
    AUTHOR_UPDATE_FAIL,
    AUTHOR_RESET,

} from "../constants/author";

export const listAuthors = (props) => async (dispatch) => {
    try {
        dispatch({ type: AUTHOR_LIST_REQUEST });
        const { data } = await AuthorApi.getAll(props);
        dispatch({
            type: AUTHOR_LIST_SUCCESS,
            payload: sortByDate(data),
        });
    } catch (error) {
        dispatch({
            type: AUTHOR_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
        });
    }
};

export const listAuthorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: AUTHOR_DETAILS_REQUEST });

        const { data } = await AuthorApi.getAuthor(id);
        dispatch({
            type: AUTHOR_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: AUTHOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message,
        });
    }
};

export const deleteAuthor = (id) => async (dispatch) => {
    try {
        dispatch({
            type: AUTHOR_DELETE_REQUEST,
        });
        const data = await AuthorApi.deleteAuthor(id);
        if (data.status === 200)
            dispatch({
                type: AUTHOR_DELETE_SUCCESS,
                payload: { id }
            });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message;
        dispatch({
            type: AUTHOR_DELETE_FAIL,
            payload: message,
        });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    }
};

export const createAuthor = (name) => async (dispatch) => {
    try {
        dispatch({
            type: AUTHOR_CREATE_REQUEST,
        });

        const { data } = await AuthorApi.addAuthor(name);
        dispatch({
            type: AUTHOR_CREATE_SUCCESS,
            payload: data,
        });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    } catch (error) {
        const message =
            error.response && error.response.data.error ?
                error.response.data.error :
                error.message;
        dispatch({
            type: AUTHOR_CREATE_FAIL,
            payload: message,
        });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    }
};

export const updateAuthor = (Author) => async (dispatch) => {
    try {
        dispatch({
            type: AUTHOR_UPDATE_REQUEST,
        });

        const { data } = await AuthorApi.updateAuthor(Author);
        if (data.data.ok)
            dispatch({
                type: AUTHOR_UPDATE_SUCCESS,
                payload: { author: Author },
            });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    } catch (error) {
        const message =
            error.response && error.response.data.message ?
                error.response.data.message :
                error.message;
        dispatch({
            type: AUTHOR_UPDATE_FAIL,
            payload: message,
        });
        // setTimeout(() => dispatch({ type: AUTHOR_RESET }), 1000)

    }
};