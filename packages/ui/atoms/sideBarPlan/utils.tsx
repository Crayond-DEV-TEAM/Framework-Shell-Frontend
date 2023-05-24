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

export const sideBarData = [
  {
    name: 'Home',
    route: '',
    icon: <HomePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Customers',
    route: '',
    icon: <CustomPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Subscriptions',
    route: '',
    icon: <SubscriptionPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Plans',
    route: '',
    icon: <PlansPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Add-ons',
    route: '',
    icon: <AddPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Charges',
    route: '',
    icon: <ChargesPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Feature Groups',
    route: '',
    icon: <FeaturePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Settings',
    route: '',
    icon: <SettingPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
];
