import axiosClient from "./axiosClient";


const UserApi = {
    login: (email, password) => {
        const url = '/auth/login';
        return axiosClient.post(url, { email, password });
    },
    confirmEmail: (name, email, password) => {
        const url = '/auth/confirm-email';
        return axiosClient.post(url, { name, email, password });
    },
    fogotPassword: (email) => {
        const url = '/auth/fogot-password';
        return axiosClient.post(url, { email });
    },
    entercCodeResetPass: (code) => {
        const url = '/auth/enter-code-reset-pass';
        return axiosClient.post(url, { code });
    },

    updateUserInfo: (id, user, token) => {
        const url = `/users/update-info/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.patch(url, user, config);
    },
    getUserInfoByID: (id, token) => {
        const url = `/users/getUser-info/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.get(url, config);
    },
    getAllUsers: () => {
        const url = '/users';
        return axiosClient.get(url);
    },
    addUser: (code) => {
        const url = '/users/add-user';
        return axiosClient.post(url, { code });
    },
    updatePassword: (email, password) => {
        const url = '/users/update-password';
        return axiosClient.patch(url, { email, password });
    },
    deleteUser: (id) => {
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    },
}
export default UserApi