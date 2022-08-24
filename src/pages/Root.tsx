import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';

export default () => {
  return (
    <Layout>
      <Suspense fallback={<>loading...</>}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};
