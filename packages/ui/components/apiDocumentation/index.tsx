import React from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import { Grid, Stack, Typography, Box } from '@mui/material';
import { SubHeader } from '@core/ui/components/subHeader';
import { DocumentationTable } from '@core/ui/components/documentationTable';
// import CopyLinkIcon from "../../assets/copyLinkIcon";
import { Table as CommonTable } from "@crayond_dev/ui_table";
import CopyLinkIcon from '@core/ui/assets/copyLinkIcon';
import { apiDocumentation_style } from './style';
import { TextBox } from '@components/textBox';
import { Button, DialogDrawer, Input, Label } from '@atoms';
import { dummyAlert } from '@core/store/utils';
import { ErrorInfo } from '@atoms/icons';

export interface ApiDocumentationProps {
  data?: any;
  i?: any;
  sx?: SxProps<Theme>;
  handleClose?: () => void;
  handleSubmit?: any;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
}

export function ApiDocumentation(props: ApiDocumentationProps): JSX.Element {
  const [tabindex, settabindex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const textBox = [
    'Reference ID',
    'Alert Key',
    'Push Receivers',
    'Push Title',
    'Push Body',
    'Push Date',
    'Push Click Action',
    'Push Icon',
    'To Mobiles',
    'SMS Body',
    'URL',
    'To Emails',
    'Email CC',
    'Email BCC',
    'From Mail',
    'Email Subject',
    'Email Body',
    'Email Attachments',
  ];
  const sampleTab = ['Sample Request', 'Sample Response'];

  const handleTab = (i: any) => {
    settabindex(i);
  };
  const Header = [
    {
      id: 'parameter',
      align: 'left',
      disablePadding: false,
      label: 'parameter',
    },
    {
      id: 'type',
      align: 'left',
      disablePadding: false,
      label: 'type',
    },
    {
      id: 'description',
      align: 'left',
      disablePadding: false,
      label: 'description',
    },
  ];

  const tableData = [
    // { type: ['INCREMENT'], name: 'sl_no' },
    { type: ['TEXT'], name: 'parameter' },
    { type: ['TEXT'], name: 'type' },
    { type: ['TEXT'], name: 'description' },
  ];
  const handleCopy = () => {
    console.log('Hi');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={apiDocumentation_style.root}>
      <SubHeader title="API Documentation" sx={apiDocumentation_style.subHeader} />
      <Box sx={apiDocumentation_style.firstInput}>
        <Label sx={apiDocumentation_style.labelSx} htmlFor="APICalls">
          API Calls
        </Label>
        <Input
          placeholder="https://alertshub-api.crayond.com/api/v1/sendmessage"
          //   value="https://alertshub-api.crayond.com/api/v1/sendmessage"
          endAdornment={
            <IconButton sx={apiDocumentation_style.copySx} onClick={handleCopy}>
              <CopyLinkIcon />
            </IconButton>
          }
          textFieldStyle={{
            ...apiDocumentation_style.inputSx,
            '& .MuiOutlinedInput-root': {
              pr: 0,
            },
          }}
        />
      </Box>
      <Box sx={apiDocumentation_style.gridBox}>
        <Grid container sx={apiDocumentation_style.referenceParent}>
          <Grid item md={6} sm={12} sx={apiDocumentation_style.referenceParent1}>
            <Box m={1} ml={0} mt={2}>
              <Typography sx={apiDocumentation_style.textFieldhead}>Request Body</Typography>
              <Box sx={apiDocumentation_style.referenceScroll} p={2}>
                {textBox?.map((e: any, index: any) => {
                  return (
                    <Box key={index} sx={apiDocumentation_style.textBox}>
                      <Label sx={apiDocumentation_style.labelSx}>{e}</Label>
                      <Input placeholder={e} textFieldStyle={apiDocumentation_style.inputSx} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box m={1} mt={2} mr={0}>
              <Box sx={apiDocumentation_style.trySx}>
                <Box sx={apiDocumentation_style.btnSx} onClick={handleOpen}>
                  try
                </Box>
              </Box>
              <Box sx={apiDocumentation_style.referenceScroll} p={2}>
                <Typography component={'pre'} sx={apiDocumentation_style.dummy}>
                  {`{ "reference_id": "", 
                                      "push_receivers": [],
                                      "push_title": [],
                                      "push_body": [],
                                      "push_data": {},
                                      "push_click_action": "", 
                                      "push_icon": "",
                                      "to_mobiles": [],
                                      "sms_body": [], 
                                      "URL": "",
                                      "to_emails": [],
                                          "email_CC": [],
                                          "email_BCC": [],
                                          "from_mail": "", 
                                          "email_subject": [],
                                          "email_body": [],
                                              "email_attachments": [ 
                                              { "content": "", 
                                              "filename": "", 
                                              "type": "",
                                                  "disposition": "" } ] 
                   '}`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box my={3}>
        <Box sx={apiDocumentation_style.commonTable}>
          <CommonTable
            Header={Header}
            dataList={dummyAlert}
            tableData={tableData}
            headerOptions={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#818181',
              bgColor: '#EAEAEA',
              borderBottom: '0px',
            }}
            rowOptions={{
              rowOddBgColor: '#fff',
              rowEvenBgColor: '#F7F7F7',
            }}
            cellOptions={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#5A5A5A',
              // bgColor: '#fff',
              borderBottom: '0px',
            }}
            tableMinWidth={'300px'}
            tableMaxWidth={'300px'}
            tableMinHeight={'400px'}
            paddingAll={'0px'}
            marginAll={'0px'}
            dense={'medium'}
          />
        </Box>
      </Box>
      <Box mb={2} sx={apiDocumentation_style.lastSx}>
        <Stack direction="row" sx={apiDocumentation_style.sampleTabBHead}>
          {sampleTab?.map((e, i, index: any) => {
            return (
              <Typography
                key={index}
                onClick={() => handleTab(i)}
                sx={i === tabindex ? apiDocumentation_style.sampleTabClickTxt : apiDocumentation_style.sampleTabTxt}
              >
                {e}
              </Typography>
            );
          })}
        </Stack>
        <Box p={2} mb={2}>
          <Typography sx={apiDocumentation_style.apicontent}>
            {`"reference_id": "test", "alert_key": "eyJhbGciOiJIUzI1NiIsInsfFR5cdsdsdCI6IkpXVCJ9sds.eyJpZCI6ImIyMTU2ZWNmLWFiNTgtNGY0Zi1iYjlsSFDADFjLWJjYTk0Yzhm...", "push_receivers": ["fDh9oeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMTU2ZWNmLWFiNTgtNGY0Zi1iYjljLWJjYTk0YzhmM2U3OCI..."], "push_title": ["Test","Title"], "push_body": ["Test","Body"], "push_data": {"test": "push data" }, "push_click_action": "https//www.example.com/path/", "push_icon": "https//www.example.com/logo.png", "to_mobiles": ["91XXXXXXXXXX"], "sms_body": ["Test","SMS","Body"], "URL":"http://alertshub.crayond.com", "to_emails": ["alertshub@crayond.com"], "email_CC": ["text_cc@alertshub.com","text_cc2@alertshub.com"], "email_BCC": ["text_bcc@alertshub.com","text_bcc2@alertshub.com"], "from_mail": "text_from_mail@alertshub.com", "email_subject": ["test","email","subject"], "email_body": ["test","email","body"], "email_attachments": [ {"content": 
                          "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8u7zPzWlwPzWlwvvWlwv...",
                           "filename": "test.jpeg", "type": "base64", "disposition": "attachment" } ] `}
          </Typography>
        </Box>
      </Box>

      <DialogDrawer
        dialogRootStyle={{
          width: '448px',
          height: '346px',
          p: 0,
          '& .MuiDialogContent-root': {
            padding: '20px 24px !important',
          },
        }}
        closeIcon={false}
        fullWidth
        fullScreen
        isFooterRequired={false}
        isHeaderTitleRequired={false}
        title=""
        contentStyleSx={apiDocumentation_style.contentSx}
        isDialogOpened={open}
        Bodycomponent={
          <Box sx={apiDocumentation_style.totalError}>
            <Box sx={apiDocumentation_style.errorSx}>
              <ErrorInfo />
            </Box>
            <Typography sx={apiDocumentation_style.responseSx}>Response</Typography>

            <Box>
              <Typography sx={apiDocumentation_style.bodySx}>Request failed with status code 402</Typography>

              <Button
                sx={apiDocumentation_style.ResponseBtn}
                // onClick={handleOpen}
              >
                close
              </Button>
            </Box>
          </Box>
        }
        // handleCloseDialog={handleClose}
      />
    </Box>
  );
}
