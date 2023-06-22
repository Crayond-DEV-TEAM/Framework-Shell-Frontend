import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createPlanStyle } from './style';
import TextField from '@mui/material/TextField';
import { CustomToggle } from '@atoms/customToggle';
import { Drawer } from '@atoms/drawer';
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
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { CustomizedRadios } from '@atoms/customRadio';
import SearchIcon from '@mui/icons-material/Search';

import { chargesStyle } from '../charges/style';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { GroupCheckBox } from '@atoms/checkBoxGroup';
import { FooterComponent } from '@atoms/footerComponent';
import { subscriptionDetailsStyle } from '../subscriptionDetails/style';
import { addOneStyle } from '../addOne/style';
import { AddOnContent, DeleteComponent, TableHeader } from '..';

import { useCharges, usePlans, useAddOns, useFeatureGroup } from '@core/store';
import { Button } from '@atoms/button';

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

  const { getChargesList, ChargesList, createCharges, setChargesList, createEditCharges } = useCharges();

  const { setPlanList, addEditPlan, setPlanFeature, planFeature, setExplicitPlanFeature, planAddOn, setAddOn } =
    usePlans();

  const { FeatureGroupList, getFeatureGroupList } = useFeatureGroup();

  const { getAddOnsList, AddOnsList, createEditAddOns, setAddOnsList, createAddOns } = useAddOns();

  const [featureList, setFeatureList] = useState<any>([]);
  const [addons, setAddOns] = useState<any>([]);

  const [charges, setCharges] = useState<any>({});
  const [draweropen, setDrawerOpen] = useState({
    feature: false,
    add_ons: false,
    charges: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [drawerSearch, setDrawSearch] = useState('');

  const [modalValue, setModalValue] = useState<any>({
    Charges: false,
    addons: false,
  });

  useEffect(() => {
    getChargesList();
    getAddOnsList();
    getFeatureGroupList();
  }, []);

  useEffect(() => {
    const temp_charge_list = ChargesList.filter((x) => x.is_active === true);
    const data: { id: any; price: any }[] = [];
    temp_charge_list.map((x, index) => {
      return data.push({
        id: x.id,
        price: addEditPlan.charge.find((z) => z.id === x.id)?.price || 0,
      });
    });
    setPlanList('charge', data);
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
      });
    });
    setAddOns(data);
    // setPlanList('add_on', data);
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
    // setPlanList('feature', data);
    setFeatureList(temp_feature_list);
  }, [FeatureGroupList]);

  useEffect(() => {
    const temp_feature = FeatureGroupList.filter((x) => x.id === drawerSearch);
    const data: { id: string | undefined; limit_count: number | string }[] = [];
    const temp_limit_count: any = {};

    // temp_feature?.featureDetails.map((x: any) => {
    //   return data.push({
    //     id: x.id,
    //     name: x.name,
    //     limit_count: 0,
    //   });
    // });
    // console.log(data);

    // console.log(drawerSearch)
    temp_feature.map((feature) => {
      feature.featureDetails.map((x: any) => {
        temp_limit_count[x.id] = 0;
      });
      return data.push({
        id: feature.id,
        // [feature?.featureDetails?.map((x: any) => x.id)[0]]: 0
        limit_count: temp_limit_count,
      });
    });
    // console.log(data)
    setPlanList('feature', data);
  }, [drawerSearch]);

  const onchangeRoute = () => {
    console.log(addEditPlan);
    // navigate(planSubscriptionRoutes.plan);
  };
  const Money = [{ label: '10' }, { label: '19' }];
  const SqureText = [
    { key: 'is_plan_public', text: 'List this plan in the public portal' },
    { key: 'is_recomended', text: 'Make this a recommended plan' },
    { key: 'is_metered_billing', text: 'Enable metered billing' },
    { key: 'is_active', text: 'Active this paln' },
  ];

  const handleCharges = (key: string, value: any, array_key: any = '') => {
    const data = addEditPlan.charge;
    data?.map((charge: any) => {
      if (charge.id === array_key) {
        charge.price = value;
      }
    });
    setPlanList('charge', data);
  };

  const handleAddons = (key: string, value: any, innerkey = '') => {
    // const data = planAddOn;
    // data?.map((add_on: any) => {
    //   if (add_on.id === id) {
    //     if (innerkey.length > 0) {
    //       add_on[key][innerkey] = value;
    //     } else {
    //       add_on[key] = value;
    //     }
    //   }
    // });
    // setAddOn(data);

    console.log(key, value, innerkey);
    const data = planAddOn;
    data?.map((add_on: any) => {
      if (add_on.id === key) {
        if (innerkey.length > 0) {
          add_on['price'][innerkey] = value;
        } else {
          add_on[value === 'limited' || value === 'unlimited' ? 'value' : 'limit_count'] = value;
        }
      }
    });
    setAddOn(data);
  };

  const handleSelected = (value: any) => {
    console.log(value);
    const data: any = [];

    const feature_group: any = value.filter((grp: any) => grp.checked === true);

    setPlanFeature(feature_group, 0);
    // setPlanList('feature', data);
    // setFeatureList(data);
  };

  const handleAddOnSelected = (value: any) => {
    console.clear();
    console.log(value);
    const feature_addon = value.filter((grp: any) => grp.checked === true);
    setAddOn(feature_addon);
  };

  const handleOpen = (modalName: string) => {
    setModalValue({ ...modalValue, [modalName]: true });
  };

  const handleClose = (modalName: string) => {
    setModalValue({ ...modalValue, [modalName]: false });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditAddOns.name.trim().length === 0) {
      errors.name = 'FeatureGroup name is required';
    }

    if (createEditAddOns.description.trim().length === 0) {
      errors.description = 'Description is required';
    }
    if (createEditAddOns.features.length === 0) {
      errors.features = 'Feature is required';
    }
    if (createEditAddOns.featuregroup.length === 0) {
      errors.featuregroup = 'Feature Group is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFeatures = (id: string, inner_id: string, value: any) => {
    console.log(id, inner_id, value);

    const feature_grps = planFeature;

    feature_grps.map((grp, index) => {
      const feature_list = grp.feature;
      if (grp.id === id) {
        feature_list.map((feature) => {
          if (feature.id === inner_id) {
            feature.limit_count = value === 'unlimited' ? 0 : value === 'limited' ? 5 : parseInt(value);
          }
        });
      }
      grp.feature = feature_list;
    });
    setExplicitPlanFeature(feature_grps);
  };

  const handleDeleteFeature = (feature_id: string, group_id: string) => {
    console.log(feature_id, group_id);
    const data = planFeature;
    let removing_index: any = '';
    data.map((x: any, index: any) => {
      x.feature = x.feature.filter((z: any) => z.id !== feature_id);
      if (x.feature.length <= 0) {
        removing_index = index;
      }
    });

    removing_index !== '' && data.splice(removing_index, 1);

    setExplicitPlanFeature(data);
  };

  const handleNewCharge = (key: string, value: string) => {
    setChargesList(key, value);
    getChargesList();
  };

  const handleDrawerOpen = (key: string) => {
    setDrawerOpen({ ...draweropen, [key]: true });
  };
  const handleDrawerClose = (key: string) => {
    setDrawerOpen({ ...draweropen, [key]: false });
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
                    value={addEditPlan.name}
                    id="title"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      setPlanList('name', e?.target?.value)
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
                    value={addEditPlan.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      setPlanList('description', e?.target?.value)
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
                      handleChanges={(value: any) => setPlanList(x.key, value)}
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
                      handleChange={(value) => setPlanList('billing_period', value)}
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
                          setPlanList('monthly', value.label, 'price');
                        }}
                        permissionList={Money}
                        BtnName={'Monthly'}
                      />
                      <ButtonGroupDropdown
                        onChange={(value) => {
                          setPlanList('yearly', value.label, 'price');
                        }}
                        permissionList={Money}
                        BtnName={'Yearly'}
                      />
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => setPlanList('is_per_user', value)}
                        circleCheckbox={true}
                        circleText={'Per user'}
                      />
                      <CustomCheckboxWithLabels
                        handleChanges={(value) => setPlanList('is_flat_fee', value)}
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
                      handleChange={(value) => setPlanList('billing_cycles', value)}
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
          onClick={() => handleDrawerOpen('feature')}
          content={planFeature.map((feature, index) => {
            return (
              <Box key={index}>
                <CreatePlanCard
                  onChange={(inner_id: string, value: any) => handleFeatures(feature.id, inner_id, value)}
                  onDelete={(feature_id: string) => handleDeleteFeature(feature_id, feature.id)}
                  title={feature?.name}
                  subTitle={feature.feature}
                />
              </Box>
            );
          })}
        />
        <BackgroundPaper
          title="Add-ons"
          subTitle="addons"
          showButton={true}
          onClick={() => handleDrawerOpen('add_ons')}
          content={
            planAddOn.map((add_on, index) => {
              return (
                <AddOnBackgroundCard
                  key={index}
                  ListAddons={add_on}
                  onChange={(key, value, innerkey) => handleAddons(key, value, innerkey)}
                />
              );
            })
            // <AddOnBackgroundCard
            //   // ListAddons={AddOnsList.filter((x) => x.is_active === true).map((z) => {
            //   ListAddons={planAddOn.map((z) => {
            //     return {
            //       value: z.limit_count === 0 ? 'unlimited' : 'limited',
            //       id: z.id,
            //       subTitle: z?.name,
            //       price: z.price,
            //       limit_count: z.limit_count,
            //     };
            //   })}
            //   onChange={(id, value, key, innerkey) => {
            //     handleAddons(id, key, value, innerkey);
            //     // setPlanList('add_on', key, value, innerkey);
            //   }}
            // />
          }
        />

        <BackgroundPaper
          title="Charges"
          subTitle="Charges"
          showButton={true}
          onClick={handleOpen}
          content={ChargesList.map((charge: any, index: any) => {
            if (charge.is_active) {
              return (
                <>
                  <Box key={index}>
                    <Box sx={createPlanStyle.align}>
                      <Typography sx={createPlanStyle.firstTextdark}>{charge.name}</Typography>
                      <CloseRedIcon rootStyle={{ width: '17px', height: '17px' }} />
                    </Box>
                    <Box sx={createPlanStyle.inputGroupSx}>
                      <Label sx={createPlanStyle.labelSx} htmlFor="addTitle" isRequired>
                        Set price
                      </Label>
                      <Input
                        value={parseInt(addEditPlan.charge[index]?.price) || 0}
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
            }
          })}
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
                value={createEditCharges.name}
                textFieldStyle={chargesStyle.inputSx}
                id="title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleNewCharge('name', e.target.value)
                }
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
                value={createEditCharges.description}
                textFieldStyle={chargesStyle.inputBigSx}
                id="description"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleNewCharge('description', e.target.value)
                }
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
            checked={createEditCharges.is_active}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            SwitchChange={(e) => handleNewCharge('is_active', e.target.checked)}
            onCancel={() => handleClose('Charges')}
            onSave={() => {
              createCharges();
              handleClose('Charges');
            }}
          />
        }
      />

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
              onClick={() => handleDrawerClose('add_ons')}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => handleDrawerClose('add_ons')}
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
            checked={planAddOn.map((feature) => {
              return feature.id;
            })}
            handleChange={(value) => handleAddOnSelected(value)}
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
              onClick={() => handleDrawerClose('feature')}
              sx={createPlanStyle.cancButton}
            >
              Cancel
            </Button>
            <Button
              fullWidth={false}
              size={'small'}
              onClick={() => handleDrawerClose('feature')}
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
            checked={planFeature.map((feature) => {
              return feature.id;
            })}
            handleChange={(value) => handleSelected(value)}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
