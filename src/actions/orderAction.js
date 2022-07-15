
import {
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_APPROVE_REQUEST,
    ORDER_APPROVE_SUCCESS,
    ORDER_APPROVE_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    GET_ORDER_BY_STATUS_REQUEST,
    GET_ORDER_BY_STATUS_SUCCESS,
    GET_ORDER_BY_STATUS_FAIL,
    SEND_MAIL_ORDER_REQUEST,
    SEND_MAIL_ORDER_SUCCESS,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_SUCCESS,
    ORDER_RESET,
} from '../constants/order';
import OrderApi from '../api/orderApi';
// danh sach don  hang da dat cua 1 user
const listOrderOfUser = (type) => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
        userLogin: { userInfo },
    } = getState();
    const id = userInfo._id;
    try {
        const { data } = await OrderApi.getAll(id, type);
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};
const getOrderByDeliveryStatus = (deliveryStatus) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_STATUS_REQUEST });
    try {
        const { data } = await OrderApi.orderByStatus(deliveryStatus);
        dispatch({ type: GET_ORDER_BY_STATUS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error
        dispatch({ type: GET_ORDER_BY_STATUS_FAIL, payload: message });
    }
}

const createOrder = (user_id, name, total, address, phone, billDetail, payment, navigate,coupon) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        // const { cart: { cartItems } } = getState();
        // for (let i = 0; i < cartItems.length; i++) {
        //     const { data } = await axiosClient.get('/products/' + cartItems[i].product);
        //     const quantity = data.quantity;
        //     let qty;
        //     if (quantity > 0) {
        //         qty = quantity - cartItems[i].qty;
        //     }
        //     await axiosClient.patch('/products/updateProductQuantity/' + cartItems[i].product, { qty });
        // }
        let data;
        if (payment === "Thanh toán online") {
            data = await OrderApi.createOrderAndPay(user_id, name, total, address, phone, billDetail, payment,coupon);
            const res = data
            if (res.data?.code === "00") {
                window.location.replace(res.data.data);
            }
        }
        else {
            data = await OrderApi.createOrder(user_id, name, total, address, phone, billDetail, payment,coupon);
            if (data) {
                navigate("/order-success", { replace: true })
            }
        }
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
};

const adminApproveOrder = (orderID, action) => async (dispatch) => {
    try {
        if (action === 'Duyet') {
            dispatch({ type: ORDER_APPROVE_REQUEST });
            const { data } = await OrderApi.orderApprove(orderID);
            if (data) {
                dispatch({
                    type: ORDER_APPROVE_SUCCESS,
                    payload: { id: orderID, message: "Tạo đơn hàng thành công" }
                });
            }
        }
        else if (action === 'Huy') {
            dispatch({ type: ORDER_APPROVE_REQUEST });
            const { data } = await OrderApi.orderCancel(orderID);
            if (data) {
                dispatch({
                    type: ORDER_APPROVE_SUCCESS,
                    payload: { id: orderID, message: "Đã hủy đơn hàng" }
                });
            }
        }
        // setTimeout(() => dispatch({
        //     type: ORDER_RESET,
        // }), 3000);

    } catch (error) {
        const err =
            error.response &&
                error.response.data.message ?
                error.response.data.message.message ? error.response.data.message.message :
                    error.response.data.message : error

        dispatch({ type: ORDER_APPROVE_FAIL, payload: err });
        // setTimeout(() => dispatch({
        //     type: ORDER_RESET,
        // }), 3000);
    }
};

const orderDetail = (orderID) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    try {
        const { data } = await OrderApi.orderDetail(orderID);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.message
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }

}
const deleteOrder = (vnp_Params) => async (dispatch) => {
    try {
        await OrderApi.orderReturn(vnp_Params)
    } catch (error) {

    }
}

const sendMailOrder = (userInfo, cartItems) => async (dispatch) => {
    dispatch({ type: SEND_MAIL_ORDER_REQUEST });
    try {
        await OrderApi.sendEmail(userInfo, cartItems);
        dispatch({ type: SEND_MAIL_ORDER_SUCCESS });
    } catch (error) {

    }
}

export { listOrderOfUser, getOrderByDeliveryStatus, createOrder, orderDetail, adminApproveOrder, sendMailOrder, deleteOrder };

