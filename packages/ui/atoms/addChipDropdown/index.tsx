import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import { addChipDropdownStyle } from './style';
import type { SxProps, Theme } from '@mui/material';

export interface AddChipDropdownProps {
  className: string;
  value: any;
  placeholder: string;
  permissionList: any;
  onChange: () => void;
  createEditState: any;
  sx?: SxProps<Theme>;
}

export const AddChipDropdown: React.FC<AddChipDropdownProps> = (props) => {
  const {
    className = '',
    value,
    placeholder,
    permissionList,
    onChange = () => false,
    createEditState,
    sx = {},
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionToggle = (option: any) => {
    const isSelected = selectedOptions.includes(option);
    setSelectedOptions((prevOptions) =>
      isSelected ? prevOptions.filter((opt) => opt !== option) : [...prevOptions, option],
    );
  };

  const onSetChange = () => {
    onChange('mapServices', selectedOptions);
  };

  useEffect(() => {
    onSetChange();
  }, [selectedOptions]);

  return (
    <Box
      sx={{
        ...addChipDropdownStyle.rootSx,
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
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
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.includes(data)} />
              <Box sx={{ p: 1 }} />
              {data.name}
            </MenuItem>
          ))}
        </Menu>
        {createEditState?.map((option: any) => (
          <Chip
            key={option.service_name}
            label={option.service_name}
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
