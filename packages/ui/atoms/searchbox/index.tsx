import type { SxProps, Theme } from '@mui/material';
import { Box, Typography, TextField, MenuItem, InputAdornment } from '@mui/material';

import { searchBoxStyle } from './style';
import { SearchIcon } from '@atoms/icons';

export interface SearchBoxProps {
  className?: string;
  startAdornment?: any;
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

export const SearchBox = (props: SearchBoxProps): JSX.Element => {
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

  return (
    <Box sx={{ ...searchBoxStyle.searchBoxSx, ...totalSearchSx }}>
      <TextField
        onClick={onclick}
        placeholder={placeholder}
        sx={{ ...searchBoxStyle.searchFieldSx, ...searchField_Style }}
        variant="outlined"
        onChange={setOnSearch}
        // onChange={(e: any) => handleSearchChange(e.target.value)}
        value={onSearch}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ...searchBoxStyle.searchInputSx, ...searchInputStyle }}>
              {startAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ ...searchBoxStyle.searchInputSx, ...searchInputStyle }}>
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
};
