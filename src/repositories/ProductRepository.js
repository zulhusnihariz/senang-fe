const axios = require('axios');

const baseURL = 'http://localhost:8000/api/senang/product';

axios.defaults.headers.common['x-token'] = `Bearer ${
  JSON.parse(localStorage.getItem('user')).accessToken
}`;

export default {
  getAllProduct() {
    return axios.get(`${baseURL}/`);
  },
  filterProduct(data) {
    const query = Object.keys(data);
    let dynamicURL = `${baseURL}`;

    query.forEach((el, index) => {
      if (index === 0) dynamicURL = dynamicURL.concat(`?${el}=${data[el]}`);
      if (index > 0) dynamicURL = dynamicURL.concat(`&${el}=${data[el]}`);
    });

    console.log(dynamicURL);

    return axios.get(dynamicURL);

    // return axios.get(`${baseURL}?category_id=${data.category_id}`);
  },
  getProductByTextSearch(text) {
    return axios.get(`${baseURL}/search/${text}`);
  },
  getAllCategory() {
    return axios.get(`${baseURL}/category`);
  },

  getReviveProducts() {
    return axios.get('');
  },
};
