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
import type { SxProps, Theme } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import React, { useEffect } from 'react';
import { reports_styles } from './style';
import { dummyTableData, tabsCard } from '@core/store/utils';
import { ReportTabs, TableHeader, TabsCard } from '@components/commonComponents';
import { useAlertReports, useSlug } from '@core/store';
import moment from 'moment';

export interface ReportsProps {
  data?: any;
  sx?: SxProps<Theme>;
}

export function Reports(props: ReportsProps): JSX.Element {
  const { data } = props;

  const [openAnchorEl, setOpenAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  //   const [openAnchorEl, setOpenAnchorEl] = React.useState(null);
  const [isSelectedAll, setIsSelectedAll] = React.useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([1, 2]);
  const [checked, setChecked] = React.useState(true);
  const [switchList, setSwitchList] = React.useState([1, 4]);
  const [headerSelect, setHederSelect] = React.useState('status');
  const [headerCheckbox, setHederCheckbox] = React.useState(true);
  const [filterContent, setFilterContent] = React.useState([]);
  const [searchTerm, setSearchTerms] = React.useState('');
  const { getReportDelivery, reportDelivery, getReportList, reportList } = useAlertReports();
  const { slugs } = useSlug();

  //   const handleClick = (event: any) => {
  //     setOpenAnchorEl(event.currentTarget);
  //   };
  const TabData = [
    {
      icon: <SmsIcon />,
      header: 'SMS',
      cardDetails: [
        {
          number: reportDelivery?.sms?.sent > 0 ? reportDelivery?.sms?.sent : '-',
          value: 'Sent',
        },
        {
          number: reportDelivery?.sms?.delivered > 0 ? reportDelivery?.sms?.delivered : '-',
          value: 'Delivered',
        },
        {
          number: reportDelivery?.sms?.notDelivered > 0 ? reportDelivery?.sms?.notDelivered : '-',
          value: 'Not Delivered',
        },
        // {
        //   number: '165',
        //   value: 'Clicked',
        // },
      ],
    },

    {
      icon: <EmailIcon />,
      header: 'Email',
      cardDetails: [
        {
          number: reportDelivery?.email?.sent > 0 ? reportDelivery?.email?.sent : '-',
          value: 'Sent',
        },
        {
          number: reportDelivery?.email?.delivered > 0 ? reportDelivery?.email?.delivered : '-',
          value: 'Delivered',
        },
        {
          number: reportDelivery?.email?.notDelivered > 0 ? reportDelivery?.email?.notDelivered : '-',
          value: 'Not Delivered',
        },
        // {
        //   number: '243',
        //   value: 'Clicked',
        // },
      ],
    },
    {
      icon: <NotificationIcon />,
      header: 'Push Notification',
      cardDetails: [
        {
          number: reportDelivery?.push?.sent > 0 ? reportDelivery?.push?.sent : '-',
          value: 'Sent',
        },
        {
          number: reportDelivery?.push?.delivered > 0 ? reportDelivery?.push?.delivered : '-',
          value: 'Delivered',
        },
        {
          number: reportDelivery?.push?.notDelivered > 0 ? reportDelivery?.push?.notDelivered : '-',
          value: 'Not Delivered',
        },
        // {
        //   number: '042',
        //   value: 'Clicked',
        // },
      ],
    },
    {
      icon: <SmsIcon />,
      header: 'WhatsApp',
      cardDetails: [
        {
          number: reportDelivery?.whatsapp?.sent > 0 ? reportDelivery?.whatsapp?.sent : '-',
          value: 'Sent',
        },
        {
          number: reportDelivery?.whatsapp?.delivered > 0 ? reportDelivery?.whatsapp?.delivered : '-',
          value: 'Delivered',
        },
        {
          number: reportDelivery?.whatsapp?.notDelivered > 0 ? reportDelivery?.whatsapp?.notDelivered : '-',
          value: 'Not Delivered',
        },
        // {
        //   number: '165',
        //   value: 'Clicked',
        // },
      ],
    },
    {
      icon: <NotificationIcon />,
      header: 'Slack',
      cardDetails: [
        {
          number: reportDelivery?.slack?.sent > 0 ? reportDelivery?.slack?.sent : '-',
          value: 'Sent',
        },
        {
          number: reportDelivery?.slack?.delivered > 0 ? reportDelivery?.slack?.delivered : '-',
          value: 'Delivered',
        },
        {
          number: reportDelivery?.slack?.notDelivered > 0 ? reportDelivery?.slack?.notDelivered : '-',
          value: 'Not Delivered',
        },
        // {
        //   number: '042',
        //   value: 'Clicked',
        // },
      ],
    },
  ];
  const tabs = [
    {
      id: 0,
      label: 'Today',
      children: <TabsCard data={TabData} />,
    },
    {
      id: 1,
      label: 'This Week',
      children: <TabsCard data={TabData} />,
    },
    {
      id: 2,
      label: 'This Month',
      children: <TabsCard data={TabData} />,
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenAnchorEl(null);
  };

  const openPop = openAnchorEl;
  const id = openPop ? 'simple-popover' : undefined;

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
    console.log('🚀 ~ file: App.tsx:31 ~ setHederSearch ~ value:', value);
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

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const editHandel = () => {
    console.log();
  };

  const deleteHandel = () => {
    console.log();
  };

  const Header = [
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
      id: 'receiver',
      align: 'left',
      disablePadding: false,
      label: 'Receiver',
    },
    {
      id: 'alert_type',
      align: 'left',
      disablePadding: false,
      label: 'Alert Type',
    },
    {
      id: 'sentOn',
      align: 'left',
      disablePadding: false,
      label: 'Sent on',
    },
    // {
    //   id: 'delivered_on',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Delivered on',
    // },
    // {
    //   id: 'clicked',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Clicked',
    // },
    // {
    //   id: 'status',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Status',
    // },
    // {
    //   id: 'action',
    //   align: 'left',
    //   disablePadding: false,
    //   label: 'Action',
    // },
  ];

  const tableData = [
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'alert_rule_code' },
    { type: ['TEXT'], name: 'reference_id' },
    { type: ['LABEL'], name: 'hashtag' },
    { type: ['TEXT'], name: 'description' },
    { type: ['TEXT'], name: 'receiver' },
    { type: ['ICON_WITH_LABEL'], name: 'alert_type' },
    { type: ['DATE'], name: 'sentOn', format: 'DD MMM hh:mm' },
    // { type: ['DATE'], name: 'delivered_on', format: 'DD MMM hh:mm' },
    // { type: ['DATE'], name: 'clicked', format: 'DD MMM hh:mm' },
    // {
    //   type: ['SWITCH'],
    //   name: 'status',
    //   switchText: [{ label_1: 'In Active', label_2: 'Active' }],
    // },
    // {
    //   type: ['ACTION'],
    //   name: 'action',
    //   variant: [
    //     {
    //       icon: <EditIcon />,
    //       method: editHandel,
    //     },
    //     {
    //       icon: <DeleteIcon />,
    //       method: deleteHandel,
    //     },
    //   ],
    // },
  ];

  const constructReportData = (data: any, val: string) => {
    let arr: any = [];

    if (Array.isArray(data) && data.length > 0) {
      if (val?.length > 0) {
        data.map((value) => {
          if (value?.receiver?.toLocaleLowerCase()?.includes(val?.toLocaleLowerCase())) {
            arr.push({
              id: 1,
              alert_rule_code: value?.alert_rule_code ?? '',
              reference_id: value?.reference_id ?? '',
              hashtag: [
                {
                  label: value?.hashtag ?? '#hashtag',
                  color: '#305AAE',
                  bgColor: '#E2EAFA',
                },
              ],
              description: value?.description ?? '',
              alert_type: {
                label:
                  value?.alert_type === 'Email'
                    ? 'Email'
                    : value?.alert_type === 'SMS'
                      ? 'SMS'
                      : value?.alert_type === 'PUSH NOTIFICATION'
                        ? 'PUSH NOTIFICATION'
                        : '',
                color:
                  value?.alert_type === 'Email'
                    ? '#754218'
                    : value?.alert_type === 'SMS'
                      ? '#185C75'
                      : value?.alert_type === 'PUSH NOTIFICATION'
                        ? '#754218'
                        : '',
                bgColor:
                  value?.alert_type === 'Email'
                    ? '#F7CFFA'
                    : value?.alert_type === 'SMS'
                      ? '#CFEFFA'
                      : value?.alert_type === 'PUSH NOTIFICATION'
                        ? '#754218'
                        : '',
                icon:
                  value?.alert_type === 'Email' ? (
                    <SmallMailIcon />
                  ) : value?.alert_type === 'SMS' ? (
                    <SmallSmsIcon />
                  ) : value?.alert_type === 'PUSH NOTIFICATION' ? (
                    <SmallNotificationIcon />
                  ) : (
                    ''
                  ),
              },
              receiver: value?.receiver ?? '',
              sentOn: moment(value?.sentOn).format('YYYY-MM-DD') ?? '',
              status: value?.status === 'Delivered' ? true : false,
            });
          }
        });
      } else {
        data.map((value) => {
          arr.push({
            id: 1,
            alert_rule_code: value?.alert_rule_code ?? '',
            reference_id: value?.reference_id ?? '',
            hashtag: [
              {
                label: value?.hashtag?.length > 0 ? value?.hashtag : '-',
                color: '#305AAE',
                bgColor: '#E2EAFA',
              },
            ],
            description: value?.description ?? '',
            alert_type: {
              label:
                value?.alert_type === 'Email'
                  ? 'Email'
                  : value?.alert_type === 'SMS'
                    ? 'SMS'
                    : value?.alert_type === 'PUSH NOTIFICATION'
                      ? 'PUSH NOTIFICATION'
                      : '',
              color:
                value?.alert_type === 'Email'
                  ? '#754218'
                  : value?.alert_type === 'SMS'
                    ? '#185C75'
                    : value?.alert_type === 'PUSH NOTIFICATION'
                      ? '#754218'
                      : '',
              bgColor:
                value?.alert_type === 'Email'
                  ? '#F7CFFA'
                  : value?.alert_type === 'SMS'
                    ? '#CFEFFA'
                    : value?.alert_type === 'PUSH NOTIFICATION'
                      ? '#754218'
                      : '',
              icon:
                value?.alert_type === 'Email' ? (
                  <SmallMailIcon />
                ) : value?.alert_type === 'SMS' ? (
                  <SmallSmsIcon />
                ) : value?.alert_type === 'PUSH NOTIFICATION' ? (
                  <SmallNotificationIcon />
                ) : (
                  ''
                ),
            },
            receiver: value?.receiver ?? '',
            sentOn: moment(value?.sentOn).format('YYYY-MM-DD') ?? '',
            status: value?.status === 'Delivered' ? true : false,
          });
        });
      }
    }
    return arr;
  };

  const setSearchTerm = (value: string) => {
    setSearchTerms(value);
    const filterReportData = constructReportData(reportList, value);
    setFilterContent(filterReportData);
  };

  useEffect(() => {
    if (slugs?.ALERTSHUB) {
      getReportDelivery();
      getReportList();
    }
  }, [slugs?.ALERTSHUB]);

  return (
    <Box>
      <Grid container sx={reports_styles.totalReportSx}>
        <Grid item xs={12}>
          <Box sx={reports_styles.reportTabs}>
            <ReportTabs tabs={tabs} />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Box sx={reports_styles.commonTable}>
            <CommonTable
              Header={Header}
              dataList={
                searchTerm?.length > 0 && filterContent?.length > 0
                  ? filterContent
                  : searchTerm?.length > 0 && filterContent?.length === 0
                    ? []
                    : Array.isArray(reportList) && reportList?.length > 0
                      ? constructReportData(reportList, '')
                      : []
              }
              tableData={tableData}
              headerOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#818181',
                bgColor: '#EAEAEA',
                borderBottom: '0px',
              }}
              // stickyOptions={{
              //   stickyHeader: true,
              //   stickyLeft: [],
              //   stickyRight: ['action', 'status'],
              // }}
              cellOptions={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#5A5A5A',
                // bgColor: '#fff',
                borderBottom: '0px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              tableMinWidth={'1800px'}
              // tableMinHeight={'400px'}
              paddingAll={'0px'}
              marginAll={'0px'}
              dense={'mmedium'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    tableHeader={`Total Reports (${reportList?.length ?? 0})`}
                    buttonName="Add New Config"
                    placeholder="Search by receiver info (or) description"
                    // isFilterRequired={true}
                    isSearchRequired={true}
                    isDownloadRequired={true}
                    isBtnRequired={false}
                    filterContent={filterContent}
                    onChange={handleChange}
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    checked={checked}
                    openPop={openPop}
                    openAnchorEl={openAnchorEl}
                    handleClick={(e: any) => handleClick(e)}
                    handleClose={handleClose}
                    id={id}
                    // handleGroupChange={handleGroupChange}
                    // handleChipDelete={handleChipDelete}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
