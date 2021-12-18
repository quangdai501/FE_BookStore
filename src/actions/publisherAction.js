import PublisherApi from "../api/publisherApi";
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
  PUBLISHER_DELETE_RESET,
  PUBLISHER_CREATE_RESET,
  PUBLISHER_CREATE_FAIL,
  PUBLISHER_CREATE_SUCCESS,
  PUBLISHER_CREATE_REQUEST,
  PUBLISHER_UPDATE_REQUEST,
  PUBLISHER_UPDATE_SUCCESS,
  PUBLISHER_UPDATE_FAIL,
  PUBLISHER_UPDATE_RESET,
} from "../constants/publisher";
// import { logout } from './userActions'

export const listPublishers = (props) => async (dispatch) => {
  try {
    dispatch({ type: PUBLISHER_LIST_REQUEST });
    const { data } = await PublisherApi.getAll(props);

    dispatch({
      type: PUBLISHER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUBLISHER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPublisherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PUBLISHER_DETAILS_REQUEST });

    const { data } = await PublisherApi.getPublisher(id);
    dispatch({
      type: PUBLISHER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PUBLISHER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePublisher = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLISHER_DELETE_REQUEST,
    });

    const data = await PublisherApi.deletePublisher(id);
    dispatch({
      type: PUBLISHER_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PUBLISHER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createPublisher = (name) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLISHER_CREATE_REQUEST,
    });

    const { data } = await PublisherApi.addPublisher(name);
    dispatch({
      type: PUBLISHER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PUBLISHER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updatePublisher = (Publisher) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLISHER_UPDATE_REQUEST,
    });

    const { data } = await PublisherApi.updatePublisher(Publisher);

    dispatch({
      type: PUBLISHER_UPDATE_SUCCESS,
      payload: data,
    });
    // dispatch({ type: PUBLISHER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PUBLISHER_UPDATE_FAIL,
      payload: message,
    });
  }
};
