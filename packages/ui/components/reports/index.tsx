import { ReportTabs } from '@core/ui/components/tabs';
import { TabsCard } from '@core/ui/components/tabsCard';
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
import { TableHeader } from '@core/ui/components/tableHeader';
import type { SxProps, Theme } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { CommonTable } from 'crayond-components-library-1';
import React from 'react';
import { reports_styles } from './style';
import { dummyTableData, tabsCard } from '@core/store/utils';

export interface ReportsProps {
  data?: any;
  sx?: SxProps<Theme>;
}

const tabs = [
  {
    id: 0,
    label: 'Today',
    children: <TabsCard data={tabsCard?.today} />,
  },
  {
    id: 1,
    label: 'This Week',
    children: <TabsCard data={tabsCard?.thisWeek} />,
  },
  {
    id: 2,
    label: 'This Month',
    children: <TabsCard data={tabsCard?.thisMonth} />,
  },
];

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

  //   const handleClick = (event: any) => {
  //     setOpenAnchorEl(event.currentTarget);
  //   };

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
      id: 'receiver_info',
      align: 'left',
      disablePadding: false,
      label: 'Receiver Info',
    },
    {
      id: 'alert_type',
      align: 'left',
      disablePadding: false,
      label: 'Alert Type',
    },
    {
      id: 'sent_on',
      align: 'center',
      disablePadding: false,
      label: 'Sent on',
    },
    {
      id: 'delivered_on',
      align: 'left',
      disablePadding: false,
      label: 'Delivered on',
    },
    {
      id: 'clicked',
      align: 'left',
      disablePadding: false,
      label: 'Clicked',
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
  const editHandel = () => {};
  const deleteHandel = () => {};

  const tableData = [
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'alert_rule_code' },
    { type: ['TEXT'], name: 'reference_id' },
    { type: ['LABEL'], name: 'hashtag' },
    { type: ['TEXT'], name: 'description' },
    { type: ['IMAGE_WITH_LABEL'], name: 'receiver_info', variant: 'circular' },
    { type: ['ICON_WITH_LABEL'], name: 'alert_type' },
    { type: ['DATE'], name: 'sent_on', format: 'DD MMM hh:mm' },
    { type: ['DATE'], name: 'delivered_on', format: 'DD MMM hh:mm' },
    { type: ['DATE'], name: 'clicked', format: 'DD MMM hh:mm' },
    { type: ['ICON_WITH_TEXT'], name: 'status' },
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

  // const filterContent = [
  //   {
  //     name: 'Hashtag',
  //     children: [
  //       {
  //         component: 'searchField',
  //         value: '',
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag1',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag2',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag3',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag4',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag5',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag6',
  //         value: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Alert Type',
  //     children: [
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag1',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag2',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag3',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag4',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag5',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'hashtag6',
  //         value: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Status',
  //     children: [
  //       {
  //         component: 'checkbox',
  //         label: 'high',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'medium',
  //         value: false,
  //       },
  //       {
  //         component: 'checkbox',
  //         label: 'low',
  //         value: false,
  //       },
  //       {
  //         componentName: 'switch',
  //         value: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Date',
  //     children: [
  //       {
  //         component: 'dateCheckbox',
  //         label: 'Sent on',
  //         value: false,
  //       },
  //       {
  //         component: 'dateCheckbox',
  //         label: 'Delivered on',
  //         value: false,
  //       },
  //       {
  //         component: 'dateCheckbox',
  //         label: 'Clicked on',
  //         value: false,
  //       },
  //       {
  //         component: 'dateInput',
  //         label: 'Select Date From',
  //         value: '23rd Jan, 22',
  //       },
  //       {
  //         component: 'dateInput',
  //         label: 'Select Date To',
  //         value: '25th Jan, 22',
  //       },
  //     ],
  //   },
  // ];

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
              dataList={dummyTableData}
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
                // bgColor: '#fff',
                borderBottom: '0px',
              }}
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              tableMinWidth={'1800px'}
              tableMinHeight={'400px'}
              paddingAll={'0px'}
              marginAll={'0px'}
              dense={'mmedium'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    tableHeader="Total Reports (12)"
                    buttonName="Add New Config"
                    placeholder="Search by receiver info (or) description"
                    // isFilterRequired={true}
                    isSearchRequired={true}
                    isDownloadRequired={true}
                    isBtnRequired={false}
                    // filterContent={filterContent}
                    onChange={handleChange}
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
