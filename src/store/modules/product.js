// import router from '../../router/routes';

const state = {
  products: [],
  categories: [],
};
const getters = {
  products: state => {
    return state.products;
  },
  categories: state => {
    return state.categories;
  },
};
const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
};
const actions = {
  async setProducts({ commit }, payload) {
    commit('setProducts', payload);
  },
  async setCategories({ commit }, payload) {
    console.log('inside store', payload);

    commit('setCategories', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
