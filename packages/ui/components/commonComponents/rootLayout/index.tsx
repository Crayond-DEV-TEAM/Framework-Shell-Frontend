import { webRoutes } from '@core/routes';
import { useRouting, useUser } from '@core/store';
import { localStorageKeys, parseJwt } from '@core/utils';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function RootLayout(): JSX.Element {
  const navigate = useNavigate();
  const route = useRouting((state) => state.route);
  const projectId = localStorage.getItem(localStorageKeys?.projectId);
  useEffect(() => {
    if (route !== null) {
      navigate(route);
      useRouting.setState({ route: null });
    }
  }, [route]);

  // useEffect(() => {
  //   if (!projectId) {
  //     navigate(webRoutes.admin);
  //   }
  // }, []);

  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export { RootLayout };
