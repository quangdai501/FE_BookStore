import axiosClient from "./axiosClient";


const PublisherApi = {
    getAll: (params) => {
        const url = '/publisher';
        return axiosClient.get(url, { params });
    },
    getPublisher: (id) => {
        const url = `/publisher/${id}`;
        return axiosClient.get(url);
    },
    addPublisher: (token, name) => {
        const url = '/publisher';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.post(url, name, config);
    },
    updatePublisher: (token, publisher) => {
        const url = `/publisher/${publisher._id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.patch(url, publisher, config);
    },
    deletePublisher: (token, id) => {
        const url = `/publisher/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return axiosClient.delete(url, config);
    },
}
export default PublisherApi