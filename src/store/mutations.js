const mutations = {
  USER_AUTHENTICATED: (state, payload) => {
    state.tokenId = payload.tokenId;
    state.userId = payload.userId;
    state.userEmail = payload.userEmail;
  },
  USER_LOGOUT: (state) => {
    state.tokenId = null;
    state.userId = null;
    state.userEmail = null;
  },
};

export default mutations;
