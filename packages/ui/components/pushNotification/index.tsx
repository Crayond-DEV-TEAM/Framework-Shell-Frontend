
import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { PushDialog } from '@core/ui/components/pushDialog';
import { TableHeader } from '@core/ui/components/tableHeader';
import { Box, Grid } from '@mui/material';
import { CommonTable } from "crayond-components-library-1";
import React from 'react';
import { pushNotification_style } from './style';


export function PushNotification(): JSX.Element {

    const [open, setOpen] = React.useState(false);
    const [isSelectedAll, setIsSelectedAll] = React.useState(false)
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

    const Header = [
        // {
        //     id: 'no',
        //     align: 'left',
        //     disablePadding: false,
        //     label: 'Sl no',
        // },
        {
            id: 'server_key',
            align: 'left',
            disablePadding: false,
            label: 'FCM Server Key',
        },
        {
            id: 'project_id',
            align: 'left',
            disablePadding: false,
            label: 'FCM Project ID',
        },
        {
            id: 'client_email',
            align: 'left',
            disablePadding: false,
            label: 'Client Email',
        },
        {
            id: 'private_key',
            align: 'left',
            disablePadding: false,
            label: 'Private Key',
        },
        {
            id: 'action',
            align: 'center',
            disablePadding: false,
            label: 'Action',
        },
    ];

    const dataList = [
        {
            id: 1,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 2,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 3,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 4,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 5,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 6,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 7,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 8,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 9,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
        {
            id: 10,
            server_key: "kdjf-jdhd-3fd",
            project_id: "id-3409",
            client_email: "kathryn.dean@mail.com",
            private_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
        },
    ];

    const tableData = [
        // { type: ['INCREMENT'], name: 'sl_no' },
        { type: ['TEXT'], name: 'server_key' },
        { type: ['TEXT'], name: 'project_id' },
        { type: ['TEXT'], name: 'client_email' },
        { type: ['TEXT'], name: 'private_key' },
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (

        <Box>
            <Grid container sx={pushNotification_style.marginTop}>
                <Grid item xs={12}>
                    <Box sx={pushNotification_style.commonTable}>
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
                            tableMinWidth={'800px'}
                            tableMinHeight={'400px'}
                            paddingAll={'0px'}
                            marginAll={'0px'}
                            dense={'medium'}
                            HeaderComponent={{
                                variant: "CUSTOM",
                                component: <TableHeader
                                    tableHeader="Push Notification"
                                    buttonName="Add New Config"
                                    isBtnRequired={true}
                                    isFilterRequired={false}
                                    isSearchRequired={false}
                                    onClick={handleClick}
                                />
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <DialogDrawer
                title="Add Email Details"
                isDialogOpened={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                content={<PushDialog />} handleCloseDialog={function (): void {
                    throw new Error('Function not implemented.');
                }} />
        </Box>
    );
};


