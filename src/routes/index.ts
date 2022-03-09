// import Dashboard from "pages/Dashboard";
import Stake from "../pages/Stake";
import Lock from "pages/Lock";

// Pages
const authRoutes = [
  { path: "/stake", component: Stake },
  { path: "/lock", component: Lock },
  { path: "/", component: Stake },
];

export { authRoutes };
