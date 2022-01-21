// Dashboard
import Dashboard from "../pages/Dashboard";
import Claim from "../pages/Claim";
import Lock from "pages/Lock";

// Pages
const authRoutes = [
  { path: "/stake", component: Dashboard },
  { path: "/claim", component: Claim },
  { path: "/lock", component: Lock },
  { path: "/", component: Dashboard },
];

export { authRoutes };
