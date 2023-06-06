import {
  AddPlan,
  ChargesPlan,
  CustomPlan,
  FeaturePlan,
  HomePlan,
  PlansPlan,
  SettingPlan,
  SubscriptionPlan,
} from '@atoms/icons';
import { planSubscriptionRoutes } from '@core/routes';

export const sideBarData = [
  {
    name: 'Home',
    // route: planSubscriptionRoutes.customer,
    icon: <HomePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Customers',
    route: planSubscriptionRoutes.customer,
    icon: <CustomPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Subscriptions',
    route: planSubscriptionRoutes.subscription,
    icon: <SubscriptionPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Plans',
    route: planSubscriptionRoutes.plan,
    icon: <PlansPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Add-ons',
    route: planSubscriptionRoutes.addOns,
    icon: <AddPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Charges',
    route: planSubscriptionRoutes.charges,
    icon: <ChargesPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Feature Groups',
    route: planSubscriptionRoutes.featureGroups,
    icon: <FeaturePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Features',
    route: planSubscriptionRoutes.features,
    icon: <CustomPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Settings',
    // route: planSubscriptionRoutes.featureGroups,
    icon: <SettingPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
];
