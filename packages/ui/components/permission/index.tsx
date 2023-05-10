import { Grid, SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';

import { permissionStyle } from './style';
import { AddPermission, FacilityClone } from '..';
import { useState } from 'react';

export interface PermissionProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const Permission = (props: PermissionProps): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [selected, setSelected] = useState(0);
  const [tableName, setTableName] = useState('tech');
  const handleMessage = (key: any, value: any) => {
    // setselctedMessage({ key, value });
    setSelected(value);
    setTableName(key.name);
    // onMessageTable(key, value);
  };
  // useEffect(() => {
  //   setSelected();
  // }, []);

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
          <FacilityClone tableName={tableName} />
        </Grid>
      </Grid>
    </Box>
  );
};
