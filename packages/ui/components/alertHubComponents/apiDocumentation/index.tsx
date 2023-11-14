import React, { useEffect } from 'react';
import { IconButton, SxProps, Theme } from '@mui/material';
import { Grid, Stack, Typography, Box } from '@mui/material';
import { Table as CommonTable } from '@crayond_dev/ui_table';
import CopyLinkIcon from '@core/ui/assets/copyLinkIcon';
import { apiDocumentation_style } from './style';
import { Button, DialogDrawer, Input, Label } from '@atoms';
import { dummyAlert } from '@core/store/utils';
import { ErrorInfo } from '@atoms/icons';
import { SubHeader } from '@components/commonComponents';
import { useApiDocumentation } from '@core/store';

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
  const { requestBodyAPI, handleChangeCallback, apiBody, apiBodyMessage, apiBodyError } = useApiDocumentation()
  const [tabindex, settabindex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

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
    requestBodyAPI()
    setOpen(true);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e?.target.attributes[2].nodeValue
    handleChangeCallback(name, value)
  }

  React.useEffect(() => {
  }, [])

  return (
    <Box sx={apiDocumentation_style.root}>
      <Box sx={apiDocumentation_style.gridBox}>
        <Grid container sx={apiDocumentation_style.referenceParent}>
          <Grid item md={6} sm={12} sx={apiDocumentation_style.referenceParent1}>
            <Box m={1} ml={0} mt={2}>
              <Typography sx={apiDocumentation_style.textFieldhead}>Request Body</Typography>
              <Box sx={apiDocumentation_style.referenceScroll} p={2}>
                {Object.keys(apiBody)?.map((e: any, index: any) => {
                  return (
                    <Box key={index} sx={apiDocumentation_style.textBox}>
                      <Label sx={apiDocumentation_style.labelSx}>{e}</Label>
                      <Input placeholder={e} onChange={(e) => handleChange(e)} value={apiBody[e]}
                        textFieldStyle={apiDocumentation_style.inputSx} />
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
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <code>{JSON.stringify(apiBody, null, 2)}</code>
                </pre>
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
            // tableMinWidth={'300px'}
            // tableMaxWidth={'300px'}
            // tableMinHeight={'400px'}
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
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <code>{JSON.stringify(apiBody, null, 2)}</code>
            </pre>
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
              <Typography sx={{
                ...{ color: apiBodyError ? '#FF4A4D' : null },
                ...apiDocumentation_style.bodySx
              }}>{apiBodyMessage}</Typography>
              <Button
                sx={apiDocumentation_style.ResponseBtn}
                onClick={() => setOpen(false)}
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
