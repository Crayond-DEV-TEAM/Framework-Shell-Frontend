import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';

import { subscriptionStyle } from './style';
import { Header, tableData, tableJson } from './utils';
import { useState } from 'react';
import { MapSubscriptionPlanTransfer, TableHeader } from '..';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { SearchIcon } from '@atoms/icons';
import { Input } from '@atoms/input';
import { CustomerModalCard } from '@atoms/customerModalCard';
import { planSubscriptionRoutes } from '@core/routes';
import { useNavigate } from 'react-router-dom';

export interface SubscriptionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Subscription = (props: SubscriptionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [switchList, setSwitchList] = useState<any>([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [planControl, setPlanControl] = useState(false);
  const navigate = useNavigate();
  const filteredMessageGroup = tableJson.filter((x: any) =>
    x.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const handleTableDelete = (id: string) => {
    // debugger;
    // setSelected(true);
    // setidRole(id);
  };
  const handleTableEdit = (id: string, data: any, e: any) => {
    // debugger;
    // setSelected(true);
    // setidRole(id);
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
  const handleMapclose = () => {
    setCardOpen(false);
  };
  const handleMapopen = () => {
    setCardOpen(true);
  };

  const handlePlanOpen = () => {
    setPlanControl(true);
  };
  const handlePlanClose = () => {
    setPlanControl(false);
  };
  const onSaveSubscription = () => {
    navigate(planSubscriptionRoutes.subscriptiondetails);
  };

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
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={cardOpen}
        title={'IN-957690'}
        Bodycomponent={
          <Box sx={{ p: '24px' }}>
            <Input
              placeholder={'Search'}
              // value={''}
              // onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={<SearchIcon rootStyle={{ width: '12px', height: '12px', color: '#818181', ml: 1 }} />}
            />
            <Box sx={{ m: '16px' }} />
            <Box>
              <CustomerModalCard />
            </Box>
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
      /> v
      <DialogDrawer
        maxModalWidth="xl"
        isDialogOpened={planControl}
        title={'Map Subscription'}
        Bodycomponent={<MapSubscriptionPlanTransfer />}
        handleCloseDialog={handlePlanClose}
        dialogRootStyle={subscriptionStyle.dialogMapSx}
        Footercomponent={
          <FooterComponent
            saveText={'Next'}
            saveButtonStyle={{ minWidth: '90px', height: '28px' }}
            onCancel={handlePlanClose}
            onSave={onSaveSubscription}
          />
        }
      />
    </Box>
  );
};
