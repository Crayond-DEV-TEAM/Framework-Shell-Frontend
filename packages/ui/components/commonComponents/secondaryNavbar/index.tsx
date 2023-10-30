import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { secondaryNavbarStyle } from './style';
import { ReportTabs, TabPage } from '..';

export interface SecondaryNavbarProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  tabs?: any;
}

export const SecondaryNavbar = (props: SecondaryNavbarProps): JSX.Element => {
  const { className = '', sx = {}, title = 'User Management', tabs = [], ...rest } = props;

  return (
    <Box
      sx={[
        {
          ...secondaryNavbarStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={secondaryNavbarStyle.title}>{title}</Typography>
      <Box sx={secondaryNavbarStyle.reportTabs}>
        <TabPage tabs={tabs} />
      </Box>
    </Box>
  );
};
