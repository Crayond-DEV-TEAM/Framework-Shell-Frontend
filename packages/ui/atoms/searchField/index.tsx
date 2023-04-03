import { MenuItem } from '@material-ui/core';
import { InputAdornment, SxProps, TextField, Theme, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/material';
import { forwardRef } from 'react';
import { useState } from 'react';
import { searchFieldStyle } from './style';
export interface SearchFieldProps {
  className?: string;
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
  searchField_Style?: any;
  searchInputStyle?: any;
  totalSearchSx?: any;
  placeholder?: string;
  onSelect?: any;
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
    onSelect = () => true,
    totalSearchSx = {},
    select = true,
    onSearch = '',
    onClick = () => false,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={searchFieldStyle?.popove}
      >
        <List sx={searchFieldStyle?.text}>
          {selectOption?.map((option: any, index: number) => (
            <ListItem
              key={option?.value}
              value={option?.value}
              onClick={() => {
                handleClose();
                onSelect(option, index);
              }}
            >
              <ListItemText>{option?.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
});
SearchField.displayName = 'SearchField';
