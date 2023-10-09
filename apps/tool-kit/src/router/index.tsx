import { alertsHubRoutes, messageRoutes } from '@core/routes';
import {
  AdminSection,
  AlertConfig,
  AlertRules,
  ApiDocumentation,
  AppLayout,
  PageNotFound,
  Reports,
  RootLayout,
  UserManagement,
} from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import LanguageConfigPage from '@pages/languageConfig';
import MessageGroup from '@pages/messageGroup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';

const router = createBrowserRouter([
  {
    path: messageRoutes.home,
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
      //message catlogue
      {
        path: messageRoutes.messagegroup,
        element: (
          <AppLayout title="Tool Kit">
            <MessageGroup />
          </AppLayout>
        ),
      },
      {
        path: messageRoutes.languageConfig,
        element: (
          <AppLayout title="Tool Kit">
            <LanguageConfigPage />
          </AppLayout>
        ),
      },

      //IDM
      {
        path: messageRoutes.userManagement,
        element: (
          <AppLayout title="Tool Kit">
            <UserManagement />
          </AppLayout>
        ),
      },

      //Alerts hub
      {
        path: alertsHubRoutes.reports,
        element: (
          <AppLayout title="Alerts Hub">
            <Reports />
          </AppLayout>
        ),
      },
      {
        path: alertsHubRoutes.alertRule,
        element: (
          <AppLayout title="Alerts Hub">
            <AlertRules />
          </AppLayout>
        ),
      },
      {
        path: alertsHubRoutes.apiDocumentation,
        element: (
          <AppLayout title="Alerts Hub">
            <ApiDocumentation />
          </AppLayout>
        ),
      },
      {
        path: alertsHubRoutes.alertConfig,
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
