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
}
export default AuthorApi