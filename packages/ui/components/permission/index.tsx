import { Grid, SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { permissionStyle } from './style';
import { AddPermission, FacilityClone } from '..';
import { useState } from 'react';
import { usePermission } from '@core/store';

export interface PermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
  apiUrl?: string;
}

export const Permission = (props: PermissionProps): JSX.Element => {
  const { className = '', sx = {}, apiUrl, ...rest } = props;
  const [selected, setSelected] = useState(0);
  const [tableName, setTableName] = useState('');
  const { PermissionList, setRepositoryList, indexUpdateList, RepositoryList, setApiUrl } = usePermission();

  const handleMessage = (key: any, value: any) => {
    setSelected(value);
    setTableName(key.name);
    setRepositoryList(key.data, key.id, key);
    // onMessageTable(key, value);
  };

  useEffect(() => {
    // This is a hack. To get the env variables from other applications. They will be passed as props.
    // Using this prop we will add a new variable in the store as apiUrl.
    setApiUrl(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    if (PermissionList && PermissionList.length > 0) {
      const init = PermissionList[0];
      setRepositoryList(init?.data, init?.id, '');
      setSelected(0);
      setTableName(init?.name);
    }
  }, [PermissionList]);

  return (
    <Box
      sx={[
        {
          ...permissionStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={2.5} lg={2.5} xl={2.5}>
          <AddPermission
            title="Permissions"
            addTitle="Add Permission"
            editTitle="Edit Permission"
            handleMessage={handleMessage}
            select={selected}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9.5} lg={9.5} xl={9.5}>
          <FacilityClone tableName={tableName} data={indexUpdateList} />
        </Grid>
      </Grid>
    </Box>
  );
};
