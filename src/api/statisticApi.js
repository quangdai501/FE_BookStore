import axiosClient from "./axiosClient";


const StatisticApi = {
    getAll: () => {
        const url = '/statistic';
        return axiosClient.get(url);
    },
    getTopSaleProduct: (by) => {
        const url = '/statistic/top-sale-product';
        return axiosClient.get(url, { params: by });
    },
    getRevenue: (by) => {
        const url = '/statistic/get-revenue';
        return axiosClient.get(url, { params: by });
    },
    getNewReviews: () => {
        const url = '/statistic/get-new-review';
        return axiosClient.get(url);
    },

}
export default StatisticApi