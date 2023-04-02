import { webRoutes } from '@core/routes';
import { LoginLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import ForgotPasswordPage from '@pages/forgotPassword';
import Home from '@pages/home';
import LoginPage from '@pages/login';
import ResetPage from '@pages/resetPassword';
import SignUpPage from '@pages/signUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivateRouter } from './privateRouter';

const router = createBrowserRouter([
  {
    path: webRoutes.root,
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
        path: webRoutes.login,
        element: (
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        ),
      },
      {
        path: webRoutes.signup,
        element: (
          <LoginLayout>
            <SignUpPage />
          </LoginLayout>
        ),
      },
      {
        path: webRoutes.resetPassword,
        element: (
          <LoginLayout>
            <ResetPage />
          </LoginLayout>
        ),
      },
      {
        path: webRoutes.forgotpassword,
        element: (
          <LoginLayout>
            <ForgotPasswordPage />
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
