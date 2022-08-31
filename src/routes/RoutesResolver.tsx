import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'routes/routes';
import Root from 'pages/Root';

const Home = lazy(() => import(/* webpackPrefetch: true */ 'pages/Home'));
const Create = lazy(() => import(/* webpackPrefetch: true */ 'pages/Create'));
const Collected = lazy(() => import(/* webpackPrefetch: true */ 'pages/Collected'));
const CommunityNft = lazy(() => import(/* webpackPrefetch: true */ 'pages/CommunityNft'));

export const RoutesResolver = () => (
  <Routes>
    <Route path={ROUTES.home} element={<Root />}>
      <Route index element={<Home />} />

      <Route path={ROUTES.create} element={<Create />} />

      <Route path={ROUTES.collected} element={<Collected />} />

      <Route
        path={ROUTES.communityNft}
        element={<CommunityNft />}
      />

      <Route path="*" />
    </Route>
  </Routes>
);
