import { Avatar, SxProps, Theme, Checkbox } from '@mui/material';
import { Box, Typography } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { subscriptionDetailsStyle } from './style';
import { InvoiceTable, SubscriptionPlanContent } from '..';
import { SubscriptionPlanCard } from '@atoms/subscriptionPlanCard';
import { SearchIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { CustomerHeader } from '@atoms/customerHeader';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { useState } from 'react';
import { FooterComponent } from '@atoms/footerComponent';
import { Drawer } from '@atoms/drawer';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@core/store';
import moment from 'moment';

export interface SubscriptionDetailsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SubscriptionDetails = (props: SubscriptionDetailsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [values, setValues] = useState(false);
  const [draweropen, setDrawerOpen] = useState(false);
  const { TicketSubscription } = useSubscription();
  const [searchComp, setSearchComp] = useState('');

  const techjson = [
    {
      invoicenumber: TicketSubscription.customerid,
      invoicedate: moment(TicketSubscription?.data?.created_at).format('DD- MMM - YYYY'),
      invoiceamount: TicketSubscription.revenue,
      invoicestatus: [
        {
          label: 'Accepted',
          color: '#305AAE',
          bgColor: '#E2EAFA',
        },
      ],
    },
  ];

  // const filteredCompanyList = techjson.filter((x) => {
  //   return x?.invoiceamount.toLowerCase().includes(searchComp.toLowerCase());
  // });
  const navigate = useNavigate();
  const handleMapopen = () => {
    setValues(true);
  };
  const handleMapclose = () => {
    setValues(false);
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleOnBack = () => {
    navigate(planSubscriptionRoutes.subscription);
  };

  const TotalRevenue = TicketSubscription.revenue + TicketSubscription.data?.total_amount;

  console.log(TicketSubscription, 'TicketSubscriptionTicketSubscriptionTicketSubscription');

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
      <CustomerHeader title={' ID-4985'} btns={false} onBack={handleOnBack} />
      <Box sx={subscriptionDetailsStyle.content}>
        <Box sx={subscriptionDetailsStyle.card}>
          <Box sx={subscriptionDetailsStyle.align}>
            <Avatar />
            <Box sx={{ pl: '15px' }}>
              <Typography sx={subscriptionDetailsStyle.title}>{TicketSubscription.companyName}</Typography>
              <Box sx={subscriptionDetailsStyle.align}>
                <Typography sx={subscriptionDetailsStyle.text}>{TicketSubscription.adminname}</Typography>
                <Box sx={subscriptionDetailsStyle.dot} />
                <Typography sx={subscriptionDetailsStyle.text}>{TicketSubscription.email}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ margin: '22px' }} />
          <SubscriptionPlanCard
            // content={'+ Map subscription'}
            content={
              <SubscriptionPlanContent
                planName={TicketSubscription.data?.plan?.name}
                subscriptionId={TicketSubscription?.id?.slice(4, 12)}
                planId={TicketSubscription?.data?.plan?.id?.slice(4, 12)}
                planCost={TicketSubscription?.revenue}
                totalRevenue={TotalRevenue}
                lastbillOn={moment(TicketSubscription.data?.created_at).format('DD/MM/YYYY')}
                nextbillOn={moment(TicketSubscription.data?.created_at).add(1, 'year').format('DD/MM/YYYY')}
                activeSince={moment(TicketSubscription.data?.created_at).add(1, 'year').format('DD/MM/YYYY')}
                users={TicketSubscription.is_per_user ? 'Per' : 'Flat Fee'}
                withUpgrade={true}
                onClick={handleDrawerOpen}
                billingType={TicketSubscription.data?.subscription_billings?.[0]?.billing_type}
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
                    value={searchComp}
                    onChange={(e) => setSearchComp(e.target.value)}
                    startAdornment={
                      <SearchIcon rootStyle={{ width: '12px', height: '12px', color: '#818181', ml: 1 }} />
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={subscriptionDetailsStyle.body}>
              <InvoiceTable onClick={handleMapopen} TicketSubscription={techjson} />
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
            onCancel={handleMapclose}
          />
        }
      />
      <Drawer
        show={draweropen}
        onCloseDrawer={handleDrawerClose}
        anchor="right"
        drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Activity Log'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
      >
        <Box sx={subscriptionDetailsStyle.align}>
          <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} checked disabled />
          <Typography sx={subscriptionDetailsStyle.drawerTxt}>15 Mar,2023 05:03 PM</Typography>
        </Box>
        <Box sx={subscriptionDetailsStyle.dashedLine} />
        <Box sx={subscriptionDetailsStyle.cardDrawer}>
          <Typography sx={subscriptionDetailsStyle.title}>Invoice auto-generated</Typography>
          <Typography sx={subscriptionDetailsStyle.drawerTxt}>by system</Typography>
        </Box>
        <Box sx={{ margin: '18px' }} />
        <Box sx={subscriptionDetailsStyle.align}>
          <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} checked disabled />
          <Typography sx={subscriptionDetailsStyle.drawerTxt}>15 Mar,2023 05:03 PM</Typography>
        </Box>
        <Box sx={subscriptionDetailsStyle.cardDrawer}>
          <Typography sx={subscriptionDetailsStyle.title}>Invoice auto-generated</Typography>
          <Typography sx={subscriptionDetailsStyle.drawerTxt}>by system</Typography>
        </Box>
      </Drawer>
    </Box>
  );
};
