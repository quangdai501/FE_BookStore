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
        return axiosClient.post(url, name);
    },
    updateAuthor: (author) => {
        const url = `/author/${author._id}`;
        return axiosClient.patch(url, author);
    },
    deleteAuthor: (id) => {
        const url = `/author/${id}`;
        return axiosClient.delete(url);
    },

}
export default AuthorApi