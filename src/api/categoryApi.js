import axiosClient from "./axiosClient";


const CategoryApi = {
    getAll: (params) => {
        const url = '/category';
        return axiosClient.get(url, { params });
    },
    getCategory: (id) => {
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
}
export default CategoryApi