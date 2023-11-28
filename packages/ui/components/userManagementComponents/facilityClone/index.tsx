import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';

import { facilityCloneStyle } from './style';
import { TreeComponent } from '@atoms/treeComponent';
import { TreeView } from '@crayond_dev/ui_tree-view';

import { Button } from '@atoms/button';
import { usePermission } from '@core/store';
import { useEffect, useState } from 'react';
import { Repositorysimmer } from '../repositoryComponent/simmer';
import { CollapseIcon, ExpandIcon, InfoIcon, SettingIcon } from '@atoms/icons';
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
    const value = data;
    // setRepository(type, index, value);
    // console.log(data);
  };

  const handleChange = (e: any) => {
    setRepository(e);
    debugger;
  };

  console.log(data?.data, 'kkkkkkkkkkkkkkkkkkk');

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
      {/* <Box sx={facilityCloneStyle.repository}>
        <Typography sx={facilityCloneStyle.repositoryText}>Repository</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={facilityCloneStyle.crudText}>Create</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Read</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Update</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Delete</Typography>
          <Typography sx={facilityCloneStyle.crudText}>Edit</Typography>
        </Box>
      </Box> */}
      {/* <Box sx={facilityCloneStyle.borderLine} /> */}
      <Box sx={{ height: 'calc(100vh - 302px)', overflow: 'scroll', margin: '15px' }}>
        {fetchingPermission ? (
          <Repositorysimmer />
        ) : (
          // <TreeView
          //   checkboxsection
          //   customLabel={{
          //     checkBoxStyles: {
          //       bgColor: 'primary.main',
          //       checkboxBorderRadius: '20px',
          //       checkboxHeight: '40px',
          //       checkboxWidth: '',
          //     },
          //     disable: false,
          //     formControlPropsSx: {},
          //     handleChange: { handleChange },
          //     isCheckBox: false,
          //   }}
          //   // setEdit={true}
          //   defaultCollapseIcon={<ExpandIcon />}
          //   defaultExpandIcon={<CollapseIcon />}
          //   heading="Repository"
          //   leftSec={{
          //     breakpoints: {
          //       lg: 8,
          //       md: 6,
          //       sm: 4,
          //       xs: 4,
          //     },
          //   }}
          //   rightSec={{
          //     breakpoints: {
          //       lg: 4,
          //       md: 6,
          //       sm: 8,
          //       xs: 8,
          //     },
          //   }}
          //   state={data?.data}
          // />
          <TreeView
            checkboxBgColor="primary.main"
            checkboxBorderRadius="2px"
            checkboxHeight="20px"
            checkboxWidth="20px"
            checkboxsection
            childrenLabelStyle={{
              color: '#29302B',
              fontSize: '14px',
              fontWeight: 500,
            }}
            connectors
            disable={true}
            defaultCollapseIcon={<ExpandIcon />}
            defaultExpandIcon={<CollapseIcon />}
            handleChange={handleChange}
            heading="Repository"
            headingSx={{ fontSize: '14px', padding: '15px' }}
            labelStyle={{
              color: '#29302B',
              fontSize: '14px',
              fontWeight: 600,
            }}
            leftSec={{
              breakpoints: {
                lg: 6,
                md: 6,
                sm: 4,
                xs: 12,
              },
            }}
            parentChildIcon={<InfoIcon />}
            parentIcon={<SettingIcon />}
            permissionHeadingSx={{
              color: '#29302B',
              fontWeight: 600,
              // borderBottom: '1px solid',
            }}
            rightSec={{
              breakpoints: {
                lg: 6,
                md: 6,
                sm: 8,
                xs: 12,
              },
            }}
            state={data?.data}
            subChildLabelStyle={{
              alignItems: 'center',
              color: '#818181',
              display: 'flex',
              fontSize: '12px',
            }}
            leftBorderStyle={{
              position: 'absolute',
              top: 0,
              left: 10,
              width: '10px',
              height: '100%',
              borderLeft: '1px solid #9B9B9B',
              zIndex: 999,
            }}
          />
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
