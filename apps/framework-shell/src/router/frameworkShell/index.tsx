import { webRoutes } from '@core/routes';
import {
  AdminSection,
  AppLayout,
  LoginLayout,
  ResetPassword,
  SuperAdmin,
  SuperAdminTabs,
  UserSection,
} from '@core/ui/components';
import LoginPage from '@pages/login';
import ResetPage from '@pages/resetPassword';
import SignUpPage from '@pages/signUp';
import ForgotPasswordPage from '@pages/forgotPassword';
import { PrivateRouter } from '@router/privateRouter';

// Login Routes
export const loginRoutes = [
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
        <ResetPassword />
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
];

// User Routes
export const userRoutes = [
  {
    path: webRoutes.admin,
    element: (
      <PrivateRouter>
        <AppLayout sideBarSection={false} mainelement={{ padding: '75px 0px 0px 0px', height: '100vh' }}>
          <SuperAdminTabs />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.superAdmin,
    element: (
      <PrivateRouter>
        <AppLayout sideBarSection={false} mainelement={{ padding: '75px 20px 0px 20px', height: '100vh' }}>
          <SuperAdmin />
        </AppLayout>
      </PrivateRouter>
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
];
