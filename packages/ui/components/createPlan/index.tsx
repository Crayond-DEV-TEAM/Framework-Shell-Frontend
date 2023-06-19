import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createPlanStyle } from './style';
import TextField from '@mui/material/TextField';
import { CustomToggle } from '@atoms/customToggle';
import { AddOnBackgroundCard, BackgroundPaper, ButtonGroupDropdown, CreatePlanCard } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CustomerHeader } from '@atoms/customerHeader';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';
import { useState } from 'react';
import { CustomizedRadios } from '@atoms/customRadio';

import { chargesStyle } from '../charges/style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';

export interface CreatePlanProps {
  className?: string;
  sx?: SxProps<Theme>;
}

interface Plan {
  title: string;
  description: string;
  is_plan_public: boolean;
  is_recomended: boolean;
  is_metered_billing: boolean;
  is_active: boolean;
  is_per_user: boolean;
  is_flat_fee: boolean;
  billing_period: [string];
  price: {
    monthly: number;
    yearly: number;
  };
  billing_cycles: string;
  feature: [
    {
      id: string;
      limit_count: string;
    },
  ];
  add_on: [
    {
      id: string;
      price: {
        monthly: number;
        yearly: number;
      };
      limit_count: number;
    },
  ];
  charge: [
    {
      id: string;
      price: number;
    },
  ];
}

/* interface Plan {
  [key: string]: string | number | boolean | [];
} */

export const CreatePlan = (props: CreatePlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const navigate = useNavigate();

  const onchangeRoute = () => {
    console.log(plan);
    // navigate(planSubscriptionRoutes.plan);
  };
  const Money = [{ label: '10' }, { label: '19' }];
  const SqureText = [
    { key: 'is_plan_public', text: 'List this plan in the public portal' },
    { key: 'is_recomended', text: 'Make this a recommended plan' },
    { key: 'is_metered_billing', text: 'Enable metered billing' },
    { key: 'is_active', text: 'Active this paln' },
  ];
  const ListAddons = [
    { value: 'unlimited', subTitle: 'Users', title: 'users' },
    { value: 'unlimited', subTitle: 'Customized metrics', title: 'customized_metrics' },
  ];

  const [plan, setPlan] = useState<any>({
    is_plan_public: true,
    is_recomended: true,
    is_metered_billing: true,
    is_active: true,
    is_per_user: true,
    is_flat_fee: true,
  });

  const [modalValue, setModalValue] = useState<any>({
    Charges: false,
    addons: false,
  });

  const handleChange = (key: string, value: any, array_key: any = '') => {
    const data = plan;
    const temp_obj = { ...plan[array_key], [key]: value };
    array_key.length > 0 ? (data[array_key] = temp_obj) : (data[key] = value);
    setPlan({ ...data });
  };

  const handleCharges = (key: string, value: any, array_key: any = '') => {
    const obj = {
      name: array_key,
      price: value,
    };
    const data = plan;
    data.charges = [obj];
    setPlan({ ...data });
  };

  const handleOpen = (modalName: string) => {
    console.log(modalName);
    setModalValue({ ...modalValue, [modalName]: true });
  };

  const handleClose = (modalName: string) => {
    setModalValue({ ...modalValue, [modalName]: false });
  };

  return (
    <Box
      sx={[
        {
          ...createPlanStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <CustomerHeader isback={false} title={' Create New Plan'} onSave={onchangeRoute} onCancel={onchangeRoute} />
      <Box sx={{ margin: '45px' }} />
      {/* <CreatePlanCard title="General" subTitle="Users" /> */}
      <Box sx={createPlanStyle.content}>
        <CustomerCardComponent
          title={'Basic Details'}
          sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          body={
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={createPlanStyle.inputGroupSx}>
                  <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                    Plan Name
                  </Label>
                  <Input
                    size="small"
                    placeholder="Plan Name"
                    value={plan?.['title']?.toString()}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleChange('title', e?.target?.value)
                    }
                    textFieldStyle={createPlanStyle.inputSx}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={createPlanStyle.inputGroupSx}>
                  <Label sx={createPlanStyle.labelSx} rootStyle={{ mb: '1' }} htmlFor="addTitle" isRequired>
                    Description
                  </Label>
                  <Input
                    size="small"
                    // placeholder="Description"
                    value={plan['description']?.toString()}
                    onChange={
                      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        handleChange('description', e?.target?.value)
                      // setPlan({ ...plan, description: e.target.value })
                    }
                    rows={3}
                    rowsMax={6}
                    isMulti={true}
                    textFieldStyle={createPlanStyle.inputSx}
                    required
                    id="description"
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              {SqureText.map((x, index) => {
                return (
                  <Grid item key={index}>
                    <CustomCheckboxWithLabels
                      handleChanges={(value: any) => handleChange(x.key, value)}
                      squareCheckbox={true}
                      squareText={x.text}
                    />
                  </Grid>
                );
              })}
            </Grid>
          }
        />
        <BackgroundPaper
          title="Pricing"
          content={
            <>
              <Grid container spacing={2}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Billing Period
                    </Label>
                    <CustomToggle
                      handleChange={(value) => handleChange('billing_period', value)}
                      tabOne={'Monthly'}
                      tabTwo={'Yearly'}
                    />
                  </Box>
                </Grid>
                <Grid item xs={7.5} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Set Price
                    </Label>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ButtonGroupDropdown
                        onChange={(value) => {
                          handleChange('monthly', value.label, 'price');
                        }}
                        permissionList={Money}
                        BtnName={'Monthly'}
                      />
                      <ButtonGroupDropdown
                        onChange={(value) => {
                          handleChange('yearly', value.label, 'price');
                        }}
                        permissionList={Money}
                        BtnName={'Yearly'}
                      />
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => handleChange('is_per_user', value)}
                        circleCheckbox={true}
                        circleText={'Per user'}
                      />
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => handleChange('is_flat_fee', value)}
                        circleCheckbox={true}
                        circleText={'Flat fee'}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Billing cycles
                    </Label>
                    <CustomizedRadios
                      options={[
                        { key: 'fixed', value: 'fixed' },
                        { key: 'forever', value: 'forever' },
                      ]}
                      handleChange={(value) => handleChange('billing_cycles', value)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          }
        />
        <BackgroundPaper
          title="Feature set and controls"
          subTitle="Feature"
          showButton={true}
          onClick={handleOpen}
          content={
            <CreatePlanCard onChange={(value) => handleChange('feature', value)} title="General" subTitle="Users" />
          }
        />
        <BackgroundPaper
          title="Add-ons"
          subTitle="Add-ons"
          showButton={true}
          onClick={handleOpen}
          content={<AddOnBackgroundCard ListAddons={ListAddons} onChange={(value) => handleChange('add_on', value)} />}
        />
        <BackgroundPaper
          title="Charges"
          subTitle="Charges"
          showButton={true}
          onClick={handleOpen}
          content={
            <Box>
              <Box sx={createPlanStyle.align}>
                <Typography sx={createPlanStyle.firstTextdark}>{'Implementation Charge'}</Typography>
                <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
              </Box>
              <Box sx={createPlanStyle.inputGroupSx}>
                <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                  Set price
                </Label>
                <Input
                  value={plan.charges?.[0].price || 0}
                  onChange={(event) => {
                    handleCharges('charge', event?.target.value, 'implementation_charge');
                  }}
                  textFieldStyle={{ width: '160px', height: '40px' }}
                  endAdornment={
                    <AttachMoneyIcon
                      sx={{
                        '&.MuiSvgIcon-root': {
                          width: '25px',
                          height: '20px',
                          color: '#000000',
                        },
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          }
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={modalValue.Charges}
        title={'Create new charge'}
        Bodycomponent={
          <Box sx={chargesStyle.padd}>
            <Box sx={chargesStyle.inputGroupSx}>
              <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
                Charges Name
              </Label>
              <Input
                size="small"
                placeholder="Charge name"
                required
                // value={addOnContentStyle?.title}
                textFieldStyle={chargesStyle.inputSx}
                id="title"
                // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                //   handleAddEditStateChange('title', e.target.value)
                // }
                // isError={addEditMessageState?.error?.title ? true : false}
                // errorMessage={addEditMessageState?.error?.title ?? ''}
              />
            </Box>
            <Box sx={{ m: '16px' }} />
            <Box sx={chargesStyle.inputGroupSx}>
              <Label sx={chargesStyle.labelSx} htmlFor="addTitle" isRequired>
                Description
              </Label>
              <Input
                size="small"
                // placeholder="Description"
                required
                rows={3}
                rowsMax={6}
                isMulti={true}
                // value={addOnContentStyle?.title}
                textFieldStyle={chargesStyle.inputBigSx}
                id="description"
                // onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                //   handleAddEditStateChange('title', e.target.value)
                // }
                // isError={addEditMessageState?.error?.title ? true : false}
                // errorMessage={addEditMessageState?.error?.title ?? ''}
              />
            </Box>
          </Box>
        }
        handleCloseDialog={() => handleClose('Charges')}
        dialogRootStyle={chargesStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            check
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={() => handleClose('Charges')}
            onSave={() => handleClose('Charges')}
          />
        }
      />
    </Box>
  );
};
