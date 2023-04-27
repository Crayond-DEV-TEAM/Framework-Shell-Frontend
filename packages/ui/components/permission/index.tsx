import { Grid, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { permissionStyle } from './style';
import { AddPermission, FacilityClone } from '..';

export interface PermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Permission = (props: PermissionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...permissionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={2.5} lg={2.5} xl={2.5}>
          <AddPermission title="Permissions" addTitle="Add Permission" editTitle="Edit Permission" />
        </Grid>
        <Grid item xs={12} sm={9} md={9.5} lg={9.5} xl={9.5}>
          <FacilityClone />
        </Grid>
      </Grid>
    </Box>
  );
};
