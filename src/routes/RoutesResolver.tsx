import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'routes/routes';
import Root from 'pages/Root';

const Home = lazy(() => import(/* webpackPrefetch: true */ 'pages/Home'));

export const RoutesResolver = () => (
  <Routes>
    <Route path={ROUTES.home} element={<Root />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
);
