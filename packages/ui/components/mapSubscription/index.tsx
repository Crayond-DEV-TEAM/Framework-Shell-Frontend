import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { mapSubscriptionStyle } from './style';

export interface MapSubscriptionProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const MapSubscription=(props: MapSubscriptionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...mapSubscriptionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>MapSubscription component</Typography>
    </Box>
  );
}





