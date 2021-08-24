const axios = require('axios');

const baseURL = 'http://localhost:8000/api/senang/location';

export default {
  getAllStates() {
    return axios.get(`${baseURL}/states`);
  },
  getAllAreas() {
    return axios.get(`${baseURL}/areas`);
  },
  getAllPostcodes() {
    return axios.get(`${baseURL}/postcodes`);
  },
  getStatesByID(id) {
    return axios.get(`${baseURL}/states/${id}`);
  },
  getAreasByID(id) {
    return axios.get(`${baseURL}/areas/${id}`);
  },
  getPostcodesByID(id) {
    return axios.get(`${baseURL}/postcodes/${id}`);
  },
};
