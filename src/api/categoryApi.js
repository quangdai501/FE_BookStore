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
    addCategory: (token, name) => {
        const url = '/category';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.post(url, name, config);
    },
    updateCategory: (token, category) => {
        const url = `/category/${category._id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.patch(url, category, config);
    },
    deleteCategory: (token, id) => {
        const url = `/category/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.delete(url, config);
    },
}
export default CategoryApi