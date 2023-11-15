import type { SxProps, Theme } from '@mui/material';
import { Box, Tabs, Typography } from '@mui/material';
import { superAdminTabsStyle } from './style';
import React from 'react';
import { AdminSection, SuperAdmin, UserSection } from '@components/landingpages';
import { SnackbarProvider } from 'notistack';

export interface SuperAdminTabsProps {
  className?: string;
  sx?: SxProps<Theme>;
}
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export const SuperAdminTabs = (props: SuperAdminTabsProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [index, setIndex] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (i: any) => {
    setIndex(i);
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const tabs = [
    {
      id: 0,
      label: 'Organisation',
      children: <AdminSection />,
    },
    {
      id: 1,
      label: 'Users',
      children: <UserSection />,
    },
  ];

  return (
    <Box>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
      <Box sx={superAdminTabsStyle.rootSx}>
        <Typography sx={superAdminTabsStyle.title}>IDM</Typography>
        <Box sx={superAdminTabsStyle.reportTabs}>
          <Box sx={superAdminTabsStyle.tabBar}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {tabs.length > 0 &&
                  tabs.map((tab: any, i: any) => {
                    return (
                      <Typography
                        onClick={() => handleTabChange(i)}
                        key={i}
                        pt={2}
                        pb={2}
                        sx={i === index ? superAdminTabsStyle.alertConfigTabTxt : superAdminTabsStyle.alertConfigTab}
                        // sx={{ color: disabled === true ? "#B9B9B9" : "" }}
                      >
                        {tab?.label}
                      </Typography>
                    );
                  })}
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ margin: '18px 20px 0px 20px' }}>
        <TabPanel>
          {tabs?.map((tab, tabIndex) => index === tabIndex && <Box key={index}>{tab?.children}</Box>)}
        </TabPanel>
      </Box>
    </Box>
  );
};
