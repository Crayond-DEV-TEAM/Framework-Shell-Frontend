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
import { useAlertConfig } from '@core/store';
import { enqueueSnackbar } from 'notistack';

export function EmailTab(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [switchList, setSwitchList] = React.useState([1, 4]);

  const { emailConfiguration, addEmailConfig, editEmailConfig, clearEmailState, deleteEmailConfig, emailList } =
    useAlertConfig();

  const header = [
    {
      id: 'identification_name',
      align: 'left',
      disablePadding: false,
      label: 'Identification Name',
    },
    {
      id: 'email_provider',
      align: 'left',
      disablePadding: false,
      label: 'Email Provider',
    },
    {
      id: 'smtp_host',
      align: 'left',
      disablePadding: false,
      label: 'SMTP Host',
    },
    {
      id: 'smtp_port',
      align: 'left',
      disablePadding: false,
      label: 'SMTP Port',
    },
    {
      id: 'smtp_username',
      align: 'left',
      disablePadding: false,
      label: 'SMTP Username',
    },
    {
      id: 'aws_secret_key',
      align: 'left',
      disablePadding: false,
      label: 'Aws Secret Key',
    },
    {
      id: 'api_key',
      align: 'left',
      disablePadding: false,
      label: 'API Key',
    },
    {
      id: 'aws_access_id',
      align: 'left',
      disablePadding: false,
      label: 'Aws Access Id',
    },
    {
      id: 'mail_domain',
      align: 'left',
      disablePadding: false,
      label: 'Email Domain',
    },
    {
      id: 'from_mail',
      align: 'left',
      disablePadding: false,
      label: 'From Mail',
    },
    {
      id: 'action',
      align: 'center',
      disablePadding: false,
      label: 'Action',
    },
  ];

  const editHandel = (e: string, val: any) => {
    editEmailConfig(val);
    setOpen(true);
  };

  const deleteHandel = (e: string, val: any) => {
    deleteEmailConfig(val);
  };

  const tableData = [
    { type: ['TEXT'], name: 'identification_name' },
    { type: ['TEXT'], name: 'email_provider' },
    { type: ['TEXT'], name: 'smtp_host' },
    { type: ['TEXT'], name: 'smtp_port' },
    { type: ['TEXT'], name: 'smtp_username' },
    { type: ['TEXT'], name: 'aws_secret_key' },
    { type: ['TEXT'], name: 'api_key' },
    { type: ['TEXT'], name: 'aws_access_id' },
    { type: ['TEXT'], name: 'mail_domain' },
    { type: ['TEXT'], name: 'from_mail' },
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
    clearEmailState();
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    if (
      emailConfiguration?.email_provider === 'MailChimp' &&
      emailConfiguration?.identification_name &&
      emailConfiguration?.email_provider &&
      emailConfiguration?.smtp_host &&
      emailConfiguration?.smtp_port &&
      emailConfiguration?.smtp_username &&
      emailConfiguration?.smtp_password &&
      emailConfiguration?.mail_domain &&
      emailConfiguration?.from_mail
    ) {
      addEmailConfig();
      setOpen(false);
    } else if (
      emailConfiguration?.email_provider === 'SendGrid' &&
      emailConfiguration?.identification_name &&
      emailConfiguration?.email_provider &&
      emailConfiguration?.api_key &&
      emailConfiguration?.mail_domain &&
      emailConfiguration?.from_mail
    ) {
      addEmailConfig();
      setOpen(false);
    } else if (
      emailConfiguration.email_provider === 'Pinpoint' &&
      emailConfiguration.identification_name &&
      emailConfiguration.email_provider &&
      emailConfiguration.aws_access_id &&
      emailConfiguration.aws_secret_key &&
      emailConfiguration.aws_region &&
      emailConfiguration.aws_pinpoint_project_id &&
      emailConfiguration.from_mail
    ) {
      addEmailConfig();
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
      <Grid container sx={emailTab_style.marginTop}>
        <Grid item xs={12}>
          <Box sx={emailTab_style.commonTable}>
            <CommonTable
              Header={header}
              dataList={emailList}
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
              tableMinWidth={'2000px'}
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
          Footercomponent={<FooterComponent saveText="Add" onCancel={handleClose} onSave={handleAdd} />}
        />
      </Box>
    </Box>
  );
}
