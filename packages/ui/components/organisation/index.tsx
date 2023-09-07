import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { organisationStyle } from './style';

export interface OrganisationProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const Organisation=(props: OrganisationProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...organisationStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>Organisation component</Typography>
    </Box>
  );
}





