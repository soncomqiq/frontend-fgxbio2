import Login from "../containers/pages/login/Login";
import Signup from "../containers/pages/signup/Signup";
import Home from "../containers/pages/Welcome/Welcome";
import Search from "../containers/pages/SearchPage/SearchPage";

const pages = {
  login: {
    url: "/login",
    page: Login,
  },
  signup: {
    url: "/signup",
    page: Signup,
  },
  home: {
    url: "/",
    page: Home,
  },
  search: {
    url: "/search",
    page: Search,
  },
};

export default {
  guest: [pages.home, pages.login, pages.search, pages.signup],
  user: [pages.home, pages.login, pages.search, pages.signup],
  labUser: [pages.home, pages.login, pages.search, pages.signup],
};
