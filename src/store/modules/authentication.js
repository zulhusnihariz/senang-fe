const state = {
  // credentials: {
  //   email: null,
  //   password: null,
  // },
  user: {
    data: JSON.parse(localStorage.getItem('user')),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
  },
};
const getters = {
  // credentials: state => {
  //   return state.credentials;
  // },
  user: state => {
    return state.user;
  },
};
const mutations = {
  // setCredentials(state, payload) {
  //   state.credentials.email = payload.email;
  //   state.credentials.password = payload.password;
  // },
  setUser(state, payload) {
    state.user.data = payload.user;
    state.user.isAuthenticated = payload.token;
  },
  removeUser(state) {
    state.user.data = null;
    state.user.isAuthenticated = null;
  },
};
const actions = {
  // setCredentials({ commit }, payload) {
  //   commit('setCredentials', payload);
  // },

  setUser({ commit }, payload) {
    if (payload && payload.token) {
      localStorage.setItem('user', JSON.stringify(payload.user));
      localStorage.setItem('isAuthenticated', true);
    }
    commit('setUser', payload);
  },
  removeUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    commit('setUser');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
