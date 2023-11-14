import { DialogContent, TableHeader } from '@components/commonComponents';
import DeleteIcon from '@core/ui/assets/deleteIcon';
import EditIcon from '@core/ui/assets/editIcon';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

// import { Popup } from "@core/ui/components/popup";
import { FooterComponent } from '@atoms/footerComponent';
import { useAlertRules } from '@core/store';
import type { SxProps, Theme } from '@mui/material';
import { alertRuleStyles } from './style';
export interface AlertRuleProps {
  data?: any;
  id?: any;
  sx?: SxProps<Theme>;
  handleClose?: () => void;
  handleSubmit?: any;
}
export function AlertRules(props: AlertRuleProps): JSX.Element {
  const [newAlertRuleCode, setNewAlertRuleCode] = useState<any>();
  const [searchTerm, setSearchTerm] = React.useState('');

  // store Data
  const {
    getAlertTable,
    getHashtagData,
    setaddAlertRule,
    addAlertRules,
    alertsList,
    editAlertRule,
    addAlertRule,
    deleteAlertRule,
    clearState,
    editFetching,
    hashtagFilter,
    alertTypeFilter,
    statusFilter,
    dateFilter,
    handleChipDelete,
    onApply,
    setfilter,
    clearfilter,
    clearSelectedFilterByKey,
  } = useAlertRules();

  const alertRuleData = alertsList.filter(
    (x: any) => x.alert_rule_code?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );
  const [open, setOpen] = React.useState(false);
 
  const [switchList, setSwitchList] = useState<any>([]);

  const filterContent = [
    {
      name: 'hashtagFilter',
      children: hashtagFilter,
      key: 'Hashtags',
    },
    {
      name: 'alertTypeFilter',
      children: alertTypeFilter,
      key: 'Alert Type',
    },
    {
      name: 'statusFilter',
      children: statusFilter,
      key: 'Status',
    },
    {
      name: 'dateFilter',
      children: dateFilter,
      key: 'Date',
    },
  ];

  const handleFilterChange = (
    filterName: 'hashtagFilter' | 'alertTypeFilter' | 'statusFilter' | 'dateFilter',
    id: number,
    value: any,
  ) => {
    setfilter(filterName, id, value);
  };

  // Function to generate a random 10-digit code
  const generateRandomCode = (key: any) => {
    if (key) {
      const code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setNewAlertRuleCode(code);
    }
  };

  const updateState = (key: string, value: string) => {
    setaddAlertRule({ key, value });
  };

  const { data } = props;

  const handleSwitch = (id: string, data: any, e: any) => {
    // if (!switchList.includes(id)) {
    //   setSwitchList([...switchList, id]);
    // } else {
    //   const index = switchList.indexOf(id);
    //   if (index > -1) {
    //     switchList.splice(index, 1);
    //     setSwitchList([...switchList]);
    //   }
    // }
    return null;
  };

  const editHandel = (e: string, val: any) => {
    editAlertRule(val);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteAlertRule(val);
  };

  const Header = [
    {
      id: 'alert_rule_code',
      align: 'left',
      disablePadding: false,
      label: 'Alert Rule Code',
    },
    {
      id: 'referenceId',
      align: 'left',
      disablePadding: false,
      label: 'Reference ID',
    },
    {
      id: 'hashtags',
      align: 'left',
      disablePadding: false,
      label: 'Hashtag',
    },
    {
      id: 'description',
      align: 'left',
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'alertType',
      align: 'left',
      disablePadding: false,
      label: 'Alert Type',
    },
    {
      id: 'is_active',
      align: 'left',
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'action',
      align: 'left',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const tableData = [
    { type: ['TEXT'], name: 'alert_rule_code' },
    { type: ['TEXT'], name: 'referenceId' },
    { type: ['LABEL'], name: 'hashtags' },
    { type: ['TEXT'], name: 'description' },
    { type: ['ICON_WITH_LABEL'], name: 'alertType' },
    {
      type: ['SWITCH'],
      name: 'is_active',
      switchText: [{ label_1: 'In Active', label_2: 'Active' }],
    },
    {
      type: ['ACTION'],
      name: 'action',
      variant: [
        {
          icon: <EditIcon />,
          method: editHandel,
        },
        {
          icon: <DeleteIcon />,
          method: deleteHandel,
        },
      ],
    },
  ];

  const handleClick = () => {
    setOpen(true);
    generateRandomCode('add');
  };

  const handleClose = () => {
    setOpen(false);
    clearState();
  };

  const handleSubmit = () => {
    addAlertRule(newAlertRuleCode);
    setOpen(false);
    clearState();
  };

  useEffect(() => {
    getAlertTable();
    getHashtagData();
  }, []);

  useEffect(() => {
    const isActiveData = alertsList?.filter((alert) => alert?.is_active).map(({ id }) => id);
    setSwitchList(isActiveData);
  }, [alertsList]);
  

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={alertRuleStyles.commonTable}>          
            <CommonTable     
              Header={Header}
              dataList={alertRuleData}
              tableData={tableData}
              switchList={switchList}
              handleSwitch={handleSwitch}
              headerOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#818181',
                bgColor: '#EAEAEA',
                borderBottom: '0px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                borderBottom: '0px',
              }}
              tableMinWidth={'1500px'}
              tableMinHeight={'60vh'}
              paddingAll={'0px'}
              marginAll={'0px'}
              dense={'small'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    tableHeader="Alert Rule"
                    buttonName="Add New Rule"
                    placeholder="Search by rule code"
                    isFilterRequired={true}
                    filterContent={filterContent}
                    filterChange={handleFilterChange}
                    handleChipDelete={handleChipDelete}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isBtnRequired
                    handleOpen={handleClick}
                    clearfilter={clearfilter}
                    clearSelectedFilterByKey={clearSelectedFilterByKey}
                    onApply={onApply}
                  />
                ),
              }}
            />
          </Box>
          <Box>
            {editFetching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <DialogDrawer
                dialogRootStyle={{
                  width: '1200px',
                  height: '550px',
                }}
                title="Add New Rule"
                isDialogOpened={open}
                handleCloseDialog={handleClose}
                fullWidth={false}
                fullScreen={false}
                Bodycomponent={
                  <>
                    <DialogContent data={addAlertRules} updateState={updateState} newAlertRuleCode={newAlertRuleCode} />
                  </>
                }
                Footercomponent={
                  <FooterComponent
                    checked={addAlertRules?.is_active}
                    check
                    SwitchChange={(e: any) => updateState('is_active', e.target.checked)}
                    onSave={handleSubmit}
                    onCancel={handleClose}
                  />
                }
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
