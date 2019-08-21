import authService from '../services/authService';

const API_KEY = process.env.VUE_APP_FIREBASE_APP_KEY;

const actions = {
  login: ({ commit, dispatch }, payload) => {
    authService
      .post(`/accounts:signInWithPassword?key=${API_KEY}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      })
      .then((result) => {
        const { data } = result;
        commit('USER_AUTHENTICATED', {
          tokenId: data.idToken,
          userId: data.localId,
          userEmail: data.email,
        });

        const now = new Date();
        const tokenExpiration = new Date(now.getTime() + data.expiresIn * 1000);
        localStorage.setItem('userToken', data.idToken);
        localStorage.setItem('tokenExpiresIn', tokenExpiration);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.localId);
        // dispatch('setLogoutTimer', data.expiresIn);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default actions;
