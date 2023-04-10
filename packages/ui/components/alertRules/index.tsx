import DeleteIcon from '@core/ui/assets/deleteIcon';
import EditIcon from '@core/ui/assets/editIcon';
import SmallMailIcon from '@core/ui/assets/smallMailIcon';
import SmallNotificationIcon from '@core/ui/assets/smallNotificationIcon';
import SmallSmsIcon from '@core/ui/assets/smallSmsIcon';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
import { DialogContent } from '@core/ui/components/dialogContent';
import { TableHeader } from '@core/ui/components/tableHeader';
import { Box, Grid } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import React from 'react';
// import { Popup } from "@core/ui/components/popup";
import type { SxProps, Theme } from '@mui/material';
import { alertRuleStyles } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { useAlertRules } from '@core/store';
import { dummyTableData } from '@core/store/utils';
export interface AlertRuleProps {
  data?: any;
  id?: any;
  sx?: SxProps<Theme>;
  handleClose?: () => void;
  handleSubmit?: any;
}
export function AlertRules(props: AlertRuleProps): JSX.Element {
  // store Data
  const {
    addAlertRules,
    setaddAlertRule,
    editAlertRule,
    //  addAlertRule, getAlertTable
  } = useAlertRules();

  const updateState = (key: string, value: string) => setaddAlertRule({ key, value });

  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [switchList, setSwitchList] = React.useState([1, 4]);

  const handleSwitch = (id: any) => {
    if (!switchList.includes(id)) {
      setSwitchList([...switchList, id]);
    } else {
      const index = switchList.indexOf(id);
      if (index > -1) {
        switchList.splice(index, 1);
        setSwitchList([...switchList]);
      }
    }
  };
  const alertRuleData = dummyTableData?.filter(
    (x) => typeof x.alert_rule_code === 'string' && x.alert_rule_code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const Header = [
    // {
    //   id: 'no',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Sl no',
    // },
    {
      id: 'alert_rule_code',
      align: 'left',
      disablePadding: false,
      label: 'Alert Rule Code',
    },
    {
      id: 'reference_id',
      align: 'left',
      disablePadding: false,
      label: 'Reference ID',
    },
    {
      id: 'hashtag',
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
      id: 'alert_type',
      align: 'left',
      disablePadding: false,
      label: 'Alert Type',
    },
    {
      id: 'status',
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
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'alert_rule_code' },
    { type: ['TEXT'], name: 'reference_id' },
    { type: ['LABEL'], name: 'hashtag' },
    { type: ['TEXT'], name: 'description' },
    { type: ['ICON_WITH_LABEL'], name: 'alert_type' },
    {
      type: ['SWITCH'],
      name: 'status',
      switchText: [{ lable_1: 'No', lable_2: 'Active' }],
    },
    {
      type: ['ACTION'],
      name: 'action',
      variant: 'EDIT_WITH_DELETE',
      editHandel: (id: any) => {
        editAlertRule(dummyTableData[id]);
        setOpen(true);
      },
      deleteHandel: (id: any) => {
        console.log(id);
      },
      editIcon: <EditIcon />,
      deleteIcon: <DeleteIcon />,
    },
  ];

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // addAlertRule();
    setOpen(false);
  };

  // commenting for now
  // React.useEffect(() => {
  //   getAlertTable();
  // }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={alertRuleStyles.commonTable}>
            <CommonTable
              Header={Header}
              dataList={alertRuleData}
              tableData={tableData}
              handleSwitch={handleSwitch}
              headerOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#818181',
                bgColor: '#EAEAEA',
                borderBottom: '0px',
              }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                bgColor: '#fff',
                borderBottom: '0px',
              }}
              switchList={switchList}
              tableMinWidth={'1200px'}
              tableMinHeight={'539px'}
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
                    isFilterRequired
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isBtnRequired
                    handleOpen={handleClick}
                  />
                ),
              }}
            />
          </Box>
          <Box>
            <DialogDrawer
              dialogRootStyle={{
                width: '832px',
                height: '550px',
              }}
              title="Add New Rule"
              isDialogOpened={open}
              handleCloseDialog={handleClose}
              // handleSubmit={handleSubmit}
              fullWidth={false}
              fullScreen={false}
              Bodycomponent={<DialogContent data={addAlertRules} updateState={updateState} />}
              Footercomponent={
                <FooterComponent
                  check
                  SwitchChange={(e: any) => updateState('is_status', e.target.checked)}
                  onSave={handleSubmit}
                  onCancel={handleClose}
                />
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
