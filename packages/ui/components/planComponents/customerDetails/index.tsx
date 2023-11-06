import { Avatar, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { customerDetailsStyle } from './style';
import { CustomerHeader } from '@atoms/customerHeader';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { AddressForm, AdminTable, CreateForm, MapSubscription, SubscriptionPlanContent } from '..';
import { useState } from 'react';
import { SubscriptionPlanCard } from '@atoms/subscriptionPlanCard';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import { Label } from '@atoms/label';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';

export interface CustomerDetailsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const CustomerDetails = (props: CustomerDetailsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const [create, setCreate] = useState(false);
  const [adminedit, setAdminedit] = useState(false);
  const [values, setValues] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [subs, setSubs] = useState(false);
  const navigate = useNavigate();
  const handleMapopen = () => {
    setValues(true);
  };
  const handleMapclose = () => {
    setValues(false);
  };

  const onEditAddress = () => {
    setCreate(true);
  };
  const onSaveAddress = () => {
    setCreate(false);
  };
  const addAdminOpen = () => {
    setAdmin(true);
  };
  const addAdminClose = () => {
    setAdmin(false);
  };
  const handleChange = (x: any, y: any) => {
    console.log('ee');
  };
  const onSave = () => {
    setSubs(true);
    handleMapclose();
  };
  const onhandleEditadminTable = () => {
    setAdminedit(true);
    addAdminOpen();
  };

  const onhandleadminTable = () => {
    setAdminedit(false);
    addAdminOpen();
  };
  const customerdetailSave = () => {
    navigate(planSubscriptionRoutes.customer);
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
      <CustomerHeader title={'Customer Details'} onSave={customerdetailSave} onBack={customerdetailSave} />
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
                sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                body={
                  <Box sx={customerDetailsStyle.align}>
                    <Box sx={{ marginRight: '48px' }}>
                      <Avatar alt="image" sx={{ width: '75px', height: '75px', border: '1px solid #EAEAEA' }} />
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
                sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              />
            </>
          )}
        </Box>
        <Box sx={{ margin: '16px' }} />
        <SubscriptionPlanCard
          // content={'+ Map subscription'}
          content={
            subs === true ? (
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
              />
            ) : (
              '+ Map subscription'
            )
          }
          sx={subs === true ? '' : customerDetailsStyle.subscription}
          onClick={handleMapopen}
        />
        <Box sx={{ margin: '16px' }} />
        <CustomerCardComponent
          title={' Admin  Details'}
          body={<AdminTable onEditChange={onhandleEditadminTable} />}
          adminName={true}
          noBtns={true}
          adminOnclick={onhandleadminTable}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={values}
        title={'Map Subscription'}
        Bodycomponent={<MapSubscription onSave={onSave} onCancel={handleMapclose} />}
        handleCloseDialog={handleMapclose}
        dialogRootStyle={customerDetailsStyle.dialogSx}
        isFooterRequired={false}
      />
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={admin}
        title={adminedit === true ? 'Edit admin' : 'Add admin'}
        Bodycomponent={
          <Box sx={{ padding: '17px 24px' }}>
            <Box sx={customerDetailsStyle.inputGroupSx}>
              <Label sx={customerDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
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
                textFieldStyle={customerDetailsStyle.inputSx}
                // isError={groupState?.error?.addTitle ? true : false}
                // errorMessage={groupState?.error?.addTitle ?? ''}
              />
            </Box>
            <Box sx={customerDetailsStyle.inputGroupSx}>
              <Label sx={customerDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
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
                textFieldStyle={customerDetailsStyle.inputSx}
                // isError={groupState?.error?.addTitle ? true : false}
                // errorMessage={groupState?.error?.addTitle ?? ''}
              />
            </Box>
            <Box sx={customerDetailsStyle.inputGroupSx}>
              <Label sx={customerDetailsStyle.labelSx} htmlFor="addTitle" isRequired>
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
                textFieldStyle={customerDetailsStyle.inputSx}
                // isError={groupState?.error?.addTitle ? true : false}
                // errorMessage={groupState?.error?.addTitle ?? ''}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={addAdminClose}
        dialogRootStyle={customerDetailsStyle.admindialogSx}
        Footercomponent={<FooterComponent check={true} onSave={addAdminClose} onCancel={addAdminClose} />}
      />
    </Box>
  );
};
