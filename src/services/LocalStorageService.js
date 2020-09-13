const { ACCESS_TOKEN } = require("../config/constants")

const _setToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

const _getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
}

const _removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
}

export default {
  setToken: _setToken,
  getToken: _getToken,
  removeToken: _removeToken,
}