import { webRoutes } from '@core/routes';
import {
  AddOne,
  Charges,
  CreateCustomerForm,
  CreatePlan,
  Customer,
  CustomerDetails,
  Feature,
  FeatureGroups,
  Plans,
  SidebarLayout,
  Subscription,
  SubscriptionDetails,
} from '@core/ui/components';
import { PrivateRouter } from '@router/privateRouter';

// Routes for APP - Message Catalogue
export const PlanAndSubscriptionRoutes = [
  {
    path: webRoutes.customer,
    element: (
      <PrivateRouter>
        <Customer />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.addOns,
    element: (
      <PrivateRouter>
        <AddOne />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.createCustomer,
    element: (
      <PrivateRouter>
        <CreateCustomerForm />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.customerDetail,
    element: (
      <PrivateRouter>
        <CustomerDetails />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.subscription,
    element: (
      <PrivateRouter>
        <Subscription />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.subscriptiondetails,
    element: (
      <PrivateRouter>
        <SubscriptionDetails />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.plan,
    element: (
      <PrivateRouter>
        <Plans />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.createplan,
    element: (
      <PrivateRouter>
        <CreatePlan />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.charges,
    element: (
      <PrivateRouter>
        <Charges />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.featureGroups,
    element: (
      <PrivateRouter>
        <FeatureGroups />
      </PrivateRouter>
    ),
  },
  {
    path: webRoutes.features,
    element: (
      <PrivateRouter>
        <Feature />
      </PrivateRouter>
    ),
  },
];
