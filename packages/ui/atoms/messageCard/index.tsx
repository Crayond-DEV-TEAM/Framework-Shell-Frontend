import { DeleteIcon, EditIcon, ManIcon, MoreIcon } from '@atoms/icons';
import { IconButton, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState, useRef } from 'react';
import { useHover } from 'ahooks';

import { messageCardStyle } from './style';

export interface MessageCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  open?: boolean;
}

export const MessageCard = forwardRef((props: MessageCardProps): JSX.Element => {
  const { className = '', sx = {}, title, ...rest } = props;
  // const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const isHovering = useHover(ref);

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={[
        {
          ...messageCardStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={messageCardStyle.messageCard}>
        <Box sx={messageCardStyle.dot}></Box>
        <Typography sx={messageCardStyle.messageTitle}>{title}</Typography>
      </Box>
      <Box>
        {/* {isHovering ? (
          <IconButton disableRipple onClick={handleClick}>
            <MoreIcon rootStyle={{ width: '3px', height: '13px', cursor: 'pointer' }} />
          </IconButton>
        ) : (
          ''
        )} */}
      </Box>
      <IconButton
        disableRipple
        onClick={handleClick}
        onMouseOver={handleClick}
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
      >
        <MoreIcon rootStyle={{ width: '3px', height: '13px', cursor: 'pointer', opacity: anchorEl ? 0.5 : 1 }} />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose} sx={messageCardStyle.menuSx}>
        <MenuItem>
          <Box sx={messageCardStyle.profileSec}>
            <Typography sx={messageCardStyle.menutext}>Edit</Typography>
            <Box>
              <EditIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </Box>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={messageCardStyle.profileSec}>
            <Typography sx={messageCardStyle.menutext}>Delete</Typography>
            <DeleteIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
});

MessageCard.displayName = 'MessageCard';
