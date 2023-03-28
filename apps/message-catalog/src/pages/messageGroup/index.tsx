/* eslint-disable react/jsx-key */
import { MessageTable } from '@core/ui/components';
import { Box, Typography } from '@mui/material';
// import { MessageTable } from '..';
import { messageStyle } from './style';

export default function MessageGroup() {
  return (
    <Box sx={messageStyle.rootSx}>
      <MessageTable />
    </Box>
  );
}
