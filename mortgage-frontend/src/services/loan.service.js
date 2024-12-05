import httpClient from "../http-common";

const save = data => {
    return httpClient.post("/loan/save", data);
}

const get = id => {
    return httpClient.get(`/loan/get/${id}`);
}

const getAll = () => {
    return httpClient.get('/loan/getall');
}

const getAllByClientId = (clientId) => {
    return httpClient.get(`/loan/getallbyclientid/${clientId}`);
}

const saveDocument = (loanid, name, file) => {
    const formData = new FormData();
    formData.append("loanid", loanid);
    formData.append("name", name);
    formData.append("file", file);

    return httpClient.post('/loan/document/save', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

const getDocumentsByLoanId = (loanid) => {
    return httpClient.get(`/loan/document/getallbyloanid/${loanid}`);
}

export default { save, get, getAll, getAllByClientId, saveDocument, getDocumentsByLoanId };