import axiosClient from "./axiosClient";


const AuthorApi = {
    getAll: (params) => {
        const url = '/author';
        return axiosClient.get(url, { params });
    },
    getAuthor: (id) => {
        const url = `/author/${id}`;
        return axiosClient.get(url);
    },
    addAuthor: (name) => {
        const url = '/author';
        return axiosClient.post(url, { name });
    },
    updateAuthor: (id, name) => {
        const url = `/author/${id}`;
        return axiosClient.patch(url, { name });
    },
    deleteAuthor: (id) => {
        const url = `/author/${id}`;
        return axiosClient.delete(url);
    },

}
export default AuthorApi