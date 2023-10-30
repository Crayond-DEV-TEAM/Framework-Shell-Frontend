import { webRoutes } from '@core/routes';
import { PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivateRouter } from './privateRouter';

// Host app / Shell Routes
import { loginRoutes, userRoutes } from './frameworkShell';

// App Routes
import { messageCatalogueRoutes } from './messageCatalogue';
import { idmRoutes } from './userManagement';
import { alertsHubRoutes } from './alertsHub';

const router = createBrowserRouter([
  ...loginRoutes,
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
      ...userRoutes,
      ...messageCatalogueRoutes,
      ...idmRoutes,
      ...alertsHubRoutes,
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
