import { messageRoutes, userManageRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserManagementPage from '@pages/userManage';

const router = createBrowserRouter([
  {
    // path: userManageRoutes,
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" paddingElement={{ padding: '7px 0px 0px 50px' }}>
          <UserManagementPage />
        </AppLayout>
        {/* <RootLayout /> */}
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
    path: userManageRoutes.userManagement,
    element: (
      <AppLayout title="IDM" paddingElement={{ padding: '7px 0px 0px 50px' }}>
        <UserManagementPage />
      </AppLayout>
    ),
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
