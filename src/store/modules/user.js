// import router from '../../router/routes';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');

const state = {
  user: JSON.parse(localStorage.getItem('user')),
};
const getters = {
  user: state => {
    return state.user;
  },
};
const mutations = {
  getUser(state, payload) {
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
