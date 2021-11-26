
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
} from '../constants/order';
import { CART_CLEAR_ITEMS } from '../constants/cart';
import OrderApi from '../api/orderApi';
// danh sach don  hang da dat cua 1 user
const listOrderOfUser = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    const id = userInfo._id;
    try {
        const { data } = await OrderApi.getAll(id);
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response.data.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
};

const createOrder = (user_id, name, total, address, phone, billDetail, payment) => async (dispatch, getState) => {

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
        const data = await OrderApi.createOrder(user_id, name, total, address, phone, billDetail, payment);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });
        dispatch({ type: CART_CLEAR_ITEMS })
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
                    payload: data
                });

            }
        }
        else if (action === 'Huy') {
            dispatch({ type: ORDER_APPROVE_REQUEST });
            const { data } = await OrderApi.orderCancel(orderID);
            if (data) {
                dispatch({
                    type: ORDER_APPROVE_SUCCESS,
                    payload: data
                });

            }
        }


    } catch (error) {
        dispatch({ type: ORDER_APPROVE_FAIL, payload: error.message });
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


export { listOrderOfUser, createOrder, orderDetail, adminApproveOrder };

