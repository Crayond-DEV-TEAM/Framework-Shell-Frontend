import { Grid, Box } from '@mui/material';
import React from 'react';
import DashRed from '@core/ui/assets/dashRed';
import DoubleTickBlue from '@core/ui/assets/dbTickBlue';
import DoubleTickGreen from '@core/ui/assets/dbTickGreen';
import DeleteIcon from '@core/ui/assets/deleteIcon';
import EditIcon from '@core/ui/assets/editIcon';
import EmailIcon from '@core/ui/assets/emailIcon';
import NotificationIcon from '@core/ui/assets/notificationIcon';
import SingleTickGreen from '@core/ui/assets/sgTickGreen';
import SmallMailIcon from '@core/ui/assets/smallMailIcon';
import SmallNotificationIcon from '@core/ui/assets/smallNotificationIcon';
import SmallSmsIcon from '@core/ui/assets/smallSmsIcon';
import SmsIcon from '@core/ui/assets/smsIcon';
import { CommonTable, BasicButtons } from 'crayond-components-library-1';
import { TableHeader } from '@core/ui/components/tableHeader';
import { DialogDrawer } from '@core/ui/atoms/dialogDrawer';
// import { DialogContent } from "@core/ui/components/dialogContent";
// import { Popup } from "@core/ui/components/popup";
import type { SxProps, Theme } from '@mui/material';
import { alertRuleStyles } from "./style";
export interface AlertRuleProps {
  data?: any;
  id?: any;
  sx?: SxProps<Theme>;
  handleClose?: () => void;
  handleSubmit?: any;
}
export function AlertRules(props: AlertRuleProps): JSX.Element {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const [alertRow, setAlertRow] = React.useState([]);
  const [alertRule, setAlertRule] = React.useState({});
  const [isSelectedAll, setIsSelectedAll] = React.useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([1, 2]);
  const [switchList, setSwitchList] = React.useState([1, 4]);
  const [headerSelect, setHederSelect] = React.useState('status');
  const [headerCheckbox, setHederCheckbox] = React.useState(true);
  const checkboxHandleChange = (data: any) => {
    if (!selectedCheckbox.includes(data)) {
      setSelectedCheckbox([...selectedCheckbox, data]);
    } else {
      const index = selectedCheckbox.indexOf(data);
      if (index > -1) {
        selectedCheckbox.splice(index, 1);
        setSelectedCheckbox([...selectedCheckbox]);
      }
    }
  };
  const setHederSearch = (value: any) => {
    console.log(':rocket: ~ file: App.tsx:31 ~ setHederSearch ~ value:', value);
  };
  const SelectAll = (data: any, isRestSet: any) => {
    if (!isRestSet) {
      setSelectedCheckbox([...data]);
      setIsSelectedAll(true);
    } else {
      setSelectedCheckbox([]);
      setIsSelectedAll(false);
    }
  };
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
  const downloadMethod = () => {
    console.log('Download Method working!');
  };
  const fillerMethod = () => {
    console.log('Filter Method working!');
  };
  const primaryBtnMethod = () => {
    console.log('primary Btn Method working!');
  };
  const secondaryBtnMethod = () => {
    console.log('secondary Btn Method working!');
  };
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
  const dataList = [
    {
      id: 1,
      alert_rule_code: 'kdjf-jdhd-3fd',
      reference_id: 'id-3409',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Quam vitae velit',
      alert_type: {
        label: 'Push Notification',
        color: '#754218',
        bgColor: '#FAE2CF',
        icon: <SmallNotificationIcon />,
      },
      status: false,
    },
    {
      id: 2,
      alert_rule_code: 'pdfi-sdff-024',
      reference_id: 'id-4985',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Malesuada elit',
      alert_type: {
        label: 'Email',
        color: '#77277F',
        bgColor: '#F7CFFA',
        icon: <SmallMailIcon />,
      },
      status: false,
    },
    {
      id: 3,
      alert_rule_code: 'gdg-fsds-dd2',
      reference_id: 'id-6832',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Quam dictum',
      alert_type: {
        label: 'SMS',
        color: '#185C75',
        bgColor: '#CFEFFA',
        icon: <SmallSmsIcon />,
      },
      status: true,
    },
    {
      id: 4,
      alert_rule_code: 'jduy-sdff-2s1',
      reference_id: 'id-9231',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Enim nisl dapibus',
      alert_type: {
        label: 'Email',
        color: '#77277F',
        bgColor: '#F7CFFA',
        icon: <SmallMailIcon />,
      },
      status: false,
    },
    {
      id: 5,
      alert_rule_code: 'hdyt-hst-s5s',
      reference_id: 'id-4875',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Interdum est pulvinar',
      alert_type: {
        label: 'SMS',
        color: '#185C75',
        bgColor: '#CFEFFA',
        icon: <SmallSmsIcon />,
      },
      status: true,
    },
    {
      id: 6,
      alert_rule_code: 1072,
      reference_id: 'ID-201',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Quam vitae velit',
      alert_type: {
        label: 'Push Notification',
        color: '#754218',
        bgColor: '#FAE2CF',
        icon: <SmallNotificationIcon />,
      },
      status: false,
    },
    {
      id: 7,
      alert_rule_code: 1616,
      reference_id: 'ID-244',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Malesuada elit',
      alert_type: {
        label: 'Email',
        color: '#77277F',
        bgColor: '#F7CFFA',
        icon: <SmallMailIcon />,
      },
      status: false,
    },
    {
      id: 8,
      alert_rule_code: 722,
      reference_id: 'ID-174',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Quam dictum',
      alert_type: {
        label: 'SMS',
        color: '#185C75',
        bgColor: '#CFEFFA',
        icon: <SmallSmsIcon />,
      },
      status: true,
    },
    {
      id: 9,
      alert_rule_code: 2139,
      reference_id: 'ID-232',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Enim nisl dapibus',
      alert_type: {
        label: 'Email',
        color: '#77277F',
        bgColor: '#F7CFFA',
        icon: <SmallMailIcon />,
      },
      status: false,
    },
    {
      id: 10,
      alert_rule_code: 4039,
      reference_id: 'ID-156',
      hashtag: {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
      description: 'Interdum est pulvinar',
      alert_type: {
        label: 'SMS',
        color: '#185C75',
        bgColor: '#CFEFFA',
        icon: <SmallSmsIcon />,
      },
      status: true,
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
        console.log(id);
        // handleIcon(id)
      },
      deleteHandel: (id: any) => {
        console.log(id);
      },
      editIcon: <EditIcon />,
      deleteIcon: <DeleteIcon />,
    },
  ];
  const updateState = (key: any, value: any) => {
    setAlertRule({
      ...alertRule,
      [key]: value,
    });
  };
  const handleClick = () => {
    setAlertRule({});
    setOpen(true);
  };
  const handleClose = () => {
    setAlertRule({});
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
  };
  // React.useEffect(() => {
  //     getTableData();
  // }, []);
  // const getTableData = () => {
  // };
  const handleIcon = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Box sx={alertRuleStyles.commonTable}>
              <CommonTable
                Header={Header}
                dataList={dataList}
                tableData={tableData}
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
                      isSearchRequired
                      isBtnRequired
                      handleOpen={handleClick}
                    />
                  ),
                }}
              />
            </Box>
            {/* <AlertDialog
              open={open}
              onClose={() => setOpen(!open)}
              header="Add Alert Rule"
              component={
                <Popup
                  data={alertRule}
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                  updateState={updateState}
                />
              }
              medium
            /> */}
            <Box>
              <DialogDrawer
                title="Add New Rule"
                isDialogOpened={open}
                handleCloseDialog={handleClose}
                handleSubmit={handleSubmit}
              // content={<DialogContent
              //     data={alertRule}
              //     updateState={updateState}
              // />}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}