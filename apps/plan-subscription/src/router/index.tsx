import { planSubscriptionRoutes } from '@core/routes';
import { AppLayout, CreatePlan, Customer, PageNotFound, RootLayout, SidebarLayout } from '@core/ui/components';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import UserManagementPage from '@pages/userManage';
import AddOnsPage from '@pages/addOns';
import CustomerPage from '@pages/customer';
import CreateCustomerPage from '@pages/createCustomer';
import CustomerDetailPage from '@pages/customerDetails';
import SubscriptionPage from '@pages/subscription';
import PlanPage from '@pages/plans';
import ChargesPage from '@pages/charges';
import FeatureGroupsPage from '@pages/featureGroups';
import SubscriptionDetailPage from '@pages/subscriptionDetail';
import FeaturePage from '@pages/feature';
const router = createBrowserRouter([
  {
    // path: userManageRoutes,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <CustomerPage />
        </SidebarLayout>
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
    path: planSubscriptionRoutes.customer,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <CustomerPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.addOns,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <AddOnsPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.createCustomer,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <CreateCustomerPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.customerDetail,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <CustomerDetailPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.subscription,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <SubscriptionPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.subscriptiondetails,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <SubscriptionDetailPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.plan,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <PlanPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.createplan,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <CreatePlan />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.charges,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <ChargesPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.featureGroups,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <FeatureGroupsPage />
        </SidebarLayout>
        {/* <RootLayout /> */}
      </PrivateRouter>
    ),
  },
  {
    path: planSubscriptionRoutes.features,
    element: (
      <PrivateRouter>
        <SidebarLayout>
          <FeaturePage />
        </SidebarLayout>
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
