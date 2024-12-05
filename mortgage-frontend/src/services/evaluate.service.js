import httpClient from "../http-common";

const evaluate = (data) => {
    return httpClient.post("/evaluation/evaluate", data);
}

export default { evaluate };