import axiosClient from "./axiosClient";

const OrderApi = {
    getAll: (id) => {
        return axiosClient.get('/orders/mine/' + id);
    },
    createOrderAndPay: (user_id, name, total, address, phone, billDetail, payment) => {
        return axiosClient.post('/payment/create_payment_url', { user_id, name, total, address, phone, billDetail, payment });
    },
    createOrder: (user_id, name, total, address, phone, billDetail, payment) => {
        return axiosClient.post('/orders/createOrder', { user_id, name, total, address, phone, billDetail, payment });
    },
    orderDetail: (orderID) => {
        return axiosClient.get('/orders/admin/orderDetail/' + orderID)
    },
    orderApprove: (orderID) => {
        return axiosClient.post('/orders/admin/' + orderID)
    },
    orderCancel: (orderID) => {
        return axiosClient.patch('/orders/admin/cancelOrder/' + orderID)
    },

    orderByStatus: (diliveryStatus) => {
        if (diliveryStatus === 'Tất cả') {
            return axiosClient.get('/orders');
        } else {
            return axiosClient.post('/orders/order-by-delivery-status', { diliveryStatus });
        }
    }

}
export default OrderApi