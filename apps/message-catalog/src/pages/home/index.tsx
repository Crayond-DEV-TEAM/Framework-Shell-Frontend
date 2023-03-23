/* eslint-disable react/jsx-key */
import { Box, Typography } from '@mui/material';

import { homeStyle } from './style';

export default function Home() {
  return (
    <Box sx={homeStyle.rootSx}>
      <Typography variant="h3" color="primary.main" sx={{ fontWeight: 500 }}>
        Crayond&apos;s Monorepo Boilerplate - TS
      </Typography>
    </Box>
  );
}
