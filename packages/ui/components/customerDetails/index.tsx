import { Avatar, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerDetailsStyle } from './style';
import { CustomerHeader } from '@atoms/customerHeader';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { AddressForm, AdminTable, CreateForm } from '..';
import { useState } from 'react';
import { SubscriptionPlanCard } from '@atoms/subscriptionPlanCard';

export interface CustomerDetailsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CustomerDetails = (props: CustomerDetailsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const [create, setCreate] = useState(false);

  const onEditAddress = () => {
    setCreate(true);
  };
  const onSaveAddress = () => {
    setCreate(false);
  };

  return (
    <Box
      sx={[
        {
          ...customerDetailsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader title={' Create New Customer'} />
      <Box sx={{ margin: '45px' }} />
      <Box sx={customerDetailsStyle.content}>
        <Box>
          {create ? (
            <>
              <CustomerCardComponent
                title={' Company  Details'}
                body={<CreateForm />}
                noBtns={true}
                btns={true}
                onSave={onSaveAddress}
              />
              <Box sx={{ border: '1px solid #EAEAEA' }} />
              <CustomerCardComponent title={'Billing Address'} body={<AddressForm />} />
            </>
          ) : (
            <>
              <CustomerCardComponent
                title={' Company  Details'}
                noBtns={true}
                onEdit={onEditAddress}
                body={
                  <Box sx={customerDetailsStyle.align}>
                    <Box sx={{ p: 1, marginRight: '48px' }}>
                      <Avatar alt="image" sx={{ width: 76, height: 76, border: '1px solid #EAEAEA' }} />
                    </Box>
                    <Box sx={{ marginRight: '80px' }}>
                      <Typography sx={customerDetailsStyle.labelSx}>Company Name</Typography>
                      <Typography sx={customerDetailsStyle.inputText}>Metru libero nullam</Typography>
                    </Box>
                    <Box>
                      <Typography sx={customerDetailsStyle.labelSx}>Company website</Typography>
                      <Typography sx={customerDetailsStyle.inputText}>www.companywebsite.com</Typography>
                    </Box>
                  </Box>
                }
              />
              <Box sx={{ border: '1px solid #EAEAEA' }} />
              <CustomerCardComponent
                title={' Company  Details'}
                body={
                  <Box>
                    <Typography sx={customerDetailsStyle.labelSx}>Address</Typography>
                    <Typography sx={customerDetailsStyle.inputText}>
                      No 314, 1b, Kulakarai, First St, Balamurugan Nagar, Chennai, Tamil Nadu 600117
                    </Typography>
                  </Box>
                }
              />
            </>
          )}
        </Box>
        <Box sx={{ margin: '16px' }} />
        <SubscriptionPlanCard
          content={'+ Map subscription'}
          sx={{ display: 'flex', justifyContent: 'center', color: 'primary.main', fontSize: '14px', fontWeight: 600 }}
        />
        <Box sx={{ margin: '16px' }} />
        <CustomerCardComponent title={' Admin  Details'} body={<AdminTable />} adminName={true} noBtns={true} />
      </Box>
    </Box>
  );
};
