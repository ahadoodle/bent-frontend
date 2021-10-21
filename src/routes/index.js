import React from 'react';
import { Redirect } from 'react-router-dom';
// Dashboard
import Dashboard from '../pages/Dashboard';
//Pages
import Pages404 from '../pages/Utility/pages-404';
const userRoutes = [
  { path: '/pages-404', component: Pages404 },
];
const authRoutes = [
    { path: '', component: Dashboard },
    { path: '/dashboard', component: Dashboard },
    { path: '/pages-404', component: Pages404 },
];

export { userRoutes, authRoutes };