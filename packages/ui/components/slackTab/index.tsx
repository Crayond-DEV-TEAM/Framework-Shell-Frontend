import DeleteIcon from '@assets/deleteIcon';
import EditIcon from '@assets/editIcon';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { TableHeader } from '@core/ui/components';
import { Box, Grid } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import React from 'react';
import { slackTab_style } from './style';
import { FooterComponent } from '@atoms/footerComponent';
import { useAlertConfig } from '@core/store';
import { enqueueSnackbar } from 'notistack';
import { SlackDialog } from '..';

export function SlackTab(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [switchList, setSwitchList] = React.useState([1, 4]);

  const { slackConfiguration, slackList, addSlackConfig, editSlackConfig, clearSlackState, deleteSlackConfig } =
    useAlertConfig();

  const Header = [
    {
      id: 'identification_name',
      align: 'left',
      disablePadding: false,
      label: 'Identification Name',
    },
    {
      id: 'slack_bot_token',
      align: 'left',
      disablePadding: false,
      label: 'Slack Bot Token',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const editHandel = (e: string, val: any) => {
    editSlackConfig(val);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteSlackConfig(val);
  };

  const tableData = [
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'identification_name' },
    { type: ['TEXT'], name: 'slack_bot_token' },
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
    clearSlackState();
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (slackConfiguration.slack_bot_token && slackConfiguration.identification_name) {
      addSlackConfig();
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
      <Grid container sx={slackTab_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={slackTab_style.commonTable}>
            <CommonTable
              Header={Header}
              dataList={slackList}
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
              paginationOption={{
                isEnable: true,
                rowPerPage: 10,
                rowsPerPageOptions: [5, 10, 25]
              }}
              HeaderComponent={{
                variant: 'CUSTOM',
                component: (
                  <TableHeader
                    tableHeader="Slack"
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
      <Box sx={slackTab_style.emailDialog}>
        <DialogDrawer
          dialogRootStyle={{
            width: '400px',
            // height: '604px',
          }}
          fullWidth={false}
          title="Add Slack Details"
          fullScreen={false}
          check={false}
          isDialogOpened={open}
          handleClose={handleClose}
          handleCloseDialog={handleClose}
          handleSubmit={handleSubmit}
          content={<SlackDialog />}
          Footercomponent={<FooterComponent saveText="Add" onCancel={handleClose} onSave={handleAdd} />}
        />
      </Box>
    </Box>
  );
}
