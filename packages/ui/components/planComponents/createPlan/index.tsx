import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createPlanStyle } from './style';
import TextField from '@mui/material/TextField';
import { CustomToggle } from '@atoms/customToggle';
import { Drawer } from '@atoms/drawer';
import { AddOnBackgroundCard, BackgroundPaper, CreatePlanCard } from '..';
import { CustomCheckboxWithLabels } from '@atoms/customCheckboxWithLabels';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CustomerHeader } from '@atoms/customerHeader';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { CustomerCardComponent } from '@atoms/customerCardComponent';
import { Label } from '@atoms/label';
import { Input } from '@atoms/input';
import { CloseRedIcon } from '@atoms/icons';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { CustomizedRadios } from '@atoms/customRadio';
import SearchIcon from '@mui/icons-material/Search';

import { chargesStyle } from '../charges/style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { GroupCheckBox } from '@atoms/checkBoxGroup';
import { FooterComponent } from '@atoms/footerComponent';
import { subscriptionDetailsStyle } from '../subscriptionDetails/style';
import { addOneStyle } from '../addOne/style';
import { AddOnContent } from '..';

import { useCharges, usePlans, useAddOns, useFeatureGroup, useFeature } from '@core/store';
import { Button } from '@atoms/button';
import { ButtonGroupDropdown } from '@components/commonComponents';

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

interface squareText {
  key: string;
  text: string;
}

export const CreatePlan = (props: CreatePlanProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const navigate = useNavigate();

  const { getChargesList, ChargesList } = useCharges();

  const {
    setPlanList,
    addEditPlan,
    setPlanFeature,
    planFeature,
    setExplicitPlanFeature,
    planUngroupedFeature,
    setUngroupedFeature,
    planAddOn,
    setAddOn,
    planCharge,
    setCharge,
    addPlan,
    editPlan,
    deleteAddOn,
    setDeleteAddon,
    deleteCharge,
    setDeleteCharges,
    deleteFeature,
    setDeleteFeatures,

    featureList,
    ungroupedFeatureList,
    addons,
    charges,
    optionsfeatureList,
    optionsungroupedFeatureList,
    optionsaddons,
    optionscharges,

    setFeatureList,
    setUnGroupedFeatureList,
    setAddOns,
    setCharges,
    setOptionsFeatureList,
    setOptionsUngroupedFeatureList,
    setOptionsAddons,
    setOptionsCharges,
  } = usePlans();

  const { FeatureGroupList, getFeatureGroupList } = useFeatureGroup();

  const { FeatureList, getFeatureList } = useFeature();

  const { getAddOnsList, AddOnsList } = useAddOns();

  const [formErrors, setFormErrors] = useState<any>({});

  const [draweropen, setDrawerOpen] = useState({
    featureGroup: false,
    feature: false,
    add_ons: false,
    charges: false,
  });

  useEffect(() => {
    getChargesList({ is_active: true });
    getAddOnsList({ is_active: true });
    getFeatureGroupList({ is_active: true });
    getFeatureList({ is_active: true, is_unmapped: true });
  }, []);

  useEffect(() => {
    const data: any[] = [];
    ChargesList.map((x, index) => {
      return data.push({
        id: x.id,
        name: x.name,
        checked: false,
        price: addEditPlan.charge.find((z) => z.id === x.id)?.price || 0,
      });
    });
    setCharges(data);
    data.map((x) => {
      if (planCharge.find((z) => z.id === x.id) !== undefined) {
        x.checked = true;
        x.plan_charge_mapping_id = planCharge.find((z) => z.id === x.id)?.plan_charge_mapping_id || null;
      }
    });

    setOptionsCharges(data.filter((x) => x.checked === true));
  }, [ChargesList]);

  useEffect(() => {
    const data: any[] = [];
    AddOnsList.map((x, index) => {
      return data.push({
        id: x.id,
        name: x.name,
        price: {
          monthly: 0,
          yearly: 0,
        },
        value: 'unlimited',
        limit_count: 0,
        checked: false,
      });
    });
    setAddOns(data);
    // setPlanList('add_on', data);
    data.map((x) => {
      if (planAddOn.find((z) => z.id === x.id) !== undefined) {
        x.checked = true;
        x.plan_add_on_mapping_id = planAddOn.find((z) => z.id === x.id)?.plan_add_on_mapping_id || null;
      }
    });

    setOptionsAddons(data.filter((x) => x.checked === true));
  }, [AddOnsList]);

  useEffect(() => {
    const data: { id: string | undefined; limit_count: number | string }[] = [];
    const temp_feature_list: any[] = [];
    FeatureGroupList.map((feature) => {
      temp_feature_list.push({
        name: feature.name,
        id: feature.id,
        checked: false,
        feature_list: feature.featureDetails,
      });
      return data.push({
        id: feature.id,
        limit_count: addEditPlan.feature.filter((x) => x.id === feature.id)?.[0]?.limit_count || 0,
      });
    });
    setFeatureList(temp_feature_list);

    temp_feature_list.map((x) => {
      if (planFeature.find((z) => z.id === x.id) !== undefined) {
        x.checked = true;
        x.plan_feature_mapping_id = planFeature.find((z) => z.id === x.id)?.plan_feature_mapping_id || null;
      }
    });

    setOptionsFeatureList(temp_feature_list.filter((x) => x.checked === true));
  }, [FeatureGroupList]);

  useEffect(() => {
    const temp_feature_list: any[] = [];
    FeatureList.map((feature) => {
      temp_feature_list.push({
        name: feature.name,
        user_value: 'unlimited',
        id: feature.id,
        checked: false,
      });
    });
    setUnGroupedFeatureList(temp_feature_list);

    temp_feature_list.map((x) => {
      if (planUngroupedFeature.find((z) => z.id === x.id) !== undefined) {
        x.checked = true;
        x.plan_feature_mapping_id = planUngroupedFeature.find((z) => z.id === x.id)?.plan_feature_mapping_id || null;
      }
      // return;
    });
    setOptionsUngroupedFeatureList(temp_feature_list.filter((x) => x.checked === true));
  }, [FeatureList]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (addEditPlan.name.trim().length === 0) {
      errors.name = 'Plan name is required';
    }

    if (addEditPlan.billing_period.length <= 0) {
      errors.billing_period = 'Billing period is required';
    }
    if (addEditPlan.billing_period.includes('Monthly') && addEditPlan.price.monthly <= 0) {
      errors.monthly = 'Monthly Price is required';
    }
    if (addEditPlan.billing_period.includes('Yearly') && addEditPlan.price.yearly <= 0) {
      errors.yearly = 'Yearly Price is required';
    }
    if (addEditPlan.billing_cycles.length <= 0) {
      errors.billing_cycles = 'Billing Cycle is required';
    }
    if (planFeature.length === 0 && planUngroupedFeature.length === 0) {
      errors.features = 'Features are required to create a plan';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onchangeRoute = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      addEditPlan?.plan_id ? editPlan() : addPlan();
      navigate(planSubscriptionRoutes.plan);
    }
  };
  const Money = [
    { label: '10', value: '10' },
    { label: '19', value: '10' },
  ];
  const SqureText = [
    { key: 'is_plan_public', text: 'List this plan in the public portal' },
    { key: 'is_recomended', text: 'Make this a recommended plan' },
    { key: 'is_metered_billing', text: 'Enable metered billing' },
    { key: 'is_active', text: 'Active this paln' },
  ];

  const handleCharges = (key: string, value: any, array_key: any = '') => {
    const data = planCharge;
    data?.map((charge: any) => {
      if (charge.id === array_key) {
        charge.price = parseInt(value);
      }
    });
    setCharge(data);
  };

  const handleAddons = (key: string, value: any, innerkey = '') => {
    const data = planAddOn;
    data?.map((add_on: any) => {
      if (add_on.id === key) {
        if (innerkey.length > 0) {
          add_on['price'][innerkey] = value;
        } else {
          add_on[value === 'limited' || value === 'unlimited' ? 'value' : 'limit_count'] =
            value === 'limited' || value === 'unlimited' ? value : parseInt(value);
          if (value === 'unlimited') {
            add_on.limit_count = 0;
          }
        }
      }
    });
    setAddOn(data);
  };

  const handleSelected = (value: any) => {
    const feature_group: any = value.filter((grp: any) => grp.checked === true);
    setOptionsFeatureList(feature_group);
  };

  const handleUnGroupFeatureSelected = (value: any) => {
    const feature_group: any = value.filter((grp: any) => grp.checked === true);
    setOptionsUngroupedFeatureList(feature_group);
    // setUngroupedFeature(feature_group);
  };

  const handleAddOnSelected = (value: any) => {
    const feature_addon = value.filter((grp: any) => grp.checked === true);
    // feature_addon.push(planAddOn).flat();
    setOptionsAddons(feature_addon);
  };

  const handleChargeSelected = (value: any) => {
    const feature_charge = value.filter((grp: any) => grp.checked === true);
    setOptionsCharges(feature_charge);
  };

  const handleFeatures = (id: string, inner_id: string, value: any) => {
    const feature_grps = planFeature;
    feature_grps.map((grp, index) => {
      const feature_list = grp.feature;
      if (grp.id === id) {
        feature_list.map((feature) => {
          if (feature.id === inner_id) {
            if (value === 'unlimited' || value === 'limited') {
              feature.user_value = value;
            }
            feature.limit_count = value === 'unlimited' ? 0 : value === 'limited' ? 5 : parseInt(value);
          }
        });
      }
      grp.feature = feature_list;
    });
    setExplicitPlanFeature(feature_grps);
  };

  const handleUnGroupedFeature = (id: any, value: any) => {
    const features = planUngroupedFeature;
    features.map((feature) => {
      if (feature.id === id) {
        if (value === 'unlimited' || value === 'limited') {
          feature.user_value = value;
        }
        feature.limit_count = value === 'unlimited' ? 0 : value === 'limited' ? 5 : parseInt(value);
      }
    });
    setUngroupedFeature(features);
  };

  const handleDeleteFeature = (feature_id: string, group_id: string, feature_mapping_id: string) => {
    feature_mapping_id && setDeleteFeatures(feature_mapping_id);
    const data = planFeature;
    let removing_index: any = '';
    data.map((x: any, index: any) => {
      if (x.id === group_id) {
        x.feature = x.feature.filter((z: any) => z.id !== feature_id);
        if (x.feature.length <= 0) {
          removing_index = index;
        }
      }
    });

    removing_index !== '' && data.splice(removing_index, 1);
    setExplicitPlanFeature(data);
    setOptionsFeatureList(data);
    const temp_data: any = featureList;
    temp_data.map((x: any) => {
      data.map((z: any) => {
        if (x.id !== z.id) {
          x.checked = false;
        }
      });
    });
    setFeatureList(temp_data);
  };

  const handleDeleteUnGroupedFeature = (feature_id: string, feature_mapping_id: string) => {
    feature_mapping_id && setDeleteFeatures(feature_mapping_id);
    const data = planUngroupedFeature.filter((x: any) => x.id !== feature_id);
    const feature_data = ungroupedFeatureList.map((x: any) => {
      if (x.id === feature_id) {
        x.checked = false;
      }
    });
    setUnGroupedFeatureList(ungroupedFeatureList);
    setUngroupedFeature(data);
    setOptionsUngroupedFeatureList(data);
  };

  const handleAddOnDelete = (id: string, mapping_id: string | any) => {
    mapping_id && setDeleteAddon(mapping_id);
    const data = planAddOn.filter((x: any) => x.id !== id);
    const check_data = addons.map((x: any) => {
      if (x.id === id) {
        x.checked = false;
      }
    });
    setAddOns(addons);
    setAddOn(data);
    setOptionsAddons(data);
  };

  const handleChargeDelete = (id: string, mapping_id: string | any) => {
    mapping_id && setDeleteCharges(mapping_id);
    const data = planCharge.filter((x: any) => x.id !== id);
    const check_data = charges.map((x: any) => {
      if (x.id === id) {
        x.checked = false;
      }
    });
    setCharges(charges);
    setCharge(data);
    setOptionsCharges(data);
  };

  const handleDrawerOpen = (key: string) => {
    setDrawerOpen({ ...draweropen, [key]: true });
  };
  const handleDrawerClose = (key: string) => {
    setDrawerOpen({ ...draweropen, [key]: false });
    if (key === 'feature') {
      const data: any = ungroupedFeatureList;
      data.map((x: any) => {
        if (planUngroupedFeature.length > 0 && !planUngroupedFeature.includes(x)) {
          x.checked = false;
        }
        setUnGroupedFeatureList(data);
      });
    } else if (key === 'featureGroup') {
      const data: any = featureList;
      data.map((x: any) => {
        if (planFeature.length > 0) {
          planFeature.map((z: any) => {
            if (z.id !== x.id) {
              x.checked = false;
            }
          });
        }
        setFeatureList(data);
      });
    } else if (key === 'add_ons') {
      const data: any = addons;
      data.map((x: any) => {
        if (planAddOn.length > 0 && !planAddOn.includes(x)) {
          x.checked = false;
        }
        setAddOns(data);
      });
    } else if (key === 'charges') {
      const data: any = charges;
      data.map((x: any) => {
        if (planCharge.length > 0 && !planCharge.includes(x)) {
          x.checked = false;
        }
        setCharges(data);
      });
    }
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
      <CustomerHeader
        isback={false}
        isEdit={addEditPlan?.plan_id ? true : false}
        title={addEditPlan?.plan_id ? 'Edit Plan' : ' Create New Plan'}
        onSave={onchangeRoute}
        onCancel={() => {
          navigate(planSubscriptionRoutes.plan);
        }}
      />
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
                    value={addEditPlan.name}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                      setFormErrors({ ...formErrors, name: '' });
                      setPlanList('name', e?.target?.value);
                    }}
                    textFieldStyle={createPlanStyle.inputSx}
                    error={formErrors?.name?.length > 0 ? true : false}
                    errorMessage={formErrors.name}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={createPlanStyle.inputGroupSx}>
                  <Label sx={createPlanStyle.labelSx} rootStyle={{ mb: '1' }} htmlFor="addTitle" isRequired={false}>
                    Description
                  </Label>
                  <Input
                    size="small"
                    // placeholder="Description"
                    value={addEditPlan.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      setPlanList('description', e?.target?.value)
                    }
                    rows={3}
                    rowsMax={6}
                    isMulti={true}
                    textFieldStyle={createPlanStyle.inputSx}
                    id="description"
                    // isError={groupState?.error?.addTitle ? true : false}
                    // errorMessage={groupState?.error?.addTitle ?? ''}
                  />
                </Box>
              </Grid>
              {SqureText.map((x: squareText, index) => {
                const check_value = addEditPlan[x.key];
                return (
                  <Grid item key={index}>
                    <CustomCheckboxWithLabels
                      handleChanges={(value: any) => setPlanList(x.key, value)}
                      checked={check_value}
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
                      handleChange={(value) => {
                        setFormErrors({ ...formErrors, billing_period: '' });
                        setPlanList('billing_period', value);
                      }}
                      value={addEditPlan.billing_period}
                      tabOne={'Monthly'}
                      tabTwo={'Yearly'}
                    />
                    {formErrors?.billing_period?.length > 0 ? (
                      <Label sx={{ color: 'red', paddingTop: 1.2 }}>{formErrors?.billing_period}</Label>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={7.5} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                      Set Price
                    </Label>
                    <Box sx={{ display: 'flex', alignItems: 'start' }}>
                      {addEditPlan.billing_period.includes('Monthly') && (
                        <ButtonGroupDropdown
                          onChange={(e) => {
                            setFormErrors({ ...formErrors, monthly: '' });
                            setPlanList('monthly', e.target.value, 'price');
                          }}
                          value={addEditPlan.price.monthly}
                          permissionList={Money}
                          BtnName={'Monthly'}
                          isError={formErrors?.monthly ? true : false}
                          errorMessage={formErrors?.monthly}
                        />
                      )}
                      {addEditPlan.billing_period.includes('Yearly') && (
                        <ButtonGroupDropdown
                          onChange={(e) => {
                            setFormErrors({ ...formErrors, yearly: '' });
                            setPlanList('yearly', e.target.value, 'price');
                          }}
                          value={addEditPlan.price.yearly}
                          permissionList={Money}
                          BtnName={'Yearly'}
                          isError={formErrors?.yearly ? true : false}
                          errorMessage={formErrors?.yearly}
                        />
                      )}
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => setPlanList('is_per_user', value)}
                        checked={addEditPlan.is_per_user}
                        circleCheckbox={true}
                        circleText={'Per user'}
                      />
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => setPlanList('is_flat_fee', value)}
                        checked={addEditPlan.is_flat_fee}
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
                      value={addEditPlan.billing_cycles}
                      handleChange={(value) => {
                        setFormErrors({ ...formErrors, billing_cycles: '' });
                        setPlanList('billing_cycles', value);
                      }}
                      errorMessage={formErrors.billing_cycles}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          }
        />
        <BackgroundPaper
          title="Feature set and controls"
          subTitle="Feature Group"
          secondaryLabel="Feature"
          showSecondaryBtn={true}
          showButton={true}
          onClick={() => handleDrawerOpen('featureGroup')}
          onSecondaryClick={() => handleDrawerOpen('feature')}
          content={
            <>
              {planFeature.map((feature: any, index) => {
                return (
                  <Box key={index}>
                    <CreatePlanCard
                      onChange={(inner_id: string, value: any) => handleFeatures(feature.id, inner_id, value)}
                      onDelete={(feature_id: string, feature_mapping_id: string) =>
                        handleDeleteFeature(feature_id, feature.id, feature?.plan_feature_mapping_id)
                      }
                      title={feature?.name}
                      subTitle={feature.feature}
                    />
                  </Box>
                );
              })}
              {planUngroupedFeature.length > 0 && (
                <CreatePlanCard
                  onChange={(inner_id: string, value: any) => handleUnGroupedFeature(inner_id, value)}
                  onDelete={(feature_id: string, feature_mapping_id: string) =>
                    handleDeleteUnGroupedFeature(feature_id, feature_mapping_id)
                  }
                  title={''}
                  subTitle={planUngroupedFeature}
                />
              )}
              {formErrors.features?.length > 0 ? <Label sx={{ color: 'red' }}>{formErrors?.features}</Label> : <></>}
            </>
          }
        />
        <BackgroundPaper
          title="Add-ons"
          subTitle="addons"
          showButton={true}
          showSecondaryBtn={false}
          onClick={() => handleDrawerOpen('add_ons')}
          content={planAddOn.map((add_on, index) => {
            return (
              <AddOnBackgroundCard
                key={index}
                billingPeriod={addEditPlan.billing_period}
                isLast={index !== planAddOn.length - 1}
                ListAddons={add_on}
                onChange={(key, value, innerkey) => handleAddons(key, value, innerkey)}
                handleDelete={() => handleAddOnDelete(add_on.id, add_on.plan_add_on_mapping_id)}
              />
            );
          })}
        />
        <BackgroundPaper
          title="Charges"
          subTitle="Charges"
          showButton={true}
          showSecondaryBtn={false}
          onClick={() => handleDrawerOpen('charges')}
          content={planCharge.map((charge: any, index: any) => {
            return (
              <>
                <Box key={index}>
                  <Box sx={createPlanStyle.align}>
                    <Typography sx={createPlanStyle.firstTextdark}>{charge.name}</Typography>
                    <CloseRedIcon
                      onClick={() => handleChargeDelete(charge.id, charge.plan_charge_mapping_id)}
                      rootStyle={{ width: '17px', height: '17px', cursor: 'pointer' }}
                    />
                  </Box>
                  <Box sx={createPlanStyle.inputGroupSx}>
                    <Label sx={createPlanStyle.labelSx} htmlFor="addTitle">
                      Set price
                    </Label>
                    <Input
                      value={charge.price}
                      type={'number'}
                      onChange={(event) => {
                        handleCharges('charge', event?.target.value, charge.id);
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
              </>
            );
          })}
        />
      </Box>

      <Drawer
        show={draweropen['charges']}
        onCloseDrawer={() => handleDrawerClose('charges')}
        anchor="right"
        drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Add Charges'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        footer={
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                setOptionsCharges(planCharge);
                handleDrawerClose('charges');
              }}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                const opt_charge = optionscharges;
                opt_charge.map((z: any) => {
                  planCharge.map((x: any) => {
                    if (x.id === z.id) {
                      z.price = x.price;
                      z.checked = true;
                    }
                  });
                });
                setCharge(opt_charge);
                handleDrawerClose('charges');
              }}
              sx={createPlanStyle.saveButton}
            >
              Save
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GroupCheckBox
            checklist={charges}
            checked={optionscharges.map((charge: any) => {
              return charge.id;
            })}
            handleChange={(value) => handleChargeSelected(value)}
          />
        </Box>
      </Drawer>

      <Drawer
        show={draweropen['add_ons']}
        onCloseDrawer={() => handleDrawerClose('add_ons')}
        anchor="right"
        drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Add Add-Ons'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        footer={
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                setOptionsAddons(planAddOn);
                handleDrawerClose('add_ons');
              }}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                const opt_addon = optionsaddons;
                opt_addon.map((z: any) => {
                  planAddOn.map((x: any) => {
                    if (x.id === z.id) {
                      z.price = x.price;
                      z.limit_count = x.limit_count;
                      z.value = x.limit_count > 0 ? 'limited' : 'unlimited';
                      // z.checked = true;
                    }
                  });
                });
                setAddOn(opt_addon);
                handleDrawerClose('add_ons');
              }}
              sx={createPlanStyle.saveButton}
            >
              Save
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GroupCheckBox
            checklist={addons}
            checked={optionsaddons.map((feature: any) => {
              return feature.id;
            })}
            handleChange={(value) => handleAddOnSelected(value)}
          />
        </Box>
      </Drawer>

      <Drawer
        show={draweropen['featureGroup']}
        onCloseDrawer={() => handleDrawerClose('featureGroup')}
        anchor="right"
        drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Add Feature Group'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        footer={
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                setOptionsFeatureList(planFeature);
                handleDrawerClose('featureGroup');
              }}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                const data = optionsfeatureList;
                data.map((x: any) => {
                  planFeature.map((z: any) => {
                    if (x.id === z.id) {
                      x.feature_list = z.feature;
                    }
                  });
                });
                setPlanFeature(optionsfeatureList, 0);
                setFormErrors({ ...formErrors, features: '' });
                handleDrawerClose('featureGroup');
              }}
              sx={createPlanStyle.saveButton}
            >
              Save
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GroupCheckBox
            checklist={featureList}
            checked={optionsfeatureList.map((feature: any) => {
              return feature.id;
            })}
            handleChange={(value) => handleSelected(value)}
          />
        </Box>
      </Drawer>

      <Drawer
        show={draweropen['feature']}
        onCloseDrawer={() => handleDrawerClose('feature')}
        anchor="right"
        drawerStyleSX={subscriptionDetailsStyle.drawerBody}
        drawerRightClose
        header={'Add Feature'}
        headerStyle={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#101010',
          textTransform: 'capitalize',
        }}
        footer={
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                handleDrawerClose('feature');
                setOptionsUngroupedFeatureList(planUngroupedFeature);
              }}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => {
                const opt_ungroup_feature = optionsungroupedFeatureList;
                opt_ungroup_feature.map((z: any) => {
                  planUngroupedFeature.map((x: any) => {
                    if (x.id === z.id) {
                      z.limit_count = x.limit_count;
                      z.user_value = x.limit_count > 0 ? 'limited' : 'unlimited';
                      // z.checked = true;
                    }
                  });
                });
                setFormErrors({ ...formErrors, features: '' });
                setUngroupedFeature(opt_ungroup_feature);
                handleDrawerClose('feature');
              }}
              sx={createPlanStyle.saveButton}
            >
              Save
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <GroupCheckBox
            checklist={ungroupedFeatureList}
            checked={optionsungroupedFeatureList.map((feature: any) => {
              return feature.id;
            })}
            handleChange={(value) => handleUnGroupFeatureSelected(value)}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
