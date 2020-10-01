import {
  ACCESS_TOKEN,
  ROLE,
  ADMIN_ROLE,
  LAB_USER_ROLE,
  USER_ROLE,
} from "../config/constants";

const _setToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

const _getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const _removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ROLE);
};

const _setRole = (roles) => {
  if (roles.includes(ADMIN_ROLE)) {
    localStorage.setItem(ROLE, ADMIN_ROLE);
  } else if (roles.includes(LAB_USER_ROLE)) {
    localStorage.setItem(ROLE, LAB_USER_ROLE);
  } else {
    localStorage.setItem(ROLE, USER_ROLE);
  }
};

const _getRole = (role) => {
  return localStorage.getItem(ROLE);
};

export default {
  setToken: _setToken,
  getToken: _getToken,
  removeToken: _removeToken,
  setRole: _setRole,
  getRole: _getRole,
};
