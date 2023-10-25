import { webRoutes } from '@core/routes';
import { LoginLayout } from '@core/ui/components/onBoardComponents/loginLayout';
import {
  AdminSection,
  AppLayout,
  LanguageConfig,
  // LoginLayout,
  MessageTable,
  PageNotFound,
  RootLayout,
  SuperAdmin,
  UserManagement,
  UserSection,
  ApiDocumentation,
  AlertRules,
  // AlertConfiguration,
  Reports,
  AlertConfig,
} from '@core/ui/components';
// import { ApiDocumentation } from '@core/ui/components';

import ErrorBoundary from '@pages/errorBoundary';
import ForgotPasswordPage from '@pages/forgotPassword';
import Home from '@pages/home';
import LoginPage from '@pages/login';
import ResetPage from '@pages/resetPassword';
import SignUpPage from '@pages/signUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivateRouter } from './privateRouter';
import { Box } from '@mui/material';

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
          // <PrivateRouter>
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
          // </PrivateRouter>
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

      //role maps
      {
        path: webRoutes.admin,
        element: (
          <PrivateRouter>
            {/* <LoginLayout> */}
            <AdminSection />
            {/* </LoginLayout> */}
          </PrivateRouter>
        ),
      },
      {
        path: webRoutes.superAdmin,
        element: (
          // <LoginLayout>
          <SuperAdmin />
          // </LoginLayout>
        ),
      },
      {
        path: webRoutes.user,
        element: (
          // <LoginLayout>
          <UserSection />
          // </LoginLayout>
        ),
      },
      //message catlogue
      {
        path: webRoutes.messagegroup,
        element: (
          <AppLayout>
            <MessageTable />
          </AppLayout>
        ),
      },
      {
        path: webRoutes.languageConfig,
        element: (
          <AppLayout>
            <Box sx={{ width: '100%', maxWidth: '761px', margin: 'auto' }}>
              <LanguageConfig />
            </Box>
          </AppLayout>
        ),
      },
      //IDM
      {
        path: webRoutes.userManagment,
        element: (
          <AppLayout>
            <UserManagement />
          </AppLayout>
        ),
      },
      //Alerts Hub
      {
        path: webRoutes.reports,
        element: (
          <AppLayout title="Alerts Hub">
            <Reports />
          </AppLayout>
        ),
      },
      {
        path: webRoutes.alertRule,
        element: (
          <AppLayout title="Alerts Hub">
            <AlertRules />
          </AppLayout>
        ),
      },
      {
        path: webRoutes.apiDocumentation,
        element: (
          <AppLayout title="Alerts Hub">
            <ApiDocumentation />
          </AppLayout>
        ),
      },
      {
        path: webRoutes.alertConfig,
        element: (
          <AppLayout title="Alerts Hub">
            <AlertConfig />
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
