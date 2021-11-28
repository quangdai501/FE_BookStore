import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_APPROVE_REQUEST,
    ORDER_APPROVE_SUCCESS,
    ORDER_APPROVE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    GET_ORDER_BY_STATUS_REQUEST,
    GET_ORDER_BY_STATUS_SUCCESS,
    GET_ORDER_BY_STATUS_FAIL,
    SEND_MAIL_ORDER_REQUEST,
    SEND_MAIL_ORDER_SUCCESS

} from '../constants/order';

const userOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MINE_LIST_REQUEST:
            return { loading: true };
        case ORDER_MINE_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_MINE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


function createOrderReducer(state = { createOrderProcess: false }, action) {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { createOrderProcess: true };
        case ORDER_CREATE_SUCCESS:
            return {
                createOrderProcess: false,
                order: action.payload
            };
        case ORDER_CREATE_FAIL:
            return { createOrderProcess: false, error: action.error };
        default:
            return state;
    }
};


//duyet don hang
const OrderApprove = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_APPROVE_REQUEST:
            return { loading: true };
        case ORDER_APPROVE_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_APPROVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;

    }
};
const OrderDetailReducer = (state = { order: { billDetail: [] } }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
const getOrderByDeliveryStatusReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_ORDER_BY_STATUS_REQUEST:
            return { loading: true };
        case GET_ORDER_BY_STATUS_SUCCESS:
            return { loading: false, orders: action.payload };
        case GET_ORDER_BY_STATUS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
const sendMailOrderReducer = (state = { sendingProcess: false }, action) => {
    switch (action.type) {
        case SEND_MAIL_ORDER_REQUEST:
            return { sendingProcess: true };
        case SEND_MAIL_ORDER_SUCCESS:
            return { sendingProcess: false };
        default:
            return state;
    }
}
export {
    createOrderReducer,
    userOrderReducer,
    OrderApprove,
    OrderDetailReducer,
    getOrderByDeliveryStatusReducer,
    sendMailOrderReducer
};
