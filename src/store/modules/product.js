// import router from '../../router/routes';

const state = {
  products: [],
  categories: [],
  currentCart: JSON.parse(localStorage.getItem('cart')) || [],
};
const getters = {
  products: state => {
    return state.products;
  },
  categories: state => {
    return state.categories;
  },

  currentCart: state => {
    return state.currentCart;
  },
};
const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },

  setCurrentCart(state, payload) {
    console.log(state.currentCart);
    const index = state.currentCart.findIndex(el => el.productId === payload.productId);

    // Check for existing cart in local storage
    if (!!state.currentCart.length && index >= 0) {
      // if cart exists and product is currently inside the cart
      // update payload quantity to be the same as existing quantity
      // remove existing product data and replace with the new product data
      payload.quantity = state.currentCart[index].quantity + 1;
      state.currentCart.splice(index, 1, payload); // remove 1 item at given index and replace with payload
    } else if (!!state.currentCart.length && index === -1) {
      // if cart exists but product is currently not inside the cart
      // set product quantity to 1 and add the new product to existing cart
      payload.quantity = 1;
      state.currentCart = [...state.currentCart, payload];
    } else {
      // if cart does not exists in local storage, send product payload as array
      payload.quantity = 1;
      state.currentCart = [payload];
    }

    localStorage.setItem('cart', JSON.stringify(state.currentCart));
  },
};
const actions = {
  async setProducts({ commit }, payload) {
    commit('setProducts', payload);
  },
  async setCategories({ commit }, payload) {
    commit('setCategories', payload);
  },
  async addProductToCart({ commit }, payload) {
    commit('setCurrentCart', payload);

    // Check if product id exists
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
