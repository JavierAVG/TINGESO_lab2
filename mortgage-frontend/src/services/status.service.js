import httpClient from "../http-common";


const updateState = (id, status) => {
    return httpClient.put(`/status/updatestate/${id}?state=${status}`);
}

const get = id => {
    return httpClient.get(`/status/get/${id}`);
}

const getAll = () => {
    return httpClient.get('/status/getall');
}

export default { getAll, get, updateState };