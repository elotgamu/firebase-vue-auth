const mutations = {
  /** @typedef {import ('./state').State} State */
  /**
   * @param {State} state
   * @param {Object} payload
   * */
  USER_AUTHENTICATED: (state, payload) => {
    state.tokenId = payload.tokenId;
    state.userId = payload.userId;
    state.userEmail = payload.userEmail;
  },
  /** @typedef {import ('./state').State} State */
  /**
   * @param {State} state
   */
  USER_LOGOUT: (state) => {
    state.tokenId = null;
    state.userId = null;
    state.userEmail = null;
  },
};

export default mutations;
