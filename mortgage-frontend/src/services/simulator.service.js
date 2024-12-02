import httpClient from "../http-common";

const simulate = (params) => {
    return httpClient.get('/simulator/', { params });
}

export default { simulate };