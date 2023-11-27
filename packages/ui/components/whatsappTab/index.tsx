import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { WhatsappDialog } from '@components/whatsappDialog';
import { useAlertConfig } from '@core/store';
import { TableHeader, TooltipComp } from '@core/ui/components';
import { Box, Grid } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { whatsappTab_style } from './style';

export function WhatsappTab(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [switchList, setSwitchList] = React.useState([1, 4]);
  const [isEdit, setIsEdit] = React.useState(false)

  const {
    whatsappConfiguration,
    whatsappList,
    addWhatsappConfig,
    editWhatsappConfig,
    clearWhatsappState,
    deleteWhatsappConfig,
  } = useAlertConfig();

  const customData = whatsappList?.map((e) => {
    return {
      ...e,
      access_token: <TooltipComp
        value={e?.access_token}
      />,
    }
  })

  const Header = [
    {
      id: 'identification_name',
      align: 'left',
      disablePadding: false,
      label: 'Identification Name',
    },
    {
      id: 'whatsapp_buisness_phone_number',
      align: 'left',
      disablePadding: false,
      label: 'Whatsapp Number',
    },
    {
      id: 'access_token',
      align: 'left',
      disablePadding: false,
      label: 'Access Token',
    },
    {
      id: 'api_version',
      align: 'left',
      disablePadding: false,
      label: 'API Version',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const editHandel = (e: string, val: any) => {
    editWhatsappConfig(val);
    setIsEdit(true);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteWhatsappConfig(val);
  };

  const tableData = [
    { type: ['TEXT'], name: 'identification_name', width: '140px' },
    { type: ['TEXT'], name: 'whatsapp_buisness_phone_number', width: '120px' },
    { type: ['TEXT'], name: 'access_token', width: '160px' },
    { type: ['TEXT'], name: 'api_version', width: '130px' },
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
    clearWhatsappState();
    setIsEdit(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const handleAdd = () => {
    if (
      whatsappConfiguration?.whatsapp_buisness_phone_number &&
      whatsappConfiguration?.access_token &&
      whatsappConfiguration?.api_version &&
      whatsappConfiguration?.identification_name
    ) {
      addWhatsappConfig();
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
      <Grid container sx={whatsappTab_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={whatsappTab_style.commonTable}>
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
                    tableHeader="Whatsapp"
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
      <Box sx={whatsappTab_style.emailDialog}>
        <DialogDrawer
          dialogRootStyle={{
            width: '400px',
            // height: '604px',
          }}
          fullWidth={false}
          title={`${isEdit ? 'Edit' : 'Add'} Whatsapp Details`}
          fullScreen={false}
          check={false}
          isDialogOpened={open}
          handleClose={handleClose}
          handleCloseDialog={handleClose}
          handleSubmit={handleSubmit}
          content={<WhatsappDialog />}
          Footercomponent={<FooterComponent saveText={`${isEdit ? 'Edit' : 'Add'}`} onCancel={handleClose} onSave={handleAdd} />}
        />
      </Box>
    </Box>
  );
}
