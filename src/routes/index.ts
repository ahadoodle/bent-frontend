// Dashboard
import Dashboard from "../pages/Dashboard";
import Claim from "../pages/Claim";
import LockCvx from "../pages/LockCvx";

// Pages
const authRoutes = [
  { path: "/stake", component: Dashboard },
  { path: "/claim", component: Claim },
  { path: "/lock-cvx", component: LockCvx },
  { path: "/", component: Dashboard },
];

export { authRoutes };
