import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { createCustomerStyle } from './style';
import { CustomerHeader } from '@atoms/customerHeader';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { AddressForm, CreateForm } from '..';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';

export interface CreateCustomerProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CreateCustomer = (props: CreateCustomerProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const handleChange = (x: any, y: any) => {
    console.log('///');
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
      <CustomerHeader isback={false} title={' Create New Customer'} />
      <Box sx={{ margin: '45px' }} />
      <Box sx={createCustomerStyle.content}>
        <CustomerCardComponent title={' Company  Details'} body={<CreateForm />} />
        <Box sx={{ border: '1px solid #EAEAEA' }} />
        <CustomerCardComponent title={'Billing Address'} body={<AddressForm />} />
        <Box sx={{ margin: '16px' }} />
        <CustomerCardComponent
          title={'Admin Details'}
          body={
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
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
                  textFieldStyle={createCustomerStyle.inputSx}
                  // isError={groupState?.error?.addTitle ? true : false}
                  // errorMessage={groupState?.error?.addTitle ?? ''}
                />
              </Grid>
            </Grid>
          }
        />
      </Box>
    </Box>
  );
};
