import { DeleteIcon, EditIcon, ManIcon, MoreIcon } from '@atoms/icons';
import { IconButton, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { forwardRef, useState, useRef } from 'react';
import { useHover } from 'ahooks';

import { messageCardStyle } from './style';

export interface MessageCardProps {
  className?: string;
  sx?: SxProps<Theme>;
  title?: string;
  onMessaageClick?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
  index?: any;
  select?: any;
  onEdit?: () => void;
  open?: boolean;
}

export const MessageCard = forwardRef((props: MessageCardProps): JSX.Element => {
  const {
    className = '',
    sx = {},
    isActive,
    onMessaageClick = () => false,
    onDelete = () => false,
    onEdit = () => false,
    select,
    index,
    title,
    ...rest
  } = props;
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
      <Box
        sx={{ ...messageCardStyle.messageCard, backgroundColor: select === index ? '#EAF1EF' : 'none' }}
        onClick={onMessaageClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isActive ? (
            <CircleIcon sx={{ ...messageCardStyle.dot, color: '#357968' }} />
          ) : (
            <CircleIcon sx={{ ...messageCardStyle.dot, color: '#FF4D4A' }} />
          )}
          <Typography sx={messageCardStyle.messageTitle}>{title}</Typography>
        </Box>

        <IconButton
          disableRipple
          onClick={handleClick}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          // onMouseOver={handleClick}
        >
          <MoreIcon rootStyle={{ width: '3px', height: '13px', cursor: 'pointer', opacity: anchorEl ? 0.5 : 1 }} />
        </IconButton>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose} sx={messageCardStyle.menuSx}>
          <MenuItem onClick={onEdit} sx={{ justifyContent: 'space-between' }}>
            <Typography sx={messageCardStyle.menutext}>Edit</Typography>
            <IconButton disableRipple sx={{ p: 0 }}>
              <EditIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </IconButton>
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <Typography sx={messageCardStyle.menutext}>Delete</Typography>
            <IconButton disableRipple sx={{ p: 0 }}>
              <DeleteIcon rootStyle={{ width: '18px', height: '18px', cursor: 'pointer' }} />
            </IconButton>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
});

MessageCard.displayName = 'MessageCard';
