import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@core/ui/atoms';
import { SmsDialog, TooltipComp } from '@core/ui/components';
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
  const [isEdit, setIsEdit] = React.useState(false)


  const { smsConfiguration, smsList, editSmsConfig, addSmsConfig, clearSmsState, deleteSmsConfig } = useAlertConfig();

  const customData = smsList?.map((e) => {
    return {
      ...e,
      provider_api_key: <TooltipComp
        value={e?.provider_api_key}
      />,
      provider_sid: <TooltipComp
        value={e?.provider_sid}
      />
    }
  })

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
      label: 'Providers Id',
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
    setIsEdit(true);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteSmsConfig(val);
  };

  const tableData = [
    { type: ['TEXT'], name: 'identifier' , width: ' 120px'},
    { type: ['CUSTOM'], name: 'provider_api_key', width: ' 120px' },
    { type: ['TEXT'], name: 'provider_name', width: ' 120px' },
    { type: ['CUSTOM'], name: 'provider_sid', width: ' 120px' },
    { type: ['TEXT'], name: 'sender_id', width: ' 120px' },
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
      width: ' 120px'
    },
  ];

  const handleClose = () => {
    clearSmsState();
    setIsEdit(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setIsEdit(false);
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
              dataList={customData}
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
          title={`${isEdit ? 'Edit' : 'Add'} SMS Details`}
          fullScreen={false}
          check={false}
          isDialogOpened={open}
          handleClose={handleClose}
          handleCloseDialog={handleClose}
          handleSubmit={handleSubmit}
          content={<SmsDialog />}
          Footercomponent={<FooterComponent saveText={`${isEdit ? 'Edit' : 'Add'}`} onCancel={handleClose} onSave={handleAdd} />}
        />
      </Box>
    </Box>
  );
}
