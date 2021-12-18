import axiosClient from "./axiosClient";


const UserApi = {
    login: (email, password) => {
        const url = '/auth/login';
        return axiosClient.post(url, { email, password });
    },
    loginGoogle: (token) => {
        const url = '/auth/login-google';
        return axiosClient.post(url, { token });
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

    updateUserInfo: (id, user) => {
        const url = `/users/update-info/${id}`;

        return axiosClient.patch(url, user);
    },
    getUserInfoByID: () => {
        const url = `/users/getUser-info/`;

        return axiosClient.get(url);
    },
    getAllUsers: () => {
        const url = '/users';

        return axiosClient.get(url);
    },
    addUser: (code) => {
        const url = '/users/add-user';
        return axiosClient.post(url, { code });
    },
    updatePassword: (newPassword, oldPassword) => {
        const url = '/users/update-password';
        return axiosClient.patch(url, { newPassword, oldPassword });
    },
    deleteUser: (id) => {
        const url = `/users/${id}`;

        return axiosClient.delete(url);
    },
}
export default UserApi