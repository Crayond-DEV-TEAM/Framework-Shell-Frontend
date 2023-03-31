import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Button } from '..';

import { footerComponentStyle } from './style';
import { CustomSwitches } from '..';

export interface FooterComponentProps {
  className?: string;
  checked?: any;
  SwitchChange?: (key: any, value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
  sx?: SxProps<Theme>;
}

export const FooterComponent = forwardRef((props: FooterComponentProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const {
    className = '',
    sx = {},
    checked = false,
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
      <Grid container alignItems={'center'} display={'flex'}>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} display={'flex'} alignItems={'center'}>
          <Switch {...label} checked={checked} onChange={SwitchChange} />
          {/* <CustomSwitches /> */}
          <Typography sx={footerComponentStyle.switch}>Make this active</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} width={'100%'}>
          <Grid container display={'flex'} justifyContent={'flex-end'} spacing={1}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box sx={footerComponentStyle.btnBg}>
                <Button buttonStyle={footerComponentStyle.cancelbtnText} onClick={onCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box sx={footerComponentStyle.savebtnBg}>
                <Button buttonStyle={footerComponentStyle.savebtnText} onClick={onSave}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

FooterComponent.displayName = 'FooterComponent';
