import { messageRoutes } from '@core/routes';
import { AppLayout, PageNotFound, RootLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import LanguageConfigPage from '@pages/languageConfig';
import MessageGroup from '@pages/messageGroup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';

const router = createBrowserRouter([
  {
    path: messageRoutes.home,
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
      {
        path: messageRoutes.messagegroup,
        element: (
          <AppLayout>
            <MessageGroup />
          </AppLayout>
        ),
      },
      {
        path: messageRoutes.languageConfig,
        element: (
          <AppLayout>
            <LanguageConfigPage />
          </AppLayout>
        ),
      },
    ],
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
