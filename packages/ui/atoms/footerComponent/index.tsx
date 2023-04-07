import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Button } from '..';

import { footerComponentStyle } from './style';
import { CustomSwitches } from '..';

export interface FooterComponentProps {
  className?: string;
  checked?: any;
  loading?: boolean;
  SwitchChange?: (value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
  sx?: SxProps<Theme>;
}

export const FooterComponent = forwardRef((props: FooterComponentProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    checked = false,
    loading = false,
    SwitchChange = () => false,
    onSave = () => false,
    onCancel = () => false,
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
      <Box sx={footerComponentStyle.totalFooterSx}>
        {/* <Switch {...label} checked={checked} onChange={SwitchChange} /> */}
        <Box sx={footerComponentStyle.btnSx}>
          <CustomSwitches label="" value={checked.status} onChange={SwitchChange} />
          <Typography sx={footerComponentStyle.switch}>Make this active</Typography>
        </Box>
        <Box sx={footerComponentStyle.btnSx}>
          <Box sx={footerComponentStyle.btnBg}>
            <Button buttonStyle={footerComponentStyle.cancelbtnText} onClick={onCancel}>
              Cancel
            </Button>
          </Box>
          <Box sx={footerComponentStyle.savebtnBg}>
            <Button buttonStyle={footerComponentStyle.savebtnText} loading={loading} onClick={onSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

FooterComponent.displayName = 'FooterComponent';
