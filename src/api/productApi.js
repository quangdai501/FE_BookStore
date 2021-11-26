import axiosClient from "./axiosClient";


const ProductApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getProduct: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    addProduct: (product, token) => {
        const url = `/products/addProduct`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.post(url, product, config);
    },
    deleteProductByID: (id, token) => {
        const url = `/products/deleteProduct/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.delete(url, config);
    },
    updateProductByID: (product, token) => {
        const url = `/products/updateProduct/${product._id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.patch(url, product, config);
    },
    updateProductQuantityByID: (id, qty, token) => {
        const url = `/products/updateProductQuantity/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.get(url, qty, config);
    },
    createReview: (review, token, id) => {
        const url = `/products/createreview/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.post(url, review, config);
    },
}
export default ProductApi