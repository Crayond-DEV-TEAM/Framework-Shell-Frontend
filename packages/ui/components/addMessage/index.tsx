import { DialogDrawer } from '@atoms/dialogDrawer';
import { AddIcon } from '@atoms/icons';
import { MessageCard } from '@atoms/messageCard';
import { SearchField } from '@atoms/searchField';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { ModalAddMessage } from '..';
import { addMessageStyle } from './style';

export interface AddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
  open?: boolean;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const messageValue = [
    {
      title: 'Message Group 1',
    },
    {
      title: 'Message Group 2',
    },
    {
      title: 'Message Group 3',
    },
    {
      title: 'Message Group 4',
    },
  ];
  return (
    <Box
      sx={[
        {
          ...addMessageStyle.rootSx,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      className={`${className}`}
      ref={ref}
      {...rest}
    >
      <Box sx={addMessageStyle.header}>
        <Typography>Message Group</Typography>
        <AddIcon onClick={handleOpen} />
      </Box>
      <Box sx={{ m: '12px', height: '32px' }}>
        <SearchField />
      </Box>

      {messageValue.map((x, index) => {
        return (
          <Box key={index}>
            <MessageCard title={x.title} />
          </Box>
        );
      })}
      <DialogDrawer
        isDialogOpened={open}
        title={'Add New Message Group'}
        Bodycomponent={<ModalAddMessage />}
        handleCloseDialog={handleClose}
      />
    </Box>
  );
});

AddMessage.displayName = 'AddMessage';
