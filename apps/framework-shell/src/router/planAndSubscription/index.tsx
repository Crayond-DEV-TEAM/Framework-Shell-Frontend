import { webRoutes } from '@core/routes';
import {
  AddOne,
  AppLayout,
  Charges,
  CreateCustomerForm,
  CreatePlan,
  Customer,
  CustomerDetails,
  Feature,
  FeatureGroups,
  Plans,
  Settings,
  SidebarLayout,
  Subscription,
  SubscriptionDetails,
} from '@core/ui/components';
import { PrivateRouter } from '@router/privateRouter';
import App from 'App';

// Routes for APP - Message Catalogue
export const PlanAndSubscriptionRoutes = [
  {
    path: webRoutes.customer,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Customer />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.addOns,
    element: (
      <PrivateRouter>
        <AppLayout>
          <AddOne />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.createCustomer,
    element: (
      <PrivateRouter>
        <AppLayout>
          <CreateCustomerForm />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.customerDetail,
    element: (
      <PrivateRouter>
        <AppLayout>
          <CustomerDetails />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.subscription,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Subscription />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.subscriptiondetails,
    element: (
      <PrivateRouter>
        <AppLayout>
          <SubscriptionDetails />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.plan,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Plans />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.createplan,
    element: (
      <PrivateRouter>
        <AppLayout>
          <CreatePlan />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.charges,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Charges />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.featureGroups,
    element: (
      <PrivateRouter>
        <AppLayout>
          <FeatureGroups />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.features,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Feature />
        </AppLayout>
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.planSubscriptionSettings,
    element: (
      <PrivateRouter>
        <AppLayout>
          <Settings service={'PASM'} />
        </AppLayout>
      </PrivateRouter>
    ),
  },
];
