import type { SxProps, Theme } from '@mui/material';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { settingsStyle } from './style';
import { ReportTabs, SubHeader, TabPage } from '..';
import { Input } from '@atoms/input';
import CopyLinkIcon from '@assets/copyLinkIcon';
import { Label } from '@atoms/label';
import { useAPIKey } from '@core/store';
import { useEffect, useState } from 'react';
import React from 'react';

export interface SettingsProps {
  className?: string;
  sx?: SxProps<Theme>;
  service: 'IDM' | 'MESSAGE-CATALOG' | 'ALERTSHUB' | 'PASM';
}

export const Settings = (props: SettingsProps): JSX.Element => {
  const { className = '', sx = {}, service = '', ...rest } = props;

  const [serviceApikey, setServiceApikey] = useState('');


  // const [webHookChange, setWebHookChange] = useState('');
  const APIKey = useAPIKey.getState().APIkey[service];

  useEffect(() => {
    setServiceApikey(APIKey);
  }, [service]);

  const [open, setOpen] = useState(false);
  const [copyText, setCopyText] = useState('');

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleCopyAPIkey = async () => {
    try {
      await navigator.clipboard.writeText(APIKey);
      setCopyText('Copied to clipboard!');
      setOpen(true);
    } catch (err) {
      setOpen(false);
      setCopyText('Unable to copyText to clipboard.');
    }
  };
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
      <SubHeader title="API" sx={settingsStyle.subHeader} />
      <Box sx={settingsStyle.firstInput}>
        <Label sx={settingsStyle.labelSx} htmlFor="API Keys">
          API Key
        </Label>
        <Input
          placeholder="SERVICE API KEY"
          endAdornment={
            <IconButton sx={settingsStyle.copySx} onClick={handleCopyAPIkey}>
              <CopyLinkIcon />
            </IconButton>
          }
          disabled={true}
          value={serviceApikey}
          textFieldStyle={{
            ...settingsStyle.inputSx,
            '& .MuiOutlinedInput-root': {
              pr: 0,
            },
          }}
        />
      </Box>
    </Box>
  );
};
