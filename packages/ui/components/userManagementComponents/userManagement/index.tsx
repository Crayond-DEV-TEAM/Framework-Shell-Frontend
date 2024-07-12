import type { SxProps, Theme } from '@mui/material';
import { Box, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Permission, RepositoryComponent, Roles } from '..';
import { userManagementStyle } from './style';
import { SnackbarProvider } from 'notistack';
import { usePermission, useSlug } from '@core/store';

export interface UserManagementProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  onAddRoleCallback?: () => void;
  onEditRoleCallback?: () => void;
  onDeleteRoleCallback?: () => void;
  onStatusChangeCallback?: () => void;
  apiToken?: string;
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

export const UserManagement = (props: UserManagementProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    title = 'User Management',
    apiToken = '',
    onAddRoleCallback = () => false,
    onEditRoleCallback = () => false,
    onDeleteRoleCallback = () => false,
    onStatusChangeCallback = () => false,
    ...rest
  } = props;

  const { setApiToken } = usePermission();
  const { setSlug } = useSlug();

  const [index, setIndex] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (i: any) => {
    setIndex(i);
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (apiToken) {
      setApiToken(apiToken);
      setSlug('IDM', apiToken);
    }
  }, [apiToken]);

  const tabs = [
    {
      id: 0,
      label: 'Repository',
      children: <RepositoryComponent apiToken={apiToken} />,
    },
    {
      id: 1,
      label: 'Permissions',
      children: <Permission apiToken={apiToken} />,
    },
    {
      id: 2,
      label: 'Roles',
      children: (
        <Roles
          apiToken={apiToken}
          onStatusChangeCallback={onStatusChangeCallback}
          onEditRoleCallback={onEditRoleCallback}
          onDeleteRoleCallback={onDeleteRoleCallback}
          onAddRoleCallback={onAddRoleCallback}
        />
      ),
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
          {tabs?.map((tab, tabIndex) => index === tabIndex && <Box key={index}>{tab?.children}</Box>)}
        </TabPanel>
      </Box>
    </Box>
  );
};
