import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LayoutRoutes = ({ routes, ...layoutProps }) => (
  <Routes>
    {/* Removes trailing slashes */}
    <Route
      path="/:url*(/+)"
      exact
      strict
      render={({ location }) => (
        <Navigate to={location.pathname.replace(/\/+$/, "")} />
      )}
    />
    {/* Removes duplicate slashes in the middle of the URL */}
    <Route
      path="/:url(.*//+.*)"
      exact
      strict
      render={({ match }) => (
        <Navigate to={`/${match.params.url.replace(/\/\/+/, "/")}`} />
      )}
    />  
    {
      routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          element={<route.component {...layoutProps} />}
          exact={route.exact}
          strict
        />
      ))
    }
  </Routes>
);

export default LayoutRoutes;
