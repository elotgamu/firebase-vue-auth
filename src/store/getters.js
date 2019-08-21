/**
 * @typedef {Object} Getters
 * @property {function} isAuthenticated
 */

/**
 * @type {Getters}
 */
const getters = {
  /** @typedef {import ('./state').State} State */

  /** @param {State} state */
  isAuthenticated: state => state.tokenId !== null,
};

export default getters;
