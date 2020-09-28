import Login from "../containers/pages/Login/Login";
import Signup from "../containers/pages/Signup/Signup";
import Home from "../containers/pages/Welcome/Welcome";
import Search from "../containers/pages/SearchPage/SearchPage";
import Graph from "../containers/pages/Statistics/Graph";

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
  graph: {
    url: "/stats/graph",
    page: Graph,
  },
};

export default {
  guest: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
  user: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
  labUser: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
};
