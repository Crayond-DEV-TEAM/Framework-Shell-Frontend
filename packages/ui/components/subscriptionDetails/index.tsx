import { Avatar, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { subscriptionDetailsStyle } from './style';
import { Filter, InvoiceTable, SubscriptionPlanContent } from '..';
import { SubscriptionPlanCard } from '@atoms/subscriptionPlanCard';
import { SearchIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { CustomerHeader } from '@atoms/customerHeader';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { useState } from 'react';
import { FooterComponent } from '@atoms/footerComponent';

export interface SubscriptionDetailsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SubscriptionDetails = (props: SubscriptionDetailsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const handleMapopen = () => {
    setValues(true);
  };
  const handleMapclose = () => {
    setValues(false);
  };

  return (
    <Box
      sx={[
        {
          ...subscriptionDetailsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader title={' ID-4985'} btns={false} />
      <Box sx={{ margin: '45px' }} />
      <Box sx={subscriptionDetailsStyle.content}>
        <Box sx={subscriptionDetailsStyle.card}>
          <Box sx={subscriptionDetailsStyle.align}>
            <Avatar />
            <Box sx={{ pl: '15px' }}>
              <Typography sx={subscriptionDetailsStyle.title}>Company name</Typography>
              <Box sx={subscriptionDetailsStyle.align}>
                <Typography sx={subscriptionDetailsStyle.text}>Martha Holmes</Typography>
                <Box sx={subscriptionDetailsStyle.dot} />
                <Typography sx={subscriptionDetailsStyle.text}>designgodash@gmail.com</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ margin: '22px' }} />
          <SubscriptionPlanCard
            // content={'+ Map subscription'}
            content={
              <SubscriptionPlanContent
                planName={'Sliver 101 +3 Add ons'}
                subscriptionId={'5931364121'}
                planId={'25478'}
                planCost={'175'}
                totalRevenue={'2500'}
                lastbillOn={'22/10/2021'}
                nextbillOn={'22/10/2021'}
                activeSince={'22/10/2021'}
                users={'6'}
                withUpgrade={true}
              />
            }
          />
        </Box>
        <Box sx={{ margin: '16px' }} />
        <Box sx={subscriptionDetailsStyle.rootSxs}>
          <Box>
            <Box sx={subscriptionDetailsStyle.header}>
              <Typography sx={subscriptionDetailsStyle.tagTitle}>Invoices</Typography>
              <Box sx={subscriptionDetailsStyle.align}>
                <Box sx={{ pr: 1, pt: '3px' }}>
                  <Input
                    placeholder={'Search'}
                    // value={''}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    startAdornment={
                      <SearchIcon rootStyle={{ width: '12px', height: '12px', color: '#818181', ml: 1 }} />
                    }
                  />
                </Box>
                <Filter />
              </Box>
            </Box>
            <Box sx={subscriptionDetailsStyle.body}>
              <InvoiceTable onClick={handleMapopen} />
            </Box>
          </Box>
        </Box>
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'IN-957690'}
        Bodycomponent={''}
        handleCloseDialog={handleMapclose}
        dialogRootStyle={subscriptionDetailsStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            saveText={'Download'}
            saveButtonStyle={{ minWidth: '90px', height: '28px', backgroundColor: 'red' }}
          />
        }
      />
    </Box>
  );
};
