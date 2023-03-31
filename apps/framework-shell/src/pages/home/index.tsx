/* eslint-disable react/jsx-key */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { homeStyle } from './style';
import { webRoutes } from '@core/routes';

export default function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(webRoutes.login);
  });

  return (
    <Box sx={homeStyle.rootSx}>
      <Typography variant="h3" color="primary.main" sx={{ fontWeight: 500 }}>
        Authorizing....
      </Typography>
    </Box>
  );
}
