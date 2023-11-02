import React, { useState, useEffect } from 'react';
import { Box, Menu, MenuItem, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import { addChipDropdownStyle } from './style';
import type { SxProps, Theme } from '@mui/material';

export interface AddChipDropdownProps {
  className: string;
  placeholder: string;
  permissionList: any;
  createEditState: any;
  onChange: () => void;
  sx?: SxProps<Theme>;
}

export const AddChipDropdown: React.FC<AddChipDropdownProps> = (props) => {
  const { className = '', placeholder, permissionList = [], createEditState, onChange, sx = {} } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [values, setValues] = useState([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectedOptions = createEditState || [];

  const handleOptionToggle = (option: any) => {
    debugger;
    const isSelected = selectedOptions.includes(option);
    setValues((prevOptions) => (isSelected ? prevOptions.filter((opt) => opt !== option) : [...prevOptions, option]));
    // const dataList = [...option];
    // setValues(dataList);
    // debugger;
  };

  const onSetChange = () => {
    onChange('mapServices', values);
  };

  useEffect(() => {
    onSetChange();
  }, [values]);

  console.log('selectedOptionsselectedOptions', selectedOptions);

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
          {permissionList?.map((data: any) => (
            <MenuItem
              key={data.id}
              onClick={() => handleOptionToggle(data)}
              sx={{
                px: '15px',
                backgroundColor: selectedOptions.includes(data) ? '#dce8e5' : '#fff',
              }}
            >
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.includes(data)}  />
              <Box sx={{ p: 1 }} />
              {data.name}
            </MenuItem>
            // JSON.stringify(selectedOptions.includes(data))
          ))}
        </Menu>
        {selectedOptions?.map((option: any) => (
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
