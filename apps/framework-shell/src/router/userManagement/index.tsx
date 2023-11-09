import { webRoutes } from '@core/routes';
import { AppLayout, Settings, UserManagement } from '@core/ui/components';

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
  {
    path: webRoutes.configSettings,
    element: (
      <AppLayout>
        <Settings service={'IDM'}/>
      </AppLayout>
    ),
  },
];
