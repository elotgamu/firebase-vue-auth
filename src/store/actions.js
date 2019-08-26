import authService from '../services/authService';
import firebaseApi from '../services/firebaseApi';

const API_KEY = process.env.VUE_APP_FIREBASE_APP_KEY;

const actions = {
  /**
   * Saves a new user in firebase user
   *
   * @param   {function}  commit      [commit description]
   * @param   {function}  dispatch    [dispatch description]
   * @param   {[type]}  signupData  Data from sign up form
   */
  signup: ({ commit, dispatch }, signupData) => {
    return authService
      .post(`/accounts:signUp?key=${API_KEY}`, {
        email: signupData.email,
        password: signupData.password,
        returnSecureToken: true
      })
      .then(result => {
        const { data } = result;
        commit('USER_AUTHENTICATED', {
          tokenId: data.idToken,
          userId: data.localId,
          userEmail: data.email
        });
        const now = new Date();
        const tokenExpiration = new Date(now.getTime() + data.expiresIn * 1000);
        localStorage.setItem('userToken', data.idToken);
        localStorage.setItem('tokenExpiresIn', tokenExpiration);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.localId);
        dispatch('store_user', signupData);
        dispatch('setLogoutTimer', data.expiresIn * 1000);
      })
      .catch(error => console.log(error));
  },
  /**
   * Logs a user in
   * @param   {function}  commit     Vuex commit method
   * @param   {function}  dispatch   Vuex dispatch method
   * @param   {Object}  loginData  Data from login form
   */
  login: ({ commit, dispatch }, loginData) => {
    return authService
      .post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email: loginData.email,
        password: loginData.password,
        returnSecureToken: true
      })
      .then(result => {
        const { data } = result;
        commit('USER_AUTHENTICATED', {
          tokenId: data.idToken,
          userId: data.localId,
          userEmail: data.email
        });

        const now = new Date();
        const tokenExpiration = new Date(now.getTime() + data.expiresIn * 1000);
        localStorage.setItem('userToken', data.idToken);
        localStorage.setItem('tokenExpiresIn', tokenExpiration);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.localId);
        dispatch('setLogoutTimer', data.expiresIn * 1000);
      })
      .catch(err => {
        console.log(err);
      });
  },
  logout({ commit }) {
    commit('USER_LOGOUT');
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiresIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  },
  setLogoutTimer({ commit }, expiration) {
    setTimeout(() => {
      commit('USER_LOGOUT');
    }, expiration);
  },
  tryAutoLogin({ commit }) {
    const tokenId = localStorage.getItem('userToken');
    const expirationDate = localStorage.getItem('tokenExpiresIn');
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');

    if (!tokenId) {
      return;
    }
    if (expirationDate) {
      const now = new Date();
      const tokenExpirationDate = new Date(expirationDate);
      if (now > tokenExpirationDate) {
        console.log('No autologin');
        return;
      }

      console.log(`Autologin user since token is valid until: ${tokenExpirationDate}`);
      commit('USER_AUTHENTICATED', {
        tokenId,
        userId,
        userEmail
      });
    }
  },
  /** @typedef {import ('./state').State} State */

  /**
   * Stores the new user in Firebase DB
   * @param {State} state
   * @param {Object} userData
   */
  store_user({ state }, userData) {
    if (!state.tokenId) {
      return;
    }
    firebaseApi.post(`/users.json?auth=${state.tokenId}`, {
      email: userData.email,
      age: userData.age,
      country: userData.country,
      hobbies: userData.hobbies,
      terms: userData.terms
    });
  },
  fetchUsers({ state }) {
    if (!state.tokenId) {
      return;
    }
    firebaseApi
      .get(`/users.json?auth=${state.tokenId}`)
      .then(res => {
        console.log(res);
        const { data } = res;
        const users = [];

        // eslint-disable-next-line guard-for-in
        // eslint-disable-next-line no-restricted-syntax
        for (const key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        console.log(users);
      })
      .catch(error => console.log(error));
  }
};

export default actions;
