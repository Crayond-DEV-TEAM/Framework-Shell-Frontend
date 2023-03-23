import { ForgotPassword } from '@core/ui/components';
import { Box } from '@mui/material';

import { forgotPasswordStyle } from './style';

export default function ForgotPasswordPage() {
  return (
    <Box
      sx={{
        ...forgotPasswordStyle.rootSx,
      }}
    >
      <ForgotPassword />
    </Box>
  );
}
