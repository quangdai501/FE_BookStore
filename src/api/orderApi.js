import axiosClient from "./axiosClient";

const OrderApi = {
    getAll: (id, type) => {
        return axiosClient.get(`/orders/mine/${id}?type=${type}`);
    },
    createOrderAndPay: (user_id, name, total, address, phone, billDetail, payment, coupon) => {
        return axiosClient.post('/payment/create_payment_url', { user_id, name, total, address, phone, billDetail, payment, coupon });
    },
    orderReturn: (params) => {
        return axiosClient.get(`/payment/vnpay_return${params}`);
    },
    createOrder: (user_id, name, total, address, phone, billDetail, payment, coupon) => {
        return axiosClient.post('/orders/createOrder', { user_id, name, total, address, phone, billDetail, payment, coupon });
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

    orderByStatus: (deliveryStatus) => {
        if (deliveryStatus === 'Tất cả') {
            return axiosClient.get('/orders');
        } else {
            return axiosClient.post('/orders/order-by-delivery-status', { deliveryStatus });
        }
    },
    sendEmail: (userInfo, cartItems) => {
        return axiosClient.post('/orders/sendmail', { userInfo, cartItems })
    }

}
export default OrderApi