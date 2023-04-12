import { Box, FormControlLabel, Grid, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';
import { dialogContent_style } from './style';
import { Input } from '@atoms/input';
import { CheckBox } from '@atoms/checkBox';
import { DropDown } from '@atoms/dropDown';

export interface DialogContentProps {
  data?: any;
  value?: any;
  updateState?: any;
  tabs?: any;
  newValue?: any;
  onChange?: any;
  sx?: SxProps<Theme>;
}

export function DialogContent(props: DialogContentProps): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box sx={dialogContent_style.leftContent}>
          <Box sx={dialogContent_style.field}>
            <Input
              header="Alert Rule Code"
              placeholder="Add Alert Rule Code"
              value={props?.data?.alert_code}
              onChange={(value) => props?.updateState('alert_code', value.target.value)}
            />
          </Box>
          <Box sx={dialogContent_style.field}>
            <Input
              header="Reference ID"
              placeholder="Add Reference ID"
              value={props?.data?.reference_id}
              onChange={(value) => props?.updateState('reference_id', value.target.value)}
            />
          </Box>
          <Box sx={dialogContent_style.field}>
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
        </Box>
      </Grid>
    </Grid>
  );
}
