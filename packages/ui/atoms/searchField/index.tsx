import { InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import { Box } from '@mui/material';
import { forwardRef } from 'react';

import { searchFieldStyle } from './style';

export interface SearchFieldProps {
  className?: string;
  startAdornment: any;
  endAdornment: any;
  searchField_Style?: any;
  searchInputStyle?: any;
  totalSearchSx?: any;
  placeholder?: string;
  setOnSearch?: any;
  onSearch?: () => void;
  sx?: SxProps<Theme>;
}

export const SearchField = forwardRef((props: SearchFieldProps): JSX.Element => {
  const {
    startAdornment,
    endAdornment,
    searchField_Style = {},
    searchInputStyle = {},
    placeholder = '',
    setOnSearch = () => false,
    totalSearchSx = {},
    onSearch = '',
  } = props;

  // const [onSearch, setOnSearch] = useState<string>('');

  // const handleSearchChange = (e: any) => {
  //   setOnSearch(e);
  // };
  return (
    <Box sx={{ ...searchFieldStyle.searchBoxSx, ...totalSearchSx }}>
      {/* Searchfield */}
      <TextField
        placeholder={placeholder}
        sx={{ ...searchFieldStyle.searchFieldSx, ...searchField_Style }}
        variant="outlined"
        onChange={(e) => setOnSearch(e.target.value)}
        // onChange={(e: any) => handleSearchChange(e.target.value)}
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
