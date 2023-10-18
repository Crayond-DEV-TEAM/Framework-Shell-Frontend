import { planSubscriptionRoutes } from '@core/routes';
import { usePlans } from '@core/store';
import type { SxProps, Theme } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteComponent, TableHeader } from '..';
import { plansStyle } from './style';
import { Header, tableData } from './utills';

export interface PlansProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Plans = (props: PlansProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const navigate = useNavigate();

  const {
    PlanList,
    getPlansList,
    deletePlan,
    fetching,
    setPlanList,
    setBulkPlanList,
    setExplicitPlanFeature,
    setUngroupedFeature,
    setAddOn,
    setCharge,
    editPlanStatus,
    clearAll,
  } = usePlans();
  const [del, setDel] = useState(false);
  const [delid, setDelId] = useState('');

  const filteredMessageGroup = PlanList.filter((x: any) => x.plan?.toLowerCase()?.includes(searchTerm.toLowerCase()));

  const handleTableEdit = (id: any, data: any, e: any) => {
    const temp_group: any = [];
    const feature_group_all = data.plan_data.plan_feature_mapings.filter(
      (feature_group: any) => feature_group.feature_group !== null,
    );
    // console.log(feature_group_all);
    feature_group_all.map((grp: any, index: any) => {
      // console.log(temp_group);
      if (temp_group.length <= 0) {
        temp_group.push({
          id: grp.feature_group.id,
          plan_feature_mapping_id: grp.id,
          name: grp.feature_group.name,
          feature: [],
        });
      } else if (temp_group.find((temp: any) => temp?.id === grp?.feature_group?.id) === undefined) {
        temp_group.push({
          id: grp.feature_group.id,
          plan_feature_mapping_id: grp.id,
          name: grp.feature_group.name,
          feature: [],
        });
      }
    });

    console.log('Feature GROUP ', feature_group_all);
    console.log('temp', temp_group);
    feature_group_all.map((grp: any) => {
      temp_group.map((x: any) => {
        if (x.id === grp?.feature_group?.id) {
          x.feature.push({
            id: grp.feature.id,
            name: grp.feature.name,
            user_value: grp.limit_count > 0 ? 'limited' : 'unlimited',
            limit_count: grp.limit_count,
          });
        }
      });
    });
    setExplicitPlanFeature(temp_group);
    const ungroupped_feature = data.plan_data.plan_feature_mapings
      .filter((feature_group: any) => feature_group.feature_group === null)
      ?.map((feature: any) => {
        return {
          id: feature.feature.id,
          name: feature.feature.name,
          plan_feature_mapping_id: feature.id,
          user_value: feature.limit_count > 0 ? 'limited' : 'unlimited',
          limit_count: feature.limit_count,
        };
      });

    setUngroupedFeature(ungroupped_feature);

    console.log(data.plan_data.plan_add_on_mappings);
    const add_on = data.plan_data.plan_add_on_mappings.map((plan_addon: any) => {
      return {
        id: plan_addon.add_on.id,
        plan_add_on_mapping_id: plan_addon.id,
        name: plan_addon.add_on.name,
        price: plan_addon.price,
        value: plan_addon.limit_count > 0 ? 'limited' : 'unlimited',
        limit_count: plan_addon.limit_count,
      };
    });
    console.log(add_on);
    setAddOn(add_on);
    const charges = data.plan_data.plan_charge_mappings.map((charge: any) => {
      return {
        id: charge.charge.id,
        name: charge.charge.name,
        plan_charge_mapping_id: charge.id,
        price: charge?.price,
      };
    });
    setCharge(charges);
    const addEditPlan = {
      plan_id: data.plan_data.id,
      billing_cycles: data.plan_data.billing_cycles,
      billing_period: data.plan_data.billing_period,
      description: data.plan_data.description,
      id: data.plan_data.id,
      is_active: data.plan_data.is_active,
      is_metered_billing: data.plan_data.is_metered_billing,
      is_per_user: data.plan_data.is_per_user,
      is_recomended: data.plan_data.is_recomended,
      is_flat_fee: data.plan_data.is_flat_fee,
      is_plan_public: data.plan_data.is_plan_public,
      name: data.plan_data.name,
      price: data.plan_data.price,
    };
    setBulkPlanList(addEditPlan);
    navigate(planSubscriptionRoutes.createplan);
  };
  const handleTableDelete = (id: any) => {
    setDelId(id);
    setDel(true);
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
      editPlanStatus(id, true);
    } else {
      console.log(id);
      editPlanStatus(id, false);
    }
  };
  const handleMapopen = () => {
    clearAll();
    navigate(planSubscriptionRoutes.createplan);
  };

  const handleStatus = () => {
    if (PlanList?.length > 0) {
      const status = PlanList?.filter((val: any) => val?.status === true)?.map((val: any) => val?.id);
      setSwitchList(status);
    }
  };

  useEffect(() => {
    getPlansList({ offset: 0, limit: 100 });
  }, []);

  useEffect(() => {
    handleStatus();
  }, [PlanList]);

  const onClose = () => {
    setDel(false);
  };

  const handleDeleteAddon = () => {
    deletePlan(delid);
    setDel(false);
  };

  return (
    <Box
      sx={[
        {
          ...plansStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <TableHeader
        isFilterRequired={false}
        buttonName={'Create'}
        tableHeader={'Plans'}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        handleOpen={handleMapopen}
        // editTableMessage={addRole}
      />
      <Box sx={{ margin: '17px' }} />
      {filteredMessageGroup.length <= 0 && fetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {' '}
          <CircularProgress />{' '}
        </Box>
      ) : (
        <Box sx={plansStyle.commonTable}>
          <CommonTable
            Header={Header}
            dataList={filteredMessageGroup}
            tableData={tableData(handleTableEdit, handleTableDelete)}
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
            paginationOption={{
              isEnable: true,
              rowPerPage: 10,
              rowsPerPageOptions: [5, 10, 25],
            }}
            tableMinHeight={'calc(100vh - 167px)'}
            tableMaxHeight={'calc(100vh - 167px)'}
            paddingAll={'0px'}
            marginAll={'0px 0px 0px'}
            dense={'small'}
          />
        </Box>
      )}
      <DeleteComponent openCommand={del} onCancel={onClose} onDelete={handleDeleteAddon} />
    </Box>
  );
};
