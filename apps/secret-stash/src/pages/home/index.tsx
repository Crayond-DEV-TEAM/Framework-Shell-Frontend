/* eslint-disable react/jsx-key */
import { Box, Typography } from '@mui/material';
import { homeStyle } from './style';
import { useNavigate } from 'react-router-dom';
import { environmentRoutes } from '@core/routes';
import React from 'react';

export default function Home() {
  const navigate = useNavigate();

  React.useEffect(() => {
    debugger;
    navigate(environmentRoutes.login);
  });
  debugger;
  return (
    <Box sx={homeStyle.rootSx}>
      <Typography variant="h3" color="primary.main" sx={{ fontWeight: 500 }}>
        Authorizing...
      </Typography>
    </Box>
  );
}