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
import { idmRoutes, userManageRoutes } from '@core/routes';

export const sideBarData = [
  {
    name: 'Home',
    route: idmRoutes.home,
    icon: <HomePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Organisation',
    route: idmRoutes.organisation,
    icon: <CustomPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Services',
    route: idmRoutes.services,
    icon: <SubscriptionPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'User Profiles',
    route: idmRoutes.userRoleMap,
    icon: <PlansPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Admin',
    route: idmRoutes.admin,
    icon: <AddPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'User',
    route: idmRoutes.user,
    icon: <ChargesPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Repository',
    route: idmRoutes.repository,
    icon: <FeaturePlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Permissions',
    route: idmRoutes.permission,
    icon: <CustomPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
  {
    name: 'Roles',
    route: idmRoutes.roles,
    icon: <SettingPlan rootStyle={{ width: '17px', height: '18px' }} />,
  },
];
