import { FilterIcon } from '@atoms/icons';
import { Popover, SxProps, Theme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, IconButton } from '@mui/material';
import { forwardRef, useState } from 'react';

import { filterStyle } from './style';
import { Button } from '@atoms/button';

export interface FilterProps {
  className?: string;
  title?: string;
  sx?: SxProps<Theme>;
}

export const Filter = forwardRef((props: FilterProps): JSX.Element => {
  const { className = '', sx = {}, title = 'Filter by', ...rest } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [sideContent, setSideContent] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onFilterFunc = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSideContent(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openSide = Boolean(sideContent);
  const idSide = openSide ? 'simple-popover' : undefined;

  const filterContent = [
    {
      name: 'Severity',
    },
    {
      name: 'Status',
    },
    {
      name: 'Date',
    },
  ];
  return (
    <Box
      sx={[
        {
          ...filterStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      {...rest}
    >
      <IconButton sx={filterStyle.filterSx} onClick={handleClick}>
        <FilterIcon rootStyle={{ color: '#5A5A5A' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={filterStyle.totalFilterSx}
      >
        <Box sx={filterStyle.totalSx}>
          <Typography sx={filterStyle.headerSx}>{title}</Typography>
          <Box sx={filterStyle.contentBoxSx}>
            {filterContent &&
              filterContent.map((val, i) => {
                return (
                  <Box key={i} sx={filterStyle.CardSx} onClick={() => onFilterFunc()}>
                    <Typography>{val?.name}</Typography>
                    <IconButton disableRipple>
                      <ArrowForwardIosIcon sx={{ color: '#5A5A5A', width: 16, height: 16 }} />
                    </IconButton>
                  </Box>
                );
              })}
          </Box>
          <Box sx={filterStyle.footerSx}>
            <Box sx={filterStyle.subFooterSx}>
              <Button buttonStyle={filterStyle.footerCancelBtn}>Cancel</Button>
              <Button buttonStyle={filterStyle.footerBtn}> Apply</Button>
            </Box>
          </Box>
        </Box>
      </Popover>
      <Popover
        id={idSide}
        open={openSide}
        anchorEl={sideContent}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={filterStyle.totalFilterSideSx}
      >
        <Box sx={filterStyle.totalSx}>
          <Typography sx={filterStyle.headerSx}>{title}</Typography>
          <Box sx={filterStyle.contentBoxSx}>
            {filterContent &&
              filterContent.map((val, i) => {
                return (
                  <Box key={i} sx={filterStyle.CardSx} onClick={(e: any) => onFilterFunc(e)}>
                    <Typography>{val?.name}</Typography>
                    <IconButton disableRipple>
                      <ArrowForwardIosIcon sx={{ color: '#5A5A5A', width: 16, height: 16 }} />
                    </IconButton>
                  </Box>
                );
              })}
          </Box>
          <Box sx={filterStyle.footerSx}>
            <Box sx={filterStyle.subFooterSx}>
              <Button buttonStyle={filterStyle.footerCancelBtn}>Cancel</Button>
              <Button buttonStyle={filterStyle.footerBtn}> Apply</Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
});

Filter.displayName = 'Filter';
