/**
 * @typedef {import (../store).state} state
 *
 * @return  {object}
 */
export default {
  isAuthenticated: state => state.tokenId !== null,
};
