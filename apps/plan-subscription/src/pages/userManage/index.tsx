import {
  CreateCustomer,
  UserManagement,
  SubscriptionPlanContent,
  CustomerDetails,
  Subscription,
  SubscriptionDetails,
  Plans,
  AddOne,
  Charges,
  FeatureGroups,
} from '@core/ui/components';
import { SubscriptionPlanCard } from '@core/ui/atoms';
import { Box } from '@mui/material';
export default function UserManagementPage() {
  return (
    <Box>
      <FeatureGroups />
    </Box>
  );
}
{
  /* <SubscriptionPlanCard
  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  content={<Box sx={{ color: 'primary.main', fontSize: '14px', fontWeight: 600 }}>+ Map subscription</Box>}
/>; */
}
