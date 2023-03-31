import { Grid, Switch, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { footerComponentStyle } from './style';
import { CustomSwitches } from '..';

export interface FooterComponentProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const FooterComponent = forwardRef((props: FooterComponentProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

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
          <CustomSwitches />
          <Typography sx={footerComponentStyle.switch}>Make this active</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} width={'100%'}>
          <Grid container display={'flex'} justifyContent={'flex-end'} spacing={1}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box sx={footerComponentStyle.btnBg}>
                <Typography sx={footerComponentStyle.cancelbtnText}>Cancel</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box sx={footerComponentStyle.savebtnBg}>
                <Typography sx={footerComponentStyle.savebtnText}>Save</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

FooterComponent.displayName = 'FooterComponent';
