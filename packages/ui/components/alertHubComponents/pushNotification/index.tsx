import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { PushDialog, TooltipComp } from '@core/ui/components';
import { TableHeader } from '@core/ui/components';
import { Box, Grid } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import React from 'react';
import { pushNotification_style } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { useAlertConfig } from '@core/store';
import { enqueueSnackbar } from 'notistack';

export function PushNotification(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [switchList, setSwitchList] = React.useState([1, 4]);
  const [isEdit, setIsEdit] = React.useState(false)

  const { pushConfiguration, pushList, addPushConfig, editPushConfig, deletePushConfig, clearPushState } =
    useAlertConfig();


    const customData = pushList?.map((e) => {
      return {
        ...e,
        clientEmail: <TooltipComp
          value={e?.clientEmail}
        />,
        privateKey: <TooltipComp
          value={e?.privateKey}
        />,
        pushServerKey: <TooltipComp
        value={e?.pushServerKey}
      />
      }
    })

  const Header = [
    {
      id: 'projectId',
      align: 'left',
      disablePadding: false,
      label: 'Project Id',
    },
    {
      id: 'clientEmail',
      align: 'left',
      disablePadding: false,
      label: 'Client Email',
    },
    {
      id: 'privateKey',
      align: 'left',
      disablePadding: false,
      label: 'Private Key',
    },
    {
      id: 'pushServerKey',
      align: 'left',
      disablePadding: false,
      label: 'Push Server Key',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const editHandel = (e: string, val: any) => {
    editPushConfig(val);
    setIsEdit(true);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deletePushConfig(val);
  };

  const tableData = [
    { type: ['TEXT'], name: 'projectId' , width: '140px'},
    { type: ['CUSTOM'], name: 'clientEmail', width: '120px' },
    { type: ['CUSTOM'], name: 'privateKey', width: '120px' },
    { type: ['CUSTOM'], name: 'pushServerKey', width: '120px' },
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
      width: '120px'
    },
  ];

  const handleClose = () => {
    clearPushState();
    setIsEdit(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setIsEdit(false);
  };

  const handleAdd = () => {
    if (
      pushConfiguration.pushServerKey &&
      pushConfiguration.projectId &&
      pushConfiguration.clientEmail &&
      pushConfiguration.privateKey
    ) {
      addPushConfig();
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
      <Grid container sx={pushNotification_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={pushNotification_style.commonTable}>
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
                    tableHeader="Push Notification"
                    buttonName="Add New Config"
                    isBtnRequired={pushList?.length > 0 ? false : true}
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
      <DialogDrawer
        dialogRootStyle={{
          width: '1000px',
        }}
        fullWidth={false}
        title={`${isEdit ? 'Edit' : 'Add'} Push Notification Details`}
        fullScreen={false}
        check={false}
        isDialogOpened={open}
        handleClose={handleClose}
        handleCloseDialog={handleClose}
        handleSubmit={handleSubmit}
        content={<PushDialog />}
        Footercomponent={<FooterComponent saveText={`${isEdit ? 'Edit' : 'Add'}`} onCancel={handleClose} onSave={handleAdd} />}
      />
    </Box>
  );
}
