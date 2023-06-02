import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { createPlanStyle } from './style';

export interface CreatePlanProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const CreatePlan=(props: CreatePlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...createPlanStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>CreatePlan component</Typography>
    </Box>
  );
}





