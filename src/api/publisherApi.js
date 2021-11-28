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

        return axiosClient.post(url, name);
    },
    updatePublisher: (publisher) => {
        const url = `/publisher/${publisher._id}`;

        return axiosClient.patch(url, publisher);
    },
    deletePublisher: (id) => {
        const url = `/publisher/${id}`;

        return axiosClient.delete(url);
    },
}
export default PublisherApi