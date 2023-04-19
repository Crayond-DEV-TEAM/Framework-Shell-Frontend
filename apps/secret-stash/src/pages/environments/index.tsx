/* eslint-disable react/jsx-key */
import { MessageTable } from '@core/ui/components';
import { Box, Typography } from '@mui/material';
// import { MessageTable } from '..';
import { EnvironmentsStyle } from './style';

export default function Environments() {
  return (
    <Box sx={EnvironmentsStyle.rootSx}>
      <MessageTable isSecretStash={true} />
    </Box>
  );
}
