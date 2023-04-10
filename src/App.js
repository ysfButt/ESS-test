import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import _ from 'lodash';

// Components
import NotFound from './components/NotFound';
import Loader from './components/Loader';

// Layouts
import AppLayout from './layouts/app';

// Routes
import appRoutes from './routes';

const App = (props) => {
  return (
    <Router>
      <Suspense fallback={() => <Loader />}>
        <AppLayouts {...props} />
      </Suspense>
    </Router>
  );
}

export default App;

const AppLayouts = (props) => {
  let Layout = null;
  let routes = [];

  if (_.sum(_.map(appRoutes, r => r.layout && window.location.pathname === r.path && r))) {
    Layout = AppLayout;
    routes = _.compact(_.map(appRoutes, r => r.layout && r));
  } else if (_.sum(_.map(appRoutes, r => !r.layout && window.location.pathname === r.path && r))) {
    routes = _.compact(_.map(appRoutes, r => !r.layout && r));
  }

  if (Layout) {
    return <Layout {...props} routes={routes} />
  } else if (routes && routes.length > 0) {
    return (
      <Routes>

        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={<route.component {...props} />}
            exact={route.exact}
          />
        ))}
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={'*'} element={<NotFound />}></Route>
    </Routes>
  );
};
