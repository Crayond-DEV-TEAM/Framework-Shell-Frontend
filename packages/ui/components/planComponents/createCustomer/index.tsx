import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { createCustomerStyle } from './style';
import { CustomerHeader } from '@atoms/customerHeader';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { AddressForm, CreateForm, MapSubscription } from '..';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { useState } from 'react';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';

export interface CreateCustomerProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreateCustomer = (props: CreateCustomerProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const navigate = useNavigate();
  const handleChange = (x: any, y: any) => {
    console.log('///');
  };
  const handleMapopen = () => {
    setValues(true);
  };
  const handleMapclose = () => {
    setValues(false);
  };
  const onchangeRoute = () => {
    navigate(planSubscriptionRoutes.customer);
  };
  return (
    <Box
      sx={[
        {
          ...createCustomerStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader isback={false} title={' Create New Customer'} onSave={onchangeRoute} onCancel={onchangeRoute} />
      <Box sx={{ margin: '45px' }} />
      <Box sx={createCustomerStyle.content}>
        <CustomerCardComponent
          title={' Company  Details'}
          body={<CreateForm />}
          sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />
        <Box sx={{ border: '1px solid #EAEAEA' }} />
        <CustomerCardComponent
          title={'Billing Address'}
          body={<AddressForm />}
          sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
        <Box sx={{ margin: '16px' }} />
        <CustomerCardComponent
          title={'Admin Details'}
          body={
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Box sx={createCustomerStyle.inputGroupSx}>
                  <Label sx={createCustomerStyle.labelSx} htmlFor="addTitle" isRequired>
                    Admin Name
                  </Label>
                  <Input
                    size="small"
                    placeholder="Admin Name"
                    // value={groupState?.title}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleChange('title', e?.target?.value)
                    }
                    textFieldStyle={createCustomerStyle.inputSx}
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Box sx={createCustomerStyle.inputGroupSx}>
                  <Label sx={createCustomerStyle.labelSx} htmlFor="addTitle" isRequired>
                    Email Id
                  </Label>
                  <Input
                    size="small"
                    placeholder="Email Id"
                    // value={groupState?.title}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleChange('title', e?.target?.value)
                    }
                    textFieldStyle={createCustomerStyle.inputSx}
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Box sx={createCustomerStyle.inputGroupSx}>
                  <Label sx={createCustomerStyle.labelSx} htmlFor="addTitle" isRequired>
                    Contact Number
                  </Label>
                  <Input
                    size="small"
                    placeholder="Contact Number"
                    // value={groupState?.title}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleChange('title', e?.target?.value)
                    }
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    textFieldStyle={createCustomerStyle.inputSx}
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
            </Grid>
          }
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Map Subscription'}
        Bodycomponent={<MapSubscription />}
        handleCloseDialog={handleMapclose}
        dialogRootStyle={createCustomerStyle.dialogSx}
      />
    </Box>
  );
};
