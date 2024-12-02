import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/client/save", data);
}

const getAll = () => {
    return httpClient.get('/client/getall');
}

const get = id => {
    return httpClient.get(`/client/get/${id}`);
}

export default { create, getAll, get };