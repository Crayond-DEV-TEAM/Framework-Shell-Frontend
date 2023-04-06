import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Grid, Stack, Typography, Box } from "@mui/material";
import { SubHeader } from "@core/ui/components/subHeader";
import { DocumentationTable } from '@core/ui/components/documentationTable';
// import CopyLinkIcon from "../../assets/copyLinkIcon";
import CopyLinkIcon from "@core/ui/assets/copyLinkIcon"
import { apiDocumentation_style } from "./style";
import { TextBox } from '@components/textBox';


export interface ApiDocumentationProps {
    data?: any;
    i?: any
    sx?: SxProps<Theme>;
    handleClose?: () => void;
    handleSubmit?: any;
    errorMessage?: string;
    startAdornment?: React.ReactNode;
}


export function ApiDocumentation(props: ApiDocumentationProps): JSX.Element {
    const [tabindex, settabindex] = React.useState(0);

    const textBox = [
        "Reference ID",
        "Alert Key",
        "Push Receivers",
        "Push Title",
        "Push Body",
        "Push Date",
        "Push Click Action",
        "Push Icon",
        "To Mobiles",
        "SMS Body",
        "URL",
        "To Emails",
        "Email CC",
        "Email BCC",
        "From Mail",
        "Email Subject",
        "Email Body",
        "Email Attachments",
    ];
    const sampleTab = ["Sample Request", "Sample Response"];

    const handleTab = (i: any) => {
        settabindex(i);
    };

    return (
        <Box sx={apiDocumentation_style.root}>
            <SubHeader title="API Documentation" />
            <Box sx={apiDocumentation_style.firstInput}>
                <TextBox
                    label="API Calls"
                    placeholder="https://alertshub-api.crayond.com/api/v1/sendmessage"
                    InputProps={{
                        endAdornment: (<CopyLinkIcon />),
                        startAdornment: "",
                    }}
                    errorMessage={undefined}
                    autoFocus={undefined}
                    fontSize={''}
                    startAdornment={undefined}
                    endAdornment={<CopyLinkIcon />}
                    autocomplete={undefined}
                    variant={undefined}
                />
            </Box>
            <Box sx={apiDocumentation_style.gridBox}>
                <Grid container sx={apiDocumentation_style.referenceParent}>
                    <Grid item md={6} sm={12} sx={apiDocumentation_style.referenceParent1}>
                        <Box m={1} ml={0} mt={2}>
                            <Typography sx={apiDocumentation_style.textFieldhead}>
                                Request Body
                            </Typography>
                            <Box sx={apiDocumentation_style.referenceScroll} p={2}>
                                {textBox?.map((e: any, index: any) => {
                                    return (
                                        <Box key={index} sx={apiDocumentation_style.textBox}>
                                            <TextBox
                                                label={e}
                                                placeholder={e}
                                                errorMessage={undefined}
                                                autoFocus={undefined}
                                                fontSize={''}
                                                startAdornment={undefined}
                                                endAdornment={undefined}
                                                InputProps={undefined}
                                                autocomplete={undefined}
                                                variant={undefined} />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <Box m={1} mt={2} mr={0} >
                            <Box>
                                <Typography sx={apiDocumentation_style.tryBtn}>Try</Typography>
                            </Box>
                            <Box sx={apiDocumentation_style.referenceScroll} p={2}>
                                <Typography sx={apiDocumentation_style.dummy}>
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
            <Box m={1} mb={2}>
                <DocumentationTable parameter={undefined} type={undefined} description={undefined} />
            </Box>
            <Box m={1} mb={2}>
                <Stack direction="row" sx={apiDocumentation_style.sampleTabBHead}>
                    {sampleTab?.map((e, i, index: any) => {
                        return (
                            <Typography
                                key={index}
                                onClick={() => handleTab(i)}
                                sx={
                                    i === tabindex
                                        ? apiDocumentation_style.sampleTabClickTxt
                                        : apiDocumentation_style.sampleTabTxt
                                }
                            >
                                {e}
                            </Typography>
                        );
                    })}
                </Stack>
                <Box style={{ backgroundColor: "#FFFFFF" }} p={2} mb={2}>
                    <Typography sx={apiDocumentation_style.apicontent}>
                        {`"reference_id": "test", "alert_key": "eyJhbGciOiJIUzI1NiIsInsfFR5cdsdsdCI6IkpXVCJ9sds.eyJpZCI6ImIyMTU2ZWNmLWFiNTgtNGY0Zi1iYjlsSFDADFjLWJjYTk0Yzhm...", "push_receivers": ["fDh9oeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMTU2ZWNmLWFiNTgtNGY0Zi1iYjljLWJjYTk0YzhmM2U3OCI..."], "push_title": ["Test","Title"], "push_body": ["Test","Body"], "push_data": {"test": "push data" }, "push_click_action": "https//www.example.com/path/", "push_icon": "https//www.example.com/logo.png", "to_mobiles": ["91XXXXXXXXXX"], "sms_body": ["Test","SMS","Body"], "URL":"http://alertshub.crayond.com", "to_emails": ["alertshub@crayond.com"], "email_CC": ["text_cc@alertshub.com","text_cc2@alertshub.com"], "email_BCC": ["text_bcc@alertshub.com","text_bcc2@alertshub.com"], "from_mail": "text_from_mail@alertshub.com", "email_subject": ["test","email","subject"], "email_body": ["test","email","body"], "email_attachments": [ {"content": 
                          "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8u7zPzWlwPzWlwvvWlwv...",
                           "filename": "test.jpeg", "type": "base64", "disposition": "attachment" } ] `}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};


