import { useRouting } from '@core/store';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function RootLayout(): JSX.Element {
  const navigate = useNavigate();
  const route = useRouting((state) => state.route);

  useEffect(() => {
    if (route !== null) {
      navigate(route);
      useRouting.setState({ route: null });
    }
  }, [route]);

  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export { RootLayout };
