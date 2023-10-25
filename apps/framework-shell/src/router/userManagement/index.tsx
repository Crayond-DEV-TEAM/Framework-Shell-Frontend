import { webRoutes } from '@core/routes';
import { AppLayout, UserManagement } from '@core/ui/components';

// Routes for APP - IDM
export const idmRoutes = [
  {
    path: webRoutes.userManagment,
    element: (
      <AppLayout>
        <UserManagement />
      </AppLayout>
    ),
  },
];
