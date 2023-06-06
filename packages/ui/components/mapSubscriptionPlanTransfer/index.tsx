import { SxProps, Theme, Checkbox } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { mapSubscriptionPlanTransferStyle } from './style';
import { Button } from '@atoms/button';
import { Label } from '@atoms/label';
import { CustomDropdown } from '@atoms/customDropdown';
import { PlanModalCard } from '@atoms/planModalCard';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';

export interface MapSubscriptionPlanTransferProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const MapSubscriptionPlanTransfer = (props: MapSubscriptionPlanTransferProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

  const checkoption = [
    { name: 'Metrics' },
    { name: 'Productivity framework' },
    { name: 'Customized' },
    { name: 'Non ipsum condimentum' },
    { name: 'Eget viverra' },
    { name: 'Pharetra dolor commodo' },
  ];

  return (
    <Box
      sx={[
        {
          ...mapSubscriptionPlanTransferStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container>
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          sx={{ borderRight: '1px solid #E0E0E0', padding: '17px 12px 17px 22px', height: '530px' }}
        >
          <Box sx={{ mb: '16px' }}>
            <Label sx={mapSubscriptionPlanTransferStyle.labelSx} htmlFor="addTitle" isRequired>
              Choose Plan
            </Label>
            <CutstomizedAutocomplete placeholder={'Monthly'} permissionList={options} />
          </Box>
          <Box sx={{ mb: '16px' }}>
            <Label sx={mapSubscriptionPlanTransferStyle.labelSx} htmlFor="addTitle" isRequired>
              Choose Billing type
            </Label>
            <CutstomizedAutocomplete placeholder={'Monthly'} permissionList={options} />
            {/* <CustomDropdown placeholder={'Monthly'} permissionList={options} /> */}
          </Box>
          <Box sx={{ margin: '10px' }} />
          <Box sx={mapSubscriptionPlanTransferStyle.align}>
            <Typography sx={mapSubscriptionPlanTransferStyle.titleLeft}>Add ons</Typography>
            <Typography sx={mapSubscriptionPlanTransferStyle.titleRight}>Click to select</Typography>
          </Box>
          {checkoption.map((option, index) => {
            return (
              <Box sx={mapSubscriptionPlanTransferStyle.align} key={index}>
                <Typography sx={mapSubscriptionPlanTransferStyle.btmTxt}>{option.name}</Typography>
                <Checkbox sx={{ width: '17px', height: '17px' }} />
              </Box>
            );
          })}
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ padding: '17px 22px 17px 12px', position: 'sticky' }}>
          <Typography sx={mapSubscriptionPlanTransferStyle.titleTwoLeft}>Previous Plan</Typography>
          <Box sx={{ margin: '12px' }}>
            <PlanModalCard />
          </Box>
          <Typography sx={mapSubscriptionPlanTransferStyle.titleTwoLeft}>New Plan</Typography>
          <Box sx={{ margin: '12px' }}>
            <PlanModalCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
