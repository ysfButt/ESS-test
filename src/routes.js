import { lazy } from 'react';

// Layouts
import AppLayout from 'layouts/app';

// Components
const Home = lazy(() => import("./pages/Home"));

const routes = [
  {
    path: '/',
    component: Home,
    layout: AppLayout,
    exact: true,
  },
];

export default routes;
