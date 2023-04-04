import { alertsHubRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import ReportsHub from '@pages/reports';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';

const router = createBrowserRouter([
  {
    path: "/",
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
          <AppLayout>
            <ReportsHub />
          </AppLayout>
        ),
      },
      {
        path: alertsHubRoutes.reports,
        // element: (
        //   <AppLayout>
        //     <LanguageConfigPage />
        //   </AppLayout>
        // ),
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
