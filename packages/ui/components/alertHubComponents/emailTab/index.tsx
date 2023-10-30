import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { Box, Grid } from '@mui/material';
import { Table as CommonTable } from "@crayond_dev/ui_table";
import React from 'react';
import { emailTab_style } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { TableHeader } from '@components/commonComponents'
import { EmailDialog } from '../emailDialog'

export function EmailTab(): JSX.Element {
  const [open, setOpen] = React.useState(false);
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

  const Header = [
    // {
    //     id: 'no',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Sl no',
    // },
    {
      id: 'provider',
      align: 'left',
      disablePadding: false,
      label: 'Provider',
    },
    {
      id: 'api_key',
      align: 'left',
      disablePadding: false,
      label: 'API Key',
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
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 2,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 3,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 4,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 5,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 6,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 7,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 8,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 9,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
    {
      id: 10,
      provider: 'Eros aliquam eros',
      api_key: 'https://alertshub-api.crayond.com/api/v1/sendmessage',
    },
  ];
  const editHandel = () => {};

  const deleteHandel = () => {};

  const tableData = [
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'provider' },
    { type: ['TEXT'], name: 'api_key' },
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
      <Grid container sx={emailTab_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={emailTab_style.commonTable}>
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
              rowOptions={{
                rowOddBgColor: '#fff',
                rowEvenBgColor: '#F7F7F7',
              }}
              switchList={switchList}
              tableMinWidth={'800px'}
              tableMinHeight={'400px'}
              paddingAll={'0px'}
              marginAll={'0px'}
              dense={'medium'}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    tableHeader="Email"
                    buttonName="Add New Config"
                    isBtnRequired={true}
                    isFilterRequired={false}
                    isSearchRequired={false}
                    handleOpen={handleClick}
                  />
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={emailTab_style.emailDialog}>
        <DialogDrawer
          dialogRootStyle={{
            width: '400px',
            // height: '604px',
          }}
          fullWidth={false}
          title="Add Email Details"
          fullScreen={false}
          check={false}
          isDialogOpened={open}
          handleClose={handleClose}
          handleCloseDialog={handleClose}
          handleSubmit={handleSubmit}
          content={<EmailDialog />}
          Footercomponent={<FooterComponent onCancel={handleClose} />}
        />
      </Box>
    </Box>
  );
}
