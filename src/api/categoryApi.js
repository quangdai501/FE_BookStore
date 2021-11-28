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
        return axiosClient.post(url, name);
    },
    updateCategory: (category) => {
        const url = `/category/${category._id}`;

        return axiosClient.patch(url, category);
    },
    deleteCategory: (id) => {
        const url = `/category/${id}`;
        return axiosClient.delete(url);
    },
}
export default CategoryApi