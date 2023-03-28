import { Button } from '@atoms/button';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Filter } from '..';

import { tableHeaderStyle } from './style';

export interface TableHeaderProps {
  className?: string;
  tableHeader?: string;
  buttonName?: string;
  isFilterRequired?: boolean;
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
    isBtnRequired = true,
    buttonName = 'Add Message',
    filterContent,
    handleChipDelete = () => false,
    onChange = () => false,
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
          {isFilterRequired && (
            <Filter filterContent={filterContent} handleChipDelete={handleChipDelete} onChange={onChange} />
          )}
          {isBtnRequired && (
            <Box sx={{ ml: 1 }}>
              <Button sx={tableHeaderStyle.btnSx}>{buttonName}</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';
