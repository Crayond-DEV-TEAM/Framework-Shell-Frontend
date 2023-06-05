import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { subscriptionPlanCardStyle } from './style';

export interface SubscriptionPlanCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  content?: any;
  onClick?: any;
}

export const SubscriptionPlanCard = (props: SubscriptionPlanCardProps): JSX.Element => {
  const { className = '', sx = {}, content, onClick, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...subscriptionPlanCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
      onClick={onClick}
    >
      {content}
    </Box>
  );
};
