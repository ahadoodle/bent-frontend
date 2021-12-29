// Dashboard
import Dashboard from "../pages/Dashboard";
import Claim from "../pages/Claim";

// Pages
const authRoutes = [
  { path: "/stake", component: Dashboard },
  { path: "/claim", component: Claim },
  { path: "/", component: Dashboard },
];

export { authRoutes };
