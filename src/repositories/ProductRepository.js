const axios = require('axios');

const baseURL = 'http://localhost:8000/api/senang/product';

export default {
  getAllProduct() {
    return axios.get(`${baseURL}/`);
  },
  filterProductByCategory(data) {
    return axios.get(`${baseURL}?category_id=${data.category_id}`);
  },
  getAllCategory() {
    return axios.get(`${baseURL}/category`);
  },
};
