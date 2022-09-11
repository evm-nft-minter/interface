import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'routes/routes';
import Root from 'pages/Root';

const Home = lazy(() => import(/* webpackPrefetch: true */ 'pages/Home'));
const Create = lazy(() => import(/* webpackPrefetch: true */ 'pages/Create'));
const CreateItem = lazy(() => import(/* webpackPrefetch: true */ 'pages/CreateItem'));
const Collected = lazy(() => import(/* webpackPrefetch: true */ 'pages/Collected'));
const CommunityNft = lazy(() => import(/* webpackPrefetch: true */ 'pages/CommunityNft'));

export const RoutesResolver = () => (
  <Routes>
    <Route path={ROUTES.home} element={<Root />}>
      <Route index element={<Home />} />

      <Route path={ROUTES.create.index}>
        <Route index element={<Create />} />
        <Route path={ROUTES.create.item} element={<CreateItem />} />
        <Route path={ROUTES.create.collection} element={<>Collection</>} />
      </Route>

      <Route path={ROUTES.collected} element={<Collected />} />

      <Route
        path={ROUTES.communityNft}
        element={<CommunityNft />}
      />

      <Route path="*" />
    </Route>
  </Routes>
);
