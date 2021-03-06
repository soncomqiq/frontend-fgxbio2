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
import PersonList from "../containers/pages/Person/PersonList";
import Map from "../containers/pages/Statistics/Map";
import PersonEdit from "../containers/pages/Person/PersonEdit";
import { ADMIN_ROLE, LAB_USER_ROLE, USER_ROLE } from "./constants";
import Person from "../containers/pages/Person/Person";

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
  },
  personList: {
    url: "/persons",
    page: PersonList,
  },
  map: {
    url: "/stats/map",
    page: Map,
  },
  personEdit: {
    url: "/persons/:id",
    page: PersonEdit,
  },
  personView: {
    url: "/persons/:id/forenseq",
    page: Person,
  },
};

const roles = {
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
    pages.personList,
    pages.map,
    pages.personEdit,
    pages.personView,
  ],
  [ADMIN_ROLE]: [...Object.values(pages)],
};

export default roles;
