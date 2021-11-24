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
    addCategory: (name) => {
        const url = '/category';
        return axiosClient.post(url, { name });
    },
    updateCategory: (id, name) => {
        const url = `/category/${id}`;
        return axiosClient.patch(url, { name });
    },
    deleteCategory: (id) => {
        const url = `/category/${id}`;
        return axiosClient.delete(url);
    },
}
export default CategoryApi