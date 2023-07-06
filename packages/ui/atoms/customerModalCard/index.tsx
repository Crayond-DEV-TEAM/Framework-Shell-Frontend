import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerModalCardStyle } from './style';

export interface CustomerModalCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  companyName?: string;
  customerName?: string;
  customerId?: string;
  email?: string;
  selected?: any;
}

export const CustomerModalCard = (props: CustomerModalCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    selected,
    companyName = '',
    customerName = '',
    customerId = '',
    email = '',
    ...rest
  } = props;

  return (
    <Box
      sx={[
        {
          ...customerModalCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={customerModalCardStyle.align}>
        <Typography sx={customerModalCardStyle.title}>
          {companyName} (
          <Typography sx={customerModalCardStyle.title} component="span">
            {customerId}
          </Typography>
          )
        </Typography>
        <Typography sx={customerModalCardStyle.badge}>On Trail</Typography>
      </Box>
      <Box sx={customerModalCardStyle.bottomAlign}>
        <Typography sx={customerModalCardStyle.bottomText}>{email}</Typography>
        <Box sx={customerModalCardStyle.dot}></Box>
        <Typography sx={customerModalCardStyle.bottomTextTwo}>{customerName}</Typography>
      </Box>
    </Box>
  );
};
