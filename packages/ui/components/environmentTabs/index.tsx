import { Button } from '@atoms/button';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps, Theme, Popover, Tabs, Tab } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { AddMessageGroup, Filter } from '..';
import DownloadIcon from '@core/ui/assets/downloadIcon';
import XlsIcon from '@core/ui/assets/xlsIcon';
import { EnvironmentTabsStyle } from './style';
import { TabPanel } from '@mui/lab';
import React from 'react';

export interface EnvironmentTabsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

const tabs = [
  {
    title: 'Staging',
    descr: 'Staging',
  },
  {
    title: 'UAT',
    descr: 'UAT',
  },
  {
    title: 'Production',
    descr: 'Production',
  },
];

// eslint-disable-next-line react/display-name
export const EnvironmentTabs = forwardRef((props: EnvironmentTabsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;

  const [selected, setSelected] = React.useState(0);
  const onChange = (e: any, i: any) => {
    // debugger;
    setSelected(i);
  };
  return (
    <Box
      sx={[
        {
          ...EnvironmentTabsStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example">
          {tabs?.map((_e: any, i: any) => (
            <Tab
              onClick={() => onChange(_e, i)}
              sx={selected === i ? EnvironmentTabsStyle.selectedSx : EnvironmentTabsStyle.unSelectedSx}
              key={i}
              label={_e.title}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
});
