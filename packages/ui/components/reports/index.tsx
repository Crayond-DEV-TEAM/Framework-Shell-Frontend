import { ReportTabs } from "@core/ui/components/tabs";
import { TabsCard } from "@core/ui/components/tabsCard";
import DashRed from "@core/ui/assets/dashRed";
import DoubleTickBlue from "@core/ui/assets/dbTickBlue";
import DoubleTickGreen from "@core/ui/assets/dbTickGreen";
import DeleteIcon from "@core/ui/assets/deleteIcon";
import EditIcon from "@core/ui/assets/editIcon";
import EmailIcon from "@core/ui/assets/emailIcon";
import NotificationIcon from "@core/ui/assets/notificationIcon";
import SingleTickGreen from "@core/ui/assets/sgTickGreen";
import SmallMailIcon from "@core/ui/assets/smallMailIcon";
import SmallNotificationIcon from "@core/ui/assets/smallNotificationIcon";
import SmallSmsIcon from "@core/ui/assets/smallSmsIcon";
import SmsIcon from "@core/ui/assets/smsIcon";
import { TableHeader } from '@core/ui/components/tableHeader';
import type { SxProps, Theme } from '@mui/material';
import { Box, Grid } from "@mui/material";
import { CommonTable } from "crayond-components-library-1";
import React from "react";
import { reports_styles } from './style';

export interface ReportsProps {
    data?: any;
    sx?: SxProps<Theme>;
}

const tabsCard = {
    today: [
        {
            icon: (<SmsIcon />),
            header: "SMS",
            cardDetails: [
                {
                    number: "250",
                    value: "Sent"
                },
                {
                    number: "243",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "165",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<EmailIcon />),
            header: "Email",
            cardDetails: [
                {
                    number: "825",
                    value: "Sent"
                },
                {
                    number: "675",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "243",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<NotificationIcon />),
            header: "Push Notification",
            cardDetails: [
                {
                    number: "064",
                    value: "Sent"
                },
                {
                    number: "056",
                    value: "Delivered"
                },
                {
                    number: "012",
                    value: "Not Delivered"
                },
                {
                    number: "042",
                    value: "Clicked"
                }
            ]
        }
    ],
    thisWeek: [
        {
            icon: (<EmailIcon />),
            header: "Email",
            cardDetails: [
                {
                    number: "250",
                    value: "Sent"
                },
                {
                    number: "243",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "165",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<NotificationIcon />),
            header: "Push Notification",
            cardDetails: [
                {
                    number: "825",
                    value: "Sent"
                },
                {
                    number: "675",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "243",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<SmsIcon />),
            header: "SMS",
            cardDetails: [
                {
                    number: "064",
                    value: "Sent"
                },
                {
                    number: "056",
                    value: "Delivered"
                },
                {
                    number: "012",
                    value: "Not Delivered"
                },
                {
                    number: "042",
                    value: "Clicked"
                }
            ]
        }
    ],
    thisMonth: [
        {
            icon: (<NotificationIcon />),
            header: "Push Notification",
            cardDetails: [
                {
                    number: "250",
                    value: "Sent"
                },
                {
                    number: "243",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "165",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<SmsIcon />),
            header: "SMS",
            cardDetails: [
                {
                    number: "825",
                    value: "Sent"
                },
                {
                    number: "675",
                    value: "Delivered"
                },
                {
                    number: "356",
                    value: "Not Delivered"
                },
                {
                    number: "243",
                    value: "Clicked"
                }
            ]
        },
        {
            icon: (<EmailIcon />),
            header: "Email",
            cardDetails: [
                {
                    number: "064",
                    value: "Sent"
                },
                {
                    number: "056",
                    value: "Delivered"
                },
                {
                    number: "012",
                    value: "Not Delivered"
                },
                {
                    number: "042",
                    value: "Clicked"
                }
            ]
        }
    ],
};

const tabs = [
    {
        id: 0,
        label: "Today",
        children: (<TabsCard data={tabsCard?.today} />),
    },
    {
        id: 1,
        label: "This Week",
        children: (<TabsCard data={tabsCard?.thisWeek} />),
    },
    {
        id: 2,
        label: "This Month",
        children: (<TabsCard data={tabsCard?.thisMonth} />),
    },
];

export function Reports(props: ReportsProps): JSX.Element {
    const { data } = props;

    const [isSelectedAll, setIsSelectedAll] = React.useState(false)
    const [selectedCheckbox, setSelectedCheckbox] = React.useState([1, 2]);
    const [checked, setChecked] = React.useState(true);
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
        console.log("🚀 ~ file: App.tsx:31 ~ setHederSearch ~ value:", value)
    }
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
        console.log("Download Method working!");
    }
    const fillerMethod = () => {
        console.log("Filter Method working!");
    }
    const primaryBtnMethod = () => {
        console.log("primary Btn Method working!");
    }
    const secondaryBtnMethod = () => {
        console.log("secondary Btn Method working!");
    }

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
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
    const dataList = [
        {
            id: 1,
            alert_rule_code: 1072,
            reference_id: 'ID-201',
            hashtag: {
                label: '#hashtag',
                color: '#305AAE',
                bgColor: '#E2EAFA',
            },
            description: "Quam vitae velit",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Brandon Sanders',
            },
            alert_type: {
                label: 'Push Notification',
                color: '#754218',
                bgColor: '#FAE2CF',
                icon: (<SmallNotificationIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<SingleTickGreen />),
            },
        },
        {
            id: 2,
            alert_rule_code: 1616,
            reference_id: 'ID-244',
            hashtag: {
                label: '#hashtag',
                color: '#305AAE',
                bgColor: '#E2EAFA',
            },
            description: "Malesuada elit",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Carolyn Bailey',
            },
            alert_type: {
                label: 'Email',
                color: '#77277F',
                bgColor: '#F7CFFA',
                icon: (<SmallMailIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Delivered',
                icon: (<DoubleTickGreen />),
            },
        },
        {
            id: 3,
            alert_rule_code: 722,
            reference_id: 'ID-174',
            hashtag: {
                label: '#hashtag',
                color: '#305AAE',
                bgColor: '#E2EAFA',
            },
            description: "Quam dictum",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Brandon',
            },
            alert_type: {
                label: 'SMS',
                color: '#185C75',
                bgColor: '#CFEFFA',
                icon: (<SmallSmsIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Read',
                icon: (<DoubleTickBlue />),
            },
        },
        {
            id: 4,
            alert_rule_code: 2139,
            reference_id: 'ID-232',
            hashtag: {
                label: '#hashtag',
                color: '#305AAE',
                bgColor: '#E2EAFA',
            },
            description: "Enim nisl dapibus",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Emma Elliot',
            },
            alert_type: {
                label: 'Email',
                color: '#77277F',
                bgColor: '#F7CFFA',
                icon: (<SmallMailIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<SingleTickGreen />),
            },
        },
        {
            id: 5,
            alert_rule_code: 4039,
            reference_id: 'ID-156',
            hashtag: {
                label: '#hashtag',
                color: '#305AAE',
                bgColor: '#E2EAFA',
            },
            description: "Interdum est pulvinar",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Tyler Hart',
            },
            alert_type: {
                label: 'SMS',
                color: '#185C75',
                bgColor: '#CFEFFA',
                icon: (<SmallSmsIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Not Delivered',
                icon: (<DashRed />),
            },
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
            description: "Quam vitae velit",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Brandon Sanders',
            },
            alert_type: {
                label: 'Push Notification',
                color: '#754218',
                bgColor: '#FAE2CF',
                icon: (<SmallNotificationIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<SingleTickGreen />),
            },
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
            description: "Malesuada elit",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Carolyn Bailey',
            },
            alert_type: {
                label: 'Email',
                color: '#77277F',
                bgColor: '#F7CFFA',
                icon: (<SmallMailIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<DoubleTickGreen />),
            },
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
            description: "Quam dictum",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Brandon',
            },
            alert_type: {
                label: 'SMS',
                color: '#185C75',
                bgColor: '#CFEFFA',
                icon: (<SmallSmsIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<DoubleTickBlue />),
            },
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
            description: "Enim nisl dapibus",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Emma Elliot',
            },
            alert_type: {
                label: 'Email',
                color: '#77277F',
                bgColor: '#F7CFFA',
                icon: (<SmallMailIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<SingleTickGreen />),
            },
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
            description: "Interdum est pulvinar",
            receiver_info: {
                image: 'sample.jpg',
                label: 'Tyler Hart',
            },
            alert_type: {
                label: 'SMS',
                color: '#185C75',
                bgColor: '#CFEFFA',
                icon: (<SmallSmsIcon />),
            },
            sent_on: '2022-01-23T15:00:21.055Z',
            delivered_on: '2022-01-23T15:00:21.055Z',
            clicked: '2022-01-23T15:00:21.055Z',
            status: {
                label: 'Sent',
                icon: (<DashRed />),
            },
        },
    ];
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
            variant: 'EDIT_WITH_DELETE',
            editHandel: (id: any) => {
                console.log(id);
            },
            deleteHandel: (id: any) => {
                console.log(id);
            },
            editIcon: (<EditIcon />),
            deleteIcon: (<DeleteIcon />),
        },
    ];

    const filterContent = [
        {
            name: 'Hashtag',
            children: [
                {
                    component: 'searchField',
                    value: "",
                },
                {
                    component: 'checkbox',
                    label: 'hashtag1',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag2',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag3',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag4',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag5',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag6',
                    value: false,
                }
            ],
        },
        {
            name: 'Alert Type',
            children: [
                {
                    component: 'checkbox',
                    label: 'hashtag1',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag2',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag3',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag4',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag5',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'hashtag6',
                    value: false,
                }
            ],
        },
        {
            name: 'Status',
            children: [
                {
                    component: 'checkbox',
                    label: 'high',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'medium',
                    value: false,
                },
                {
                    component: 'checkbox',
                    label: 'low',
                    value: false,
                },
                {
                    componentName: 'switch',
                    value: false,
                },
            ],
        },
        {
            name: 'Date',
            children: [
                {
                    component: 'dateCheckbox',
                    label: 'Sent on',
                    value: false,
                },
                {
                    component: 'dateCheckbox',
                    label: 'Delivered on',
                    value: false,
                },
                {
                    component: 'dateCheckbox',
                    label: 'Clicked on',
                    value: false,
                },
                {
                    component: 'dateInput',
                    label: 'Select Date From',
                    value: '23rd Jan, 22',
                },
                {
                    component: 'dateInput',
                    label: 'Select Date To',
                    value: '25th Jan, 22',
                },
            ],
        },
    ];

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={reports_styles.reportTabs}>
                        <ReportTabs tabs={tabs} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Box sx={reports_styles.commonTable}>
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
                                tableMinWidth={'1800px'}
                                tableMinHeight={'439px'}
                                paddingAll={'0px'}
                                marginAll={'0px'}
                                dense={'small'}
                                HeaderComponent={{
                                    variant: "CUSTOM",
                                    component: <TableHeader
                                        tableHeader="Total Reports (12)"
                                        buttonName="Add New Config"
                                        placeholder="Search by receiver info (or) description"
                                        isFilterRequired
                                        isSearchRequired
                                        isDownloadRequired
                                        filterContent={filterContent}
                                        onChange={handleChange}
                                        checked={checked}
                                        open={false}
                                    // handleGroupChange={handleGroupChange}
                                    // handleChipDelete={handleChipDelete}
                                    />,
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
