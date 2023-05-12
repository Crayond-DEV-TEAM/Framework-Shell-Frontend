import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { facilityCloneStyle } from './style';
import { TreeComponent } from '@atoms/treeComponent';
import { RepoJson, books } from '@components/repositoryComponent/utils';
import { Button } from '@atoms/button';
import { usePermission } from '@core/store';
import { useEffect, useState } from 'react';
import { Repositorysimmer } from '@components/repositoryComponent/simmer';
export interface FacilityCloneProps {
  className?: string;
  sx?: SxProps<Theme>;
  tableName?: string;
  data?: any;
}

export const FacilityClone = (props: FacilityCloneProps): JSX.Element => {
  const { className = '', sx = {}, tableName = '', data, ...rest } = props;
  const [ischeck, setisCheck] = useState(true);
  const { setRepository, updateRopsitory } = usePermission();

  const handleEdit = () => {
    setisCheck(false);
  };
  const handleSave = () => {
    updateRopsitory();
    setisCheck(true);
  };
  const handleCheckChange = (e: any, type: string, data: any, index: any) => {
    const value = data[type];
    setRepository(type, index, value);
    console.log(data);
  };

  const { fetchingPermission } = usePermission();

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
        {fetchingPermission ? (
          <Repositorysimmer />
        ) : (
          <TreeComponent data={data?.data} checkboxsection={true} setEdit={ischeck} onChange={handleCheckChange} />
        )}
      </Box>
      {/* sx={{ height: '50vh', overflow: 'scroll' }} */}
      <Box sx={facilityCloneStyle.borderLine} />
      <Box sx={facilityCloneStyle.footer}>
        {ischeck ? (
          <Button sx={{ width: '64px', height: '28px', textTransform: 'capitalize' }} onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button sx={{ width: '64px', height: '28px', textTransform: 'capitalize' }} onClick={handleSave}>
              Save
            </Button>
            <Button sx={{ width: '64px', height: '28px', textTransform: 'capitalize', ml: 1 }}>Cancel</Button>
          </>
        )}
      </Box>
    </Box>
  );
};
