import type { SxProps, Theme } from '@mui/system'; // Import from '@mui/system' instead of '@mui/material'
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import React, { useEffect, useState } from 'react';
import { CutstomizedAutocomplete, DropDown, MappedAdminCard, MappedUserCard } from '..';

import { addChipMultipleDropdownStyle } from './style';

export interface AddChipMultipleDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  dataList?: any;
  optionList?: any;
  handleChange?: (key: string, value: string | number) => void;
}

export const AddChipMultipleDropdown = (props: AddChipMultipleDropdownProps): JSX.Element => {
  const { className = '', sx = {}, dataList, handleChange = () => false, optionList, ...rest } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Explicitly define the type of anchorEl
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Explicitly define the type of selectedOptions

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionToggle = (option: any) => {
    const isSelected = selectedOptions.some((selected) => selected === option);
    setSelectedOptions((prevOptions) =>
      isSelected ? prevOptions.filter((opt) => opt !== option) : [...prevOptions, option],
    );
    // handleChange('mappedUser', selectedOptions);
  };

  const onSetChange = () => {
    handleChange('mappedUser', selectedOptions);
  };
  useEffect(() => {
    onSetChange();
  }, [selectedOptions]);

  console.log(selectedOptions);
  console.log(dataList, 'dataList');

  return (
    <Box
      sx={[
        {
          ...addChipMultipleDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={className}
      {...rest}
    >
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
          {dataList?.map((data: any) => (
            <MenuItem
              sx={{
                py: 0,
                backgroundColor: selectedOptions.some((opt) => opt === data) ? '#dce8e5' : '#fff',
              }}
              key={data}
              onClick={() => handleOptionToggle(data)}
            >
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.some((opt) => opt === data)} />
              <Box
                sx={{ px: 1, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}
              >
                <MappedAdminCard options={data} />
                {/* <CutstomizedAutocomplete
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline:focus-visible': {
                      border: 0,
                    },
                  }}
                  permissionList={optionList}
                /> */}
              </Box>
            </MenuItem>
          ))}
        </Menu>
        <MappedUserCard altText={selectedOptions} />
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
