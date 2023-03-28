import { AddIcon } from '@atoms/icons';
import { MessageCard } from '@atoms/messageCard';
import { SearchField } from '@atoms/searchField';
import type { SxProps, Theme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { addMessageStyle } from './style';

export interface AddMessageProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export const AddMessage = forwardRef((props: AddMessageProps, ref: React.Ref<HTMLElement>): JSX.Element => {
  const { className = '', sx = {}, ...rest } = props;
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
        <AddIcon />
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
    </Box>
  );
});

AddMessage.displayName = 'AddMessage';
