import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { planModalCardStyle } from './style';

export interface PlanModalCardProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const PlanModalCard = (props: PlanModalCardProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...planModalCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={planModalCardStyle.title}>Plan</Typography>
      <Box sx={planModalCardStyle.align}>
        <Box sx={planModalCardStyle.bottomAlign}>
          <Typography sx={planModalCardStyle.bottomText}>Silver plan</Typography>
          <Box sx={planModalCardStyle.dot} />
          <Typography sx={planModalCardStyle.bottomText}>Per user</Typography>
          <Box sx={planModalCardStyle.dot} />
          <Typography sx={planModalCardStyle.bottomText}>Yearly</Typography>
        </Box>
        <Typography sx={planModalCardStyle.rate}>$200</Typography>
      </Box>
      <Box sx={planModalCardStyle.line} />
      <Typography sx={planModalCardStyle.title}>Add ons (1)</Typography>
      <Box sx={planModalCardStyle.align}>
        <Typography sx={planModalCardStyle.bottomText}>Reports</Typography>
        <Typography sx={planModalCardStyle.rate}>$2</Typography>
      </Box>
      <Box sx={planModalCardStyle.line} />
      <Box sx={planModalCardStyle.align}>
        <Typography sx={planModalCardStyle.title}>Total</Typography>
        <Typography sx={planModalCardStyle.rate}>$202</Typography>
      </Box>
    </Box>
  );
};
