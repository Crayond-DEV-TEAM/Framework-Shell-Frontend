import { Button } from '@atoms/button';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AddMessageGroup, Filter } from '..';
import { tableHeaderStyle } from './style';
import { SearchField } from '@atoms/searchField';
import { DialogDrawer } from '@atoms/dialogDrawer';

export interface TableHeaderProps {
  className?: string;
  tableHeader?: string;
  buttonName?: string;
  isFilterRequired?: boolean;
  isSearchRequired?: boolean;
  isBtnRequired?: boolean;
  filterContent?: any;
  handleChipDelete?: any;
  onChange?: any;
  sx?: SxProps<Theme>;
}

export const TableHeader = forwardRef((props: TableHeaderProps): JSX.Element => {
  const {
    className = '',
    tableHeader = 'Message Group 2',
    isFilterRequired = true,
    isSearchRequired = true,
    isBtnRequired = true,
    buttonName = 'Add Message',
    filterContent,
    handleChipDelete = () => false,
    onChange = () => false,
    sx = {},
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              {' '}
              <SearchField
                placeholder="Search"
                startAdornment={<SearchIcon sx={{ ml: 1, fontSize: '16px', color: '#818181' }} />}
              />
            </Box>
          )}
          {isFilterRequired && (
            <Filter filterContent={filterContent} handleChipDelete={handleChipDelete} onChange={onChange} />
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
      <DialogDrawer
        isDialogOpened={open}
        title={'Add New Message Group'}
        Bodycomponent={<AddMessageGroup />}
        handleCloseDialog={handleClose}
        rootStyle={{ padding: '0px important' }}
        // dialogstyle={{ width: '904px', height: '604px' }}
      />
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';
