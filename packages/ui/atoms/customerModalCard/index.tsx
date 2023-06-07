import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerModalCardStyle } from './style';

export interface CustomerModalCardProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CustomerModalCard = (props: CustomerModalCardProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

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
        <Typography sx={customerModalCardStyle.title}>Design God Ash (GI94JR57)</Typography>
        <Typography sx={customerModalCardStyle.badge}>On Trail</Typography>
      </Box>
      <Box sx={customerModalCardStyle.bottomAlign}>
        <Typography sx={customerModalCardStyle.bottomText}>designgodash@gmail.com</Typography>
        <Box sx={customerModalCardStyle.dot}></Box>
        <Typography sx={customerModalCardStyle.bottomText}>Brandon Wells</Typography>
      </Box>
    </Box>
  );
};
