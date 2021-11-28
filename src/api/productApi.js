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

    addProduct: (product) => {
        const url = `/products/addProduct`;

        return axiosClient.post(url, product);
    },
    deleteProductByID: (id) => {
        const url = `/products/deleteProduct/${id}`;

        return axiosClient.delete(url);
    },
    updateProductByID: (product) => {
        const url = `/products/updateProduct/${product._id}`;

        return axiosClient.patch(url, product);
    },
    updateProductQuantityByID: (id, qty) => {
        const url = `/products/updateProductQuantity/${id}`;

        return axiosClient.get(url, qty);
    },
    createReview: (review, id) => {
        const url = `/products/createreview/${id}`;
        return axiosClient.post(url, review);
    },
}
export default ProductApi