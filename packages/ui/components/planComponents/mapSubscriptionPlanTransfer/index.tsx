import { SxProps, Theme, Checkbox } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';

import { mapSubscriptionPlanTransferStyle } from './style';
import { Button } from '@atoms/button';
import { Label } from '@atoms/label';
import { CustomDropdown } from '@atoms/customDropdown';
import { PlanModalCard } from '@atoms/planModalCard';
import { CutstomizedAutocomplete } from '@atoms/cutstomizedAutocomplete';
import { useEffect, useState } from 'react';
import { useSubscription } from '@core/store';
import { convertKeysToSnakeCase } from '@core/utils/helperFunctions';

export interface MapSubscriptionPlanTransferProps {
  className?: string;
  sx?: SxProps<Theme>;
  AddOnsList?: any;
  handleChangeEvent?: (key: string, value: any) => void;
  createEditSubscription?: any;
  formErrors?: any;
}

export const MapSubscriptionPlanTransfer = (props: MapSubscriptionPlanTransferProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    AddOnsList,
    handleChangeEvent = (key, value) => false,
    createEditSubscription,
    formErrors,
    ...rest
  } = props;

  const billtype = createEditSubscription?.billing_type;
  useEffect(() => {
    if (createEditSubscription?.id !== '') {
      const planDetails = createEditSubscription;
      // billtype = { name: planDetails.billing_type };
      setPlanCard(planDetails?.plan_id);
      setBilling(planDetails?.plan_id?.billing_period);
      setAddOnList(planDetails?.plan_id?.plan_add_on_mappings);
    }
  }, [createEditSubscription?.id]);
  const { OldSubscription, clearAll } = useSubscription();

  const [billing, setBilling] = useState([]);
  const [adddOnList, setAddOnList] = useState([]);
  const [planCard, setPlanCard] = useState([{}]);
  const handleSetupFunc = (values: any) => {
    const value = convertKeysToSnakeCase(values);
    handleChangeEvent('plan_id', value);
    const BillingDetails = value?.billing_period;
    const AddonOption = value?.plan_add_on_mappings;
    setPlanCard(value);
    setBilling(BillingDetails);
    setAddOnList(AddonOption);
    // const currentFeature = createEditAddOns?.features;
    // if (currentFeature?.id) {
    //   const isMatch = featureDetails?.filter((item: any) => item?.id === currentFeature?.id);
    //   if (!isMatch?.length) handleAddEditStateChange('features', null);
    // }
    // setFeatureList(featureDetails);
  };

  const convertToObj = (billing: any) => {
    return { name: billing };
  };
  console.log(createEditSubscription, 'OldSubscriptionOldSubscriptionOldSubscription');
  const objectArray = billing?.map(convertToObj);
  const billingType = createEditSubscription?.billing_type?.name;
  const planCardPrice =
    billingType === 'Monthly'
      ? createEditSubscription?.plan_id?.price?.monthly
      : billingType === 'Yearly'
        ? createEditSubscription?.plan_id?.price?.yearly
        : null;
  const onChange = (value: any, index: number, e: any) => {
    const checked = e.target.checked;

    if (checked) {
      // If the add-on is checked, add it to the list
      handleChangeEvent('add_on', value);
      handleChangeEvent('new_addon', value);
    } else {
      // If the add-on is unchecked, remove it from the list
      const updatedAddOnList = createEditSubscription?.add_on.filter(
        (item: any) => item?.add_on?.id !== value?.add_on?.id,
      );
      handleChangeEvent('add_on', updatedAddOnList);
      const updatedNewAddOnList = createEditSubscription?.new_addon.filter(
        (item: any) => item?.add_on?.id !== value?.add_on?.id,
      );
      handleChangeEvent('new_addon', updatedNewAddOnList);
      const finding = Boolean(
        createEditSubscription?.new_addon.find((item: any) => item?.add_on?.id === value?.add_on?.id),
      );
      if (finding === false) {
        handleChangeEvent('old_addon', value);
      } else {
        console.log('#');
      }
    }
  };

  const addOnId = createEditSubscription?.add_on?.map((x: any) => x?.add_on?.id);
  console.log(createEditSubscription, 'adddOnList');
  console.log(OldSubscription, 'OldSubscription');
  const chargeMaps = createEditSubscription?.plan_id?.plan_charge_mappings?.map((value: any) => value?.price);
  // const Chargessum = chargeMaps?.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
  const Chargessum = parseInt(chargeMaps?.join(''), 10);
  const oldchargesMaps = OldSubscription?.charges?.map((value: any) => value.price);
  const oldChargessum = oldchargesMaps?.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue, 10);
  }, 0);
  const billChecking = objectArray?.find((item) => item?.name === billtype?.name) ? billtype : null;
  console.log(objectArray?.find((item) => item?.name === billtype?.name) ? billtype : null, 'chargeMaps');
  console.log(billChecking, 'billChecking');

  console.log(Chargessum, 'ChargessumChargessumChargessumChargessum');

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
            <CutstomizedAutocomplete
              placeholder={'Monthly'}
              permissionList={AddOnsList ?? []}
              onChange={(value) => {
                handleSetupFunc(value);
              }}
              value={
                createEditSubscription && Object.keys(createEditSubscription?.plan_id)?.length > 0
                  ? createEditSubscription?.plan_id
                  : null
              }
              isError={Boolean(formErrors.plan_id)}
              errorMessage={formErrors.plan_id}
            />
          </Box>
          <Box sx={{ mb: '16px' }}>
            <Label sx={mapSubscriptionPlanTransferStyle.labelSx} htmlFor="addTitle" isRequired>
              Choose Billing type
            </Label>
            <CutstomizedAutocomplete
              placeholder={'Monthly'}
              permissionList={objectArray ?? []}
              onChange={(value) => {
                handleChangeEvent('billing_type', value);
              }}
              value={billChecking && Object.keys(billChecking)?.length > 0 ? billChecking : null}
              isError={Boolean(formErrors?.billing_type)}
              errorMessage={formErrors?.billing_type}
            />
          </Box>
          <Box sx={{ margin: '10px' }} />
          <Box sx={mapSubscriptionPlanTransferStyle.align}>
            <Typography sx={mapSubscriptionPlanTransferStyle.titleLeft}>Add ons</Typography>
            <Typography sx={mapSubscriptionPlanTransferStyle.titleRight}>Click to select</Typography>
          </Box>
          {Array.isArray(adddOnList) &&
            adddOnList?.map((x: any, index: number) => {
              return (
                <Box sx={mapSubscriptionPlanTransferStyle.align} key={index}>
                  <Typography sx={mapSubscriptionPlanTransferStyle.btmTxt}>{x.add_on.name}</Typography>
                  <Checkbox
                    onChange={(e) => {
                      onChange(x, index, e);
                    }}
                    sx={{ width: '17px', height: '17px' }}
                    checked={addOnId.includes(x.add_on?.id)}
                    // checked={x.add_on?.id === (createEditSubscription.add_on.add_on?.id ?? null) ? true : false}
                  />
                  {/* {JSON.stringify(x.add_on?.id)} */}
                  {/* {JSON.stringify(createEditSubscription.add_on?.map((x) => x.add_on.id))} */}
                  {/* {JSON.stringify(createEditSubscription.add_on)} */}
                </Box>
              );
            })}
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ padding: '17px 22px 17px 12px', position: 'sticky' }}>
          {OldSubscription?.plan === undefined ? (
            ''
          ) : (
            <Box>
              <Typography sx={mapSubscriptionPlanTransferStyle.titleTwoLeft}>Previous Plan</Typography>
              <Box sx={{ margin: '12px' }}>
                <PlanModalCard
                  planName={OldSubscription?.plan?.name}
                  planUser={OldSubscription?.plan?.is_per_user}
                  billingType={OldSubscription?.plan?.billing_cycles}
                  billingPeriod={OldSubscription?.plan?.billing_period?.[0]}
                  addOnsCount={OldSubscription?.subscription_add_on_mappings?.length}
                  planCost={OldSubscription?.plan.price?.monthly}
                  addOnState={OldSubscription?.subscription_add_on_mappings}
                  createEditSubscription={createEditSubscription}
                  charges={oldChargessum}
                  // totalCalc={}
                />
              </Box>
            </Box>
          )}

          <Typography sx={mapSubscriptionPlanTransferStyle.titleTwoLeft}>New Plan</Typography>
          <Box sx={{ margin: '12px' }}>
            <PlanModalCard
              planName={planCard?.name}
              planUser={planCard?.is_per_user}
              billingType={planCard?.billing_cycles}
              billingPeriod={billingType}
              addOnsCount={planCard?.plan_add_on_mappings?.length}
              planCost={parseInt(planCardPrice, 10)}
              addOnState={createEditSubscription?.add_on}
              handleChangeEvent={handleChangeEvent}
              createEditSubscription={createEditSubscription}
              charges={Chargessum}
              // planCard={planCard}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
