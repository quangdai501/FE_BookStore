import AuthorApi from "../api/authorApi";
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
  AUTHOR_CREATE_RESET,
  AUTHOR_DELETE_RESET,
  AUTHOR_UPDATE_RESET,
} from "../constants/author";
// import { logout } from './userActions'

export const listAuthors = (props) => async (dispatch) => {
  try {
    dispatch({ type: AUTHOR_LIST_REQUEST });
    const { data } = await AuthorApi.getAll(props);

    dispatch({
      type: AUTHOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTHOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAuthor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AUTHOR_DELETE_REQUEST,
    });
    const data = await AuthorApi.deleteAuthor(id);
    dispatch({
      type: AUTHOR_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTHOR_DELETE_FAIL,
      payload: message,
    });
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
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTHOR_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateAuthor = (Author) => async (dispatch) => {
  try {
    dispatch({
      type: AUTHOR_UPDATE_REQUEST,
    });

    const { data } = await AuthorApi.updateAuthor(Author);

    dispatch({
      type: AUTHOR_UPDATE_SUCCESS,
      payload: data,
    });
    // dispatch({ type: AUTHOR_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTHOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
