import React, { useState, useEffect } from 'react';
import { Box, Menu, MenuItem, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import { addChipDropdownStyle } from './style';
import type { SxProps, Theme } from '@mui/material';
import { useAdminLanding, useSuperAdminLanding } from '@core/store';

export interface AddChipDropdownProps {
  className: string;
  placeholder: string;
  permissionList: any;
  createEditState: any;
  onChange: () => void;
  sx?: SxProps<Theme>;
}

export const AddChipDropdown: React.FC<AddChipDropdownProps> = (props) => {
  const { className = '', permissionList = [], createEditState, onChange, sx = {} } = props;
  const { deleteServicemap, createServicemap, createEditOrganisation, getAllUserList } = useSuperAdminLanding();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [values, setValues]: any = useState(createEditState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    getAllUserList();
  };
  const selectedOptions = values || [];
  console.log('valuesvaluesvaluesvalues', values);

  const handleOptionToggle = (option: any) => {
    debugger;
    const isSelected = values.find((v) => v?.id === option?.id);
    if (isSelected?.id) {
      const isSelected = values.filter((v) => v?.id !== option?.id);
      setValues(isSelected);
      onChange('mapServices', isSelected);
      createEditOrganisation.id ? deleteServicemap() : '';
    } else {
      values.push(option);
      setValues(values);
      onChange('mapServices', values);
      createEditOrganisation.id ? createServicemap() : '';
      // createServicemap();
    }
  };
  console.log(permissionList, 'permissionListpermissionListpermissionList');
  useEffect(() => {
    if (createEditState?.length > 0) setValues(createEditState);
  }, [createEditState]);

  return (
    <Box sx={{ ...addChipDropdownStyle.rootSx, ...(Array.isArray(sx) ? sx : [sx]) }} className={className}>
      <div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            '& .MuiPaper-root': {
              width: '300px',
              height: '130px',
              marginTop: '16px',
            },
          }}
        >
          {permissionList?.map((data: any) => {
            console.log(data, 'data');
            console.log(selectedOptions, 'lllll');
            const isSelected = values?.filter((v: any) => v?.id === data?.id);
            return (
              <MenuItem
                key={data.id}
                onClick={() => handleOptionToggle(data)}
                sx={{
                  px: '15px',
                  backgroundColor: isSelected?.length > 0 ? '#dce8e5' : '#fff',
                }}
              >
                <CheckBox style={{ marginRight: '8px' }} checked={isSelected?.length > 0} />
                <Box sx={{ p: 1 }} />
                {data.name}
              </MenuItem>
            );
          })}
        </Menu>
        {values?.map((option: any) => (
          <Chip
            key={option.name}
            label={option.name}
            sx={{ height: '28px', borderRadius: '8px', marginBottom: '15px', marginRight: '10px' }}
          />
        ))}
        <GreenCloseCircleIcon
          onClick={handleClick}
          rootStyle={{
            minWidth: '22px',
            height: '22px',
            borderRadius: '50% !important',
            marginTop: '-15px',
            cursor: 'pointer',
          }}
        />
      </div>
    </Box>
  );
};
