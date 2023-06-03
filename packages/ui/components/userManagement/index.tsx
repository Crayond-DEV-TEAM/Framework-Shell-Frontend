import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import { userManagementStyle } from './style';
import { Permission, RepositoryComponent, RoleMapping, Roles } from '..';

export interface UserManagementProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
}
export const tabs = [
  {
    id: 0,
    label: 'Repository',
    children: <RepositoryComponent />,
  },
  {
    id: 1,
    label: 'Permissions',
    children: <Permission />,
  },
  {
    id: 2,
    label: 'Roles',
    children: <Roles />,
  },
  // {
  //   id: 3,
  //   label: 'Role Mapping',
  //   children: <RoleMapping />,
  // },
];
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

export const UserManagement = (props: UserManagementProps): JSX.Element => {
  const { className = '', sx = {}, title = 'User Management', ...rest } = props;

  const [index, setIndex] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (i: any) => {
    setIndex(i);
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={userManagementStyle.rootSx}>
        <Typography sx={userManagementStyle.title}>{title}</Typography>
        <Box sx={userManagementStyle.reportTabs}>
          <Box sx={userManagementStyle.tabBar}>
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
                        sx={i === index ? userManagementStyle.alertConfigTabTxt : userManagementStyle.alertConfigTab}
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
      <Box sx={{ margin: '24px 20px' }}>
        <TabPanel>
          {index === 0 && <Box>{tabs[0]?.children}</Box>}
          {index === 1 && <Box>{tabs[1]?.children}</Box>}
          {index === 2 && <Box>{tabs[2]?.children}</Box>}
          {index === 3 && <Box>{tabs[3]?.children}</Box>}
        </TabPanel>
      </Box>
    </Box>
  );
};
