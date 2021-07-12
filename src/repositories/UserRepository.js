const axios = require('axios');

const baseURL = 'http://localhost:8000/api/senang/user';

export default {
  getAllUser() {
    return axios.get(`${baseURL}/`);
  },
  getUserById(id) {
    return axios.get(`${baseURL}/${id}`);
  },
  postUser(data) {
    return axios.post(`${baseURL}/`, data);
  },
  patchUser(id, data) {
    return axios.patch(`${baseURL}/${id}`, data);
  },
  deleteUser(id, data) {
    return axios.delete(`${baseURL}/${id}`, data);
  },
};
