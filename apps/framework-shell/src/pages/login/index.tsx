import { Box } from '@mui/material';
import { loginStyle } from './style';
import { Login } from '@core/ui/components';

export default function LoginPage() {
  return (
    <Box sx={{ ...loginStyle.rootSx }}>
      <Login />
    </Box>
  );
}
