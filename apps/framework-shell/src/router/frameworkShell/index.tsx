import { webRoutes } from '@core/routes';
import { AdminSection, LoginLayout, SuperAdmin, UserSection } from '@core/ui/components';
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
];

// User Routes
export const userRoutes = [
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
];
