import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { tabPageStyle } from './style';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RepositoryComponent } from '@components/userManagementComponents';
// import { tabs } from '@components/secondaryNavbar/utils';
export interface TabPageProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
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

export const TabPage = (props: TabPageProps): JSX.Element => {
  const { className = '', sx = {}, title = 'User Management', ...rest } = props;

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
      label: 'Repository',
      children: <RepositoryComponent />,
    },
    {
      id: 1,
      label: 'Permissions',
      // children: <TabsCard data={tabsCard?.thisWeek} />,
    },
    {
      id: 2,
      label: 'Roles',
      // children: <TabsCard data={tabsCard?.thisMonth} />,
    },
    {
      id: 3,
      label: 'Role Mapping',
      // children: <TabsCard data={tabsCard?.thisMonth} />,
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f6f6f6' }}>
      <Box sx={tabPageStyle.rootSx}>
        <Typography sx={tabPageStyle.title}>{title}</Typography>
        <Box sx={tabPageStyle.reportTabs}>
          <Box sx={tabPageStyle.tabBar}>
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
                        sx={i === index ? tabPageStyle.alertConfigTabTxt : tabPageStyle.alertConfigTab}
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

      <TabPanel>
        {index === 0 && <Box>{tabs[0]?.children}</Box>}
        {index === 1 && <Box>{tabs[1]?.children}</Box>}
        {index === 2 && <Box>{tabs[2]?.children}</Box>}
        {index === 3 && <Box>{tabs[3]?.children}</Box>}
      </TabPanel>
    </Box>
  );
};
