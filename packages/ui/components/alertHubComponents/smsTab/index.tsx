import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@core/ui/atoms';
import { SmsDialog } from '@core/ui/components';
import { TableHeader } from '@core/ui/components';
import { Box, Grid, SxProps, Theme } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import React from 'react';
import { smsTab_style } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { useAlertConfig } from '@core/store';
import { enqueueSnackbar } from 'notistack';

export function SmsTab(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [switchList, setSwitchList] = React.useState([1, 4]);

  const { smsConfiguration, smsList, editSmsConfig, addSmsConfig, clearSmsState, deleteSmsConfig } = useAlertConfig();

  const Header = [
    {
      id: 'identifier',
      align: 'left',
      disablePadding: false,
      label: 'Identifier',
    },
    {
      id: 'provider_api_key',
      align: 'left',
      disablePadding: false,
      label: 'Provider API Key',
    },
    {
      id: 'provider_name',
      align: 'left',
      disablePadding: false,
      label: 'Provider Name',
    },
    {
      id: 'provider_sid',
      align: 'left',
      disablePadding: false,
      label: 'Provider Sid',
    },
    {
      id: 'sender_id',
      align: 'left',
      disablePadding: false,
      label: 'Sender Id',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const editHandel = (e: string, val: any) => {
    editSmsConfig(val);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteSmsConfig(val);
  };

  const tableData = [
    { type: ['TEXT'], name: 'identifier' },
    { type: ['TEXT'], name: 'provider_api_key' },
    { type: ['TEXT'], name: 'provider_name' },
    { type: ['TEXT'], name: 'provider_sid' },
    { type: ['TEXT'], name: 'sender_id' },
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
    clearSmsState();
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (
      smsConfiguration.identifier &&
      smsConfiguration.provider_name &&
      smsConfiguration.provider_sid &&
      smsConfiguration.provider_api_key &&
      smsConfiguration.sender_id
    ) {
      addSmsConfig();
      setOpen(false);
    } else {
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Grid container sx={smsTab_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={smsTab_style.commonTable}>
            <CommonTable
              Header={Header}
              dataList={smsList}
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
                    tableHeader="SMS"
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
      <Box sx={smsTab_style.emailDialog}>
        <DialogDrawer
          dialogRootStyle={{
            width: '400px',
          }}
          fullWidth={false}
          title="Add SMS Details"
          fullScreen={false}
          check={false}
          isDialogOpened={open}
          handleClose={handleClose}
          handleCloseDialog={handleClose}
          handleSubmit={handleSubmit}
          content={<SmsDialog />}
          Footercomponent={<FooterComponent saveText="Add" onCancel={handleClose} onSave={handleAdd} />}
        />
      </Box>
    </Box>
  );
}