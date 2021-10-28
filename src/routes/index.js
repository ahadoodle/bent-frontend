import React from "react";
import { Redirect } from "react-router-dom";
// Dashboard
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Claim from "../pages/Claim";
import LockCvx from "../pages/LockCvx";

//Pages
import Pages404 from "../pages/Utility/pages-404";
const userRoutes = [{ path: "/pages-404", component: Pages404 }];
const authRoutes = [
  { path: "/stake", component: Dashboard },
  { path: "/claim", component: Claim },
  { path: "/lock-cvx", component: LockCvx },
  { path: "/pages-404", component: Pages404 },
  { path: "/", component: Dashboard },
  `1`,
];

export { userRoutes, authRoutes };
