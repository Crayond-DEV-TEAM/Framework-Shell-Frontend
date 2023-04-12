import { alertsHubRoutes } from '@core/routes';
import { ApiDocumentation, AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import AlertConfiguration from '@pages/alertConfiguration';
import AlertRule from '@pages/alertRule';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import ReportsHub from '@pages/reports';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
        element: <Home />,
      },
      {
        path: alertsHubRoutes.reports,
        element: (
          <AppLayout title="Alerts Hub">
            <ReportsHub />
          </AppLayout>
        ),
      },
      {
        path: alertsHubRoutes.alertRule,
        element: (
          <AppLayout title="Alerts Hub">
            <AlertRule />
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
            <AlertConfiguration />
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
