import Login from "../containers/pages/Login/Login";
import Signup from "../containers/pages/Signup/Signup";
import Home from "../containers/pages/Welcome/Welcome";
import Search from "../containers/pages/SearchPage/SearchPage";
import Graph from "../containers/pages/Statistics/Graph";
import { ADMIN_ROLE, LAB_USER_ROLE, USER_ROLE } from "./constants";
import ExcelUpload from "../containers/pages/Upload/Excel";

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
  excelUpload: {
    url: "/upload/excel",
    page: ExcelUpload,
  },
};

export default {
  guest: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
  [USER_ROLE]: [
    pages.home,
    pages.login,
    pages.search,
    pages.signup,
    pages.graph,
  ],
  [LAB_USER_ROLE]: [
    pages.home,
    pages.login,
    pages.search,
    pages.signup,
    pages.graph,
    pages.excelUpload,
  ],
  [ADMIN_ROLE]: [
    pages.home,
    pages.login,
    pages.search,
    pages.signup,
    pages.graph,
    pages.excelUpload,
  ],
};
