import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getContacts = (page, search = '') => {
    return new Promise((resolve, reject) => {
        axios.get(`${SERVER_URL}/api/contacts/list-contacts?page=${page}&searchText=${search}`)
        .then(({data}) => resolve(data))
        .catch((err) => reject(err));
    })
};

const addContact = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${SERVER_URL}/api/contacts/add-contact`, data)
        .then(({data}) => resolve(data))
        .catch((err) => reject(err));
    })
};

const editContact = (id, update) => {
    return new Promise((resolve, reject) => {
        axios.put(`${SERVER_URL}/api/contacts/update-contact/${id}`, update)
        .then(({data}) => resolve(data))
        .catch((err) => reject(err));
    })
};

const deleteContact = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${SERVER_URL}/api/contacts/delete-contact/${id}`)
        .then(({data}) => resolve(data))
        .catch((err) => reject(err));
    })
};

export {
    deleteContact,
    editContact,
    getContacts,
    addContact
}