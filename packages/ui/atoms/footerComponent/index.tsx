import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Button } from '..';

import { footerComponentStyle } from './style';
import { CustomSwitches } from '..';

export interface FooterComponentProps {
  className?: string;
  check?: boolean;
  checked?: any;
  loading?: boolean;
  SwitchChange?: (value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
  sx?: SxProps<Theme>;
  saveButtonStyle?: any;
  cancelButtonStyle?: any;
  saveText?: string;
  cancelText?: string;
}

export const FooterComponent = forwardRef((props: FooterComponentProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    check = false,
    checked = true,
    loading = false,
    SwitchChange = () => false,
    onSave = () => false,
    onCancel = () => false,
    saveButtonStyle = { width: '100px' },
    cancelButtonStyle = {},
    saveText = 'Save',
    cancelText = 'Cancel',
    ...rest
  } = props;
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <Box
      sx={[
        {
          ...footerComponentStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
      width={'100%'}
    >
      <Box sx={check ? footerComponentStyle.totalFooterSx : footerComponentStyle.totalFooterSxTwo}>
        {/* <Switch {...label} checked={checked} onChange={SwitchChange} /> */}
        {check && (
          <Box sx={footerComponentStyle.btnSx}>
            <CustomSwitches label="" value={checked} onChange={SwitchChange} />
            <Typography sx={footerComponentStyle.switch}>Make this active</Typography>
          </Box>
        )}
        <Box sx={check ? footerComponentStyle.btnSx : footerComponentStyle.btnSxTwo}>
          <Box sx={footerComponentStyle.btnBg}>
            <Button buttonStyle={{ ...footerComponentStyle.cancelbtnText, cancelButtonStyle }} onClick={onCancel}>
              {cancelText}
            </Button>
          </Box>
          <Box sx={footerComponentStyle.savebtnBg}>
            <Button
              buttonStyle={{ ...footerComponentStyle.savebtnText, saveButtonStyle }}
              onClick={onSave}
              loading={loading}
            >
              {saveText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

FooterComponent.displayName = 'FooterComponent';
