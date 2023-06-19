import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import { useEffect, useState } from 'react';
import { plansStyle } from './style';
import { TableHeader } from '..';
import { Header, tableData, tableJson } from './utills';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';
import { usePlans } from '@core/store';

export interface PlansProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Plans = (props: PlansProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const navigate = useNavigate();

  const { PlanList, getPlansList, deletePlan } = usePlans();

  const filteredMessageGroup = tableJson.filter((x: any) => x.plan?.toLowerCase()?.includes(searchTerm.toLowerCase()));
  const handleTableEdit = () => {
    navigate(planSubscriptionRoutes.createplan);
  };
  const handleTableDelete = (id: any) => {
    deletePlan(id);
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
    // if (e.target.checked === true) {
    //   console.log(id);
    //   getStatusList(id, true);
    // } else {
    //   console.log(id);
    //   getStatusList(id, false);
    // }
  };
  const handleMapopen = () => {
    navigate(planSubscriptionRoutes.createplan);
  };

  useEffect(() => {
    getPlansList({ offset: 0, limit: 0 });
  }, []);

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
          tableMinHeight={'calc(100vh - 167px)'}
          tableMaxHeight={'calc(100vh - 167px)'}
          paddingAll={'0px'}
          marginAll={'0px 0px 0px'}
          dense={'small'}
        />
      </Box>
    </Box>
  );
};
