import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { facilityCloneStyle } from './style';
import { TreeComponent } from '@atoms/treeComponent';
import { RepoJson, books } from '@components/repositoryComponent/utils';
import { Button } from '@atoms/button';
import { usePermission } from '@core/store';
import { useEffect } from 'react';
export interface FacilityCloneProps {
  className?: string;
  sx?: SxProps<Theme>;
  tableName?: string;
}

export const FacilityClone = (props: FacilityCloneProps): JSX.Element => {
  const { className = '', sx = {}, tableName = '', ...rest } = props;
  const { getFaciltyRepository, RepositoryList } = usePermission();
  useEffect(() => {
    getFaciltyRepository();
  }, []);

  return (
    <Box
      sx={[
        {
          ...facilityCloneStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Typography sx={facilityCloneStyle.header}>{tableName}</Typography>
      <Box sx={facilityCloneStyle.borderLine} />
      <Box sx={facilityCloneStyle.repository}>
        <Typography sx={facilityCloneStyle.repositoryText}>Repository</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={facilityCloneStyle.crudText}>Create</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Read</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Update</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Delete</Typography>
        </Box>
      </Box>
      <Box sx={facilityCloneStyle.borderLine} />
      <Box sx={{ height: 'calc(100vh - 323px)', overflow: 'scroll' }}>
        <TreeComponent data={RepositoryList} checkboxsection={true} />
      </Box>
      {/* sx={{ height: '50vh', overflow: 'scroll' }} */}
      <Box sx={facilityCloneStyle.borderLine} />
      <Box sx={facilityCloneStyle.footer}>
        <Button sx={{ width: '64px', height: '28px', textTransform: 'capitalize' }}>Edit</Button>
      </Box>
    </Box>
  );
};
