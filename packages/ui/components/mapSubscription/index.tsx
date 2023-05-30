import { Checkbox, SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { mapSubscriptionStyle } from './style';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CustomDropdown } from '@atoms/customDropdown';
import { BottomTicket, TopTicket } from '@atoms/icons';
import { Button } from '@atoms/button';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';

export interface MapSubscriptionProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSave?: any;
  onCancel?: any;
}

export const MapSubscription = (props: MapSubscriptionProps): JSX.Element => {
  const { className = '', sx = {}, onSave, onCancel, ...rest } = props;
  const handleChange = (x: any, y: any) => {
    console.log('//');
  };
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
          ...mapSubscriptionStyle.rootSx,
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
          sx={{ borderRight: '1px solid #E0E0E0', padding: '17px 12px 17px 22px', height: '485px' }}
        >
          <Box sx={{ mb: '16px' }}>
            <Label sx={mapSubscriptionStyle.labelSx} htmlFor="addTitle" isRequired>
              Choose Plan
            </Label>
            <CutstomizedAutocomplete placeholder={'Silver'} permissionList={options} />
          </Box>
          <Box sx={{ mb: '16px' }}>
            <Label sx={mapSubscriptionStyle.labelSx} htmlFor="addTitle" isRequired>
              Choose Billing type
            </Label>
            <CutstomizedAutocomplete placeholder={'Monthly'} permissionList={options} />
          </Box>
          <Box sx={{ margin: '10px' }} />
          <Box sx={mapSubscriptionStyle.align}>
            <Typography sx={mapSubscriptionStyle.titleLeft}>Add ons</Typography>
            <Typography sx={mapSubscriptionStyle.titleRight}>Click to select</Typography>
          </Box>
          {checkoption.map((option, index) => {
            return (
              <Box sx={mapSubscriptionStyle.align} key={index}>
                <Typography sx={mapSubscriptionStyle.btmTxt}>{option.name}</Typography>
                <Checkbox sx={{ width: '17px', height: '17px' }} />
              </Box>
            );
          })}
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ padding: '17px 22px 17px 12px' }}>
          <TopTicket rootStyle={{ width: '378px', height: '21px' }} />
          <Box sx={mapSubscriptionStyle.ticketcontent}>
            <Typography sx={mapSubscriptionStyle.titleLeft}>Pricing details</Typography>
            <Box sx={mapSubscriptionStyle.alignNoSpace}>
              <Typography sx={mapSubscriptionStyle.titleTwoLeft}>Company name</Typography>
              <Typography sx={mapSubscriptionStyle.badge}>Customer id</Typography>
            </Box>
            <Box sx={mapSubscriptionStyle.alignNoSpace}>
              <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>admin name</Typography>
              <Box sx={mapSubscriptionStyle.dot} />
              <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>designgodash@gmail.com</Typography>
            </Box>
            <Box sx={mapSubscriptionStyle.borderLine} />
            <Typography sx={mapSubscriptionStyle.titleTwoLeft}>Plan</Typography>
            <Box sx={mapSubscriptionStyle.align}>
              <Box sx={mapSubscriptionStyle.alignNoSpace}>
                <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>Silver plan</Typography>
                <Box sx={mapSubscriptionStyle.dot} />
                <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>Per user</Typography>
                <Box sx={mapSubscriptionStyle.dot} />
                <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>Monthly</Typography>
              </Box>
              <Typography sx={mapSubscriptionStyle.titleRight}>$244</Typography>
            </Box>
            <Box sx={mapSubscriptionStyle.borderLine} />
            <Typography sx={mapSubscriptionStyle.titleTwoLeft}>Add ons (1)</Typography>
            <Box sx={mapSubscriptionStyle.align}>
              <Typography sx={mapSubscriptionStyle.btmduplicateTxt}>Reports</Typography>
              <Typography sx={mapSubscriptionStyle.titleRight}>$2</Typography>
            </Box>
            <Box sx={mapSubscriptionStyle.borderLine} />
            <Box sx={mapSubscriptionStyle.align}>
              <Typography sx={mapSubscriptionStyle.titleTwoLeft}>Total</Typography>
              <Typography sx={mapSubscriptionStyle.titleRight}>$246</Typography>
            </Box>
          </Box>
          <BottomTicket rootStyle={{ width: '378px', height: '21px' }} />
          <Box sx={mapSubscriptionStyle.btnFlex}>
            <Button
              sx={{ width: '72px', height: '28px', textTransform: 'capitalize', fontSize: '12px' }}
              variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: '72px', height: '28px', textTransform: 'capitalize', fontSize: '12px', ml: 1 }}
              onClick={onSave}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
