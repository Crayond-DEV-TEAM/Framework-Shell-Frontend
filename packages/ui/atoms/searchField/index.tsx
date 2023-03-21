import { InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import { Box } from '@mui/material';
import {
  // ChangeEvent,
  forwardRef,
} from 'react';

import { searchFieldStyle } from './style';

export interface SearchFieldProps {
  className?: string;
  placeholder?: string;
  setOnSearch: () => void;
  onSearch: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  searchField_Style?: any;
  searchInputStyle?: any;
  sx?: SxProps<Theme>;
}

export const SearchField = forwardRef((props: SearchFieldProps): JSX.Element => {
  const {
    // setOnSearch = () => false,
    onSearch = '',
    startAdornment,
    endAdornment,
    searchField_Style = {},
    searchInputStyle = {},
    placeholder = '',
  } = props;

  return (
    <Box sx={searchFieldStyle.searchBoxSx}>
      {/* Searchfield */}
      <TextField
        placeholder={placeholder}
        sx={{ ...searchFieldStyle.searchFieldSx, ...searchField_Style }}
        variant="outlined"
        // onChange={(e: ChangeEvent<HTMLInputElement>) => setOnSearch(e.target.value)}
        value={onSearch}
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
      />
    </Box>
  );
});

SearchField.displayName = 'SearchField';
