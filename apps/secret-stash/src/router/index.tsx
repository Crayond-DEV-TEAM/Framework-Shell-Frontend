import { environmentRoutes } from '@core/routes';
import { AppLayout, Login, PageNotFound, RootLayout } from '@core/ui/components';
import { LoginLayout } from '@core/ui/components/secret-stash/loginLayout';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import Environments from '@pages/environments';
import LoginPage from '@pages/login';

const router = createBrowserRouter([
  {
    path: environmentRoutes.home,
    element: (
      <PrivateRouter>
        <RootLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: environmentRoutes.login,
        element: (
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        ),
      },
      {
        path: environmentRoutes.environment,
        element: (
          <AppLayout title="Secret Stash">
            <Environments />
          </AppLayout>
        ),
      },
    ],
  },
  {
    path: '*',
    errorElement: <ErrorBoundary />,
    element: <PageNotFound />,
  },
]);

function RouterApp() {
  return <RouterProvider router={router} />;
}

export default RouterApp;
