import { Button } from '@atoms/button';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AddMessageGroup, Filter } from '..';
import { tableHeaderStyle } from './style';
import { SearchField } from '@atoms/searchField';
import { DialogDrawer } from '@atoms/dialogDrawer';
import { FooterComponent } from '@atoms/footerComponent';
import { Input } from '@atoms/input';

export interface TableHeaderProps {
  className?: string;
  tableHeader?: string;
  buttonName?: string;
  isFilterRequired?: boolean;
  isSearchRequired?: boolean;
  isBtnRequired?: boolean;
  filterContent?: any;
  editTableMessage?: any;
  status?: any;
  isEdit?: boolean;
  loading?: boolean;
  setOpen?: any;
  searchTerm?: any;
  setSearchTerm?: any;
  open?: boolean | any;
  addMessageTable?: any;
  handleStateChange?: (key: any, value: any) => void;
  // onChangeMessage?: (key: any, value: any, state: any) => void;
  updateStatusReport?: (e: any) => void;
  onApply?: () => void;
  handleOpen?: () => void;
  handleClose?: () => void;
  openAddMessage?: (value: any) => void;
  language?: any;
  addedLangState?: any;
  languageBox?: () => void;
  handleChipDelete?: any;
  addMessage?: any;
  options?: any;
  onChange?: any;
  sx?: SxProps<Theme>;
}

export const TableHeader = forwardRef((props: TableHeaderProps): JSX.Element => {
  const {
    className = '',
    tableHeader = 'Add Message',
    isFilterRequired = true,
    isSearchRequired = true,
    isBtnRequired = true,
    loading = true,
    handleStateChange = () => false,
    updateStatusReport = () => false,
    status,
    buttonName = 'Add Message',
    editTableMessage,
    setOpen,
    addedLangState,
    open,
    isEdit,
    options,
    openAddMessage = () => false,
    language,
    searchTerm,
    setSearchTerm,
    filterContent,
    addMessageTable = () => false,
    handleChipDelete = () => false,
    onApply = () => false,
    handleOpen = () => false,
    onChange = () => false,
    handleClose = () => false,
    sx = {},
    ...rest
  } = props;
  return (
    <Box
      sx={[
        {
          ...tableHeaderStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <Box sx={tableHeaderStyle.totalHeaderSx}>
        <Typography sx={tableHeaderStyle.titleSx}>{tableHeader}</Typography>
        <Box sx={tableHeaderStyle.leftSx}>
          {isSearchRequired && (
            <Box sx={{ mr: 1 }}>
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
              />
            </Box>
          )}
          {isFilterRequired && (
            <Filter
              filterContent={filterContent}
              handleChipDelete={handleChipDelete}
              onChange={onChange}
              onApply={onApply}
            />
          )}
          {isBtnRequired && (
            <Box sx={{ ml: 1 }}>
              <Button sx={tableHeaderStyle.btnSx} onClick={handleOpen}>
                {buttonName}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';
