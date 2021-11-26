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
    addAuthor: (token, name) => {
        const url = '/author';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.post(url, name, config);
    },
    updateAuthor: (token, author) => {
        const url = `/author/${author._id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.patch(url, author, config);
    },
    deleteAuthor: (token, id) => {
        const url = `/author/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.delete(url, config);
    },

}
export default AuthorApi