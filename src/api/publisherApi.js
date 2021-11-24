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
    addPublisher: (name) => {
        const url = '/publisher';
        return axiosClient.post(url, { name });
    },
    updatePublisher: (id, name) => {
        const url = `/publisher/${id}`;
        return axiosClient.patch(url, { name });
    },
    deletePublisher: (id) => {
        const url = `/publisher/${id}`;
        return axiosClient.delete(url);
    },
}
export default PublisherApi