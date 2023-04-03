import { MenuItem } from '@material-ui/core';
import { InputAdornment, SxProps, TextField, Theme, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/material';
import { forwardRef } from 'react';
import { useState } from 'react';
import { searchFieldStyle } from './style';
export interface SearchFieldProps {
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
  onClick?: () => any;
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
    onClick = () => false,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box sx={{ ...searchFieldStyle.searchBoxSx, ...totalSearchSx }}>
      {/* Searchfield */}
      <TextField
        onClick={handleClick}
        placeholder={placeholder}
        sx={{ ...searchFieldStyle.searchFieldSx, ...searchField_Style }}
        variant="outlined"
        // onChange={}
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
        aria-describedby={id}
      ></TextField>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={searchFieldStyle?.popove}
        // {
        //   // bgcolor: '#F1F1F1',
        //   // width: '100vh',
        //   // color: '#333',
        //   // padding: '16px',
        //   // borderRadius: '8px',
        //   // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        // }
      >
        <List sx={searchFieldStyle?.text}>
          {selectOption?.map((option: any) => (
            <ListItem key={option?.value} value={option?.value}>
              <ListItemText
                onClick={() => {
                  setOnSearch(option?.value);
                  handleClose();
                }}
              >
                {option?.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
});
SearchField.displayName = 'SearchField';
