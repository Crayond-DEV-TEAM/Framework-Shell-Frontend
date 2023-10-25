import { webRoutes } from '@core/routes';
import { AppLayout, LanguageConfig, MessageTable } from '@core/ui/components';
import { Box } from '@mui/material';

// Routes for APP - Message Catalogue
export const messageCatalogueRoutes = [
  {
    path: webRoutes.messagegroup,
    element: (
      <AppLayout>
        <MessageTable />
      </AppLayout>
    ),
  },
  {
    path: webRoutes.languageConfig,
    element: (
      <AppLayout>
        <Box sx={{ width: '100%', maxWidth: '761px', margin: 'auto' }}>
          <LanguageConfig />
        </Box>
      </AppLayout>
    ),
  },
];
