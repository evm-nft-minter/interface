import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'routes/routes';
import Root from 'pages/Root';
import Home from 'pages/Home';
import Create from 'pages/Create';
import CreateItem from 'pages/CreateItem';
import Collected from 'pages/Collected';
import CommunityNft from 'pages/CommunityNft';

export const Router = () => (
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
