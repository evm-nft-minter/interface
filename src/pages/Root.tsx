import { Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';

export default () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
