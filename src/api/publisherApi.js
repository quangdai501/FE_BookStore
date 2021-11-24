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
}
export default PublisherApi