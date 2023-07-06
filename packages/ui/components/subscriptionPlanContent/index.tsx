import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { subscriptionPlanContentStyle } from './style';
import { CalenderPlan, CelabrationPlan, CustomPlan, PlanManBlack } from '@atoms/icons';
import { Button } from '@atoms/button';

export interface SubscriptionPlanContentProps {
  className?: string;
  sx?: SxProps<Theme> | undefined;
  withUpgrade?: boolean;
  planName?: string;
  subscriptionId?: string;
  planId?: string;
  planCost?: string;
  totalRevenue?: string;
  lastbillOn?: string;
  nextbillOn?: string;
  activeSince?: string;
  users?: string;
  onClick?: any;
  billingType?: string;
}

export const SubscriptionPlanContent = (props: SubscriptionPlanContentProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    withUpgrade = false,
    planName = '',
    subscriptionId = '',
    planId = '',
    planCost = '',
    totalRevenue = '',
    lastbillOn = '',
    nextbillOn = '',
    activeSince = '',
    users = '',
    onClick,
    billingType = '',
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...subscriptionPlanContentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
          <Box sx={subscriptionPlanContentStyle.align}>
            <Box>
              <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                <CelabrationPlan rootStyle={{ width: '16px', height: '16px' }} />
                <Typography sx={subscriptionPlanContentStyle.title}>{planName}</Typography>
              </Box>
              <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                <Typography sx={subscriptionPlanContentStyle.keyItem}>Subscription id:</Typography>
                <Typography sx={subscriptionPlanContentStyle.valueItem}>{subscriptionId}</Typography>
              </Box>
              <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                <Typography sx={subscriptionPlanContentStyle.keyItem}>Plan id:</Typography>
                <Typography sx={subscriptionPlanContentStyle.valueItem}>{planId}</Typography>
              </Box>
              <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                  <Typography sx={subscriptionPlanContentStyle.keyItem}>Last billed on:</Typography>
                  <Typography sx={subscriptionPlanContentStyle.valueItem}>{lastbillOn}</Typography>
                </Box>
                <Box sx={subscriptionPlanContentStyle.dot} />
                <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
                  <Typography sx={subscriptionPlanContentStyle.keyItem}>Next billed on:</Typography>
                  <Typography sx={subscriptionPlanContentStyle.valueItem}>{nextbillOn}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={subscriptionPlanContentStyle.amountBg}>
              <Typography sx={{ fontWeight: 600, fontSize: '22px' }}>${planCost}</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>Per {billingType}</Typography>
            </Box>
          </Box>
          {withUpgrade && (
            <Box sx={subscriptionPlanContentStyle.alignNoSpace}>
              <PlanManBlack rootStyle={{ width: '21px', height: '21px', mr: '5px' }} />
              <Typography sx={subscriptionPlanContentStyle.keyItem}>{users} users</Typography>
              <Box sx={subscriptionPlanContentStyle.redot} />
              <CalenderPlan rootStyle={{ width: '21px', height: '21px', mr: '5px' }} />
              <Typography sx={subscriptionPlanContentStyle.keyItem}>{billingType}</Typography>
            </Box>
          )}
        </Grid>
        <Box sx={{ borderRight: '2px solid #D7E6E2', margin: '0px 24px' }} />
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={subscriptionPlanContentStyle.sectionTwo}>
          <Typography sx={subscriptionPlanContentStyle.totalrevenue}>Total Revenue</Typography>
          <Typography sx={subscriptionPlanContentStyle.rate}>${totalRevenue}</Typography>
          <Box sx={subscriptionPlanContentStyle.alignNoSpaceCenter}>
            <Typography sx={subscriptionPlanContentStyle.keyItem}>Active Since:</Typography>
            <Typography sx={subscriptionPlanContentStyle.valueItem}>{activeSince}</Typography>
          </Box>
        </Grid>
      </Grid>
      {withUpgrade && (
        <Box sx={subscriptionPlanContentStyle.align}>
          <Typography sx={subscriptionPlanContentStyle.upgradePlan}>
            Click to upgrade / download subscription plan
          </Typography>
          <Button sx={subscriptionPlanContentStyle.btn} onClick={onClick}>
            View activity log
          </Button>
        </Box>
      )}
    </Box>
  );
};
