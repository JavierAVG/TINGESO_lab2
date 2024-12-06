import httpClient from "../http-common";

const save = data => {
    return httpClient.post("/loan/save", data);
}

const update = data => {
    return httpClient.put("/loan/update", data);
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

const saveSavings = (data) => {
    return httpClient.post("loan/savings/save", data);
}

const getSavingsByLoanId = (loanid) => {
    return httpClient.get(`/loan/savings/getallbyloanid/${loanid}`);
}

const updateSavings = (data) => {
    return httpClient.put("/loan/savings/update", data);
}

export default { save, update, get, getAll, getAllByClientId, saveDocument, getDocumentsByLoanId, saveSavings, getSavingsByLoanId, updateSavings };