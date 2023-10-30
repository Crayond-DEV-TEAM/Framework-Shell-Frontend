import type { SxProps, Theme } from '@mui/system';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import React, { useEffect, useState } from 'react';
import { CutstomizedAutocomplete, MappedAdminCard, MappedUserCard } from '..';

import { addChipMultipleDropdownStyle } from './style';

interface AccessOption {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  name: string;
}

export interface AddChipMultipleDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  dataList?: UserData[];
  optionList?: AccessOption[];
  handleChange?: (key: string, value: any) => void;
}

export const AddChipMultipleDropdown: React.FC<AddChipMultipleDropdownProps> = ({
  className = '',
  sx = {},
  dataList = [],
  handleChange = () => {},
  optionList = [],
  ...rest
}: AddChipMultipleDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<UserData[]>([]);
  const [accessState, setAccessState] = useState<AccessOption | null>(null);

  const accessMaster = [
    { id: '1', name: 'Full Access' },
    { id: '2', name: 'Restricted' },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionToggle = (option: UserData) => {
    const isSelected = selectedOptions.some((selected) => selected.id === option.id);
    setSelectedOptions((prevOptions) =>
      isSelected ? prevOptions.filter((opt) => opt.id !== option.id) : [...prevOptions, option],
    );
  };

  const handleChangeAccess = (selectedAccess: AccessOption | null) => {
    setAccessState(selectedAccess);
  };

  const onSetChange = () => {
    if (selectedOptions.length > 0 && accessState) {
      const setItemsUsers = selectedOptions.map((user) => ({
        id: user.id,
        name: user.name,
        access: accessState.name,
      }));
      handleChange('mapAdmin', setItemsUsers);
    }
  };

  useEffect(() => {
    onSetChange();
  }, [selectedOptions, accessState]);

  return (
    <Box sx={[addChipMultipleDropdownStyle.rootSx, ...(Array.isArray(sx) ? sx : [sx])]} className={className} {...rest}>
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
              p: 0,
            },
          }}
        >
          {dataList.map((data) => (
            <MenuItem
              sx={{
                py: 0,
                backgroundColor: selectedOptions.some((opt) => opt.id === data.id) ? '#dce8e5' : '#fff',
              }}
              key={data.id}
              onClick={() => handleOptionToggle(data)}
            >
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.some((opt) => opt.id === data.id)} />
              <Box
                sx={{ px: 1, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
              >
                <MappedAdminCard options={data} />
                <CutstomizedAutocomplete
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline:focus-visible': {
                      border: 0,
                    },
                  }}
                  onChange={(e: AccessOption | null) => handleChangeAccess(e)}
                  permissionList={accessMaster}
                />
              </Box>
            </MenuItem>
          ))}
        </Menu>
        <MappedUserCard  />
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '10px' }} onClick={handleClick}>
          <GreenCloseCircleIcon
            rootStyle={{
              minWidth: '22px',
              height: '22px',
              borderRadius: '50% !important',
              marginRight: '10px',
            }}
          />
          <Typography style={{ color: '#357968', fontSize: '14px', fontWeight: 600 }}>Add User</Typography>
        </Box>
      </div>
    </Box>
  );
};
