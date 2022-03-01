import Dashboard from "pages/Dashboard";
import Stake from "../pages/Stake";
import Claim from "../pages/Claim";
import Lock from "pages/Lock";

// Pages
const authRoutes = [
  { path: "/stake", component: Stake },
  { path: "/claim", component: Claim },
  { path: "/lock", component: Lock },
  { path: "/", component: Dashboard },
];

export { authRoutes };
