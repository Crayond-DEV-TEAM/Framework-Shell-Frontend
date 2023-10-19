import { messageRoutes, userManageRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserManagementPage from '@pages/userManage';
import React from 'react';
import { UserManagement } from '@crayond_dev/user-management-test';

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
        <UserManagement
          apiUrl="https://dev-idm-api.crayond.com/api/v1"
          onStatusChangeCallback={(data: any, v2: any) => {
            console.log('onStatusChangeCallback', data, v2);
          }}
          onEditRoleCallback={(data: any) => {
            console.log('onEditRoleCallback', data);
          }}
          onDeleteRoleCallback={(data: any) => {
            console.log('onDeleteRoleCallback', data);
          }}
          onAddRoleCallback={(data: any) => {
            console.log('onAddRoleCallback', data);
          }}
        />
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
