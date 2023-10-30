import { Autocomplete, Box, ListItemText, SxProps, TextField, Typography, Chip } from '@mui/material';
import { Theme } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
import { addChipDropdownStyle } from './style';
import { GreenCloseCircleIcon } from '@assets/iconSet';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Chip from '@mui/material/Chip';

export interface AddChipDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  key?: string;
  value?: any;
  placeholder?: string;
  loadOptions?: () => Promise<any[]>;
  onChange?: (key: string, value: string | number) => void;
  options?: any[];
  loading?: boolean;
  isReadOnly?: boolean;
  isMulti?: boolean;
  debounceTimeout?: number;
  reduceOptions?: any;
  isClearable?: boolean;
  styles?: any;
  isPaginate?: boolean;
  label?: string;
  noBorder?: boolean;
  noSearch?: boolean;
  prefix?: boolean;
  labelColor?: string | null;
  labelSize?: string | null;
  fontFamily?: string | null;
  selectHeight?: string;
  padding?: string;
  isDeletedValue?: boolean;
  errorMessage?: any;
  permissionList?: any;
  isError?: boolean;
  deletedValue?: (value: any, updateValue: any) => void | undefined;
  // newSelectedOptions: any;
}

export const AddChipDropdown = (props: AddChipDropdownProps): JSX.Element => {
  const {
    className = '',
    key,
    value,
    placeholder,
    loadOptions,
    permissionList,
    onChange = () => false,
    options,
    loading,
    isReadOnly,
    isMulti,
    debounceTimeout,
    reduceOptions,
    isClearable = false,
    styles = {},
    isPaginate = false,
    label = '',
    noBorder = false,
    noSearch = false,
    prefix = false,
    labelColor = null,
    labelSize = null,
    fontFamily = null,
    selectHeight = '',
    padding,
    isDeletedValue,
    deletedValue,
    errorMessage,
    isError = false,
    sx = {},
    ...rest
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(permissionList, 'permissionListpermissionList');
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
      sx={[
        {
          ...addChipDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
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
              sx={{ px: '15px', backgroundColor: selectedOptions.includes(data) ? '#dce8e5' : '#fff' }}
              key={data.id}
              onClick={() => handleOptionToggle(data)}
            >
              <CheckBox style={{ marginRight: '8px' }} checked={selectedOptions.includes(data)} />
              <Box sx={{ p: 1 }} />
              {data.name}
            </MenuItem>
          ))}
        </Menu>
        {selectedOptions?.map((option) => (
          <Chip
            key={option}
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
