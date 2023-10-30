import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '70vh',
        placeItems: 'center',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ textAlign: 'center', color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', color: 'primary.dark' }}>
          Page not Found
        </Typography>
      </Box>
    </Box>
  );
}

export default NotFound;
