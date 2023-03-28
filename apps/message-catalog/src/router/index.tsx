import { messageRoutes, webRoutes } from '@core/routes';
import { AppLayout, LoginLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import ForgotPasswordPage from '@pages/forgotPassword';
import Home from '@pages/home';
import LanguageConfigPage from '@pages/languageConfig';
import LoginPage from '@pages/login';
import MessageGroup from '@pages/messageGroup';
import ResetPage from '@pages/resetPassword';
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
    ],
  },

  {
    path: messageRoutes.login,
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
    path: messageRoutes.resetPassword,
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
    path: messageRoutes.signup,
    errorElement: <ErrorBoundary />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LoginLayout>
            <SignUpPage />
          </LoginLayout>
        ),
      },
    ],
  },

  {
    path: messageRoutes.forgotpassword,
    errorElement: <ErrorBoundary />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LoginLayout>
            <ForgotPasswordPage />
          </LoginLayout>
        ),
      },
    ],
  },
  {
    path: messageRoutes.messagegroup,
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
            <MessageGroup />
          </AppLayout>
        ),
      },
    ],
  },
  {
    path: messageRoutes.languageConfig,
    errorElement: <ErrorBoundary />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <AppLayout>
            <LanguageConfigPage />
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
