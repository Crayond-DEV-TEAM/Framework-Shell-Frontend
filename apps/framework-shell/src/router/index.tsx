import { webRoutes } from '@core/routes';
import { AppLayout, LoginLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import LoginPage from '@pages/login';
import ResetPage from '@pages/resetPassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivateRouter } from './privateRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRouter>
        <RootLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <AppLayout>
            <Home />
          </AppLayout>
        ),
      },
    ],
  },

  {
    path: webRoutes.login,
    element: (
      <PrivateRouter>
        <RootLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        ),
      },
    ],
  },
  {
    path: webRoutes.resetPassword,
    errorElement: <ErrorBoundary />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LoginLayout>
            <ResetPage />
          </LoginLayout>
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
