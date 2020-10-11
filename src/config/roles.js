import Login from "../containers/pages/Login/Login";
import Signup from "../containers/pages/Signup/Signup";
import Home from "../containers/pages/Welcome/Welcome";
import Search from "../containers/pages/SearchPage/SearchPage";
import Graph from "../containers/pages/Statistics/Graph";
import Forenseq from "../containers/pages/Upload/Forenseq";
import CEData from "../containers/pages/Upload/CEData";
import PersonUpload from "../containers/pages/Upload/Person";
import SequenceAlignment from "../containers/pages/SequenceAlignment/SequenceAlignment";
import ISNPPage from "../containers/pages/Statistics/Protected/ISNPStats";
import { ADMIN_ROLE, LAB_USER_ROLE, USER_ROLE } from "./constants";

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
    url: "/upload/forenseq",
    page: Forenseq,
  },
  ceData: {
    url: "/upload/cedata",
    page: CEData,
  },
  personUpload: {
    url: "/upload/person",
    page: PersonUpload,
  },
  sequenceAlignment: {
    url: "/full/seq-align",
    page: SequenceAlignment,
  },
  isnp: {
    url: "/stats/isnp",
    page: ISNPPage,
  }
};

export default {
  guest: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
  [USER_ROLE]: [pages.home, pages.login, pages.search, pages.signup, pages.graph],
  [LAB_USER_ROLE]: [
    pages.home,
    pages.login,
    pages.search,
    pages.signup,
    pages.graph,
    pages.excelUpload,
    pages.ceData,
    pages.personUpload,
    pages.isnp,
  ],
  [ADMIN_ROLE]: [...Object.values(pages)],
};
