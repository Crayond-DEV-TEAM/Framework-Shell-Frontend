import { messageRoutes, userManageRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserManagementPage from '@pages/userManage';
import React from 'react';
import { UserManagement } from '@crayond_dev/idm-components';

const router = createBrowserRouter([
  {
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" paddingElement={{ padding: '7px 0px 0px 50px' }}>
          <UserManagementPage />
        </AppLayout>
      </PrivateRouter>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: (
      <React.Fragment>
        <UserManagement apiUrl="https://dev-idm-api.crayond.com/api/v1" />
      </React.Fragment>
    ),
    path: '/test',
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
