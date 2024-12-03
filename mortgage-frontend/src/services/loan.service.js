import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/loan/getall');
}

const getAllByClientId = (clientId) => {
    return httpClient.get(`/loan/getallbyclientid/${clientId}`);
}

export default { getAll, getAllByClientId };