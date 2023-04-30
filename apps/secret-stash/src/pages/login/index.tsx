import { Login } from '@core/ui/components/secret-stash/login';
import { Box } from '@mui/material';
import { loginStyle } from './style';

export default function LoginPage() {
  return (
    <Box sx={{ ...loginStyle.rootSx }}>
      <Login />
    </Box>
  );
}