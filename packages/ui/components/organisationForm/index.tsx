import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';



import { organisationFormStyle } from './style';

export interface OrganisationFormProps {
  className?: string;
  sx?: SxProps<Theme>;
};


export const OrganisationForm=(props: OrganisationFormProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...organisationFormStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      
      {...rest}
    >
      <Typography>OrganisationForm component</Typography>
    </Box>
  );
}





