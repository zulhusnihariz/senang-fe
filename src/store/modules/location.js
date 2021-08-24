// import router from '../../router/routes';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const LocationRepository = RepositoryFactory.get('location');

const state = {
  states: null,
  areas: null,
  postcodes: null,
};
const getters = {
  states: state => {
    return state.states;
  },
  areas: state => {
    return state.areas;
  },
  postcodes: state => {
    return state.postcodes;
  },
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};
const actions = {
  async getUser({ commit }, payload) {
    const localUser = JSON.parse(localStorage.getItem('user'));
    console.log('inside store getUser');

    if (localUser) {
      try {
        const user = await UserRepository.getUserById(localUser.id);

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user.data));

        commit('getUser', user.data);
      } catch (error) {
        console.error();
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
