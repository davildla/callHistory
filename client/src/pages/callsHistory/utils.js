import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const getCallsHistory = (page, search = '') => {
    return new Promise((resolve, reject) => {
        axios.get(`${SERVER_URL}/api/calls/list-calls?page=${page}&searchText=${search}`)
        .then(({data}) => resolve(data))
        .catch((err) => reject(err));
    })
};


export {
    getCallsHistory,
}