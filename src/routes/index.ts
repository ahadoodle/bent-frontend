// import Dashboard from "pages/Dashboard";
import Stake from "../pages/Stake";
import Lock from "pages/Lock";
import Consolidate from "pages/Consolidate";

// Pages
const authRoutes = [
  { path: "/stake", component: Stake },
  { path: "/lock", component: Lock },
  { path: "/dao", component: Consolidate },
  { path: "/", component: Stake },
];

export { authRoutes };
