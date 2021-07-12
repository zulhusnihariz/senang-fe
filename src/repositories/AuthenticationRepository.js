const axios = require('axios');

const baseURL = 'http://localhost:8000/api/senang/auth';

export default {
  login(credentials) {
    return axios.post(`${baseURL}/login`, credentials);
  },
  register(credentials) {
    return axios.post(`${baseURL}/register`, credentials);
  },
  changePassword(credentials) {
    return axios.post(`${baseURL}/password`, credentials);
  },
};
