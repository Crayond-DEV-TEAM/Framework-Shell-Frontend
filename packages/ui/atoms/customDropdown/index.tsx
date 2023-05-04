import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';
import useTheme from '@mui/material/styles/useTheme';
// import Select from 'react-select';
import { Autocomplete, Box, Checkbox, ListItemText, SxProps, TextField, Typography, Chip } from '@mui/material';
import { Label } from '../label';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { customDropdownStyle } from './style';
import { Done } from '@mui/icons-material';
import { Theme } from '@emotion/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@atoms/checkBox';
// import { Chip } from '@material-ui/core';
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];
export interface CustomDropdownProps {
  className?: string;
  sx?: SxProps<Theme>;
  key?: string;
  // value: any;
  placeholder: string;
  loadOptions?: () => Promise<any[]>;
  onChange?: (value: any) => void;
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
  deletedValue?: (value: any, updateValue: any) => void | undefined;
}

export const CustomDropdown = (props: CustomDropdownProps): JSX.Element => {
  const {
    className = '',
    key,
    // value,
    placeholder,
    loadOptions,
    onChange,
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
    sx = {},
    ...rest
  } = props;
  // const [currentValue, setCurrentValue] = useState([]);
  const name = [{ values: 'Facility' }, { values: 'Manager' }, { values: 'Management' }];

  return (
    <Box
      sx={[
        {
          ...customDropdownStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Autocomplete
        multiple
        limitTags={2}
        popupIcon={<KeyboardArrowDownIcon />}
        options={name.map((option) => option.values)}
        // options={name}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={{ justifyContent: 'space-between', display: 'flex' }}>
            {option}
            <CheckBox style={{ marginRight: 8 }} checked={selected} />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '40px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { height: '40px', borderRadius: '8px' },
            }}
          />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => <Chip key={option} label={option} />)
        }
        onChange={onChange}
        sx={{
          '& .MuiChip-root': { height: '28px', borderRadius: '8px', marginLeft: '4px', marginTop: '-7px' },
          '& .MuiAutocomplete-input': {
            marginTop: '-8px',
          },
        }}
      />
    </Box>
  );
};
