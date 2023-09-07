import { idmRoutes } from '@core/routes';
import { AppLayout, PageNotFound } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserPage from '@pages/user';
import AdminPage from '@pages/admin';
import SuperAdminPage from '@pages/superAdmin';

const router = createBrowserRouter([
  {
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" mainelement={{ padding: '80px 25px 0px', height: '100vh' }} sideBarSection={false}>
          <UserPage />
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
    path: idmRoutes.user,
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" mainelement={{ padding: '80px 25px 0px', height: '100vh' }} sideBarSection={false}>
          <UserPage />
        </AppLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.admin,
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" mainelement={{ padding: '80px 25px 0px', height: '100vh' }} sideBarSection={false}>
          <AdminPage />
        </AppLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.superAdmin,
    element: (
      <PrivateRouter>
        <AppLayout title="IDM" mainelement={{ padding: '80px 25px 0px', height: '100vh' }} sideBarSection={false}>
          <SuperAdminPage />
        </AppLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
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
