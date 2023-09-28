import { idmRoutes } from '@core/routes';
import { SideBarIdmLayout, PageNotFound, Service } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserPage from '@pages/user';
import AdminPage from '@pages/admin';
import SuperAdminPage from '@pages/superAdmin';
import OrganisationPage from '@pages/organisation';
import UserRolePage from '@pages/userProfile';
import UserProfilePage from '@pages/userProfile';
import ServicePage from '@pages/services';
import RepositoryPage from '@pages/repository';
import PermissionPage from '@pages/permission';
import RolesPage from '@pages/roles';

const router = createBrowserRouter([
  {
    path: idmRoutes.home,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <OrganisationPage />
        </SideBarIdmLayout>
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
        <SideBarIdmLayout>
          <UserPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.admin,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <AdminPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.superAdmin,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <SuperAdminPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.organisation,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <OrganisationPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.services,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <ServicePage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.userRoleMap,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <UserProfilePage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.repository,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <RepositoryPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.permission,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <PermissionPage />
        </SideBarIdmLayout>
      </PrivateRouter>
    ),
  },
  {
    path: idmRoutes.roles,
    element: (
      <PrivateRouter>
        <SideBarIdmLayout>
          <RolesPage />
        </SideBarIdmLayout>
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
