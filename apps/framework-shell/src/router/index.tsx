import { webRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import ForgotPasswordPage from '@pages/forgotPassword';
import Home from '@pages/home';
import LoginPage from '@pages/login';
import SignUpPage from '@pages/signUp';
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
      {
        path: webRoutes.login,
        errorElement: <ErrorBoundary />,
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: webRoutes.signup,
        errorElement: <ErrorBoundary />,
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: webRoutes.forgotpassword,
        errorElement: <ErrorBoundary />,
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <ForgotPasswordPage />,
          },
        ],
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
