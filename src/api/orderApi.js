import axiosClient from "./axiosClient";

const OrderApi = {
    getAll: (id) => {
        return axiosClient.get('/orders/mine/' + id);
    },
    createOrder: (user_id, name, total, address, phone, billDetail, payment) => {
        return axiosClient.post('/orders/createOrder', { user_id, name, total, address, phone, billDetail, payment });
    },
    orderDetail: (orderID) => {
        return axiosClient.get('/orders/admin/orderDetail/' + orderID)
    },
    orderApprove: (orderID) => {
        return axiosClient.patch('/orders/admin/' + orderID)
    },
    orderCancel: (orderID) => {
        return axiosClient.patch('/orders/admin/cancelOrder/' + orderID)
    }
}
export default OrderApi