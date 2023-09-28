import { schemaMapperRoutes } from '@core/routes';
import { AppLayout, CreatePlan, Customer, PageNotFound, RootLayout, SidebarLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import FeaturePage from '@pages/SchemaMapper';
import SchemaMapperPage from '@pages/SchemaMapper';
const router = createBrowserRouter([
  // {
  //   element: (
  //     <PrivateRouter>
  //       <SidebarLayout>
  //         <CustomerPage />
  //       </SidebarLayout>
  //     </PrivateRouter>
  //   ),
  //   errorElement: <ErrorBoundary />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //   ],
  // },
  {
    path: schemaMapperRoutes.schemaMapper,
    element: (
      <PrivateRouter>
        <>
          {/* <SidebarLayout> */}
          <SchemaMapperPage />
          {/* </SidebarLayout> */}
          {/* <RootLayout /> */}
        </>
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
