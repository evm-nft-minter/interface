import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { App } from 'components/App';
import 'styles/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HistoryRouter history={createBrowserHistory({ window })}>
    <App />
  </HistoryRouter>,
);
