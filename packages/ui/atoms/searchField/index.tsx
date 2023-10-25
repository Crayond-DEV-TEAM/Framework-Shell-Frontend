import { SearchIcon } from '@atoms/icons';
import { SelectBoxInterface } from '@core/store/interface';
import { Box, CircularProgress, InputBase, List, ListItemButton, ListItemText, Popper } from '@mui/material';
import React, { useState } from 'react';
import { searchFieldStyle } from './style';

export interface SearchFieldProps {
  placeholder: string;
  onSelect: (data: SelectBoxInterface, index: number) => void;
  onSearch: (searchStr: string) => void;
  options: SelectBoxInterface[];
  loading: boolean;
}

export const SearchField = (props: SearchFieldProps): JSX.Element => {
  const { placeholder, onSearch, onSelect, options, loading = false } = props;

  const [anchorEl, setAnchorEl] = useState<any | null>(null);

  const [search, setSearch] = useState<string>('');

  const openOptions = (event: React.FocusEvent<HTMLInputElement>) => setAnchorEl(event.currentTarget);

  const closeOptions = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  const id = open ? 'search-field-language-configuration' : undefined;

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str: string = e.target.value;
    onSearch(str);
    setSearch(str);
  };
  // searchfunc
  const filteredMessageGroup = options?.filter((x: any) => x?.label?.toLowerCase()?.includes(search?.toLowerCase()));

  // console.log(onSelect, 'sss');
  return (
    <Box sx={{ ...searchFieldStyle.searchBoxSx }}>
      <Box sx={{ ...searchFieldStyle.searchFieldSx }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <InputBase
            placeholder={placeholder}
            value={search}
            onChange={onTextChange}
            onFocus={openOptions}
            onBlur={() =>
              setTimeout(() => {
                closeOptions();
              }, 250)
            }
            sx={{
              width: '100vh',
              marginLeft: '12px',
              fontSize: '16px',
              color: '#29302B',
              fontWeight: 600,
            }}
            fullWidth
          />
        </Box>
        {loading === true && <CircularProgress size={20} />}
      </Box>
      {/* Options */}
      <Popper id={id} open={open} anchorEl={anchorEl} sx={searchFieldStyle?.popove}>
        <Box sx={searchFieldStyle?.title}>Select language</Box>
        {Array.isArray(filteredMessageGroup) && filteredMessageGroup?.length > 0 ? (
          <List sx={searchFieldStyle?.text}>
            {filteredMessageGroup.map((option: SelectBoxInterface, index: number) => (
              <ListItemButton
                key={option?.value}
                onClick={() => {
                  closeOptions();
                  onSelect(option, index);
                }}
              >
                <ListItemText>{option.label}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <p>No Languge Found!</p>
          </Box>
        )}
      </Popper>
    </Box>
  );
};
SearchField.displayName = 'SearchField';
