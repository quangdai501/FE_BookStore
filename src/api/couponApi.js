import axiosClient from "./axiosClient";


const couponApi = {
    getAll: (params) => {
        const url = '/coupons';
        return axiosClient.get(url, { params });
    },
    isValidCoupon: (params) => {
        const url = `/coupons/is-valid`;
        return axiosClient.get(url, { params });
    },
    addCoupon: (data) => {
        const url = '/coupons';
        return axiosClient.post(url, data);
    },
    updateCoupon: (coupon) => {
        const url = `/coupons/${coupon._id}`;
        return axiosClient.patch(url, coupon);
    },
    deleteCoupon: (id) => {
        const url = `/coupons/${id}`;
        return axiosClient.delete(url);
    },

}
export default couponApi