import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Table as CommonTable } from "@crayond_dev/ui_table";

import { subscriptionStyle } from './style';
import { Header, tableData, tableJson } from './utils';
import { useState, useEffect } from 'react';
import { DeleteComponent, MapSubscriptionPlanTransfer, TableHeader } from '..';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { SearchIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { CustomerModalCard } from '@atoms/customerModalCard';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { useAddOns, useCustomer, useSubscription } from '@core/store';
import { usePlan } from '@core/store/plan-subscription';

export interface SubscriptionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Subscription = (props: SubscriptionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchComp, setSearchComp] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [planControl, setPlanControl] = useState(false);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [del, setDel] = useState(false);
  const [delId, setDelId] = useState('');
  const navigate = useNavigate();
  const {
    getSubscriptionList,
    setSubscriptionList,
    createEditSubscription,
    createSubscription,
    editSubscription,
    deleteSubscription,
    updateEditData,
    SubscriptionList,
    deletefetch,
    getStatusList,
    fetchSubscription,
    setTicketSubscription,
    clearAll,
  } = useSubscription();
  const { CustomerList, getCustomerList } = useCustomer();
  const { getPlanList, PlanList } = usePlan();
  const [formErrors, setFormErrors] = useState({});
  const [cardformError, setFormcardError] = useState({});
  const filteredMessageGroup = SubscriptionList.filter((x: any) =>
    x.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  console.log(PlanList, 'PlanListPlanListPlanList');

  const filteredCompanyList = CustomerList.filter((x: any) =>
    x.email?.toLowerCase()?.includes(searchComp.toLowerCase()),
  );

  const validateCard = () => {
    const errors: Record<string, string> = {};
    if (createEditSubscription.customer_id.length === 0) {
      errors.card = 'please select company';
    }
    setFormcardError(errors);
    return Object.keys(errors).length === 0;
  };

  console.log(createEditSubscription, 'createEditSubscriptioncreateEditSubscription');
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (createEditSubscription.plan_id.length === 0) {
      errors.plan_id = 'Plan is required';
    }
    if (createEditSubscription.billing_type.length === 0) {
      errors.billing_type = 'Billing type is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleTableDelete = (id: string) => {
    setDelId(id);
    setDel(true);
    // deleteSubscription(id);
  };
  const handleTableDetail = (id: string, data: any, e: any) => {
    setTicketSubscription(data);
    navigate(planSubscriptionRoutes.subscriptiondetails);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    setTicketSubscription(data);
    fetchSubscription(id);
    const updateData = {
      customer_id: data.data.customer.id,
      plan_id: data.data.plan,
      is_active: data.is_active,
      // old_addon: data.data.subscription_add_on_mappings,
      add_on: data.data.subscription_add_on_mappings,
      billing_type: data.data.subscription_billings?.map((x: any) => x.billing_type)[0]
        ? { name: data.data.subscription_billings?.map((x: any) => x.billing_type)[0] }
        : '',
      actual_price: data.data.subscription_billings?.[0]?.actual_price,
      price_paid: data.data.subscription_billings?.price_paid,
      is_plan_effective: data.data.is_plan_effective,
      id: id,
      new_addon: [],
      old_addon: [],
    };
    updateEditData(updateData);
    setPlanControl(true);
  };
  const handleDelete = () => {
    deleteSubscription(delId);
    setDel(false);
  };
  const OnClose = () => {
    setDel(false);
  };
  const handleSwitch = (id: any, data: any, e: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
    if (e.target.checked === true) {
      console.log(id);
      getStatusList(id, true);
    } else {
      console.log(id);
      getStatusList(id, false);
    }
  };

  const handleChangeEvent = (key: string, value: any) => {
    setSubscriptionList(key, value);
  };
  const handleMapclose = () => {
    setCardOpen(false);
    setCardIndex(null);
    clearAll();
  };
  const handleMapopen = () => {
    setCardOpen(true);
  };

  const handlePlanOpen = () => {
    const cardIsValid = validateCard();
    if (cardIsValid) {
      fetchSubscription(createEditSubscription.customer_id);
      setPlanControl(true);
    }
  };
  const handlePlanClose = () => {
    setPlanControl(false);
    handleMapclose();
    clearAll();
  };
  const onSaveSubscription = () => {
    const isValid = validateForm();
    if (isValid) {
      if (
        createEditSubscription.id !== null &&
        createEditSubscription.id !== undefined &&
        String(createEditSubscription.id).trim().length > 0
      ) {
        editSubscription();
      } else {
        createSubscription();
      }

      handlePlanClose();
      handleMapclose();
      setCardIndex(null);
    }
  };

  const handleCardClick = (index: number, data: any) => {
    setCardIndex(index);
    handleChangeEvent('customer_id', data.id);
  };
  const handleStatus = () => {
    if (SubscriptionList?.length > 0) {
      const status = SubscriptionList?.filter((val: any) => val?.is_active === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    getSubscriptionList();
    getCustomerList();
    getPlanList();
  }, []);
  useEffect(() => {
    handleStatus();
  }, [SubscriptionList]);
  // console.log(Boolean(formErrors.card), 'ttttttttttttttttttttttttt');
  // const cardCheck = Boolean(formErrors.card);
  return (
    <Box
      sx={[
        {
          ...subscriptionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Subscriptions'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleMapopen}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      <Box sx={subscriptionStyle.commonTable}>
        <CommonTable
          Header={Header}
          dataList={filteredMessageGroup}
          tableData={tableData(handleTableEdit, handleTableDelete, handleTableDetail)}
          switchList={switchList}
          handleSwitch={handleSwitch}
          headerOptions={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#818181',
            bgColor: '#EAEAEA',
            borderBottom: '0px',
            width: '100%',
            padding: '6px 16px 6px 7px',
          }}
          cellOptions={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#5A5A5A',
            borderBottom: '0px',
            // padding: '8px',
            padding: '3px 0px 3px 7px',
          }}
          rowOptions={{
            rowOddBgColor: '#fff',
            rowEvenBgColor: '#F7F7F7',
          }}
          tableMinWidth={'80px'}
          stickyOptions={{
            stickyHeader: true,
            stickyLeft: ['checkbox'],
            stickyRight: ['is_active', 'action'],
          }}
          tableMinHeight={'calc(100vh - 167px)'}
          tableMaxHeight={'calc(100vh - 167px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
        />
      </Box>
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={cardOpen}
        title={'IN-957690'}
        Bodycomponent={
          <Box sx={{ p: '24px' }}>
            <Input
              placeholder={'Search Email'}
              value={searchComp}
              onChange={(e) => setSearchComp(e.target.value)}
              startAdornment={<SearchIcon rootStyle={{ width: '12px', height: '12px', color: '#818181', ml: 1 }} />}
            />
            {createEditSubscription.customer_id.length === 0 && (
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: '12px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
              >
                Please Select Company
              </Typography>
            )}
            <Box sx={{ m: createEditSubscription.customer_id.length === 0 ? '0px' : '16px' }} />
            {filteredCompanyList.map((x: any, index: number) => (
              <Box key={index} onClick={() => handleCardClick(index, x)}>
                <CustomerModalCard
                  companyName={x?.customerName}
                  customerId={x?.customerid}
                  email={x.email}
                  customerName={x.customerName}
                  selected={cardIndex}
                  // filteredCompanyList={filteredCompanyList}
                  sx={cardIndex === index ? subscriptionStyle.rootsSxSelected : subscriptionStyle.rootsSx}
                />

                <span>{formErrors.billing_type}</span>
              </Box>
            ))}
          </Box>
        }
        handleCloseDialog={handleMapclose}
        dialogRootStyle={subscriptionStyle.dialogSx}
        Footercomponent={
          <FooterComponent
            saveText={'Next'}
            saveButtonStyle={{ minWidth: '90px', height: '28px', backgroundColor: 'red' }}
            onCancel={handleMapclose}
            onSave={handlePlanOpen}
          />
        }
      />
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={planControl}
        title={'Map Subscription'}
        Bodycomponent={
          <MapSubscriptionPlanTransfer
            AddOnsList={PlanList}
            handleChangeEvent={handleChangeEvent}
            createEditSubscription={createEditSubscription}
            formErrors={formErrors}
          />
        }
        handleCloseDialog={handlePlanClose}
        dialogRootStyle={subscriptionStyle.dialogMapSx}
        Footercomponent={
          <FooterComponent
            saveText={'Next'}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handlePlanClose}
            onSave={onSaveSubscription}
            // onSwitching={handleChangeEvent('plan_effective_from', value)}
            switching={true}
            check={true}
          />
        }
      />
      <DeleteComponent openCommand={del} onCancel={OnClose} onDelete={handleDelete} disabled={deletefetch} />
    </Box>
  );
};
