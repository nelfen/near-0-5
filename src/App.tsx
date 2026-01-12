import { MainLayout } from '@components';
import { ROUTES_PATHS } from '@constants';
import { MainPage, NotFound } from '@pages';
import { Route, Routes } from 'react-router';

function App() {
  const ROUTES = [
    {
      element: <MainPage />,
      path: ROUTES_PATHS.MAIN,
    },
    {
      element: <NotFound />,
      path: ROUTES_PATHS.NOT_FOUND,
    },
  ];

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES.map(route => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
