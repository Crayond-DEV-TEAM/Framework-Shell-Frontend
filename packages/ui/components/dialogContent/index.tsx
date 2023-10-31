import { Box, FormControlLabel, Grid, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';
import { dialogContent_style } from './style';
import { Input } from '@atoms/input';
import { CheckBox } from '@atoms/checkBox';
import { DropDown } from '@atoms/dropDown';
import { Label } from '@atoms/label';

export interface DialogContentProps {
  data?: any;
  value?: any;
  updateState?: any;
  tabs?: any;
  newValue?: any;
  onChange?: any;
  newAlertRuleCode?: string;
  sx?: SxProps<Theme>;
}

export function DialogContent(props: DialogContentProps): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box sx={dialogContent_style.leftContent}>
          <Box sx={dialogContent_style.field}>
            <Label sx={dialogContent_style.labelSx} htmlFor="username">
              Alert Rule Code
            </Label>
            <Input
              header="Alert Rule Code"
              placeholder="Add Alert Rule Code"
              value={props?.data?.id ? props.data?.alert_code : props.newAlertRuleCode}
              isReadOnly={props.newAlertRuleCode || props.data?.alert_code ? true : false}
              onChange={(value) => props?.updateState('alert_code', value.target.value)}
            />
          </Box>
          <Box sx={dialogContent_style.field}>
            <Label sx={dialogContent_style.labelSx} htmlFor="username">
              Reference ID
            </Label>
            <Input
              header="Reference ID"
              placeholder="Add Reference ID"
              value={props?.data?.reference_id}
              onChange={(value) => props?.updateState('reference_id', value.target.value)}
            />
          </Box>
          <Box sx={dialogContent_style.field}>
            <Label sx={dialogContent_style.labelSx} htmlFor="username">
              Hashtags
            </Label>
            <Input
              placeholder="select (or) add hashtag"
              header="Hashtags"
              value={props?.data?.hashtags}
              onChange={(value: any) => props?.updateState('hashtags', value.target.value)}
            />
            {/* <DropDown
              placeholder="select (or) add hashtag"
              header="Hashtags"
              value={props?.data?.hashtags}
              onchange={(value: any) => props?.updateState('hashtags', value.target.value)}
            /> */}
          </Box>
          <Box sx={dialogContent_style.field}>
            <Label sx={dialogContent_style.labelSx} htmlFor="username">
              Add Description
            </Label>
            <Input
              isMulti
              rowMax={5}
              placeholder="Add Description"
              header="Description"
              value={props?.data?.description}
              onChange={(value) => props?.updateState('description', value.target.value)}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={dialogContent_style.rightContent}>
          <Box>
            <Typography sx={dialogContent_style.Label} noWrap>
              Select Rule Type
            </Typography>
            <Box sx={dialogContent_style.checkBoxGroup}>
              <FormControlLabel
                label="Push"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_push}
                    onChange={(value) => props?.updateState('is_push', value.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="E-Mail"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_email}
                    onChange={(value) => props?.updateState('is_email', value.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="SMS"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_sms}
                    onChange={(value) => props?.updateState('is_sms', value.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="WhatsApp"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_whatsApp}
                    onChange={(value) => props?.updateState('is_whatsApp', value.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="Slack"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_slack}
                    onChange={(value) => props?.updateState('is_slack', value.target.checked)}
                  />
                }
              />
              <FormControlLabel
                label="InApp"
                control={
                  <CheckBox
                    header="Select Rule Type"
                    checked={props?.data?.is_inApp}
                    onChange={(value) => props?.updateState('is_inApp', value.target.checked)}
                  />
                }
              />
            </Box>
          </Box>
          {props?.data?.is_push && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>Push Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  header="Push Title"
                  placeholder="Add Push Title"
                  value={props?.data?.push_title}
                  onChange={(value) => props?.updateState('push_title', value.target.value)}
                />
              </Box>
              <Box sx={dialogContent_style.field}>
                <Input
                  isMulti
                  rowMax={5}
                  header="Push Body"
                  placeholder="Add Push Body"
                  value={props?.data?.push_body}
                  onChange={(value) => props?.updateState('push_body', value.target.value)}
                />
              </Box>
            </Box>
          )}
          {props?.data?.is_email && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>Email Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  header="Email Subject"
                  placeholder="Add Email Subject"
                  value={props?.data?.email_subject}
                  onChange={(value) => props?.updateState('email_subject', value.target.value)}
                />
              </Box>
              <Box sx={dialogContent_style.field}>
                <Input
                  isMulti
                  rowMax={5}
                  header="Email Body"
                  placeholder="Add Email Body"
                  value={props?.data?.email_body}
                  onChange={(value) => props?.updateState('email_body', value.target.value)}
                />
              </Box>
            </Box>
          )}
          {props?.data?.is_sms && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>SMS Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  isMulti
                  rowMax={5}
                  header="SMS Body"
                  placeholder="Add SMS Body"
                  value={props?.data?.SMS_body}
                  onChange={(value) => props?.updateState('SMS_body', value.target.value)}
                />
              </Box>
            </Box>
          )}

          {/* NEW */}

          {props?.data?.is_whatsApp && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>WhatsApp Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  header="Whatsapp Template Name"
                  placeholder="Add Whatsapp Template Name"
                  value={props?.data?.whatsApp_template_name}
                  onChange={(value) => props?.updateState('whatsApp_template_name', value.target.value)}
                />
                <Box sx={dialogContent_style.divide}>
                  <Typography sx={dialogContent_style.divideText}>OR</Typography>
                </Box>
                <Input
                  isMulti
                  rowMax={5}
                  header="WhatsApp Body"
                  placeholder="Add WhatsApp Body"
                  value={props?.data?.whatsApp_body}
                  onChange={(value) => props?.updateState('whatsApp_body', value.target.value)}
                />
              </Box>
            </Box>
          )}
          {props?.data?.is_slack && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>Slack Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  isMulti
                  rowMax={5}
                  header="Slack Body"
                  placeholder="Add Slack Body"
                  value={props?.data?.slack_body}
                  onChange={(value) => props?.updateState('slack_body', value.target.value)}
                />
              </Box>
            </Box>
          )}
          {props?.data?.is_inApp && (
            <Box sx={dialogContent_style.innerBox}>
              <Typography sx={dialogContent_style.pushDetails}>InApp Details</Typography>
              <Box sx={dialogContent_style.field}>
                <Input
                  textFieldStyle={dialogContent_style.textFieldBox}
                  header="In App Title"
                  placeholder="Add In App Title"
                  value={props?.data?.in_app_title}
                  onChange={(value) => props?.updateState('in_app_title', value.target.value)}
                />
                <Input
                  isMulti
                  rowMax={5}
                  header="InApp Body"
                  placeholder="Add InApp Body"
                  value={props?.data?.inApp_body}
                  onChange={(value) => props?.updateState('inApp_body', value.target.value)}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
