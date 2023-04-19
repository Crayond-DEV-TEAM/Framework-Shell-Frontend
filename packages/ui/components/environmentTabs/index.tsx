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
import Settings from '../../assets/settings';

export interface EnvironmentTabsProps {
  className?: string;
  sx?: SxProps<Theme>;
}

const handleTabEdit = (e: any) => {
  console.log(e);
};

const tabs = [
  {
    title: 'Staging',
    descr: 'Staging',
    icon: <Settings onClick={() => handleTabEdit('Staging')} />,
  },
  {
    title: 'UAT',
    descr: 'UAT',
    icon: <Settings onClick={() => handleTabEdit('UAT')} />,
  },
  {
    title: 'Production',
    descr: 'Production',
    icon: <Settings onClick={() => handleTabEdit('Production')} />,
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
        <Tabs aria-label="basic tabs example" sx={EnvironmentTabsStyle.tabsSx}>
          {tabs?.map((_e: any, i: any) => {
            return (
              <Tab
                onClick={() => onChange(_e, i)}
                sx={selected === i ? EnvironmentTabsStyle.selectedSx : EnvironmentTabsStyle.unSelectedSx}
                key={i}
                label={_e.title}
                icon={_e.icon}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
});
