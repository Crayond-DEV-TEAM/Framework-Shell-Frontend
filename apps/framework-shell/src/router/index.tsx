import { planSubscriptionRoutes, webRoutes } from '@core/routes';
import { AppLayout, MyProfile, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PrivateRouter } from './privateRouter';

// Host app / Shell Routes
import { loginRoutes, userRoutes } from './frameworkShell';

// App Routes
import { idmRoutes } from './userManagement';

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
      ...idmRoutes,
    ],
  },
  {
    path: '*',
    errorElement: <ErrorBoundary />,
    element: <PageNotFound />,
  },
  {
    path: '/profile',
    element: (
      <AppLayout
        sideBarSection={false}
        mainelement={{ p: '0px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <MyProfile />
      </AppLayout>
    ),
  },
]);

function RouterApp() {
  return <RouterProvider router={router} />;
}

export default RouterApp;
