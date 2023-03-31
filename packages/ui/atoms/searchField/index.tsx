import { MenuItem } from '@material-ui/core';
import { InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import { Box } from '@mui/material';
import { forwardRef } from 'react';

import { searchFieldStyle } from './style';

export interface SearchFieldProps {
  className?: string;
  startAdornment: any;
  endAdornment?: any;
  searchField_Style?: any;
  searchInputStyle?: any;
  totalSearchSx?: any;
  placeholder?: string;
  setOnSearch?: any;
  select?: boolean;
  onSearch?: string;
  sx?: SxProps<Theme>;
  selectOption?: Array<any>;
  onclick?: () => void;
}

export const SearchField = forwardRef((props: SearchFieldProps): JSX.Element => {
  const {
    startAdornment = '',
    endAdornment,
    searchField_Style = {},
    searchInputStyle = {},
    selectOption = [],
    placeholder = '',
    setOnSearch = () => true,
    totalSearchSx = {},
    select = true,
    onSearch = '',
    onclick = () => false,
  } = props;

  // const [onSearch, setOnSearch] = useState<string>('');

  // const handleSearchChange = (e: any) => {
  //   setOnSearch(e);
  // };
  return (
    <Box sx={{ ...searchFieldStyle.searchBoxSx, ...totalSearchSx }}>
      {/* Searchfield */}
      <TextField
        onClick={onclick}
        placeholder={placeholder}
        sx={{ ...searchFieldStyle.searchFieldSx, ...searchField_Style }}
        variant="outlined"
        onChange={setOnSearch}
        // onChange={(e: any) => handleSearchChange(e.target.value)}
        value={onSearch}
        select={select}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ...searchFieldStyle.searchInputSx, ...searchInputStyle }}>
              {startAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ ...searchFieldStyle.searchInputSx, ...searchInputStyle }}>
              {endAdornment}
            </InputAdornment>
          ),
        }}
      >
        {selectOption?.map((option: any) => (
          <MenuItem key={option?.value} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
});

SearchField.displayName = 'SearchField';
