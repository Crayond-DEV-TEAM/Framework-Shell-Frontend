import type { SxProps, Theme } from '@mui/material';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { settingsStyle } from './style';
import { ReportTabs, SubHeader, TabPage } from '..';
import { Input } from '@atoms/input';
import CopyLinkIcon from '@assets/copyLinkIcon';
import { Label } from '@atoms/label';
import { useAPIKey, useWebHookURL } from '@core/store';
import { useEffect, useState } from 'react';
import React from 'react';
import { Webhook } from '@mui/icons-material';
import { useSettings } from '@core/store/common/webHookUrl';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SaveIcon from '@mui/icons-material/Save';
export interface SettingsProps {
  className?: string;
  sx?: SxProps<Theme>;
  service: 'IDM' | 'MESSAGE-CATALOG' | 'ALERTSHUB' | 'PASM';
}

export const Settings = (props: SettingsProps): JSX.Element => {
  const { className = '', sx = {}, service = '', ...rest } = props;
  const { saveWebhookUrlAPI } = useSettings()
  const APIKey = useAPIKey.getState().APIkey[service];
  const WebHookUrl = useWebHookURL.getState().WebHookUrl[service];
  const [serviceApikey, setServiceApikey] = useState('');
  const [webHook, setWebHook] = useState('');
  const [isEditing, setIsEditing] = useState(WebHookUrl ? true : false);
  const [isCopied, setIsCopied] = useState(false);

  console.log(isEditing, WebHookUrl, 'webHook');

  // Event handler for input changes
  const handleInputChange = (event?: any) => {
    setWebHook(event.target.value);

  };

  const handleWebhookEditURL = () => {
    setIsEditing((prevEditing) => !prevEditing);
  };

  const handleSaveUrl = () => {
    if (webHook !== '') {
      saveWebhookUrlAPI(APIKey, webHook, service)
      setWebHook('')
    }
  }

  const handleCopyAPIkey = async () => {
    try {
      await navigator.clipboard.writeText(APIKey);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(true);
      }, 1500);

    } catch (err) {
      setIsCopied(false);
    }
  };

  useEffect(() => {
    setServiceApikey(APIKey);
    setWebHook(WebHookUrl);
    setIsEditing(WebHookUrl ? true : false)
    setIsCopied(false)
  }, [service]);

  return (
    <Box
      sx={[
        {
          ...settingsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <SubHeader title="Settings" sx={settingsStyle.subHeader} />
      <Box sx={settingsStyle.firstInput}>
        <Label sx={settingsStyle.labelSx} htmlFor="API Keys">
          API Key
        </Label>
        <Input
          placeholder="Service API Key"
          endAdornment={
            <IconButton sx={{
              ...settingsStyle.copySx,
              ...{ padding: isCopied ? '2px' : '8px' },
            }} onClick={handleCopyAPIkey}>
              {
                isCopied ? <Typography sx={settingsStyle.copyText}> <span><DoneAllIcon /></span> Copied!</Typography> :
                  <CopyLinkIcon />
              }
            </IconButton>
          }
          disabled={true}
          value={serviceApikey}
          textFieldStyle={{
            ...settingsStyle.inputSx,
            '& .MuiOutlinedInput-root': {
              p: 0,
            },
          }}
        />
        <Box pt={1}>
          <Label sx={settingsStyle.labelSx} htmlFor="WebHook URL">
            WebHook URL
          </Label>
          <Input
            placeholder="Webhook URL"
            endAdornment={
              <>
                {
                  webHook &&
                  <IconButton sx={settingsStyle.copySxeditIcon} onClick={handleWebhookEditURL}>
                    <EditIcon />
                  </IconButton>
                }
                <IconButton sx={settingsStyle.copySxedit} onClick={handleSaveUrl} >
                  <SaveIcon />
                </IconButton>
              </>
            }
            disabled={isEditing}
            onChange={handleInputChange}
            value={webHook}
            textFieldStyle={{
              ...settingsStyle.inputSx,
              '& .MuiOutlinedInput-root': {
                p: 0,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
