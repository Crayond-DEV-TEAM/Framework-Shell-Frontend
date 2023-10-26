import { webRoutes } from '@core/routes';
import {
  AlertConfig,
  AlertRules,
  ApiDocumentation,
  AppLayout,
  LanguageConfig,
  MessageTable,
  Reports,
} from '@core/ui/components';
import { Box } from '@mui/material';

// Routes for APP - Message Catalogue
export const alertsHubRoutes = [
  {
    path: webRoutes.reports,
    element: (
      <AppLayout>
        <Reports />
      </AppLayout>
    ),
  },
  {
    path: webRoutes.alertConfig,
    element: (
      <AppLayout>
        <AlertConfig />
      </AppLayout>
    ),
  },
  {
    path: webRoutes.alertRule,
    element: (
      <AppLayout>
        <AlertRules />
      </AppLayout>
    ),
  },
  {
    path: webRoutes.apiDocumentation,
    element: (
      <AppLayout>
        <ApiDocumentation />
      </AppLayout>
    ),
  },
];
