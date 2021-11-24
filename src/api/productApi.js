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

    addProduct: (params) => {
        const url = `/products/addProduct`;
        return axiosClient.post(url.replace, { params });
    },
    deleteProductByID: (id) => {
        const url = `/products/deleteProduct/${id}`;
        return axiosClient.delete(url);
    },
    updateProductByID: (id, params) => {
        const url = `/products/updateProduct/${id}`;
        return axiosClient.patch(url, { params });
    },
    updateProductQuantityByID: (id, qty) => {
        const url = `/products/updateProductQuantity/${id}`;
        return axiosClient.get(url, { qty });
    },
}
export default ProductApi